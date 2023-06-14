const express = require('express');
const axios = require('axios');
const WeatherData = require('./models/WeatherData');

const app = express();
const PORT = 3000;
// 6c56c3f0ba38bf5f22e08f329df8cf40

// Rota previsão do tempo
app.get('/weather/:city', async (req, res) => {
  try {
    const { city } = req.params; // Obtém o parâmetro da cidade

    // Chama a API do OpenWeatherMap
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6c56c3f0ba38bf5f22e08f329df8cf40`
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

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

