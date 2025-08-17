# ⚠️ IMPORTANT: API Key Setup Required

This weather app requires a WeatherAPI.com API key to function. Follow these steps:

## 🔑 Getting Your API Key

1. Visit [WeatherAPI.com](https://www.weatherapi.com/pricing.aspx)
2. Sign up for a **FREE** account (1 million calls/month)
3. Get your API key from the dashboard

## ⚙️ Setting Up Your API Key

### Method 1: Direct Edit (Local Development Only)
1. Open `script.js`
2. Find line 2: `const API_KEY = 'YOUR_API_KEY_HERE';`
3. Replace `YOUR_API_KEY_HERE` with your actual API key
4. **⚠️ DO NOT commit this change to GitHub!**

### Method 2: Environment File (Recommended)
1. Create a file called `config.js` in the project root
2. Add your API key:
   ```javascript
   const CONFIG = {
       API_KEY: 'your_actual_api_key_here'
   };
   ```
3. Update `script.js` to use: `const API_KEY = CONFIG.API_KEY;`
4. Add `config.js` to `.gitignore` (already done)

## 🚀 Running the App

1. Set up your API key using one of the methods above
2. Open `index.html` in your web browser
3. Allow location access or search for a city
4. Enjoy real-time weather data!

## 🔒 Security Notes

- **Never commit API keys to version control**
- Your API key is for personal use only
- Keep your key secure and don't share it publicly
- If compromised, regenerate a new key on WeatherAPI.com

## 📝 For Contributors

If you're contributing to this project:
1. Get your own free API key from WeatherAPI.com
2. Set it up locally using the methods above
3. Never include API keys in pull requests
