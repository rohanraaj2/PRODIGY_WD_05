// Weather API configuration
let API_KEY = ''; // Will be set by user input
const API_BASE_URL = 'https://api.weatherapi.com/v1';

// DOM elements
const apiKeySection = document.getElementById('apiKeySection');
const apiKeyInput = document.getElementById('apiKeyInput');
const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
const toggleApiKeyBtn = document.getElementById('toggleApiKeyBtn');
const settingsFab = document.getElementById('settingsFab');
const locationInput = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const loading = document.getElementById('loading');
const weatherCard = document.getElementById('weatherCard');
const errorMessage = document.getElementById('errorMessage');
const forecastSection = document.getElementById('forecastSection');

// Weather data elements
const cityName = document.getElementById('cityName');
const date = document.getElementById('date');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weatherIcon');
const description = document.getElementById('description');
const visibility = document.getElementById('visibility');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const feelsLike = document.getElementById('feelsLike');
const pressure = document.getElementById('pressure');
const uvIndex = document.getElementById('uvIndex');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const forecastContainer = document.getElementById('forecastContainer');
const errorText = document.getElementById('errorText');

// Event listeners
searchBtn.addEventListener('click', handleSearch);
locationBtn.addEventListener('click', getCurrentLocation);
saveApiKeyBtn.addEventListener('click', saveApiKey);
toggleApiKeyBtn.addEventListener('click', toggleApiKeyVisibility);
settingsFab.addEventListener('click', toggleSettingsPanel);
locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});
apiKeyInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        saveApiKey();
    }
});
apiKeyInput.addEventListener('input', validateApiKeyFormat);

// Weather icon mapping for WeatherAPI
const weatherIconMap = {
    '1000': 'fas fa-sun', // Sunny
    '1003': 'fas fa-cloud-sun', // Partly cloudy
    '1006': 'fas fa-cloud', // Cloudy
    '1009': 'fas fa-clouds', // Overcast
    '1030': 'fas fa-smog', // Mist
    '1063': 'fas fa-cloud-rain', // Patchy rain possible
    '1066': 'fas fa-snowflake', // Patchy snow possible
    '1069': 'fas fa-cloud-rain', // Patchy sleet possible
    '1072': 'fas fa-cloud-rain', // Patchy freezing drizzle possible
    '1087': 'fas fa-bolt', // Thundery outbreaks possible
    '1114': 'fas fa-wind', // Blowing snow
    '1117': 'fas fa-wind', // Blizzard
    '1135': 'fas fa-smog', // Fog
    '1147': 'fas fa-smog', // Freezing fog
    '1150': 'fas fa-cloud-drizzle', // Patchy light drizzle
    '1153': 'fas fa-cloud-drizzle', // Light drizzle
    '1168': 'fas fa-cloud-drizzle', // Freezing drizzle
    '1171': 'fas fa-cloud-drizzle', // Heavy freezing drizzle
    '1180': 'fas fa-cloud-rain', // Patchy light rain
    '1183': 'fas fa-cloud-rain', // Light rain
    '1186': 'fas fa-cloud-rain', // Moderate rain at times
    '1189': 'fas fa-cloud-rain', // Moderate rain
    '1192': 'fas fa-cloud-showers-heavy', // Heavy rain at times
    '1195': 'fas fa-cloud-showers-heavy', // Heavy rain
    '1198': 'fas fa-cloud-rain', // Light freezing rain
    '1201': 'fas fa-cloud-showers-heavy', // Moderate or heavy freezing rain
    '1204': 'fas fa-cloud-rain', // Light sleet
    '1207': 'fas fa-cloud-rain', // Moderate or heavy sleet
    '1210': 'fas fa-snowflake', // Patchy light snow
    '1213': 'fas fa-snowflake', // Light snow
    '1216': 'fas fa-snowflake', // Patchy moderate snow
    '1219': 'fas fa-snowflake', // Moderate snow
    '1222': 'fas fa-snowflake', // Patchy heavy snow
    '1225': 'fas fa-snowflake', // Heavy snow
    '1237': 'fas fa-snowflake', // Ice pellets
    '1240': 'fas fa-cloud-rain', // Light rain shower
    '1243': 'fas fa-cloud-showers-heavy', // Moderate or heavy rain shower
    '1246': 'fas fa-cloud-showers-heavy', // Torrential rain shower
    '1249': 'fas fa-cloud-rain', // Light sleet showers
    '1252': 'fas fa-cloud-rain', // Moderate or heavy sleet showers
    '1255': 'fas fa-snowflake', // Light snow showers
    '1258': 'fas fa-snowflake', // Moderate or heavy snow showers
    '1261': 'fas fa-snowflake', // Light showers of ice pellets
    '1264': 'fas fa-snowflake', // Moderate or heavy showers of ice pellets
    '1273': 'fas fa-bolt', // Patchy light rain with thunder
    '1276': 'fas fa-bolt', // Moderate or heavy rain with thunder
    '1279': 'fas fa-bolt', // Patchy light snow with thunder
    '1282': 'fas fa-bolt' // Moderate or heavy snow with thunder
};

// Initialize the app
function init() {
    // Set current date
    updateDate();
    
    // Load saved API key if exists
    loadSavedApiKey();
    
    // If API key is available, try to get user's location
    if (API_KEY) {
        getCurrentLocation();
    }
}

// Update current date
function updateDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    date.textContent = now.toLocaleDateString('en-US', options);
}

// API Key Management
function loadSavedApiKey() {
    const savedKey = localStorage.getItem('weatherApiKey');
    if (savedKey) {
        API_KEY = savedKey;
        apiKeyInput.value = savedKey;
        hideApiKeySection();
        showApiKeyStatus('API key loaded successfully!', 'success');
    }
}

function saveApiKey() {
    const key = apiKeyInput.value.trim();
    
    if (!key) {
        showApiKeyStatus('Please enter an API key', 'error');
        return;
    }
    
    if (!validateApiKeyFormat()) {
        showApiKeyStatus('Invalid API key format', 'error');
        return;
    }
    
    // Test the API key
    testApiKey(key);
}

function testApiKey(key) {
    showLoading();
    
    // Test with a simple weather call
    fetch(`${API_BASE_URL}/current.json?key=${key}&q=London`)
        .then(response => {
            hideLoading();
            if (response.ok) {
                API_KEY = key;
                localStorage.setItem('weatherApiKey', key);
                hideApiKeySection();
                showApiKeyStatus('API key saved successfully!', 'success');
                saveApiKeyBtn.classList.add('saved');
                saveApiKeyBtn.innerHTML = '<i class="fas fa-check"></i> Saved';
                
                // Try to get user's location after successful API key save
                setTimeout(() => {
                    getCurrentLocation();
                }, 1000);
            } else {
                throw new Error('Invalid API key');
            }
        })
        .catch(error => {
            hideLoading();
            showApiKeyStatus('Invalid API key. Please check and try again.', 'error');
            console.error('API key test failed:', error);
        });
}

function validateApiKeyFormat() {
    const key = apiKeyInput.value.trim();
    const isValid = key.length >= 20 && /^[a-zA-Z0-9]+$/.test(key);
    
    if (key.length === 0) {
        apiKeyInput.className = '';
    } else if (isValid) {
        apiKeyInput.className = 'valid';
    } else {
        apiKeyInput.className = 'invalid';
    }
    
    return isValid;
}

function toggleApiKeyVisibility() {
    const isPassword = apiKeyInput.type === 'password';
    apiKeyInput.type = isPassword ? 'text' : 'password';
    toggleApiKeyBtn.innerHTML = isPassword ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
}

function hideApiKeySection() {
    apiKeySection.classList.add('hidden');
    settingsFab.classList.remove('active');
    settingsFab.innerHTML = '<i class="fas fa-cog"></i>';
}

function showApiKeySection() {
    apiKeySection.classList.remove('hidden');
    settingsFab.classList.add('active');
    settingsFab.innerHTML = '<i class="fas fa-times"></i>';
}

function toggleSettingsPanel() {
    if (apiKeySection.classList.contains('hidden')) {
        showApiKeySection();
    } else {
        hideApiKeySection();
    }
}

function showApiKeyStatus(message, type) {
    // Remove existing status
    const existingStatus = document.querySelector('.api-key-status');
    if (existingStatus) {
        existingStatus.remove();
    }
    
    // Create new status
    const statusDiv = document.createElement('div');
    statusDiv.className = `api-key-status ${type}`;
    statusDiv.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
    
    apiKeySection.appendChild(statusDiv);
    
    // Auto-hide success messages
    if (type === 'success') {
        setTimeout(() => {
            if (statusDiv.parentNode) {
                statusDiv.remove();
            }
        }, 3000);
    }
}

function clearApiKey() {
    localStorage.removeItem('weatherApiKey');
    API_KEY = '';
    apiKeyInput.value = '';
    showApiKeySection();
    saveApiKeyBtn.classList.remove('saved');
    saveApiKeyBtn.innerHTML = '<i class="fas fa-save"></i> Save Key';
}

// Handle search button click
function handleSearch() {
    const location = locationInput.value.trim();
    if (!API_KEY) {
        showError('Please enter and save your API key first.');
        return;
    }
    if (location) {
        getWeatherByCity(location);
    }
}

// Get current user location
function getCurrentLocation() {
    if (!API_KEY) {
        showError('Please enter and save your API key first.');
        return;
    }
    
    if (navigator.geolocation) {
        showLoading();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherByCoords(lat, lon);
            },
            (error) => {
                hideLoading();
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        showError('Location access denied. Please enter a city name manually.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        showError('Location information unavailable. Please enter a city name manually.');
                        break;
                    case error.TIMEOUT:
                        showError('Location request timed out. Please enter a city name manually.');
                        break;
                    default:
                        showError('An unknown error occurred while retrieving location.');
                        break;
                }
            }
        );
    } else {
        showError('Geolocation is not supported by this browser. Please enter a city name manually.');
    }
}

// Get weather data by city name
async function getWeatherByCity(city) {
    showLoading();
    
    try {
        // Get current weather and forecast in one call
        const weatherUrl = `${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=6&aqi=yes&alerts=yes`;
        const response = await fetch(weatherUrl);
        
        if (!response.ok) {
            throw new Error(`City not found: ${city}`);
        }
        
        const data = await response.json();
        
        displayWeatherData(data);
        hideLoading();
        
    } catch (error) {
        hideLoading();
        showError(`Unable to fetch weather data for "${city}". Please check the city name and try again.`);
        console.error('Error fetching weather data:', error);
    }
}

// Get weather data by coordinates
async function getWeatherByCoords(lat, lon) {
    try {
        // Get current weather and forecast in one call
        const weatherUrl = `${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=6&aqi=yes&alerts=yes`;
        const response = await fetch(weatherUrl);
        const data = await response.json();
        
        displayWeatherData(data);
        hideLoading();
        
    } catch (error) {
        hideLoading();
        showError('Unable to fetch weather data for your location. Please try entering a city name manually.');
        console.error('Error fetching weather data:', error);
    }
}

// Display weather data
function displayWeatherData(data) {
    // Hide error message
    errorMessage.style.display = 'none';
    
    const current = data.current;
    const location = data.location;
    const forecast = data.forecast;
    
    // Update current weather
    cityName.textContent = `${location.name}, ${location.country}`;
    temperature.textContent = Math.round(current.temp_c);
    description.textContent = current.condition.text;
    
    // Update weather icon
    const iconCode = current.condition.code.toString();
    const iconClass = weatherIconMap[iconCode] || 'fas fa-sun';
    weatherIcon.className = iconClass;
    
    // Update weather details
    visibility.textContent = `${current.vis_km} km`;
    humidity.textContent = `${current.humidity}%`;
    windSpeed.textContent = `${current.wind_kph} km/h`;
    feelsLike.textContent = `${Math.round(current.feelslike_c)}°C`;
    pressure.textContent = `${current.pressure_mb} mb`;
    
    // Update UV index
    uvIndex.textContent = current.uv || 'N/A';
    
    // Update sunrise/sunset (from forecast astro data)
    const todayAstro = forecast.forecastday[0].astro;
    sunrise.textContent = todayAstro.sunrise;
    sunset.textContent = todayAstro.sunset;
    
    // Display forecast
    displayForecast(forecast);
    
    // Show weather card and forecast
    weatherCard.style.display = 'block';
    forecastSection.style.display = 'block';
}

// Display 5-day forecast
function displayForecast(forecast) {
    forecastContainer.innerHTML = '';
    
    // Skip today (index 0) and show next 5 days
    const forecastDays = forecast.forecastday.slice(1, 6);
    
    forecastDays.forEach(day => {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const maxTemp = Math.round(day.day.maxtemp_c);
        const minTemp = Math.round(day.day.mintemp_c);
        const iconCode = day.day.condition.code.toString();
        const iconClass = weatherIconMap[iconCode] || 'fas fa-sun';
        
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <i class="${iconClass} forecast-icon"></i>
            <div class="forecast-temps">
                <span class="forecast-high">${maxTemp}°</span>
                <span class="forecast-low">${minTemp}°</span>
            </div>
        `;
        
        forecastContainer.appendChild(forecastItem);
    });
}

// Show loading state
function showLoading() {
    loading.style.display = 'block';
    weatherCard.style.display = 'none';
    errorMessage.style.display = 'none';
    forecastSection.style.display = 'none';
}

// Hide loading state
function hideLoading() {
    loading.style.display = 'none';
}

// Show error message
function showError(message) {
    errorText.textContent = message;
    errorMessage.style.display = 'block';
    weatherCard.style.display = 'none';
    forecastSection.style.display = 'none';
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', init);
