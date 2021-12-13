const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('website'));

projectData = {};
app.get('/data', (req, res) => {
    res.send(projectData);
});

app.post('/data', (req, res) => {
    const temperature = req.body.temperature;
    const date = req.body.date;
    const userResponse = req.body.userResponse;
    projectData = { temperature, date, userResponse };
    res.send(projectData);
});

app.listen(3000, () => {
    console.log('Running on port 3000');
});