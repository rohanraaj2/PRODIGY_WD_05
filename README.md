# Weather App 🌤️

A responsive weather application that fetches real-time weather data from the WeatherAPI.com API. Users can search for weather information by city name or use their current location.

## Features

- 🌍 **Location-based Weather**: Get weather for your current location
- 🔍 **City Search**: Search weather by city name
- 📊 **Detailed Information**: Temperature, humidity, wind speed, pressure, visibility, and more
- 🌅 **Sunrise/Sunset Times**: View sunrise and sunset times
- 📅 **5-Day Forecast**: Extended weather forecast
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean and intuitive interface with smooth animations
- 🌬️ **Air Quality**: Air quality index information
- ⚡ **Weather Alerts**: Real-time weather alerts and warnings

## Screenshot

![Weather App Screenshot](screenshot.png)

## Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with modern features like Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Dynamic functionality and API integration
- **WeatherAPI.com**: Weather data source (1 million calls/month FREE!)
- **Font Awesome**: Icons
- **Geolocation API**: Current location detection

## Setup Instructions

### 1. Get API Key

1. Visit [WeatherAPI.com](https://www.weatherapi.com/pricing.aspx)
2. Sign up for a **FREE** account (1 million calls/month!)
3. Get your API key from the dashboard

### 2. Configure the Application

**⚠️ IMPORTANT: See [API_SETUP.md](API_SETUP.md) for detailed setup instructions**

1. Clone or download this repository
2. Get your free API key from [WeatherAPI.com](https://www.weatherapi.com/pricing.aspx)
3. Open `script.js`
4. Replace `YOUR_API_KEY_HERE` with your actual WeatherAPI.com API key:
   ```javascript
   const API_KEY = 'your_actual_api_key_here';
   ```
5. **⚠️ SECURITY**: Never commit your API key to GitHub! Keep it local only.

### 3. Run the Application

1. Open `index.html` in your web browser
2. Allow location access when prompted (optional)
3. Start searching for weather information!

## Usage

### Current Location
- Click the location button (📍) to get weather for your current location
- Grant location permission when prompted by the browser

### Search by City
- Enter a city name in the search box
- Click the search button (🔍) or press Enter
- View detailed weather information and 5-day forecast

## Weather Information Displayed

### Current Weather
- Current temperature
- Weather description and icon
- "Feels like" temperature
- Humidity percentage
- Wind speed
- Atmospheric pressure
- Visibility distance
- UV Index (when available)
- Sunrise and sunset times

### 5-Day Forecast
- Daily high and low temperatures
- Weather icons and conditions
- Day of the week

## File Structure

```
weather-app/
├── index.html          # Main HTML file
├── style.css           # CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This file
└── LICENSE             # License file
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## API Information

This application uses the WeatherAPI.com endpoints:
- Current Weather Data API
- Weather Forecast API (5 days)
- Air Quality API
- Astronomy API (sunrise/sunset)
- Weather Alerts API

**Free Tier Benefits:**
- ✅ **1 million calls per month**
- ✅ **Real-time weather data**
- ✅ **5-day forecast**
- ✅ **Air quality index**
- ✅ **Weather alerts**
- ✅ **Astronomy data**

## Error Handling

The application handles various error scenarios:
- Invalid city names
- Network connectivity issues
- Location access denied
- API rate limiting
- Missing API key

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Design inspiration from modern weather applications

## Troubleshooting

### Common Issues

1. **"Please set your API key" error**
   - Make sure you've replaced `YOUR_API_KEY_HERE` with your actual API key

2. **Location not working**
   - Ensure you're accessing the site via HTTPS (required for geolocation)
   - Check browser permissions for location access

3. **City not found**
   - Check spelling of the city name
   - Try including country code (e.g., "London, UK")

4. **No weather data**
   - Check internet connection
   - Verify API key is valid and active
   - Check browser console for error messages

### Development

To run this project in development:

1. Use a local server (e.g., Live Server extension in VS Code)
2. Ensure HTTPS for geolocation features
3. Monitor browser console for debugging

## Future Enhancements

- Weather maps integration
- Weather alerts and notifications
- Historical weather data
- Weather radar
- Multiple location favorites
- Unit conversion (Celsius/Fahrenheit)
- Dark mode toggle
