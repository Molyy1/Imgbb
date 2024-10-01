
const express = require('express');
const { pinterest } = require('globalsprak'); // Assuming you have a function like this

const app = express();
const PORT = process.env.PORT || 3000;

// Define the /pinterest endpoint
app.get('/pinterest', async (req, res) => {
  const queryString = req.url.split('?')[1]; // Extract everything after the '?'
  
  if (!queryString) {
    return res.status(400).json({ error: 'Query and number of images are required' });
  }

  // Separate the query and number from the URL
  const match = queryString.match(/query=([^ ]+)(?: ([\-]?\d+))?/); 
  if (!match) {
    return res.status(400).json({ error: 'Invalid query format' });
  }

  const query = match[1]; // Extract the query term (e.g., 'cat')
  let count = match[2] ? parseInt(match[2]) : 10; // Extract the count (default to 10 if not provided)

  if (isNaN(count)) {
    return res.status(400).json({ error: 'Invalid number for image count' });
  }

  // Ensure count is always positive
  count = Math.abs(count);

  try {
    // Fetch data from the pinterest function with the query and count
    const response = await pinterest(query, count); 
    res.json(response);
  } catch (error) {
    console.error('Error fetching Pinterest data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
