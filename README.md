# 🎬 Movie-AI (AI Movie Recommender)

## 📚 Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Integration](#api-integration)
  - [OMDB API](#omdb-api)
  - [OpenAI API](#openai-api)
- [Usage](#usage)
- [Customization](#customization)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎥 Introduction

AI Movie Recommender is a cutting-edge web application that harnesses the power of artificial intelligence to suggest movies based on user preferences. It offers personalized movie recommendations and showcases popular films on the home page, creating an engaging and interactive movie discovery experience.

## ✨ Features

- 🧠 Personalized movie recommendations based on mood, genre, and streaming platform
- 🏆 Display of popular movies on the home page
- 📊 Detailed movie information including plot, cast, and ratings
- 📱 Responsive design for seamless experience across various devices
- 🎨 Modern and visually appealing user interface

## 🛠️ Prerequisites

Before you embark on your movie recommendation journey, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or later) 🟢
- [npm](https://www.npmjs.com/) (usually comes with Node.js) 📦

## 🚀 Installation

1. Clone the repository:
   ```
   git clone https://github.com/iad1tya/Movie-AI
   cd Movie-AI
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your API keys:
   ```
   OMDB_API_KEY=your_omdb_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## 🔌 API Integration

### 🎞️ OMDB API

1. Sign up for a free API key at [OMDB API](http://www.omdbapi.com/apikey.aspx).
2. Replace `YOUR_OMDB_API_KEY` in `public/script.js` with your actual API key.

Example usage in `script.js`:
```javascript
async function getMovieDetails(title) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=YOUR_OMDB_API_KEY&t=\${encodeURIComponent(title)}`);
    // ... rest of the function
}
```

### 🤖 OpenAI API

1. Sign up for an API key at [OpenAI](https://beta.openai.com/signup/).
2. Add your OpenAI API key to the `.env` file as shown in the Installation section.

Create a new file `routes/recommend.js`:

```javascript
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/api/recommend', async (req, res) => {
  try {
    const { mood, genre, platform } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Suggest a movie based on the following criteria:
        Mood: \${mood}
        Genre: \${genre}
        Streaming Platform: \${platform}
        Provide the movie title only.`,
      max_tokens: 60,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    const recommendation = completion.data.choices[0].text.trim();
    res.json({ recommendation });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to get movie recommendation' });
  }
});

module.exports = router;
```

## 🎮 Usage

1. Start the server:
   ```
   node server.js
   ```

2. Open your browser and navigate to `http://localhost:3000`.

3. Enter your mood, preferred genre, and streaming platform in the form.

4. Click "Get Recommendation" to receive a personalized movie suggestion.

5. Explore popular movies displayed on the home page.

## 🎨 Customization

### 🌈 Changing Colors

To modify the color scheme, edit the CSS variables in `public/styles.css`:

```css
:root {
    --primary-color: #FF4B2B;
    --secondary-color: #FF416C;
    --background-color: #1A1A2E;
    --text-color: #FFFFFF;
    --card-bg-color: #16213E;
    --input-bg-color: #0F3460;
}
```

### 📐 Modifying Layout

To change the layout, edit the HTML structure in `public/index.html` and adjust the corresponding CSS in `public/styles.css`.

### 🆕 Adding New Features

To add new features:

1. Modify the HTML in `public/index.html` to include new elements.
2. Add corresponding styles in `public/styles.css`.
3. Implement new functionality in `public/script.js`.
4. If needed, create new API routes in `server.js` or add to existing routes.

## 🚀 Deployment

To deploy the AI Movie Recommender:

1. Choose a hosting platform (e.g., Heroku, Vercel, or Netlify).
2. Follow the platform's deployment instructions for Node.js applications.
3. Set up environment variables for your API keys on the hosting platform.
4. Deploy your application.

For GitHub Pages deployment:

1. Move the OpenAI API call to a serverless function (e.g., using Vercel Functions or Netlify Functions).
2. Update the frontend code to call this serverless function instead of the local API route.
3. Follow GitHub Pages deployment instructions in your repository settings.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
