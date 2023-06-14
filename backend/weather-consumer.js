document.addEventListener('DOMContentLoaded', () => {
  // Faz a tradução e muda a imagem dependendo da descrição
  const weatherDescriptions = {
    'clear sky': {
      description: 'céu limpo',
      image: 'https://openweathermap.org/img/wn/01d.png',
    },
    'few clouds': {
      description: 'parcialmente nublado',
      image: 'https://openweathermap.org/img/wn/02d.png',
    },
    'scattered clouds': {
      description: 'nuvens dispersas',
      image: 'https://openweathermap.org/img/wn/03d.png',
    },
    'broken clouds': {
      description: 'nuvens quebradas',
      image: 'https://openweathermap.org/img/wn/04d.png',
    },
    'shower rain': {
      description: 'chuva isolada',
      image: 'https://openweathermap.org/img/wn/09d.png',
    },
    'rain': {
      description: 'chuva',
      image: 'https://openweathermap.org/img/wn/10d.png',
    },
    'thunderstorm': {
      description: 'trovoada',
      image: 'https://openweathermap.org/img/wn/11d.png',
    },
    'snow': {
      description: 'neve',
      image: 'https://openweathermap.org/img/wn/13d.png',
    },
    'mist': {
      description: 'névoa',
      image: 'https://openweathermap.org/img/wn/50d.png',
    },
  };

  // Função para buscar a previsão do tempo
  const searchWeather = async () => {
    const inputElement = document.querySelector('.input-city');
    const city = inputElement.value;

    try {
      // Faz a requisição para a API
      const response = await axios.get(`http://localhost:3000/weather/${city}`);
      const weatherData = response.data;

      // Traduz a descrição do tempo
      const translatedDescription = weatherDescriptions[weatherData.description];

      // Preenche os valores nos elementos do HTML
      const cityElement = document.querySelector('.city');
      const temperatureElement = document.querySelector('.temperature');
      const forecastElement = document.querySelector('.text-forecast');
      const humidityElement = document.querySelector('.humidity');
      const iconElement = document.querySelector('.icon-forecast');

      cityElement.textContent = weatherData.city;
      temperatureElement.textContent = `${weatherData.temperature}°C`;
      forecastElement.textContent = translatedDescription ? translatedDescription.description : weatherData.description;
      humidityElement.textContent = `Umidade: ${weatherData.humidity}%`;
      iconElement.src = translatedDescription ? translatedDescription.image : 'https://openweathermap.org/img/wn/04d.png';
    } catch (error) {
      alert('Erro ao obter a previsão do tempo! Tente novamente mais tarde.');
      console.error('Erro ao obter a previsão do tempo:', error);
    }
  };

  // Adiciona um event listener ao botão de busca
  const searchButton = document.querySelector('.search-button');
  searchButton.addEventListener('click', searchWeather);
});

