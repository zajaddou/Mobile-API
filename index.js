
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.status(200).json({
        status: "Success"
    });
    
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`On Air `);
});