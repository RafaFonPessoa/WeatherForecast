document.addEventListener('DOMContentLoaded', () => {
    // Função para buscar a previsão do tempo
    const searchWeather = async () => {
      const inputElement = document.querySelector('.input-city');
      const city = inputElement.value;
    
      try {
        // Faz a requisição para a API
        const response = await axios.get(`/weather/${city}`);
        const weatherData = response.data;
    
        // Preenche os valores nos elementos do HTML
        const cityElement = document.querySelector('.city');
        const temperatureElement = document.querySelector('.temperature');
        const forecastElement = document.querySelector('.text-forecast');
        const humidityElement = document.querySelector('.humidity');
    
        cityElement.textContent = weatherData.city;
        temperatureElement.textContent = `${weatherData.temperature.toFixed(1)}°C`;
        forecastElement.textContent = weatherData.description;
        humidityElement.textContent = `Umidade: ${weatherData.humidity}%`;
      } catch (error) {
        console.error('Erro ao obter a previsão do tempo:', error);
      }
    };
    
    // Adiciona um event listener ao botão de busca
    const searchButton = document.querySelector('.search-button');
    searchButton.addEventListener('click', searchWeather);
  });
  