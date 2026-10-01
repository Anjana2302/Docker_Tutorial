const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const URL = process.env.BACKEND_URL || 'http://127.0.0.1:8000/api'; // Replace with your backend server URL

app.get('/', async (req, res) => {
  try {
    const response = await fetch(URL);
    
    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const data = await response.json(); // { data: ["Anjana", "Mamta", "Jyoti", "Jayant"] }
    
    res.render('index', { data: data.data });
  } catch (error) {
    console.error('Error fetching API data:', error);
    res.status(500).send('Error fetching API data');
  }
});

app.listen(port, () => {
  console.log(`Frontend server is running on http://localhost:${port}`);
});
