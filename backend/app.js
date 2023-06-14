require('dotenv').config();

const express = require('express');
const axios = require('axios');
const WeatherData = require('./models/WeatherData');

const app = express();
const port = parseInt(process.env.PORT, 10); // Convertendo para inteiro

const apiKey = process.env.API_KEY;

// Rota previsão do tempo
app.get('/weather/:city', async (req, res) => {
  try {
    const { city } = req.params; // Obtém o parâmetro da cidade

    // Chama a API do OpenWeatherMap
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );

    // Extrai os dados relevantes da resposta
    const weatherData = new WeatherData(
      response.data.name,
      response.data.main.temp,
      response.data.weather[0].description
    );

    res.json(weatherData); // Retorna previsão do tempo
  } catch (error) {
    console.error('Erro ao obter a previsão do tempo:', error);
    res.status(500).json({ error: 'Erro ao obter a previsão do tempo' });
  }
});

app.listen(port, () => {
  console.log(`Servidor está funcionando!`);
});

