# i-am-music

**i-am-music** is a web application that allows users to provide annotations and interpretations of song lyrics, as well as explore information about albums, songs, and artists. The project leverages AI capabilities to analyze lyrics and generate detailed line-by-line annotations, helping users dive deeper into the hidden meanings behind the songs.

## Tech Stack

- **Backend**: Nest.js
- **Database**: MongoDB
- **Frontend**: React.js
- **Lyrics/API Sources**: Genius API
- **AI for annotations**: OpenAI API
- **Deployment**: Vercel (frontend), Railway.com(backend)

## Installation and Launch Instructions

### 1. Clone the repository:

```bash
git clone https://github.com/yourusername/i-am-music.git
```

### 2. Set up the Frontend (React.js):

- Navigate to the frontend folder:

- Install dependencies:

```bash
npm install
```

- Start the frontend:

```bash
npm run dev
```

Your application will now be available at `http://localhost:5173`.

## Design and Development Process

During the planning phase, I spent significant time choosing the best data sources for song information and lyrics.  
Ultimately, I decided to use two sources:

1. **Genius API** — One of the most popular databases for lyrics and artist information.
2. A second lyrics source, to complement the data.

I wrote a Python script to scrape and gather the data, then uploaded it into MongoDB.  
I chose this approach to ensure faster data access and avoid relying on external APIs during runtime, considering this is a pet project.

## Unique Approaches and Methodologies

- **MongoDB storage**: Storing all lyrics and metadata in MongoDB provides flexibility and speeds up API responses.
- **OpenAI API integration**: Instead of manually writing annotations, I integrated OpenAI's API to automatically generate high-quality line-by-line interpretations.
- **Separated Backend and Frontend**: Keeping them in separate repositories allowed for better scalability, modularity, and easier deployments.

## Trade-offs Made During Development

- **Storing data in own database**: Instead of dynamically fetching from APIs at runtime, I chose to pre-load lyrics into the database for speed and simplicity, accepting that the database might get outdated over time.
- **Using OpenAI for interpretations**: While creating a custom NLP model could provide more control, OpenAI’s API offered a faster and more efficient solution for generating meaningful annotations within the limited time.

## Known Issues and Problems

- Sometimes AI-generated annotations might be too generic or slightly off-topic depending on the input.
- Under high load, some synchronization issues between the backend and frontend might occur since caching has not been fully implemented yet.

## Why This Tech Stack?

- **Nest.js**: Chosen for its structure, scalability, and powerful TypeScript support, ideal for building a robust backend API.
- **MongoDB**: Flexible, easy to scale, and a great fit for storing varying song/artist data structures.
- **React.js**: Allows building interactive, dynamic user interfaces quickly with efficient state management.
- **OpenAI API**: Provides high-quality NLP capabilities out of the box, enabling fast development of the lyric annotation feature without needing to build custom models.

## Video Demo

[Link to video demo](https://your-video-link.com)
