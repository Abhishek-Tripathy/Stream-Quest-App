# Stream Quest App 📱

> A React Native (Expo) application featuring Interactive Video Learning and Offline HTML5 Games.

## 📋 Overview

Stream Quest is a technical demonstration app built with **React Native** and **Expo**. It showcases two core modules:
1.  **Video Learning**: An interactive video player that tests user knowledge with timed checkpoints.
2.  **Offline Games**: A downloadable game center where users can install and play HTML5 games offline.

This project demonstrates proficiency in mobile development, file system management, webview integration, and modern UI/UX practices.

## 📥 Download APK

**[Download Android APK](https://drive.google.com/file/d/1GvLjKcQvhGNtaq0L-osjmQH7lLrVzTbd/view?usp=drive_link)**

## ✨ Features

### 🎥 Interactive Video Learning
- **Custom Video Player**: Built on `expo-av`, featuring skip controls and progress tracking.
- **Checkpoints**: Videos automatically pause at specific timestamps (e.g., 60s) to present interactive questions.
- **Gamified Flow**: Users must answer correctly to proceed, reinforcing learning concepts.

### 🎮 Offline Games Module
- **Mock App Store**: Browse and "download" lightweight HTML5 games.
- **Offline Capability**: Games are saved locally using `expo-file-system` and can be played without an internet connection.
- **Bundled Games**:
    - **Whack-a-Mole**: A fast-paced arcade tapper.
    - **Memory Match**: A classic card-matching puzzle.
    - **Space Dodger**: An obstacle avoidance survival game.
- **Game Management**: Users can manage storage by deleting games they no longer play.

## 🛠 Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) (v0.76) via [Expo](https://expo.dev/) (SDK 52)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Video**: `expo-av`
- **Web Content**: `react-native-webview`
- **Storage/FS**: `expo-file-system`
- **Icons**: `expo-symbols` (SF Symbols) / `MaterialIcons`

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo Go app (on your physical device) OR Android Studio/Xcode (for simulators)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/stream-quest-app.git
    cd stream-quest-app
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the project**
    ```bash
    npx expo start
    ```

4.  **Run on Device**
    - Scan the QR code with the **Expo Go** app (Android/iOS).
    - Press `a` for Android Emulator or `i` for iOS Simulator.

## 🏛 Architecture & Design Decisions

### Single-File Game Architecture
To ensure reliable offline functionality within the Expo Go environment (which has limitations on unzipping files), games are architected as **self-contained HTML strings**.
- **Delivery**: Games are bundled or fetched as single strings.
- **Storage**: When a user "downloads" a game, the string is written to `FileSystem.documentDirectory` with a `.html` extension.
- **Execution**: The `WebView` loads the local file URI, ensuring 0ms network latency during play.

### Interactive Video Logic
The video player uses a `ref` to monitor playback status (`onPlaybackStatusUpdate`). Logic checks the current timestamp against a predefined array of "Checkpoints". When a match is found:
1.  Video pauses.
2.  Modal overlay appears with the question.
3.  Video resumes only upon a correct answer.

## 📂 Project Structure

```
app/
├── (tabs)/          # Main tab navigation (Video, Games)
│   ├── index.tsx    # Video Learning Home
│   └── games.tsx    # Offline Games Store
├── video/
│   └── [id].tsx     # Interactive Video Player Screen
├── game/
│   └── [id].tsx     # Offline Game Container (WebView)
└── _layout.tsx      # Root Layout & Theme Provider
constants/
├── bundledGames.ts  # Source code for HTML5 games
└── dummyData.ts     # Mock data for videos and game metadata
```


