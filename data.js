// Stores the learning modules for Chapters 1-16. Community contributors can add content structures for later chapters here.
const CHAPTERS_DATA = {
  1: {
    id: 1,
    title: "Jesus Begins His Ministry",
    summary: "Mark 1 introduces John the Baptist preparing the way, the baptism and wilderness temptation of Jesus, the calling of the first four disciples (Simon, Andrew, James, and John), and Jesus' early ministry of powerful preaching, healing, and casting out demons in Capernaum and throughout Galilee.",
    context: "The Gospel of Mark starts quickly, without a birth narrative. Written likely for Roman Christians facing persecution, it emphasizes Jesus as the active, powerful Son of God and the suffering Servant. Chapter 1 sets a rapid, urgent pace, repeatedly using the Greek word 'euthys' (translated as 'immediately' or 'at once').",
    keyEvents: [
      { title: "John the Baptist Prepares the Way", desc: "John preaches repentance and baptizes in the wilderness, pointing to one mightier than he who will baptize with the Holy Spirit." },
      { title: "Baptism of Jesus", desc: "Jesus is baptized by John in the Jordan River. The Holy Spirit descends like a dove, and God the Father declares Him as His beloved Son." },
      { title: "Temptation in the Wilderness", desc: "The Spirit drives Jesus into the wilderness for 40 days, where He is tempted by Satan, surrounded by wild beasts, and ministered to by angels." },
      { title: "Jesus Begins Preaching", desc: "After John is arrested, Jesus enters Galilee proclaiming the good news of God: 'The time is fulfilled, and the kingdom of God is at hand; repent and believe in the gospel.'" },
      { title: "Calling of the First Disciples", desc: "By the Sea of Galilee, Jesus calls fishermen Simon and Andrew, then James and John. They immediately leave their nets, boats, and families to follow Him." },
      { title: "Authority in Capernaum", desc: "Jesus teaches in the Capernaum synagogue with absolute authority, causing amazement, and commands an unclean spirit to leave a possessed man." },
      { title: "Healing Many in Capernaum", desc: "Jesus heals Simon's mother-in-law of a high fever. That evening, the whole town gathers, and Jesus heals many sick and drives out demons." },
      { title: "Withdrawal to Pray", desc: "Very early in the morning, Jesus goes to a desolate place to pray. When the disciples track Him down, He tells them they must preach in other towns too." },
      { title: "Cleansing a Leper", desc: "A man with leprosy begs Jesus for help. Filled with compassion, Jesus touches and cleanses him, telling him to show himself to the priest but to keep quiet. Instead, the man spreads the news widely." }
    ],
    people: [
      { name: "Jesus", desc: "The Son of God and Messiah, who preaches the Kingdom, commands spirits, heals the sick, and calls disciples to follow Him." },
      { name: "John the Baptist", desc: "A prophet who lived in the wilderness, wore camel's hair, and baptized people, preparing their hearts for Jesus." },
      { name: "Simon (Peter)", desc: "A fisherman called by Jesus by the Sea of Galilee. Jesus heals his mother-in-law in Capernaum." },
      { name: "Andrew", desc: "Simon's brother and fellow fisherman. He immediately left his nets to follow Jesus." },
      { name: "James", desc: "Son of Zebedee, a fisherman who left his boat and father along with his brother John to follow Jesus." },
      { name: "John", desc: "Brother of James and son of Zebedee. One of the first four disciples called by Jesus." },
      { name: "The Leper", desc: "An outcast with a dread skin disease who approached Jesus with faith, saying, 'If you will, you can make me clean,' and was instantly healed." }
    ],
    places: [
      { name: "Jordan River", desc: "The river where John the Baptist baptized repentant sinners and where Jesus was baptized and confirmed by the Father." },
      { name: "Wilderness", desc: "A desolate area where John preached, and where Jesus spent 40 days resisting Satan's temptations." },
      { name: "Galilee", desc: "The northern region of Israel where Jesus grew up and spent the majority of His early public ministry." },
      { name: "Sea of Galilee", desc: "A large freshwater lake where Jesus called Simon, Andrew, James, and John while they were fishing." },
      { name: "Capernaum", desc: "A lakeside town in Galilee that became Jesus' primary ministry base. He taught in its synagogue and healed at Simon's house." }
    ],
    lessons: [
      "Preparation is vital: God sent John to prepare hearts, reminding us to prepare our own hearts for God's work.",
      "Jesus calls us to immediate obedience: The first disciples dropped their nets immediately, showing that following Jesus takes priority over comfort and business.",
      "Jesus is our ultimate authority: He has authority over teaching, unclean spirits, sickness, and physical distance.",
      "Prayer must be our priority: Despite being incredibly busy and in high demand, Jesus woke up early and went to a quiet place to connect with His Father.",
      "Compassion drives service: Jesus was willing to touch an 'untouchable' leper because He cared deeply for his suffering."
    ],
    applications: [
      "Am I willing to leave my personal 'nets' (comfort, distractions, plans) to follow Jesus when He calls?",
      "Do I acknowledge Jesus' authority in my daily choices, trusting His words above my fears?",
      "How can I restructure my schedule to make quiet, early morning or dedicated prayer a priority like Jesus did?",
      "Is there someone 'untouchable' or marginalized in my life whom I can show Christ-like compassion to this week?"
    ],
    verses: [
      { ref: "Mark 1:15", text: "\"The time is fulfilled, and the kingdom of God is at hand; repent and believe in the gospel.\"", note: "Jesus' first recorded message in Mark, outlining the arrival of God's reign and our double response: turn from sin and trust the good news." },
      { ref: "Mark 1:17", text: "And Jesus said to them, \"Follow me, and I will make you become fishers of men.\"", note: "A call to relationship (\"Follow me\") and a promise of transformation for service (\"I will make you fishers of men\")." },
      { ref: "Mark 1:35", text: "And rising very early in the morning, while it was still dark, he departed and went out to a desolate place, and there he prayed.", note: "Highlights the necessity of solitary prayer in the life of Jesus, pointing us to seek intimate fellowship with God away from distractions." }
    ],
    timeline: [
      { label: "John's Prep", time: "Mark 1:1-8", desc: "John preaches repentance and foretells the Messiah." },
      { label: "Baptism", time: "Mark 1:9-11", desc: "Jesus baptized; Father speaks; Spirit descends." },
      { label: "Temptation", time: "Mark 1:12-13", desc: "Driven into wilderness for 40 days, resisting Satan." },
      { label: "Preaching", time: "Mark 1:14-15", desc: "Jesus proclaims: 'Repent and believe the gospel!'" },
      { label: "Disciples Called", time: "Mark 1:16-20", desc: "Simon, Andrew, James, and John leave their nets." },
      { label: "Demoniac Healed", time: "Mark 1:21-28", desc: "In Capernaum synagogue, Jesus casts out an evil spirit." },
      { label: "Peter's Mother-in-Law", time: "Mark 1:29-31", desc: "Jesus heals her fever; she begins serving them." },
      { label: "Many Healed", time: "Mark 1:32-34", desc: "At sunset, Jesus heals the town's sick and possessed." },
      { label: "Quiet Prayer", time: "Mark 1:35-39", desc: "Prays early in a solitary place; plans Galilee tour." },
      { label: "Leper Cleansed", time: "Mark 1:40-45", desc: "Touches and heals a leper; news spreads everywhere." }
    ],
    connectionToNext: "Having established His authority through preaching, casting out demons, and healing physical diseases in Mark 1, Jesus will face growing controversy in Mark 2. There, His authority will be challenged on deeper spiritual and religious levels: His authority to forgive sins, His choice of companions (tax collectors), and His interpretation of the Sabbath."
  },
  2: { id: 2, title: "Authority to Forgive & Sabbath controversy", locked: true },
  3: { id: 3, title: "The Twelve Called & Unpardonable Sin", locked: true },
  4: { id: 4, title: "Parables of the Kingdom & Stilling the Storm", locked: true },
  5: { id: 5, title: "Gerasene Demoniac, Jairus' Daughter & Healed Woman", locked: true },
  6: { id: 6, title: "Rejection at Nazareth & Feeding 5,000", locked: true },
  7: { id: 7, title: "Clean and Unclean & Faith of a Gentile Woman", locked: true },
  8: { id: 8, title: "Feeding 4,000, Peter's Confession & Take Up Your Cross", locked: true },
  9: { id: 9, title: "The Transfiguration & Healing a Boy with a Spirit", locked: true },
  10: { id: 10, title: "Teachings on Divorce, Wealth & Request of James and John", locked: true },
  11: { id: 11, title: "Triumphal Entry, Temple Cleansing & Withered Fig Tree", locked: true },
  12: { id: 12, title: "Parable of Tenants, Great Commandments & Widow's Offering", locked: true },
  13: { id: 13, title: "The Olivet Discourse & Signs of the End", locked: true },
  14: { id: 14, title: "Anointing, Lord's Supper, Gethsemane & Peter's Denial", locked: true },
  15: { id: 15, title: "Trial Before Pilate, Crucifixion & Burial", locked: true },
  16: { id: 16, title: "The Resurrection & Great Commission", locked: true }
};

const QUIZZES_DATA = {
  1: [
    {
      id: 1,
      type: "mc", // multiple choice
      question: "Who was sent as a messenger in the wilderness to prepare the way for Jesus?",
      options: ["Elijah", "John the Baptist", "Moses", "King Herod"],
      answer: "John the Baptist",
      explanation: "Mark 1:2-4 shows John the Baptist fulfilling the prophecy of Isaiah, preaching a baptism of repentance in the wilderness."
    },
    {
      id: 2,
      type: "mc",
      question: "With what did John the Baptist say the One who comes after him would baptize people?",
      options: ["Fire", "Water", "The Holy Spirit", "Oil"],
      answer: "The Holy Spirit",
      explanation: "John baptized with water, but in Mark 1:8, he declares that Jesus will baptize them with the Holy Spirit."
    },
    {
      id: 3,
      type: "mc",
      question: "What did the voice from heaven say when Jesus was baptized in the Jordan River?",
      options: [
        "\"Behold the Lamb of God!\"",
        "\"This is the Prophet foretold of old.\"",
        "\"You are my beloved Son; with you I am well pleased.\"",
        "\"Hear Him, for He is King!\""
      ],
      answer: "\"You are my beloved Son; with you I am well pleased.\"",
      explanation: "In Mark 1:11, as Jesus comes out of the water, the Father speaks from heaven declaring His divine Sonship and delight."
    },
    {
      id: 4,
      type: "mc",
      question: "How long did Jesus stay in the wilderness, being tempted by Satan?",
      options: ["40 days", "7 days", "12 days", "40 weeks"],
      answer: "40 days",
      explanation: "Mark 1:13 states Jesus was in the wilderness forty days, being tempted by Satan, surrounded by wild animals, while angels served Him."
    },
    {
      id: 5,
      type: "mc",
      question: "Who were the first two disciples Jesus called by the Sea of Galilee?",
      options: ["James and John", "Simon and Andrew", "Philip and Bartholomew", "Thomas and Matthew"],
      answer: "Simon and Andrew",
      explanation: "Mark 1:16 records Jesus walking by the Sea of Galilee and seeing Simon and Andrew casting a net, calling them to follow Him."
    },
    {
      id: 6,
      type: "tf", // true/false
      question: "James and John immediately left their father Zebedee in the boat with the hired servants to follow Jesus.",
      options: ["True", "False"],
      answer: "True",
      explanation: "In Mark 1:20, when Jesus called them, they immediately left their father Zebedee in the boat with the hired servants and followed Him."
    },
    {
      id: 7,
      type: "mc",
      question: "In which city's synagogue did Jesus cast out an unclean spirit, demonstrating His teaching authority?",
      options: ["Nazareth", "Jerusalem", "Capernaum", "Bethsaida"],
      answer: "Capernaum",
      explanation: "In Mark 1:21-26, Jesus enters Capernaum on the Sabbath, teaches in the synagogue, and commands an unclean spirit to come out of a man."
    },
    {
      id: 8,
      type: "mc",
      question: "Whose mother-in-law did Jesus heal of a fever in Capernaum?",
      options: ["Simon's", "John's", "Andrew's", "Zebedee's"],
      answer: "Simon's",
      explanation: "Mark 1:29-31 explains that Jesus entered the house of Simon and Andrew, saw Simon's mother-in-law sick with a fever, and healed her by lifting her hand."
    },
    {
      id: 9,
      type: "tf",
      question: "After healing the leper, Jesus commanded him to tell everyone about the miracle immediately.",
      options: ["True", "False"],
      answer: "False",
      explanation: "Mark 1:43-44 tells us Jesus sternly charged him to say nothing to anyone, but show himself to the priest. However, the man went out and spread it freely anyway."
    },
    {
      id: 10,
      type: "mc",
      question: "What did Jesus do early in the morning, while it was still dark, after a long evening of healing?",
      options: [
        "He went fishing on the lake.",
        "He departed to a desolate place and prayed.",
        "He gathered the disciples to teach them parables.",
        "He traveled back to Nazareth."
      ],
      answer: "He departed to a desolate place and prayed.",
      explanation: "Mark 1:35 demonstrates Jesus' commitment to solitary prayer, rising before dawn to go to a desolate place to pray."
    }
  ]
};

const GAMES_DATA = {
  1: {
    whoSaidIt: [
      {
        quote: "\"The time is fulfilled, and the kingdom of God is at hand; repent and believe in the gospel.\"",
        options: ["John the Baptist", "Jesus", "Isaiah", "Simon Peter"],
        answer: "Jesus",
        explanation: "Jesus spoke these words at the start of His Galilean preaching ministry (Mark 1:15)."
      },
      {
        quote: "\"Follow me, and I will make you become fishers of men.\"",
        options: ["Andrew", "John the Baptist", "Jesus", "Zebedee"],
        answer: "Jesus",
        explanation: "Jesus said this to Simon and Andrew as they were casting nets in the Sea of Galilee (Mark 1:17)."
      },
      {
        quote: "\"What have you to do with us, Jesus of Nazareth? Have you come to destroy us? I know who you are—the Holy One of God.\"",
        options: ["John the Baptist", "The Pharisees", "An Unclean Spirit", "Simon Peter"],
        answer: "An Unclean Spirit",
        explanation: "An unclean spirit in the synagogue of Capernaum shouted this in fear of Jesus' presence (Mark 1:24)."
      }
    ],
    whoAmI: [
      {
        clues: [
          "I wore clothing made of camel's hair.",
          "I ate locusts and wild honey.",
          "I baptized Jesus in the Jordan River."
        ],
        options: ["Elijah", "John the Baptist", "Simon", "Andrew"],
        answer: "John the Baptist"
      },
      {
        clues: [
          "I was a fisherman casting a net in the Sea of Galilee.",
          "My brother is Andrew.",
          "Jesus entered my house in Capernaum and healed my mother-in-law."
        ],
        options: ["John", "James", "Simon", "Philip"],
        answer: "Simon"
      },
      {
        clues: [
          "I was an outcast due to a dreaded skin disease.",
          "I knelt before Jesus and said: 'If you will, you can make me clean.'",
          "Jesus touched me, and I was cured immediately."
        ],
        options: ["Simon", "The Leper", "Andrew", "Zebedee"],
        answer: "The Leper"
      }
    ],
    whatNext: [
      {
        event: "John the Baptist preaches in the wilderness and baptizes many...",
        options: [
          "Jesus comes from Nazareth and is baptized by John in the Jordan.",
          "Jesus starts a school for prophets in Jerusalem.",
          "John gets crowned as king of Judea.",
          "The disciples refuse to get baptized."
        ],
        answer: "Jesus comes from Nazareth and is baptized by John in the Jordan.",
        explanation: "Immediately following John's preparation, Jesus arrives to be baptized (Mark 1:9)."
      },
      {
        event: "Jesus calls Simon and Andrew, saying, 'Follow me, and I will make you become fishers of men'...",
        options: [
          "They say they must check with their father first.",
          "They immediately leave their nets and follow Him.",
          "They ask Jesus how much salary they will get.",
          "They ignore Him and continue fishing."
        ],
        answer: "They immediately leave their nets and follow Him.",
        explanation: "In Mark 1:18, Simon and Andrew immediately drop their nets to follow Jesus."
      },
      {
        event: "Jesus heals Simon's mother-in-law of her fever...",
        options: [
          "She goes to sleep for the rest of the day.",
          "She begins to serve them.",
          "She demands to be baptized in the Jordan.",
          "She runs away from the house in fear."
        ],
        answer: "She begins to serve them.",
        explanation: "In Mark 1:31, the fever left her immediately, and she began to serve them."
      }
    ],
    match: {
      left: ["John the Baptist", "Jordan River", "Sea of Galilee", "Capernaum Synagogue", "Zebedee"],
      right: ["Father of James and John", "Site of Jesus' baptism", "Preached in the wilderness", "Where Jesus healed a demoniac", "Where Simon and Andrew fished"],
      pairs: {
        "John the Baptist": "Preached in the wilderness",
        "Jordan River": "Site of Jesus' baptism",
        "Sea of Galilee": "Where Simon and Andrew fished",
        "Capernaum Synagogue": "Where Jesus healed a demoniac",
        "Zebedee": "Father of James and John"
      }
    },
    order: [
      "John the Baptist prepares the way in the wilderness.",
      "Jesus is baptized by John in the Jordan River.",
      "Jesus faces temptation by Satan for 40 days.",
      "Jesus calls Simon, Andrew, James, and John to follow Him.",
      "Jesus cleanses a leper who begs Him for healing."
    ],
    trueFalse: [
      {
        statement: "Jesus was tempted by Satan in the wilderness for forty days, surrounded by wild beasts, while angels ministered to Him.",
        answer: true,
        explanation: "Mark 1:13 explicitly states Jesus was there forty days, tempted by Satan, with the wild animals, and angels served Him."
      },
      {
        statement: "Simon and Andrew were mending their nets in a boat when Jesus called them.",
        answer: false,
        explanation: "Simon and Andrew were casting a net into the sea. It was James and John who were in a boat mending nets with their father (Mark 1:16-19)."
      },
      {
        statement: "The demons Jesus cast out knew who He was, but Jesus commanded them to be silent.",
        answer: true,
        explanation: "Mark 1:34 tells us Jesus healed many and drove out many demons, and He would not let the demons speak because they knew who He was."
      }
    ]
  }
};

const DAILY_CHALLENGES = [
  {
    day: 1,
    question: "Who were the fishermen brothers that Jesus first called to follow Him in Mark 1?",
    options: ["James & John", "Simon & Andrew", "Philip & Thomas", "Moses & Aaron"],
    answer: "Simon & Andrew",
    lesson: "Jesus calls ordinary people working their daily jobs to follow Him. You don't have to be perfect or highly trained to begin your walk with Jesus today."
  },
  {
    day: 2,
    question: "Where did Jesus go early in the morning to pray in Mark 1?",
    options: ["To the temple", "To a desolate place", "Into the Sea of Galilee", "To Capernaum Synagogue"],
    answer: "To a desolate place",
    lesson: "Even Jesus needed quiet time alone with the Father to recharge. Finding a quiet, distraction-free space for prayer is essential for our spiritual strength."
  },
  {
    day: 3,
    question: "What did Jesus say when calling Simon and Andrew to follow Him?",
    options: ["\"Behold the Kingdom!\"", "\"I will make you fishers of men.\"", "\"Depart from me!\"", "\"Show yourselves to the priests.\""],
    answer: "\"I will make you fishers of men.\"",
    lesson: "Following Jesus is not just about our personal growth, but about pointing others to Him. He shapes us to become fishers of men."
  }
];

const CHARACTERISTICS_JESUS = [
  {
    title: "Jesus the Son of God",
    key: "son_of_god",
    desc: "Mark introduces Jesus directly as the Son of God. At His baptism, the Father testifies: 'You are my beloved Son.' Even the demons recognize Him as the 'Holy One of God.'",
    chapters: [1],
    quote: "Mark 1:11 - \"You are my beloved Son; with you I am well pleased.\""
  },
  {
    title: "Jesus the authoritative Teacher",
    key: "teacher",
    desc: "Unlike the scribes, Jesus teaches with immediate, profound authority. His words carry the very weight of God, astonishing those who hear Him in the synagogues.",
    chapters: [1],
    quote: "Mark 1:22 - \"And they were astonished at his teaching, for he taught them as one who had authority...\""
  },
  {
    title: "Jesus the compassionate Healer",
    key: "healer",
    desc: "Jesus encounters physical illness and leprosy, and is moved with deep compassion. He is willing to reach out and touch the untouchable to bring restoration.",
    chapters: [1],
    quote: "Mark 1:41 - \"Moved with pity, he stretched out his hand and touched him...\""
  },
  {
    title: "Jesus the Servant in Prayer",
    key: "praying_servant",
    desc: "Despite massive crowds and exhausting ministry, Jesus models humility and dependency by slipping away in the dark to seek His Father in solitary prayer.",
    chapters: [1],
    quote: "Mark 1:35 - \"And rising very early in the morning... he went out to a desolate place, and there he prayed.\""
  }
];

const LEVEL_NAMES = {
  1: "Discoverer (Level 1)",
  2: "Explorer (Level 2)",
  3: "Disciple (Level 3)",
  4: "Teacher (Level 4)",
  5: "Mark Master (Level 5)"
};

const BADGES_LIST = [
  { id: "first_steps", title: "First Steps", desc: "Completed reading the Mark 1 Summary", icon: "🚶‍♂️" },
  { id: "seeker", title: "Seeker", desc: "Completed understanding Mark 1 sections", icon: "🔍" },
  { id: "gamer", title: "Gospel Gamer", desc: "Finished your first Bible game", icon: "🎮" },
  { id: "quiz_champ", title: "Quiz Champion", desc: "Completed the Mark 1 quiz", icon: "🏆" },
  { id: "perfectionist", title: "Perfect Score", desc: "Scored 100% on a chapter quiz", icon: "✨" },
  { id: "remedial_hero", title: "Mistake Conqueror", desc: "Reviewed and corrected all mistakes", icon: "🛡️" },
  { id: "mark1_grad", title: "Mark 1 Graduate", desc: "Fully finished all activities in Chapter 1", icon: "🎓" }
];
