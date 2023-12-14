const express = require('express');
const muzejiRoutes = require('./routes/muzeji_r');
const pool = require('./routes/db');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/api/v1/muzeji', muzejiRoutes);

app.listen(5500, () => {
    console.log(`Server running on port 5500`);
});
