// api/weather.js
// Vercel Serverless Function
// This runs on Vercel's servers, so the API key is never exposed to the browser.

export default async function handler(req, res) {
    // Allow requests from any origin (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured on server.' });
    }

    // Rouse Hill, NSW coordinates
    const lat = '-33.6836';
    const lon = '150.9108';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Return only the fields we need
        res.status(200).json({
            temp: Math.round(data.main.temp),
            feels_like: Math.round(data.main.feels_like),
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            wind_speed: data.wind.speed,
            humidity: data.main.humidity,
            location: data.name
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data.' });
    }
}
