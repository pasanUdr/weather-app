const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const { getWeatherData } = require('./utils/weather');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/weatherApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// app.get('/', function(req, res) {
//     res.send('Hello World')
// })

// Route to store user details
app.post('/users', async(req, res) => {
    const { email, location } = req.body;
    try {
        const user = new User({ email, location });
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Route to update user location
app.put('/users/:email/location', async(req, res) => {
    const { email } = req.params;
    const { location } = req.body;
    try {
        const user = await User.findOneAndUpdate({ email }, { location }, { new: true });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Route to get users' weather data for a given day
app.get('/users/:email/weather', async(req, res) => {
    try {
        const { email } = req.params;
        const { date } = req.query;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Extract location from user
        const { location } = user;
        if (!location) {
            return res.status(400).json({ error: 'User location not found' });
        }

        const weatherData = await getWeatherData(location);

        res.json(weatherData);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});