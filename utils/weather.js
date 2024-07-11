const axios = require('axios');
require('dotenv').config();

const getWeatherData = async(location) => {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    try {
        const response = await axios.get(url);
        return response.data.weather[0].description;
    } catch (error) {
        console.error(error);
        return 'Unable to fetch weather data';
    }
};

module.exports = { getWeatherData };