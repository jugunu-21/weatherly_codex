# Weatherly Codex

A modern, responsive weather application built with React and TypeScript that provides real-time weather information and forecasts for any city worldwide.

🌐 **Live Demo:** [https://weatherly-codexai.vercel.app/](https://weatherly-codexai.vercel.app/)

## Features

- 🌍 Real-time weather data for any city
- 📍 Automatic location detection
- 🔄 Recent search history with live updates
- 🌡️ Temperature unit toggle (Celsius/Fahrenheit)
- 🎨 Modern, responsive UI with glassmorphism design
- 📱 Mobile-friendly interface
- 🔍 Search suggestions and error handling
- 📊 Detailed weather conditions (temperature, wind speed, humidity, air quality)
- 📅 Weather forecast

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or Yarn package manager

## Installation

1. Clone the repository:
```bash
git https://github.com/jugunu-21/weatherly_codex
cd weatherly_codex
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Weather API key:
```env
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Technologies Used

- ⚛️ React 18
- 📝 TypeScript
- 🎨 TailwindCSS
- ⚡ Vite
- 🔄 React Query
- 💾 Local Storage for persistence
- 🌐 Weather API integration

## Project Structure

```
src/
├── components/     # React components
├── context/        # React context providers
├── utils/          # Utility functions
├── assets/         # Static assets
└── App.tsx         # Main application component
```

## Features in Detail

### Current Location Detection
Users can fetch weather data for their current location with a single click using the location detection feature.

### Recent Searches
The application maintains a history of recent searches, allowing users to quickly access previously viewed locations.

### Temperature Unit Toggle
Users can switch between Celsius and Fahrenheit temperature units, with the preference being persisted across sessions.

### Weather Information
- Current temperature
- Weather condition with icon
- Wind speed
- Humidity levels
- Air quality index
- Weather forecast

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Weather data provided by WeatherAPI.com
- Icons and design inspiration from various sources
