const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Use the provided Pinterest API endpoint
const baseURL = 'https://for-devs.onrender.com/api/pin';
// Your hardcoded API key
const pinterestApiKey = 'r-18a0bdd5bd3b6d656fba9066';

app.get('/Pinterest', async (req, res) => {
    const { quary: query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Search query (quary) is required' });
    }

    try {
        const response = await axios.get(baseURL, {
            params: {
                search: query,
                apikey: pinterestApiKey
            },
            headers: {
                'accept': '*/*',
            },
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
