export const TOPICS = [
  {
    id: "1",
    title: "Nature Documentary",
    description: "Big Buck Bunny - 3D Animation Basics.",
    thumbnail:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    questions: [
      {
        time: 60,
        question: "What is the main character doing at the start?",
        options: ["Sleeping", "Eating berries", "Running", "Building a nest"],
        correctAnswer: "Sleeping",
      },
      {
        time: 120,
        question: "What creatures does Big Buck Bunny encounter first?",
        options: ["Birds", "Butterflies", "Three rodents", "Bees"],
        correctAnswer: "Butterflies",
      },
      {
        time: 180,
        question: "What do the three bullies do to the butterfly?",
        options: ["Chase it away", "Kill it", "Capture it", "Ignore it"],
        correctAnswer: "Kill it",
      },
      {
        time: 240,
        question: "How does Big Buck Bunny react to the butterfly's death?",
        options: [
          "He ignores it",
          "He gets angry and seeks revenge",
          "He cries",
          "He runs away",
        ],
        correctAnswer: "He gets angry and seeks revenge",
      },
      {
        time: 300,
        question: "What does Big Buck Bunny use to catch the chinchilla?",
        options: ["A net", "His hands", "A trap", "A rope"],
        correctAnswer: "A trap",
      },
      {
        time: 360,
        question: "What happens to the flying squirrel?",
        options: [
          "He escapes",
          "He gets hit by thrown objects",
          "He apologizes",
          "He flies away safely",
        ],
        correctAnswer: "He gets hit by thrown objects",
      },
      {
        time: 420,
        question: "What does Big Buck Bunny throw at the rodents?",
        options: ["Rocks", "Apples and nuts", "Sticks", "Water"],
        correctAnswer: "Apples and nuts",
      },
      {
        time: 480,
        question: "How many bullies are there in total?",
        options: ["Two", "Three", "Four", "Five"],
        correctAnswer: "Three",
      },
      {
        time: 540,
        question: "What is the tone of Big Buck Bunny's revenge?",
        options: [
          "Violent and serious",
          "Cartoonish and comedic",
          "Sad and emotional",
          "Peaceful",
        ],
        correctAnswer: "Cartoonish and comedic",
      },
      {
        time: 596,
        question: "What is the overall message of the film?",
        options: [
          "Revenge is sweet",
          "Don't bully others",
          "Nature is beautiful",
          "Friendship matters",
        ],
        correctAnswer: "Don't bully others",
      },
    ],
  },
  {
    id: "2",
    title: "Surrealist Cinema",
    description: "Elephants Dream - Abstract storytelling.",
    thumbnail:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    questions: [
      {
        time: 60,
        question: "How many main characters are in the film?",
        options: ["One", "Two", "Three", "Four"],
        correctAnswer: "Two",
      },
      {
        time: 120,
        question: "What is the name of the older character?",
        options: ["Emo", "Proog", "The Machine", "Elder"],
        correctAnswer: "Proog",
      },
      {
        time: 180,
        question: "What is the world they are exploring called?",
        options: ["The Dream", "The Machine", "The Factory", "The Void"],
        correctAnswer: "The Machine",
      },
      {
        time: 240,
        question: "What is Proog's attitude toward 'The Machine'?",
        options: [
          "He fears it",
          "He believes in it deeply",
          "He wants to destroy it",
          "He ignores it",
        ],
        correctAnswer: "He believes in it deeply",
      },
      {
        time: 300,
        question: "How does Emo react to Proog's beliefs?",
        options: [
          "He agrees completely",
          "He is skeptical and questioning",
          "He is excited",
          "He is indifferent",
        ],
        correctAnswer: "He is skeptical and questioning",
      },
      {
        time: 360,
        question: "What kind of environment dominates the visual style?",
        options: [
          "Natural forest",
          "Mechanical/industrial",
          "Underwater",
          "Desert",
        ],
        correctAnswer: "Mechanical/industrial",
      },
      {
        time: 420,
        question: "What is the relationship between Proog and Emo?",
        options: ["Brothers", "Mentor and student", "Enemies", "Strangers"],
        correctAnswer: "Mentor and student",
      },
      {
        time: 480,
        question: "What does the environment do throughout the film?",
        options: [
          "Stays the same",
          "Constantly changes and shifts",
          "Disappears",
          "Becomes colorful",
        ],
        correctAnswer: "Constantly changes and shifts",
      },
      {
        time: 540,
        question: "What theme is central to the film?",
        options: ["Love", "Reality vs perception", "War", "Technology"],
        correctAnswer: "Reality vs perception",
      },
      {
        time: 640,
        question: "What style best describes this film?",
        options: ["Realistic", "Comedic", "Surreal/Abstract", "Documentary"],
        correctAnswer: "Surreal/Abstract",
      },
    ],
  },
];

export const GAMES = [
  {
    id: 'g1',
    name: 'Whack-a-Mole (Offline)',
    description: 'Tap the moles before they hide!',
    icon: 'https://cdn-icons-png.flaticon.com/512/7205/7205615.png',
    downloadUrl: 'bundled://game1', 
  },
  {
    id: 'g2',
    name: 'Memory Match (Offline)',
    description: 'Find the matching pairs.',
    icon: 'https://cdn-icons-png.flaticon.com/512/616/616490.png',
    downloadUrl: 'bundled://game2',
  },
  {
    id: 'g3',
    name: 'Space Dodger (Offline)',
    description: 'Avoid the falling asteroids!',
    icon: 'https://cdn-icons-png.flaticon.com/512/3205/3205128.png', 
    downloadUrl: 'bundled://game3',
  }
];
