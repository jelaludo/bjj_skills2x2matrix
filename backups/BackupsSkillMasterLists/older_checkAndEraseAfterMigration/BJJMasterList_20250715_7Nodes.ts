export const categories = [
  {
    "_id": "683334f56fd5182fa18c782d",
    "name": "Technique",
    "color": "#4F8EF7"
  },
  {
    "_id": "683334f56fd5182fa18c782e",
    "name": "Biomechanics",
    "color": "#F74F4F"
  },
  {
    "_id": "683334f56fd5182fa18c782f",
    "name": "Mental",
    "color": "#4FF74F"
  },
  {
    "_id": "683334f56fd5182fa18c7830",
    "name": "21 Immutable Principles (Paulo)",
    "color": "#FFD700"
  },
  {
    "_id": "683334f56fd5182fa18c7831",
    "name": "Strategy",
    "color": "#FF8C00"
  },
  {
    "_id": "683334f56fd5182fa18c7832",
    "name": "Tactic",
    "color": "#8A2BE2"
  },
  {
    "_id": "683334f56fd5182fa18c7833",
    "name": "Training",
    "color": "#00CED1"
  },
  {
    "_id": "683334f56fd5182fa18c7834",
    "name": "Memes",
    "color": "#8A2BE2"
  },
  {
    "_id": "683334f56fd5182fa18c7835",
    "name": "32 Principles",
    "color": "#FFD700"
  },
  {
    "_id": "68341021fb11be6de639917b",
    "name": "BJJ Definitions",
    "color": "#888888"
  }
];

export interface BJJConcept {
  id: string;
  concept: string;
  description: string;
  short_description: string;
  category: string;
  color: string;
  axis_self_opponent: number;
  axis_mental_physical: number;
  brightness: number;
  size: number;
}

export const skillsMasterList: BJJConcept[] = [
  {
    "_id": "683409a61fa612ab8b07d099",
    "id": "BJJ-006",
    "concept": "Tailored Resistance",
    "description": "Offer realistic but partial resistance during drills/games/R&D/sparring",
    "short_description": "",
    "category": "Training",
    "color": "#00CED1",
    "axis_self_opponent": 0.98,
    "axis_mental_physical": 0.97,
    "brightness": 1,
    "size": 1
  },
  {
    "_id": "683409a61fa612ab8b07d0bb",
    "id": "BJJ-040",
    "concept": "Complementary Moves",
    "description": "Identify where you often end-up, how people usually react, and develop complementary moves around these.",
    "short_description": "",
    "category": "Training",
    "color": "#00CED1",
    "axis_self_opponent": 0.36,
    "axis_mental_physical": 0.55,
    "brightness": 1,
    "size": 1
  },
  {
    "_id": "686884bed8b48cef9392f814",
    "id": "BJJ-087",
    "concept": "Guard Allure",
    "description": "“Do not be seduced by the allure of the guard”\n Chris Haueter\n\nit's so easy to get comfortable in guard that you forgot how important it is to stay on top.",
    "short_description": "",
    "category": "Training",
    "color": "#00CED1",
    "axis_self_opponent": 0.61,
    "axis_mental_physical": 0.19,
    "brightness": 5,
    "size": 3
  },
  {
    "_id": "686887afe870e9bc4d41a00a",
    "id": "BJJ-043",
    "concept": "Technical Focus",
    "description": "Favor technical proficiency over winning **in training.  In competition it's arguably ok to cut corners and let your inner grit take over (to some extent, not worth it to rip tendons and risk lifelong injury over a medal).  But in training it's pointless to seek victory, you should seek precise control and technique mastery.",
    "short_description": "",
    "category": "Training",
    "color": "#00CED1",
    "axis_self_opponent": 0.76,
    "axis_mental_physical": 0.69,
    "brightness": 5,
    "size": 3
  },
  {
    "_id": "68688843e870e9bc4d41a00b",
    "id": "BJJ-088",
    "concept": "Sponge",
    "description": "Soak up all the information.  Take notes.  Switch your brain on, make connections yourself between the disparate lessons and nuggets of wisdom.  Take ownership of your training.  especially in the early years of training, you should accumulate hundreds of ideas and concepts and techniques, then as \"your belt darkens\" you start to sieve through and keep what works best for you, refine.\nYou can't refine something you don't have.",
    "short_description": "",
    "category": "Training",
    "color": "#00CED1",
    "axis_self_opponent": 0.8,
    "axis_mental_physical": 0.77,
    "brightness": 5,
    "size": 3
  },
  {
    "_id": "6875a4235e0e1ee4adb476e0",
    "id": "BJJ-089",
    "concept": "Explore > Exploit",
    "description": "Prioritize growth over dominance in a particular training session.\n\nDrop the A-Game to work on new aspects.  Garry Tonon says that he gets tapped all the time in training, because he's working on new stuff.\n\nThere's an optimization algorithm called the multi-armed bandit, if you set it to 80-20, 80% of the time you'll go for the highest payoff strategy (so far!), and 20% of the time you'll explore a new strategy, hopefully discovering an even higher payoff once in a while.\n\nIn training BJJ, you can set that to 50-50 or even 20-80.  Experiment.\n\nLet go of the A-Game\nLet go of the Must-Dominate ego.\n\nRely on your A-Game only when it matters.\n\nsee \"Catch & Release\" too.",
    "short_description": "",
    "category": "Training",
    "color": "#00CED1",
    "axis_self_opponent": 0.59,
    "axis_mental_physical": 0.98,
    "brightness": 1,
    "size": 1
  },
  {
    "_id": "6875a4e85e0e1ee4adb476e1",
    "id": "BJJ-090",
    "concept": "Catch & Release",
    "description": "When there's an obvious experience discrepancy, you get close to lock-in a submission (the “catch”) to the point where you know you could have gotten it (don't lie to yourself either), then let go without finishing (the “release”).\n\n- You to practice control and precision\n\n- They learn and keep rolling without constant resets\n\n- A more flow-based, educational sparring experience\n\nIt’s a sign of control, trust, and teaching mindset, not a missed opportunity to assert dominance on a noob.",
    "short_description": "",
    "category": "Training",
    "color": "#00CED1",
    "axis_self_opponent": 0.97,
    "axis_mental_physical": 0.05,
    "brightness": 5,
    "size": 3
  }
];
