# Contributing to "Mark: Know Jesus" 🤝

Thank you for your interest in helping improve this Bible learning application! This project is open-source and welcomes contributions from the community. Below is a guide on how you can contribute.

---

## 💡 Contribution Ideas

Here are some excellent features and areas where you can help expand the application:

### 1. Populate Chapters 2–16 Content
Currently, only **Mark Chapter 1** is fully developed. You can write the content files for the remaining 15 chapters of Mark.
- Open [data.js](data.js) and search for the chapter number you wish to add.
- Follow the exact data structure established in `CHAPTERS_DATA[1]`, `QUIZZES_DATA[1]`, and `GAMES_DATA[1]` to populate:
  - Chapter summaries and historical contexts.
  - Detailed bullet lists explaining key events, teachings, characteristics of Jesus, and practical lessons.
  - 10 quiz questions (with four options, the correct answer, and an explanation of the context).
  - Reinforcement game data (Who Said It, Who Am I, What Happened Next, Match, Scrambled Order, and True/False).

### 2. Add Dark Mode Toggle
Create a soothing dark theme (using deep navy and soft gray background colors) for reading scriptures at night.
- Add a theme toggle button in the header inside `index.html`.
- Create a dark theme stylesheet or togglable classes in `style.css`.
- Save the user's preference in `localStorage` inside `app.js`.

### 3. Progressive Web App (PWA) Offline Access
Make the app fully installable on mobile phones and functional without internet access.
- Add a `manifest.json` file.
- Register a simple service worker (`sw.js`) to cache the HTML, CSS, and JS files so they work offline.

### 4. Audio Narration (Read-Aloud)
Integrate a simple text-to-speech or audio player widget so users can listen to the summaries and key verses being read aloud.

### 5. Multi-Book Expansion
Restructure the code so that other books of the Bible (such as the Gospel of John, or the Book of Acts) can be easily plugged in using the same engine.

---

## 🛠️ How to Submit Changes

1. **Fork the Repository** on GitHub.
2. **Clone the Fork** to your local machine:
   ```bash
   git clone https://github.com/your-username/Mark_book.git
   ```
3. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Commit Your Changes** with descriptive messages:
   ```bash
   git commit -m "Add summary and quiz for Mark Chapter 2"
   ```
5. **Push to the Branch**:
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request** on the original repository on GitHub, describing the changes you made and what they accomplish.
