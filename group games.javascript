const apiUrl = "https://games.roblox.com/v2/groups"; // Base API URL

// Function to fetch games for a group ID
async function fetchGroupGames(groupId, limit = 10) {
    const url = `${apiUrl}/${groupId}/games?accessFilter=2&limit=${limit}&sortOrder=Asc`;

    try {
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) {
            throw new Error(`Failed to fetch games: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched games:", data);
        return data;
    } catch (error) {
        console.error("Error fetching group games:", error);
    }
}

// Example: Listen for requests from Roblox and fetch games
self.addEventListener('message', (event) => {
    const groupId = event.data.groupId;
    if (groupId) {
        fetchGroupGames(groupId).then((games) => {
            // Do something with the games
            console.log("Games for group:", groupId, games);
        });
    }
});