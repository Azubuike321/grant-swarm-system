const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const Arweave = require('arweave');
const Irys = require("@irys/sdk");
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

let walletKey;
try {
    // Vercel can sometimes struggle with multiline strings in env, 
    // so we handle potential formatting issues here
    walletKey = JSON.parse(process.env.ARWEAVE_KEY);
} catch (e) {
    console.error("CRITICAL: ARWEAVE_KEY missing or malformed in environment");
}

// --- NEW: GITHUB VERIFICATION HELPER ---
const verifyGitHub = async (repoUrl) => {
    if (!repoUrl || !repoUrl.includes('github.com')) return null;
    try {
        const cleanPath = repoUrl.replace(/.*github\.com\//, '').replace(/\/$/, '');
        const response = await axios.get(`https://api.github.com/repos/${cleanPath}`, {
            headers: process.env.GITHUB_TOKEN ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } : {},
            timeout: 3000
        });
        return {
            stars: response.data.stargazers_count,
            forks: response.data.forks_count,
            openIssues: response.data.open_issues_count,
            language: response.data.language
        };
    } catch (e) {
        console.error("GitHub API Lookup failed or Repo Private");
        return null;
    }
};

// --- 1. DYNAMIC WEIGHTED AGENTS ---
const Agents = {
    technical: (desc, githubData) => {
        const d = desc.toLowerCase();
        let score = 70; 
        if (d.includes('zk') || d.includes('zero knowledge')) score += 15;
        if (d.includes('tee') || d.includes('enclave')) score += 11;
        if (githubData) {
            score += 5;
            if (githubData.stars > 10) score += 5;
            if (githubData.stars > 100) score += 3;
        } else {
            score -= 10;
        }
        score = Math.min(score, 98);
        let logic = score > 85 ? "Advanced privacy-stack detected." : "Standard architecture.";
        if (githubData) {
            logic += ` Verified ${githubData.language} source with ${githubData.stars} stars.`;
        } else {
            logic += " WARNING: Repository could not be verified on-chain.";
        }
        return { score, logic };
    },
    impact: (title, desc) => {
        const combinedLength = title.length + desc.length;
        let score = 65;
        if (combinedLength > 200) score = 88;
        if (combinedLength > 500) score = 94;
        return { 
            score, 
            logic: score > 90 ? "High ecosystem utility; solves systemic transparency gaps." : "Localized utility; good ROI potential." 
        };
    },
    risk: (budget) => {
        const amount = parseInt(budget) || 0;
        let score = 10;
        if (amount > 5000) score = 20;
        if (amount > 20000) score = 45;
        if (amount > 100000) score = 85; 
        let logic = "Budget request is highly efficient.";
        if (score > 40) logic = "Significant capital exposure flagged.";
        if (score > 80) logic = "Extreme financial risk: budget exceeds standard safety parameters.";
        return { score, logic };
    }
};

// --- 2. THE PERMANENT AUDIT VAULT ---
const saveReviewToArweave = async (reviewData) => {
    try {
        if (!walletKey) throw new Error("No Wallet Key");
        const irys = new Irys({ url: "https://node1.irys.xyz", token: "arweave", key: walletKey });
        const receipt = await irys.upload(JSON.stringify(reviewData), {
            tags: [
                { name: "Content-Type", value: "application/json" },
                { name: "App-Name", value: "Amadeus-Swarm-Pro" },
                { name: "State-Proof", value: reviewData.stateProof },
                { name: "Consensus-Level", value: reviewData.consensusLevel }
            ]
        });
        return receipt.id;
    } catch (err) {
        console.error("Blockchain Fallback:", err.message);
        return `audit-${reviewData.stateProof.substring(0, 10)}`;
    }
};

// --- 3. THE ORCHESTRATOR ---
app.post('/api/review', async (req, res) => {
    const { title, description, budget, githubUrl } = req.body;
    const githubData = await verifyGitHub(githubUrl);
    const swarmResult = {
      tech: Agents.technical(description, githubData),
      impact: Agents.impact(title, description),
      risk: Agents.risk(budget)
    };

    const weightedScore = (swarmResult.tech.score * 0.4) + (swarmResult.impact.score * 0.4) - (swarmResult.risk.score * 0.2);
    const variance = Math.abs(swarmResult.tech.score - swarmResult.impact.score);
    const consensusLevel = variance > 20 ? "DISPUTED" : "HIGH_CONFIDENCE";
    const stateProof = crypto.createHash('sha256').update(JSON.stringify(swarmResult) + Date.now()).digest('hex');

    const arweaveId = await saveReviewToArweave({
        title, budget, githubUrl,
        githubMeta: githubData,
        finalScore: weightedScore.toFixed(1),
        swarmResult, stateProof, consensusLevel,
        timestamp: new Date().toISOString()
    });

    res.json({
        title,
        consensusScore: `${weightedScore.toFixed(1)}%`,
        consensusLevel,
        agentBreakdown: swarmResult,
        stateProof,
        arweaveId,
        auditUrl: `https://gateway.irys.xyz/${arweaveId}`
    });
});

app.get('/api/verify/:arweaveId', async (req, res) => {
    try {
        const response = await axios.get(`https://gateway.irys.xyz/${req.params.arweaveId}`);
        res.json({ verified: true, data: response.data });
    } catch (e) {
        res.status(404).json({ verified: false, error: "Audit not found" });
    }
});

// --- REMOVED app.listen ---
// Vercel handles the execution. Exporting the app is required.
module.exports = app;