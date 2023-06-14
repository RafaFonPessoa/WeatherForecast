require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const WeatherData = require('./models/WeatherData');

const app = express();
const port = parseInt(process.env.PORT, 10); // Convertendo para inteiro

const apiKey = process.env.API_KEY;

// Configurando o CORS
app.use(cors());

// Rota previsão do tempo
app.get('/weather/:city', async (req, res) => {
  try {
    const { city } = req.params; // Obtém o parâmetro da cidade

    // Chama a API do OpenWeatherMap
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );

    // Extrai os dados relevantes da resposta
    const temperatureKelvin = response.data.main.temp;
    const temperatureCelsius = (temperatureKelvin - 273.15).toFixed(1); // Conversão de Kelvin para Celsius com 1 casa decimal

    const weatherData = new WeatherData(
      response.data.name,
      temperatureCelsius,
      response.data.weather[0].description,
      response.data.main.humidity
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


