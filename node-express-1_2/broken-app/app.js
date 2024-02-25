const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser'); // Adding bodyParser for parsing JSON in the request body

const app = express();

// Adding middleware to parse JSON in the request body
app.use(bodyParser.json());

// Route to handle POST requests
app.post('/', async (req, res, next) => {
  try {
    const developers = req.body.developers;

    // Using Promise.all to wait for all axios requests to complete
    const results = await Promise.all(
      developers.map(async (d) => {
        const response = await axios.get(`https://api.github.com/users/${d}`);
        return response.data;
      })
    );

    // Mapping the results to the desired output format
    const output = results.map((r) => ({ name: r.name, bio: r.bio }));

    // Sending the output as JSON
    return res.json(output);
  } catch (err) {
    // Passing the error to the error-handling middleware
    next(err);
  }
});

// Handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Listening on port 3000
app.listen(3000, () => {
  console.log('Server is running port 3000');
});
