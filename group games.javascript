const express = require("express");
const fetch = require("node-fetch"); // Install with 'npm install node-fetch'

const app = express();
app.use(express.json());

app.post("/getGroupGames", async (req, res) => {
    const { groupId, limit } = req.body;

    if (!groupId) {
        return res.status(400).json({ error: "Group ID is required." });
    }

    const url = `https://games.roblox.com/v2/groups/${groupId}/games?accessFilter=2&limit=${limit || 10}&sortOrder=Asc`;

    try {
        const response = await fetch(url, { method: "GET" });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();

        // Return the games data to the Roblox script
        res.json(data);
    } catch (error) {
        console.error("Error fetching group games:", error);
        res.status(500).json({ error: "Failed to fetch group games." });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
