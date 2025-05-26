export const categories = [
  {
    "name": "Technique",
    "color": "#4F8EF7"
  },
  {
    "name": "Biomechanics",
    "color": "#F74F4F"
  },
  {
    "name": "Mental",
    "color": "#4FF74F"
  },
  {
    "name": "21 Immutable Principles (Paulo)",
    "color": "#FFD700"
  },
  {
    "name": "Strategy",
    "color": "#FF8C00"
  },
  {
    "name": "Tactic",
    "color": "#8A2BE2"
  },
  {
    "name": "Training",
    "color": "#00CED1"
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

export type BJJConceptWithId = BJJConcept & { _id?: string };

export const skillsMasterList: BJJConceptWithId[] = [
  {
    "id": "BJJ-001",
    "concept": "Dilemmas",
    "description": "Create Dilemmas, not problems.  Damned if they do, damned if they don't. Always having multiple answers to their most likely reactions, funnel into a situation with only bad options.",
    "short_description": "",
    "category": "Strategy",
    "color": "#FF8C00",
    "axis_self_opponent": 0.7,
    "axis_mental_physical": 0.6,
    "brightness": 3,
    "size": 3
  },
  {
    "id": "BJJ-002",
    "concept": "Collapse Frames",
    "description": "Frames are typically strong in one direction yet can be collapsed in another.",
    "short_description": "",
    "category": "Biomechanics",
    "color": "#F74F4F",
    "axis_self_opponent": 0.2,
    "axis_mental_physical": 0.2,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-003",
    "concept": "Grip Fighting",
    "description": "Controlling and breaking grips to dominate exchanges.",
    "short_description": "",
    "category": "Technique",
    "color": "#4F8EF7",
    "axis_self_opponent": 0.3,
    "axis_mental_physical": 0.3,
    "brightness": 2,
    "size": 3
  },
  {
    "id": "BJJ-004",
    "concept": "Anticipation ",
    "description": "Anticipation is the first line of defense.  Don't be surprised by a guard pull or a jumping armbar. You should know what threats are possible from any given positions.",
    "short_description": "",
    "category": "Mental",
    "color": "#4FF74F",
    "axis_self_opponent": 0.9,
    "axis_mental_physical": 0.1,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-005",
    "concept": "Wet Rug",
    "description": "#3/21 If you're stiff as a log you're easy to move.  Imagine a rug soaked in water, it's hard to pick and manipulate.  Be like water, be like a water-clogged rug, waterboarding your opponent's entire body.",
    "short_description": "",
    "category": "21 Immutable Principles (Paulo)",
    "color": "#FFD700",
    "axis_self_opponent": 0.3,
    "axis_mental_physical": 0.8,
    "brightness": 1,
    "size": 1
  },
  {
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
    "id": "BJJ-007",
    "concept": "More is too much",
    "description": "Opponent pushes you? move back even further\nOpponent pulls you? move in even further\nOpponent Rotates you? rotate further\nGive them more of what they want, so it becomes too much and interferes with their plan.  e.g. after a failed hip bump.",
    "short_description": "",
    "category": "Tactic",
    "color": "#8A2BE2",
    "axis_self_opponent": 0.09,
    "axis_mental_physical": 0.12,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-008",
    "concept": "Persistence (4/7))",
    "description": "#1/21 of of the \"7 P's\" in Paulo Guillobel's 21 immutable principles of Jiu Jitsu.",
    "short_description": "",
    "category": "21 Immutable Principles (Paulo)",
    "color": "#FFD700",
    "axis_self_opponent": 0.89,
    "axis_mental_physical": 0.65,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-009",
    "concept": "Patience (5/7)",
    "description": "#1/21 one of the \"7P's\" in Paulo Guillobel's 21 immutable principles of Jiu Jitsu.",
    "short_description": "",
    "category": "21 Immutable Principles (Paulo)",
    "color": "#FFD700",
    "axis_self_opponent": 0.87,
    "axis_mental_physical": 0.66,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-010",
    "concept": "#1 \"7 P's\"",
    "description": "#1/27 by Paulo Guillobel.\nPosition, Posture, Pressure, Proper Balance, Precision",
    "short_description": "",
    "category": "21 Immutable Principles (Paulo)",
    "color": "#FFD700",
    "axis_self_opponent": 0.43,
    "axis_mental_physical": 0.67,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-011",
    "concept": "Chess Analogy",
    "description": "#2/21 by Paulo Guillobel.\n\nThe Chess Analogy is certainly not *Uniquely* appropriate to grappling.  Football, soccer, or any sports involving positioning and decisions will have some chess analogies.   Pieces have values, controlling the center is advantageous, be 3 moves ahead, etc.",
    "short_description": "",
    "category": "21 Immutable Principles (Paulo)",
    "color": "#FFD700",
    "axis_self_opponent": 0.73,
    "axis_mental_physical": 0.44,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-012",
    "concept": "#4/21 Zen",
    "description": "#4/21 Chill. In training and in the midst of competition.  Clear mind. From Paulo Guillobel's 21 immutable principles of Jiu Jitsu.",
    "short_description": "",
    "category": "21 Immutable Principles (Paulo)",
    "color": "#FFD700",
    "axis_self_opponent": 0.96,
    "axis_mental_physical": 0.84,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-013",
    "concept": "#5/21 Flow like water",
    "description": "Brucee lee and others before him.  #5/21 in Paulo Guillobel's 21 principles.",
    "short_description": "",
    "category": "21 Immutable Principles (Paulo)",
    "color": "#FFD700",
    "axis_self_opponent": 0.48,
    "axis_mental_physical": 0.53,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-014",
    "concept": "#6/21 Braveheart",
    "description": "Dive in, get rid of your fear of losing, especially during training.  #6/21 in Paulo Guillobel's 21 immutable principles of Jiu Jitsu.",
    "short_description": "",
    "category": "21 Immutable Principles (Paulo)",
    "color": "#FFD700",
    "axis_self_opponent": 0.78,
    "axis_mental_physical": 0.67,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-015",
    "concept": "#7/21 Improve Position",
    "description": "Constantly improve your position. Ideally you never lose ground and go back, every advantage builds up and snowball into total control.",
    "short_description": "",
    "category": "21 Immutable Principles (Paulo)",
    "color": "#FFD700",
    "axis_self_opponent": 0.4,
    "axis_mental_physical": 0.76,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-016",
    "concept": "#8/21 Biggest Leak First",
    "description": "Address your biggest problem first. Typically what is giving your opponent the most leverage right now? adress that.  In practice, what's your biggest weakness? identify and address.",
    "short_description": "",
    "category": "Technique",
    "color": "#4F8EF7",
    "axis_self_opponent": 0.82,
    "axis_mental_physical": 0.52,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-017",
    "concept": "#9/21 Overreaching",
    "description": "Avoid overreaching (grab too far, maintain a grip that is compromised, try to finish a submission that is now too low percentage, etc.)",
    "short_description": "",
    "category": "21 Immutable Principles (Paulo)",
    "color": "#FFD700",
    "axis_self_opponent": 0.46,
    "axis_mental_physical": 0.52,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-018",
    "concept": "#10/21 Fortress",
    "description": "Think of your body in layers of defense.  Wrestlers talk about \"climbing the ladder\".  This is similar, rebuild your defenses; feet, knees, hands, elbow.  If compromised, rebuild the fortress.",
    "short_description": "",
    "category": "21 Immutable Principles (Paulo)",
    "color": "#FFD700",
    "axis_self_opponent": 0.55,
    "axis_mental_physical": 0.52,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-019",
    "concept": "#11/21 Action & Reaction",
    "description": "Create action to bait reaction, watch the opponent's head velocity and add to it.  Bait & Trap.  Beware of counter-productivity.",
    "short_description": "",
    "category": "21 Immutable Principles (Paulo)",
    "color": "#FFD700",
    "axis_self_opponent": 0.46,
    "axis_mental_physical": 0.11,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-020",
    "concept": "#12/21 Anatomy",
    "description": "Extra pressure from toes, feet always busy, where to grab.  General awareness of the human anatomy to better use it.",
    "short_description": "",
    "category": "21 Immutable Principles (Paulo)",
    "color": "#FFD700",
    "axis_self_opponent": 0.45,
    "axis_mental_physical": 0.39,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-021",
    "concept": "#13/21 let the enemy defeat himself.",
    "description": "Gas out.  Let him make mistakes.  Be comfortable, low energy as they struggle.  give up lost positions to get advantage in the next battle, weakness identification, improve position, retreat if compromised.",
    "short_description": "",
    "category": "21 Immutable Principles (Paulo)",
    "color": "#FFD700",
    "axis_self_opponent": 0.72,
    "axis_mental_physical": 0.23,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-022",
    "concept": "#14/21 Basics > Shiny",
    "description": "in general, extremely honed basics will serve you better than flashy shiny new techniques.  ",
    "short_description": "",
    "category": "21 Immutable Principles (Paulo)",
    "color": "#FFD700",
    "axis_self_opponent": 0.91,
    "axis_mental_physical": 0.8,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-023",
    "concept": "#15/21 Big Rock",
    "description": "Don't embrace the big rock (hugging someone on top of you), push it sideways, make your way under, etc.",
    "short_description": "",
    "category": "21 Immutable Principles (Paulo)",
    "color": "#FFD700",
    "axis_self_opponent": 0.35,
    "axis_mental_physical": 0.24,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-024",
    "concept": "#16/21 Fine Line",
    "description": "Switch modes, get a head start on the next move.  There's a fine line between something you can still use and something that will soon become detrimental.",
    "short_description": "",
    "category": "21 Immutable Principles (Paulo)",
    "color": "#FFD700",
    "axis_self_opponent": 0.88,
    "axis_mental_physical": 0.44,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-025",
    "concept": "#17/21 Energy Management",
    "description": "Your gas tank is not infinite.  Maybe enough energy for a few bursts.  Don't redline all the time.",
    "short_description": "",
    "category": "21 Immutable Principles (Paulo)",
    "color": "#FFD700",
    "axis_self_opponent": 0.5,
    "axis_mental_physical": 0.93,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-026",
    "concept": "#18/21 Real Estate",
    "description": "\"location, location, location\".  Make them pay dearly for access to the good locations.  Elbows to knees, elbow to pelvis. head control.",
    "short_description": "",
    "category": "21 Immutable Principles (Paulo)",
    "color": "#FFD700",
    "axis_self_opponent": 0.29,
    "axis_mental_physical": 0.5,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-027",
    "concept": "#19/21 Max Pressure",
    "description": "Pick a side, pick a spot, hand/feet to add/redirect force.  Firm not stiff. Don't leak pressure where it does not affect them.",
    "short_description": "",
    "category": "21 Immutable Principles (Paulo)",
    "color": "#FFD700",
    "axis_self_opponent": 0.43,
    "axis_mental_physical": 0.9,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-028",
    "concept": "#20/21 Limb vs Limb",
    "description": "2-on-1, 3-on-1, be uneven in your favor. Overwhelm.",
    "short_description": "",
    "category": "21 Immutable Principles (Paulo)",
    "color": "#FFD700",
    "axis_self_opponent": 0.31,
    "axis_mental_physical": 0.37,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-029",
    "concept": "#21/21 Base",
    "description": "\"Wind, wood, fire, mountain\".  Lose the fear of being swept.  You are a cat and someone is trying to push you into water.  Always have a body part ready to establish base.",
    "short_description": "",
    "category": "Technique",
    "color": "#4F8EF7",
    "axis_self_opponent": 0.18,
    "axis_mental_physical": 0.9,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-030",
    "concept": "6DoF",
    "description": "six degrees of freedom.  Realize there's more to mobility than left-right front-back.",
    "short_description": "",
    "category": "Biomechanics",
    "color": "#F74F4F",
    "axis_self_opponent": 0.05,
    "axis_mental_physical": 0.96,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-031",
    "concept": "Forced Play vs Free Play",
    "description": "Give your opponent the opportunity to make mistakes. If the answer is clear, they cannot make mistakes. Error amplification through optionality. Choice complexity breeds error.  Decision tree proliferation and overload. Complexity Advantage. Bounded rationality.",
    "short_description": "",
    "category": "Mental",
    "color": "#4FF74F",
    "axis_self_opponent": 0.96,
    "axis_mental_physical": 0.1,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-032",
    "concept": "Empathy",
    "description": "What's their way out? what do they want? How bad are they feeling the pressure.  Have empathy so you can deny them what they crave most.",
    "short_description": "",
    "category": "Mental",
    "color": "#4FF74F",
    "axis_self_opponent": 0.96,
    "axis_mental_physical": 0.34,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-033",
    "concept": "Real-Time Learning",
    "description": "Learn something about your opponent from each grip and move and reaction. Update your knowledge about them in real time.",
    "short_description": "",
    "category": "Mental",
    "color": "#4FF74F",
    "axis_self_opponent": 0.86,
    "axis_mental_physical": 0.32,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-034",
    "concept": "Funnel",
    "description": "Make them play your game on your terms, avoid playing theirs.",
    "short_description": "",
    "category": "Mental",
    "color": "#4FF74F",
    "axis_self_opponent": 0.84,
    "axis_mental_physical": 0.21,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-035",
    "concept": "Overload their system",
    "description": "Threats and distractions everywhere.",
    "short_description": "",
    "category": "Mental",
    "color": "#4FF74F",
    "axis_self_opponent": 0.8,
    "axis_mental_physical": 0.07,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-036",
    "concept": "Bait, Trap",
    "description": "create triggers",
    "short_description": "",
    "category": "Mental",
    "color": "#4FF74F",
    "axis_self_opponent": 0.59,
    "axis_mental_physical": 0.39,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-037",
    "concept": "Suspicion",
    "description": "If you did not create the position, be suspicious",
    "short_description": "",
    "category": "Mental",
    "color": "#4FF74F",
    "axis_self_opponent": 0.95,
    "axis_mental_physical": 0.2,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-038",
    "concept": "Fluid Momentum",
    "description": "Fluid Momentum >> Position >> Submission. Karel Pravec.  (close to Flow/Pressure/Finish by Ribeiro)",
    "short_description": "",
    "category": "Strategy",
    "color": "#FF8C00",
    "axis_self_opponent": 0.65,
    "axis_mental_physical": 0.5,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-039",
    "concept": "Flow-Pressure-Finish",
    "description": "3-step system by Xande Ribeiro",
    "short_description": "",
    "category": "Strategy",
    "color": "#FF8C00",
    "axis_self_opponent": 0.42,
    "axis_mental_physical": 0.5,
    "brightness": 1,
    "size": 1
  },
  {
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
    "id": "BJJ-041",
    "concept": "Deterrence",
    "description": "one-bitten twice shy, make them know that some spots are dangerous for them.  Alternative route to bait & trap.",
    "short_description": "",
    "category": "Technique",
    "color": "#4F8EF7",
    "axis_self_opponent": 0.79,
    "axis_mental_physical": 0.33,
    "brightness": 1,
    "size": 1
  }
];