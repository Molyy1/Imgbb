const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Pinterest API key
const pinterestApiKey = 'r-dd95304fa1b0aa6872a12f88';
const baseURL = 'https://for-devs.onrender.com/api/pin';

// Endpoint to fetch Pinterest data
app.get('/pinterest', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const response = await axios.get(baseURL, {
            params: {
                search: query,
                apikey: pinterestApiKey
            },
            headers: {
                'accept': '*/*',
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching Pinterest data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
