<div id="toc">
    <ul align="center" style="list-style: none">
        <summary>
        <h1>Svelma</h1>
        </summary>
    </ul>
</div>

<div align="center">
  <p>
    <img src="https://img.shields.io/netlify/136cd7e3-2267-42ea-91c9-8c564580c8d1?label=Netlify%20Deploy&logo=netlify&color=00C7B7" alt="Netlify Deploy">
    <img src="https://img.shields.io/badge/SvelteKit-v2.20.5-ff3e00" alt="SvelteKit">
    <img src="https://img.shields.io/badge/Svelte-v5.26.2-ff3e00" alt="Svelte">
  </p>
</div>

---

**Svelma** is a movie app built with SvelteKit and powered by the TMDb (The Movie Database) API. It provides a dynamic and interactive interface to explore movies, actors, and more.

## Features

- Browse popular movies.
- View detailed information about movies, including cast.
- Search for movies using the TMDb API.
- Responsive design for a seamless experience on all devices.

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Shuudy/b3-svelma.git
   cd b3-svelma
   ```

2. **Copy the `.env.example` file and configure the environment**

   ```bash
   cp .env.example .env
   ```

   Open the `.env` file and insert your TMDB API key:

   ```
   VITE_TMDB_API_KEY=your_tmdb_api_key
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**

   ```bash
   npm run build
   ```

6. **Preview the production build**
   ```bash
   npm run preview
   ```

---

> This project is powered by [SvelteKit](https://svelte.dev/docs/kit/introduction) and uses the [TMDb API](https://developer.themoviedb.org/docs/getting-started) for data.
