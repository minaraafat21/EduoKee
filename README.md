# EduoKee

EduoKee is a **lyrical learning platform** that merges entertainment with education to enhance language learning. It helps users improve their pronunciation and accent through interactive music-based exercises.

## 🌟 Features

- **User Authentication:** Secure login for personalized experiences.
- **Spotify Integration:** Fetch saved playlists and liked songs directly from Spotify.
- **Music Player:** 30-second track playback powered by Spotify API.
- **Lyric Fetching:** Get song lyrics from the Lyrics.ovh API.
- **Speech-to-Text Conversion:** Record your singing and convert it to text using Google Cloud Speech API.
- **Scoring Algorithm:** Compare your singing with the original lyrics using Levenshtein Distance to score out of 100.
- **Word Search:** Clickable lyrics for quick definitions and pronunciations via Google.
- **Mobile-Friendly:** Optimized for both desktop and mobile views.

## 🚀 Technologies Used

- **React JS** - Front-end framework for dynamic UI.
- **Node JS** - Back-end environment for server-side operations.
- **Spotify Web API** - To fetch user playlists and song data.
- **Google Cloud Speech API** - For accurate speech recognition.
- **Lyrics.ovh API** - To fetch lyrics of songs.
- **Hosting:** Namecheap domain & GitHub Pages.

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/minaraafat21/EduoKee.git
   cd EduoKee
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   - Configure Spotify and Google Cloud credentials in an `.env` file.

4. **Run the development server:**
   ```bash
   npm start
   ```
   Visit [http://localhost:3000](http://localhost:3000) to explore EduoKee.

## 📊 Scoring Algorithm

- **Levenshtein Distance:** Measures the difference between the user's input and the original lyrics.
- **Score Calculation:** Outputs a similarity score out of 100.

## ⚡ Challenges & Learning Outcomes

- **React Mastery:** Gained hands-on experience with React for dynamic UI development.
- **Deployment Experience:** First-time deploying on GitHub Pages with Namecheap integration.
- **Spotify API Constraints:** Limited to developer accounts in development mode.

## 📈 Future Enhancements

- Full Spotify API integration for public users.
- Advanced speech analysis features.
- Enhanced UI/UX for better engagement.

## 🌍 Live Demo

Check out EduoKee: [https://eduokee.me](https://eduokee.me)

## 🤝 Contributing

Contributions are welcome! Please fork the repo, create a feature branch, and submit a pull request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

*EduoKee - Where Music Meets Language Learning!*
