export const categories = [
  {
    "name": "Grappling Primitives",
    "color": "#848a94",
    "xAxis": {
      "left": "Mental",
      "right": "Physical"
    },
    "yAxis": {
      "bottom": "Self",
      "top": "Opponent"
    },
    "_id": "local-1752564808495"
  },
  {
    "_id": "683334f56fd5182fa18c7832",
    "name": "Tactics",
    "color": "#8A2BE2",
    "xAxis": {
      "left": "Mental",
      "right": "Physical"
    },
    "yAxis": {
      "bottom": "Self",
      "top": "Opponent"
    }
  },
  {
    "_id": "683334f56fd5182fa18c7831",
    "name": "Strategy",
    "color": "#FF8C00",
    "xAxis": {
      "left": "Mental",
      "right": "Physical"
    },
    "yAxis": {
      "bottom": "Self",
      "top": "Opponent"
    }
  },
  {
    "_id": "683334f56fd5182fa18c7833",
    "name": "Training",
    "color": "#00CED1",
    "xAxis": {
      "left": "Mental",
      "right": "Physical"
    },
    "yAxis": {
      "bottom": "Self",
      "top": "Opponent"
    }
  },
  {
    "name": "Coaching",
    "color": "#6b6d70",
    "xAxis": {
      "left": "Mental",
      "right": "Physical"
    },
    "yAxis": {
      "bottom": "Self",
      "top": "Opponent"
    },
    "_id": "local-1752563198899"
  },
  {
    "_id": "683334f56fd5182fa18c7834",
    "name": "Memes",
    "color": "#8A2BE2",
    "xAxis": {
      "left": "Self-deprecation",
      "right": "r/iamabadass"
    },
    "yAxis": {
      "bottom": "TotalBS",
      "top": "GrainOfTruth"
    }
  },
  {
    "_id": "683334f56fd5182fa18c7830",
    "name": "21 Immutable Principles",
    "color": "#FFD700",
    "xAxis": {
      "left": "Mental",
      "right": "Physical"
    },
    "yAxis": {
      "bottom": "Self",
      "top": "Opponent"
    }
  },
  {
    "_id": "683334f56fd5182fa18c7835",
    "name": "32 Principles",
    "color": "#FFD700",
    "xAxis": {
      "left": "Mental",
      "right": "Physical"
    },
    "yAxis": {
      "bottom": "Self",
      "top": "Opponent"
    }
  },
  {
    "name": "White Belt Tips",
    "color": "#edeff2",
    "xAxis": {
      "left": "Mental",
      "right": "Physical"
    },
    "yAxis": {
      "bottom": "Self",
      "top": "Opponent"
    },
    "_id": "local-1752563284607"
  },
  {
    "_id": "683334f56fd5182fa18c782d",
    "name": "Techniques",
    "color": "#4F8EF7",
    "xAxis": {
      "left": "Mental",
      "right": "Physical"
    },
    "yAxis": {
      "bottom": "Self",
      "top": "Opponent"
    }
  },
  {
    "name": "Internal",
    "color": "#4F8EF7",
    "xAxis": {
      "left": "Mental",
      "right": "Physical"
    },
    "yAxis": {
      "bottom": "Self",
      "top": "Opponent"
    },
    "_id": "local-1752567752666"
  },
  {
    "name": "Black Belt Wisdom",
    "color": "#FF6B35",
    "xAxis": {
      "left": "Serious",
      "right": "Funny"
    },
    "yAxis": {
      "bottom": "Self-deprecating",
      "top": "Self-aggrandizing"
    },
    "_id": "local-1752567752667"
  },
  {
    "name": "Competition",
    "color": "#9e1010",
    "xAxis": {
      "left": "Mental",
      "right": "Physical"
    },
    "yAxis": {
      "bottom": "Self",
      "top": "Opponent"
    },
    "_id": "local-1752634838945"
  },
  {
    "name": "Player Types",
    "color": "#1b4b01",
    "xAxis": {
      "left": "Skilled",
      "right": "Unskilled"
    },
    "yAxis": {
      "bottom": "Chill",
      "top": "Aggro"
    },
    "_id": "local-1752635201422"
  },
  {
    "name": "Resources",
    "color": "#4f7e16",
    "xAxis": {
      "left": "Long-form",
      "right": "Short-form"
    },
    "yAxis": {
      "bottom": "Expensive",
      "top": "Free"
    },
    "_id": "local-1752742949370"
  },
  {
    "name": "Noteworthy Grapplers",
    "color": "#ff00d4",
    "xAxis": {
      "left": "Old School",
      "right": "Modern"
    },
    "yAxis": {
      "bottom": "No Gi",
      "top": "Gi"
    },
    "_id": "local-1752744648882"
  },
  {
    "name": "Anatomy Awareness",
    "color": "#848a94",
    "xAxis": {
      "left": "External",
      "right": "Internal"
    },
    "yAxis": {
      "bottom": "Muscles",
      "top": "Bones"
    },
    "_id": "local-1752904997059"
  },
  {
    "name": "Why Do We Train?",
    "color": "#6c9aea",
    "xAxis": {
      "left": "Internal",
      "right": "External"
    },
    "yAxis": {
      "bottom": "Self",
      "top": "Others"
    },
    "_id": "local-1753017046859"
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
    "id": "BJJ-001",
    "concept": "Involuntary Yoga",
    "description": "Somewhat funny.  BJJ is involuntary yoga, because we put you in funky twisted positions! AHAHA, ahah. ah.",
    "short_description": "",
    "category": "Memes",
    "color": "#8A2BE2",
    "axis_self_opponent": 0.92,
    "axis_mental_physical": 0.76,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-002",
    "concept": "Collapse Frames",
    "description": "Frames are typically strong in one direction yet can be collapsed in another.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
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
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.3,
    "axis_mental_physical": 0.3,
    "brightness": 2,
    "size": 3
  },
  {
    "id": "BJJ-004",
    "concept": "Anticipation",
    "description": "Anticipation is the first line of defense.  Don't be surprised by a guard pull or a jumping armbar. You should know what threats are possible from any given positions.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.9,
    "axis_mental_physical": 0.1,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-005",
    "concept": "Art & Science",
    "description": "\"BJJ is the Art & Science of Control Leading to Submission\".  Chris Haueter I believe.   I like this one, it's laconic an accurate.",
    "short_description": "",
    "category": "Memes",
    "color": "#8A2BE2",
    "axis_self_opponent": 0.83,
    "axis_mental_physical": 0.68,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-007",
    "concept": "Murder Yoga",
    "description": "see. Involutary Yoga, with a more r/iambadass vibe.",
    "short_description": "",
    "category": "Memes",
    "color": "#8A2BE2",
    "axis_self_opponent": 0.92,
    "axis_mental_physical": 0.86,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-008",
    "concept": "Legal Strangulation",
    "description": "Where the dojo becomes a place where consenting adults can legally strangle each other for their personal fullfilment.",
    "short_description": "",
    "category": "Memes",
    "color": "#8A2BE2",
    "axis_self_opponent": 0.72,
    "axis_mental_physical": 0.65,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-009",
    "concept": "Patience (5/7)",
    "description": "#1/21 one of the \"7P's\" in Paulo Guillobel's 21 immutable principles of Jiu Jitsu.",
    "short_description": "",
    "category": "21 Immutable Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.87,
    "axis_mental_physical": 0.66,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-010",
    "concept": "#1/21 \"7 P's\"",
    "description": "#1/27 by Paulo Guillobel.\nPosition, Posture, Pressure, Proper Balance, Precision\n\nPersistence & Patience moved to \"Mental\" quadrant.",
    "short_description": "",
    "category": "21 Immutable Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.43,
    "axis_mental_physical": 0.67,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-011",
    "concept": "#2/21 Chess Analogy",
    "description": "#2/21 by Paulo Guillobel.\n\nThe Chess Analogy is certainly not *Uniquely* appropriate to grappling.  Football, soccer, or any sports involving positioning and decisions will have some chess analogies.   Pieces have values, controlling the center is advantageous, be 3 moves ahead, etc.",
    "short_description": "",
    "category": "21 Immutable Principles",
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
    "category": "21 Immutable Principles",
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
    "category": "21 Immutable Principles",
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
    "category": "21 Immutable Principles",
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
    "category": "21 Immutable Principles",
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
    "category": "21 Immutable Principles",
    "color": "#FFD700",
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
    "category": "21 Immutable Principles",
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
    "category": "21 Immutable Principles",
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
    "category": "21 Immutable Principles",
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
    "category": "21 Immutable Principles",
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
    "category": "21 Immutable Principles",
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
    "category": "21 Immutable Principles",
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
    "category": "21 Immutable Principles",
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
    "category": "21 Immutable Principles",
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
    "category": "21 Immutable Principles",
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
    "category": "21 Immutable Principles",
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
    "category": "21 Immutable Principles",
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
    "category": "21 Immutable Principles",
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
    "category": "21 Immutable Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.18,
    "axis_mental_physical": 0.9,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-030",
    "concept": "6DoF",
    "description": "six degrees of freedom.  Realize there's more to mobility than left-right front-back.  6DoF (Six Degrees of Freedom)\n\nRefers to the six independent axes of movement a body can perform in 3D space:\n\nTranslation: forward/back (x), up/down (y), left/right (z)\n\nRotation: pitch (tilt up/down), yaw (turn left/right), roll (tilt side to side)\n\nIn BJJ and grappling:\n\nControlling an opponent means removing their degrees of freedom, one by one—pin the hips (blocks translation), isolate the shoulder (limits rotation), hook a leg (anchors a pivot).\n\nEscaping involves regaining degrees of freedom—hip escape restores translation, underhook returns rotational access.\n\nBiomechanically, the joints themselves have varying DoF (e.g., shoulder: 3 rotational DoF; knee: primarily 1). Training should build awareness of how to exploit or limit these DoF during transitions and submissions.\n\nGrappling, at its core, is 6DoF chess—with gravity and friction.\n\nTranslation: Linear movement through space—changing position.\n\nIn the body: shifting your hips during a shrimp, stepping forward for a takedown, bridging upward from bottom.\n\nIn 6DoF: represented by movement along x (left-right), y (up-down), z (forward-back).\n\nRotation: Angular movement around an axis—changing orientation.\n\nIn the body: turning your torso during a granby roll, rotating the arm for an underhook, rolling over a shoulder.\n\nIn 6DoF: pitch (nodding), yaw (shaking head \"no\"), roll (tilting head sideways).\n\nVibration: Micro-oscillations—rapid, often involuntary, repetitive motion. Not formally part of 6DoF, but biomechanically critical.\n\nIn the body: muscle spindle reflexes, tremors under fatigue, or rapid shaking to disengage grip pressure.\n\nIn grappling: can disrupt tension (micro-movements to break static grips), signal neuromuscular fatigue, or be used tactically (e.g., shimmying to unsettle base).\n\nSummary:\n\n6DoF = 3 translation + 3 rotation.\n\nVibration = higher-frequency motion layered on top of those freedoms—mechanically minor, neurologically significant.\n\nControl in grappling comes from limiting opponent's translation and rotation; understanding vibration improves sensitivity and adaptability.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.05,
    "axis_mental_physical": 0.96,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-031",
    "concept": "Form Tension",
    "description": "Form tension in biomechanics refers to the internal force generated within a structure—such as a muscle, tendon, or connective tissue—when it is stretched or deformed, acting to resist the applied load and maintain the shape or integrity of the structure. This tension is a combination of passive (from non-contractile elements like connective tissue) and active (from contractile muscle fibers) components, and is fundamental for stabilizing and supporting body forms during movement and posture.   See Peng in Taichi.    The baseline muscular engagement required to maintain structural integrity during movement or static holds. Not maximal contraction—just enough to preserve alignment, transmit force, and prevent collapse under external load or pressure.\n\nIn grappling, form tension stabilizes frames, connects kinetic chains, and prevents overextension or sagging. Too little: collapse under pressure. Too much: wasted energy, sluggish transitions.\n\nBiomechanically, it manifests as isometric co-contraction (agonist + antagonist) across joints—common in closed guard, tripod base, or during guard passing posture. Good training teaches athletes to modulate tension: spike during bracing, relax during flow.\n\nEfficient grapplers breathe under load—keeping form tension without rigidity.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.22,
    "axis_mental_physical": 0.69,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-032",
    "concept": "Empathy",
    "description": "What's their way out? what do they want? How bad are they feeling the pressure.  Have empathy so you can deny them what they crave most.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.96,
    "axis_mental_physical": 0.34,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-033",
    "concept": "Real-Time Learning",
    "description": "Learn something about your opponent from each grip and move and reaction. Update your knowledge about them in real time.  OODA Loop Adjacent.  (Observe-Orient-Decide-Act)",
    "short_description": "",
    "category": "Tactics",
    "color": "#8A2BE2",
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
    "category": "Tactics",
    "color": "#8A2BE2",
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
    "category": "Tactics",
    "color": "#8A2BE2",
    "axis_self_opponent": 0.8,
    "axis_mental_physical": 0.07,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-036",
    "concept": "Bait & Trap",
    "description": "Create triggers. Offer your back so you get a chance at a Kimura, turtle and attack their arm, give them a Triangle to create a passing opportunity (a la Wim's Queen Gambit), etc.",
    "short_description": "",
    "category": "Tactics",
    "color": "#8A2BE2",
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
    "category": "Tactics",
    "color": "#8A2BE2",
    "axis_self_opponent": 0.95,
    "axis_mental_physical": 0.2,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-038",
    "concept": "Golden Mean",
    "description": "Golden Mean in everything.  Moderation in everyting, including moderation.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.87,
    "axis_mental_physical": 0.77,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-039",
    "concept": "Puzzle Solving",
    "description": "Reduce the ego, think of though opponents as interesting puzzles to try to solve.   The cognitive process of real-time problem decomposition under physical stress. Involves recognizing patterns (guard types, grips, reactions), generating hypotheses (what happens if I post here?), and applying feedback loops through kinesthetic trial. Athletes cycle through micro-adjustments—angle, timing, leverage—seeking stable control or submission.\n\nBiomechanically, it engages proprioception, spatial reasoning, and fine motor control. Neurologically, it reinforces myelination of adaptive movement sequences. Training should emphasize constraint-based sparring: isolating problems (e.g., escaping mount) forces repeated exposure to solve under pressure.\n\nIn essence: chess with pain compliance.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.96,
    "axis_mental_physical": 0.89,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-040",
    "concept": "Heuristics",
    "description": "Fast, experience-based rules-of-thumb used to make real-time decisions under pressure. Heuristics reduce cognitive load by replacing exhaustive analysis with pattern recognition and tactical defaults.\n\nHeuristics ≠ techniques. They’re decision frameworks that reduce chaos into action.\n\nThey should be taught alongside techniques as meta-skills.\n\nGood heuristics are adaptive, not rigid.\n\nHeuristics are simplification.  All simplifications are wrong, but some are useful.\n\nWhy Heuristics Matter\nGrappling is dynamic and chaotic.\n\nTime for deep reasoning = zero.\n\nHeuristics enable speed with survivability—even if not always optimal, they are robust.\n\nExamples of BJJ Heuristics\nHeuristic;Application\n“Frame when you can’t move, move when you can’t frame”;Guides positional defense.\n\n“Two on one beats one”; Arm drag, grip breaking, shoulder control.\n\n“Head higher, hips heavier”;Passing posture, pressure principles.\n\n“If they post, you sweep”;Cue for transitioning from submission to reversal.\n\n“Control the inside space”;Dominant frames, underhooks, collar ties.\n\n“If you can see the back, take it”;Positional hierarchy—reward opportunity.\n\n“When in doubt, fight for the underhook”\tUniversal in scrambling and control.\n\n“If they push, pull. If they pull, push.”\t;Kuzushi and tempo control.\n\nHeuristics in BJJ are mental guardrails. They trade perfect choices for fast, repeatable, mostly-right actions under pressure. They're how instincts are built—and how instinct wins.\n\nYou use heuristics to frame your training, and hopefully once they're integrated you don't need to think about them anymore.  Unconscious Competence.",
    "short_description": "",
    "category": "Training",
    "color": "#00CED1",
    "axis_self_opponent": 0.86,
    "axis_mental_physical": 0.87,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-041",
    "concept": "Always Protect Yourself",
    "description": "Don’t Put Yourself at the Mercy of Others.  In training, relying solely on your partner’s control, restraint, or decision-making to avoid injury can be reckless. A single mistake can result in sudden, serious injury.  Position before trust.  Your safety is your responsibility.  Don't outsource control.  \n\nAvoid hanging in an inverted position where their weight might drop on you suddenly and spike your spine.\n\nDon't be **too loose, loads of slack in, say, your arm while trying to escape and you miss the sudden bridging pressure and can't tap in time.\n\nBad heel hook defense trying to tough it out.\n\nWait until you feel pain beefore tapping.",
    "short_description": "",
    "category": "Training",
    "color": "#00CED1",
    "axis_self_opponent": 0.4,
    "axis_mental_physical": 0.58,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-043",
    "concept": "2/32 Detachment",
    "description": "",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.11,
    "axis_mental_physical": 0.5,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-001",
    "concept": "Involuntary Yoga",
    "description": "Somewhat funny.  BJJ is involuntary yoga, because we put you in funky twisted positions! AHAHA, ahah. ah.",
    "short_description": "",
    "category": "Memes",
    "color": "#8A2BE2",
    "axis_self_opponent": 0.92,
    "axis_mental_physical": 0.76,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-002",
    "concept": "Collapse Frames",
    "description": "Frames are typically strong in one direction yet can be collapsed in another.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
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
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.3,
    "axis_mental_physical": 0.3,
    "brightness": 2,
    "size": 3
  },
  {
    "id": "BJJ-004",
    "concept": "Anticipation",
    "description": "Anticipation is the first line of defense.  Don't be surprised by a guard pull or a jumping armbar. You should know what threats are possible from any given positions.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.9,
    "axis_mental_physical": 0.1,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-005",
    "concept": "Art & Science",
    "description": "\"BJJ is the Art & Science of Control Leading to Submission\".  Chris Haueter I believe.   I like this one, it's laconic an accurate.",
    "short_description": "",
    "category": "Memes",
    "color": "#8A2BE2",
    "axis_self_opponent": 0.83,
    "axis_mental_physical": 0.68,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-001",
    "concept": "Involuntary Yoga",
    "description": "Somewhat funny.  BJJ is involuntary yoga, because we put you in funky twisted positions! AHAHA, ahah. ah.",
    "short_description": "",
    "category": "Memes",
    "color": "#8A2BE2",
    "axis_self_opponent": 0.92,
    "axis_mental_physical": 0.76,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-002",
    "concept": "Collapse Frames",
    "description": "Frames are typically strong in one direction yet can be collapsed in another.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
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
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.3,
    "axis_mental_physical": 0.3,
    "brightness": 2,
    "size": 3
  },
  {
    "id": "BJJ-004",
    "concept": "Anticipation",
    "description": "Anticipation is the first line of defense.  Don't be surprised by a guard pull or a jumping armbar. You should know what threats are possible from any given positions.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.9,
    "axis_mental_physical": 0.1,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-042",
    "concept": "Last Battle",
    "description": "Do no fight the last battle.   Realize when the game has changed, when the battleground has shifted.   Accept that your defenses have failed and switch to damage mitigation and recovery.\n\nsimilar to Keenan's \"Win small battles then don't realize are happening\" (about passing over the knee in worm guard)",
    "short_description": "",
    "category": "Tactics",
    "color": "#8A2BE2",
    "axis_self_opponent": 0.33,
    "axis_mental_physical": 0.33,
    "brightness": 5,
    "size": 3
  },
  {
    "id": "BJJ-001",
    "concept": "Involuntary Yoga",
    "description": "Somewhat funny.  BJJ is involuntary yoga, because we put you in funky twisted positions! AHAHA, ahah. ah.",
    "short_description": "",
    "category": "Memes",
    "color": "#8A2BE2",
    "axis_self_opponent": 0.92,
    "axis_mental_physical": 0.76,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-044",
    "concept": "4/32 Pyramid",
    "description": "Stable base, triangles everywhere, what's not to love about a pyramid analogy!?",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.07,
    "axis_mental_physical": 0.95,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-045",
    "concept": "5/32 Creation",
    "description": "Create opportunities, be proactive and not just reactive.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.57,
    "axis_mental_physical": 0.5,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-046",
    "concept": "6/32 Acceptance",
    "description": "Yield when necessary, if resistance is futile or too energy-intensive, go around, accept the force, work around it, use their force against them.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.5,
    "axis_mental_physical": 0.96,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-047",
    "concept": "7/32 Velocity",
    "description": "Control the speed, decelerate with weight and pressure or accelerate with disengagement, be on  your terms.  Keenan would call it Tempo.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.07,
    "axis_mental_physical": 0.64,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-049",
    "concept": "8/32 Clock, Timing",
    "description": "\"Timing beats speed, precision beats power\" -- Some Irish guy, probably.\n\nWith control you can anticipate, with anticipation you can time your next move to catch them off balance.  Capitalize on opportunities you know will be coming and you're waiting for.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.99,
    "axis_mental_physical": 0.67,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-050",
    "concept": "9/32 River",
    "description": "another way to say \"flow like water\". 流 The kanji for flow has a river element.  Or perhaps \"No man ever has the same roll twice\" Heraclitus 550BC.   Because it's not the same river and we're not the same athletes.  Flow around obstacles, fill that teacup.  Oh and water can crush too.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.46,
    "axis_mental_physical": 0.53,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-052",
    "concept": "11/32 Kuzushi",
    "description": "I feel like this deserves more than to be #11.  it's one of the key concepts of Judo.  Kuzushi|Tsukuri|Kake.  In this list of 32 it's defined as the Opposite the Pyramid.  They have a base? you want to disrupt it.  Endless area of research.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.1,
    "axis_mental_physical": 0.09,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-053",
    "concept": "12/32 Reconnaissance",
    "description": "Reckon team is any point of contact, constantly gather intelligence about your opponent's intention and style and movements and habits.  Anything can and will be used against you.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.73,
    "axis_mental_physical": 0.28,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-054",
    "concept": "13/32 Prevention",
    "description": "\"a pound of prevention is worth a ton of cure\".  -- Benjamin Franklin, 1735, probably.  He was not talking about BJJ, or medicine, but fire safety of Philadelphia.  Same concept.  Deal with problems before they get worse.  Deny that pesky pant grip, keep your elbows tight before someone puts on a Dagestani cuff on.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.34,
    "axis_mental_physical": 0.3,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-055",
    "concept": "14/32 Tension (Apply & Release)",
    "description": "Offer tension then release it when they try to use it against you, like being a step-that-is-not-there in a flight of stairs, divulge your intent to attack in one spot with focused tension, only to release it and divert your 2-on-1 somewhere else.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.15,
    "axis_mental_physical": 0.1,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-056",
    "concept": "15/32 Fork",
    "description": "My take is that it's essentially dilemmas under another name.  Fork in the road, choose one way, but both have their risks.  Force the opponent to make choices, at one point they'll make the wrong one.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.62,
    "axis_mental_physical": 0.6,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-057",
    "concept": "16/32 Posture",
    "description": "Strong body alignment is necessary for lifting and even walking, BJJ is no exception.  Note that another concept defines posture as only being one part of \"alignment\", along with base and structure (thanks Canucks!).  Similar ideas.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.41,
    "axis_mental_physical": 0.65,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-058",
    "concept": "17/32 False Surrender",
    "description": "Feign yielding to lure your opponent into overcommitting, creating openings for counters.   A trap by another name, with the added nuance that you make them believe something they just did worked, rather than passively waiting.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.62,
    "axis_mental_physical": 0.29,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-059",
    "concept": "19/32 Isolation",
    "description": "Divide and conquer.  Apes together strong, ape alone weak.  Isolate a limb and start attacking it with overwhelming force, preventing reinforcement from coming to the rescue.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.09,
    "axis_mental_physical": 0.18,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-060",
    "concept": "18/32 Depletion",
    "description": "Mentally and physically deplete your opponent.  Wear down their energy and resolve to increase their likelihood of making mistakes.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.5,
    "axis_mental_physical": 0.08,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-061",
    "concept": "20/32 Sacrifice",
    "description": "Sacrifice something real or perceived, willingly give up position, grip, or apparent advantage to bait your opponent and gain a greater benefit.  Bait & Trap variations.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.82,
    "axis_mental_physical": 0.65,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-062",
    "concept": "21/32 Momentum",
    "description": "Harness and redirect your opponent’s movement to amplify your own techniques.  Similar to \"give them more than they bargained for\" or \"yielding so there's an empty step\".  Fluid momentum, force errors that they can't correct fast enough.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.16,
    "axis_mental_physical": 0.27,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-063",
    "concept": "22/32 Pivot",
    "description": "Pivots in biomechanics are used to generate force and evade force.  It's essentially a specific use of a fulcrum, used to move rather than apply torque.  Rotation, mobility, redirection.\nFind pivot points to  rotate, change angles, escape, or position yourself more efficiently.\n\n\nDual Use of Pivots/Fulcrums in Biomechanics\nFor Offense; Leverage & Force Application \nPivot points (joints, grips) enable torque by creating rotational force around them.\nUsed to amplify power (e.g., armbars, levers, throws).\n\nFor Defense; Escape & Energy Redirection\nPivot points (body contact points) act as anchors for rotating the body away from danger.\nUsed to evade force efficiently (e.g., hip escapes, granby rolls).",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.27,
    "axis_mental_physical": 0.82,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-064",
    "concept": "23/32 Tag Along",
    "description": "Tag Along (Connect, Sticky)\nMaintain constant attachment to your opponent, following their movement to prevent escapes or counters.   It's linked to the stickiness (Nian 黏) and listening (聽勁 Ting Jing skills) found in chinese arts.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.4,
    "axis_mental_physical": 0.09,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-065",
    "concept": "24/32 Overload",
    "description": "Apply multiple resources (like both hands, or one hand and knee, etc.) to control a single part of your opponent, overwhelming their defenses.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.41,
    "axis_mental_physical": 0.87,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-065",
    "concept": "24/32 Overload",
    "description": "Apply multiple resources (like both hands, or one hand and knee, etc.) to control a single part of your opponent, overwhelming their defenses.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.41,
    "axis_mental_physical": 0.87,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-066",
    "concept": "25/32 Anchor",
    "description": "Secure a stable point of connection to prevent your opponent’s movement and establish control.  Or hook yourself to the opponent so he can't move without having to bear your weight.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.44,
    "axis_mental_physical": 0.26,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-067",
    "concept": "26/32 Ratchet",
    "description": "Make incremental, irreversible gains in position or control, never giving back ground once taken.  The famous Finger-Crawl from mount is one example, slowly gaining ground on a rear strangle is another.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.05,
    "axis_mental_physical": 0.71,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-068",
    "concept": "27/32 buoyancy",
    "description": "They mean this one as \"bubbles of water always find a way to the surface\", and similarly when you're on the bottom you need to find ways for varies parts of your body to naturally evade the pressure and come back up.  Find the cracks, get back on top.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.2,
    "axis_mental_physical": 0.76,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-069",
    "concept": "28/32 Head Control",
    "description": "Where the head goes, the body follows.  The human head is heavy and destabilizes the entire body when brought outside the base of support.  use it to your advantage, keep your own head from being controlled.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.26,
    "axis_mental_physical": 0.17,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-070",
    "concept": "29/32 Redirection",
    "description": "Sounds like Lu (履) in Taichi – Rolling/Deflecting Force (Yield & Redirect)\nIn biomechanics it would be rotational pivot around a central axis (like shoulder/hip/forearm), using circular redirection.\n\nApplication is to evades force by leading it off-center, like a door swinging, \"using their force against them\".",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.29,
    "axis_mental_physical": 0.3,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-071",
    "concept": "30/32 Mobility",
    "description": "\"move yourself when you cannot move your opponent\".  Move around the obstacles.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.2,
    "axis_mental_physical": 0.85,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-072",
    "concept": "31/32 Centerline",
    "description": "Key concept in all martial arts and more.  You can control the inside space, or push/drag a limb across the centerline.  ",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.07,
    "axis_mental_physical": 0.27,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-073",
    "concept": "32/32 Grandmaster ",
    "description": "This is this model's take on constant kaizen.  Constantly applying and building on all the principles to improve your art.  Always seeking efficiency.",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 1,
    "axis_mental_physical": 0.97,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-075",
    "concept": "Vibration",
    "description": "Vibration, or jerking; used by Jason Scully and the DDS (Kipping mount escape among else).   Short jerky motions to overload the proprioception of the opponent.  collar ties, grips; etc:",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.15,
    "axis_mental_physical": 0.78,
    "brightness": 3,
    "size": 1
  },
  {
    "id": "BJJ-075",
    "concept": "Vibration",
    "description": "Vibration, or jerking; used by Jason Scully and the DDS (Kipping mount escape among else).   Short jerky motions to overload the proprioception of the opponent.  collar ties, grips; etc:",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.15,
    "axis_mental_physical": 0.78,
    "brightness": 3,
    "size": 1
  },
  {
    "id": "BJJ-038",
    "concept": "Golden Mean",
    "description": "Golden Mean in everything.  Moderation in everyting, including moderation.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.87,
    "axis_mental_physical": 0.77,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-031",
    "concept": "Form Tension",
    "description": "Form tension in biomechanics refers to the internal force generated within a structure—such as a muscle, tendon, or connective tissue—when it is stretched or deformed, acting to resist the applied load and maintain the shape or integrity of the structure. This tension is a combination of passive (from non-contractile elements like connective tissue) and active (from contractile muscle fibers) components, and is fundamental for stabilizing and supporting body forms during movement and posture.   See Peng in Taichi.    The baseline muscular engagement required to maintain structural integrity during movement or static holds. Not maximal contraction—just enough to preserve alignment, transmit force, and prevent collapse under external load or pressure.\n\nIn grappling, form tension stabilizes frames, connects kinetic chains, and prevents overextension or sagging. Too little: collapse under pressure. Too much: wasted energy, sluggish transitions.\n\nBiomechanically, it manifests as isometric co-contraction (agonist + antagonist) across joints—common in closed guard, tripod base, or during guard passing posture. Good training teaches athletes to modulate tension: spike during bracing, relax during flow.\n\nEfficient grapplers breathe under load—keeping form tension without rigidity.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.22,
    "axis_mental_physical": 0.69,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-076",
    "concept": "Fascia Activation",
    "description": "Fascia activation refers to the stimulation or engagement of the body’s connective tissue network (fascia) through movement, load, or specific exercises, prompting it to respond mechanically and metabolically to support posture, force transmission, and tissue health.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.06,
    "axis_mental_physical": 0.86,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-039",
    "concept": "Puzzle Solving",
    "description": "Reduce the ego, think of though opponents as interesting puzzles to try to solve.   The cognitive process of real-time problem decomposition under physical stress. Involves recognizing patterns (guard types, grips, reactions), generating hypotheses (what happens if I post here?), and applying feedback loops through kinesthetic trial. Athletes cycle through micro-adjustments—angle, timing, leverage—seeking stable control or submission.\n\nBiomechanically, it engages proprioception, spatial reasoning, and fine motor control. Neurologically, it reinforces myelination of adaptive movement sequences. Training should emphasize constraint-based sparring: isolating problems (e.g., escaping mount) forces repeated exposure to solve under pressure.\n\nIn essence: chess with pain compliance.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.96,
    "axis_mental_physical": 0.89,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-077",
    "concept": "Loading & Unloading",
    "description": "Loading and Unloading Limbs\n\nRefers to the shifting of weight and tension through the limbs to enable or restrict movement—core to mobility, balance, and attack setups in grappling.\n\nLoading = transferring weight onto a limb.\n\nFunction: creates base, applies pressure, pins opponent.\n\nExample: posting a leg during a guard pass, weighting an elbow to trap an arm.\n\nBiomechanics: compressive force through joints; engages stabilizers and closes kinetic chains.\n\nUnloading = removing weight from a limb.\n\nFunction: frees limb for movement, redirection, or attack.\n\nExample: lifting a foot for a knee cut, freeing an arm to post or grip.\n\nBiomechanics: initiates open-chain movement; reduces friction and muscular load.\n\nTraining Implication: Elite grapplers cycle load dynamically—loading to create structure, unloading to strike or transition. Mastery lies in timing: unloading just as balance is preserved elsewhere.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.33,
    "axis_mental_physical": 0.87,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-078",
    "concept": "Cloth Tension",
    "description": "Cloth Tension (in Judo)\n\nThe tautness or slack in the gi, created through grip, body positioning, and movement. It serves as a tactile feedback system and force transmission medium.\n\nTight Cloth: Indicates connection. Force applied through the grip transmits efficiently. Enables kuzushi (off-balancing), control, and entries.\n\nExample: pulling the sleeve tight while circling sets up a seoi nage.\n\nBiomechanically: cloth behaves like a tensioned ligament—storing and releasing energy, guiding direction.\n\nLoose Cloth: Reduces connection. Slows force transfer, blunts responsiveness. Can be defensive (to prevent grip breaks) or offensive (to bait reactions).\n\nExample: slackening the lapel grip to induce overcommitment, then re-engaging.\n\nNeuromechanical cue: athletes often read slack/tension changes to anticipate attacks.\n\nTraining Methodology:\nDrills should cultivate tension awareness—feeling when cloth is \"live\" vs \"dead.\" Smart grip fighting isn’t just where you grip, but how tension is maintained or manipulated.\n\nIn short: control the cloth, and you control the connection.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.3,
    "axis_mental_physical": 0.1,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-079",
    "concept": "Joint Slack",
    "description": "Joint Slack\n\nThe small range of passive, non-resistant movement within a joint before structural or muscular tension engages—pre-tension space.\n\nFunctionally: It's the \"dead zone\" before control kicks in.\n\nIn grappling, this is the danger window—where limbs can be moved or twisted before the opponent senses or resists.\n\nExample: a straight armbar exploits elbow slack; once it's gone, tension spikes and injury risk follows.\n\nBiomechanically: Joint slack is governed by capsular laxity, ligament elasticity, and neuromuscular readiness. More slack = more mobility, less stability.\n\nAthletes with high slack (hypermobility) can escape deeper into submissions—but risk delayed injury cues.\n\nAthletes with low slack (tight joints) are harder to manipulate but less flexible under pressure.\n\nTraining Insight:\n\nControl = removing slack: applying grips or pins that take up joint slack limits opponent’s movement options.\n\nDefense = exploiting slack: creating micro-movements within slack zones buys time, space, and reversal windows.\n\nSummary:\nJoint slack is the hidden gap between freedom and control. Mastery is learning to feel and eliminate it—first in others, then in yourself.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.03,
    "axis_mental_physical": 0.5,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-080",
    "concept": "Proprioception",
    "description": "The body's internal sense of position, movement, and force—joint awareness without sight. It's how you know where your arm is in space, or how much pressure you're applying, even with eyes closed.\n\nIn grappling: Proprioception guides balance, grip adjustment, limb positioning, and subtle angle changes under resistance.\n\nExample: adjusting hip angle in closed guard to set up an armbar without visual confirmation.\n\nHigh-level athletes can “read” opponents through tactile input alone—via pressure, resistance, and micro-movements.\n\nBiomechanically: Relies on mechanoreceptors in muscles (muscle spindles), tendons (Golgi tendon organs), and joint capsules. Fast, subconscious feedback loops.\n\nTrained proprioception enables smoother transitions, better weight distribution, and earlier detection of imbalance or threat.\n\nTraining Methodologies:\n\nClosed-eye drills, unstable surfaces, flow rolling, and positional sparring under constraint sharpen this system.\n\nInjury often disrupts proprioception—rehab must include retraining it, not just strength.\n\nIn essence: Proprioception is your sixth sense on the mat—feel without seeing, react without thinking.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 1,
    "axis_mental_physical": 0.98,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-081",
    "concept": "Alioception",
    "description": "analogous to proprioception, but directed outward to the opponent. Afaik Coined by me Jelaludo.  \n\nAlioception: the embodied sense of an opponent’s position, movement, and balance state through direct contact—enabling reactive and anticipatory adjustments in grappling.\n\nFrom Latin alius (“other”) + -ception (“perception”)\n\nThe embodied capacity to detect, interpret, and respond to the position, movement, tension, balance, and intention of another person's body through direct physical contact. Unlike proprioception, which governs awareness of one’s own body, alioception operates outwardly—enabling real-time adaptation to external forces, subtle shifts in pressure, and structural vulnerabilities in an opponent.\n\nIn grappling, alioception underpins timing, sensitivity, and control. It allows practitioners to \"feel\" openings before they appear visually, to preempt resistance, and to maintain dynamic connection without overcommitting. It blends tactile input, kinesthetic intuition, and neuromuscular calibration into an opponent-centered perceptual system.\n\nIn short: alioception is the trained sense of the other’s body, through your own.\n\nI see a similarity with Listening Skills in Taichi.\n\nListening Skill – 聴勁 / tīng jìn\nLiteral meaning: “Listening energy” or “Listening force”\n\nDefinition: The refined ability to perceive the opponent’s intention, balance, structure, and movement through touch—without relying on sight.\n\nPracticed through constant physical contact (sticky hands, push hands), it trains the practitioner to feel shifts in pressure, alignment, relaxation, or tension.\n\nIt’s not passive—it's an active, receptive awareness, like a radar tuned to another's body dynamics.\n\nTing jin emphasizes intent and energy; alioception leans into biomechanics and contact strategy, but they overlap in function.\n\nBoth are trainable through constant-contact drills, sparring, and tactile sensitivity work.\n\nBoth reject reliance on visual cues, favoring a deep embodied reading of the opponent.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.99,
    "axis_mental_physical": 0.03,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-082",
    "concept": "Far-End Lever",
    "description": "The specific point on a skeletal or soft-tissue lever—external or internal—where minimal force yields maximal positional or structural disruption to the target segment.\n\nIt's about mechanical advantage, not just limb length.\n\nWrist twist via carpal stack: Rotating the wrist by isolating bones at the base of the palm—not just bending the hand, but spiraling the radiocarpal lever to lock the forearm.\n\nKnee as a hip lever: Applying torque to the tibia/fibula to realign or fold the femur—used in knee cuts, leg locks, or half guard passing.\n\nElbow as an upper-arm handle: Not just breaking structure, but using elbow torque to reorient the shoulder girdle (e.g. kimura, shoulder clamp).\n\nSkull base / occiput control: Levering the base of the skull (not crown) to disrupt spinal alignment—used in guillotines, rear-naked chokes, or cervical control.\n\nMandible or chin lever: Control at the far end of the jaw provides torque over the cervical spine—used in face cranks, chin straps, or arm triangle adjustments.\n\nIn simple mechanical terms—yes, the force transmission in levers is often linear under ideal conditions. A 10% maladjustment at the far-end (wrong angle, suboptimal grip, slight slack) can equate to a 10% loss in force or control. But in grappling, it gets more nuanced:\n\nIn Theory (Ideal Lever Mechanics)\nForce output at the far end of a lever is:\n\nTorque = Force × Distance × sin(θ)\n\nA deviation in θ (angle), grip placement, or line of pull directly reduces torque.\n\nThus, a 10% error in geometry → ~10% efficiency loss, assuming all else is equal. Linear relationship.\n\nIn Grappling (Applied Reality)\nStill mostly linear—but layered with threshold effects and nonlinear break points:\n\nUnderload Zone\n\n<10% loss: feelable but manageable\n\nSlight inefficiencies accumulate but don’t ruin the technique.\n\nThreshold Breach (~15–25%)\n\nLeverage drops below control threshold.\n\nOpponent regains degrees of freedom → escapes, rotates, posts.\n\nOverload Zone\n\nExcess force applied due to poor lever = wasted energy, self-exposure, or even self-injury.\n\nGrappling is built on levers, levers reward precision.\n\nKey Principles:\nEvery joint is a lever, with a localized fulcrum and multiple usable \"far ends\".\n\nNested levers exist: wrist within elbow, skull within neck, scapula within thorax.\n\nOptimal control points are not always the most distal—but the most structurally efficient for torque, disruption, or redirection.\n\n🔬 Training Implication:\nTrain awareness of micro-levers and bone stack manipulation.\n\nRecognize that precision at the far end yields results up the chain.\n\nExplore positional drilling that teaches students to \"climb the lever backwards\"—from far-end contact to root disruption.\n\nSummary:\nFar-end leverage is not about distance—it's about influence. Grappling mastery comes from identifying and exploiting the lever point that does the most with the least.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.06,
    "axis_mental_physical": 0.06,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-082",
    "concept": "Far-End Lever",
    "description": "The specific point on a skeletal or soft-tissue lever—external or internal—where minimal force yields maximal positional or structural disruption to the target segment.\n\nIt's about mechanical advantage, not just limb length.\n\nWrist twist via carpal stack: Rotating the wrist by isolating bones at the base of the palm—not just bending the hand, but spiraling the radiocarpal lever to lock the forearm.\n\nKnee as a hip lever: Applying torque to the tibia/fibula to realign or fold the femur—used in knee cuts, leg locks, or half guard passing.\n\nElbow as an upper-arm handle: Not just breaking structure, but using elbow torque to reorient the shoulder girdle (e.g. kimura, shoulder clamp).\n\nSkull base / occiput control: Levering the base of the skull (not crown) to disrupt spinal alignment—used in guillotines, rear-naked chokes, or cervical control.\n\nMandible or chin lever: Control at the far end of the jaw provides torque over the cervical spine—used in face cranks, chin straps, or arm triangle adjustments.\n\nIn simple mechanical terms—yes, the force transmission in levers is often linear under ideal conditions. A 10% maladjustment at the far-end (wrong angle, suboptimal grip, slight slack) can equate to a 10% loss in force or control. But in grappling, it gets more nuanced:\n\nIn Theory (Ideal Lever Mechanics)\nForce output at the far end of a lever is:\n\nTorque = Force × Distance × sin(θ)\n\nA deviation in θ (angle), grip placement, or line of pull directly reduces torque.\n\nThus, a 10% error in geometry → ~10% efficiency loss, assuming all else is equal. Linear relationship.\n\nIn Grappling (Applied Reality)\nStill mostly linear—but layered with threshold effects and nonlinear break points:\n\nUnderload Zone\n\n<10% loss: feelable but manageable\n\nSlight inefficiencies accumulate but don’t ruin the technique.\n\nThreshold Breach (~15–25%)\n\nLeverage drops below control threshold.\n\nOpponent regains degrees of freedom → escapes, rotates, posts.\n\nOverload Zone\n\nExcess force applied due to poor lever = wasted energy, self-exposure, or even self-injury.\n\nGrappling is built on levers, levers reward precision.\n\nKey Principles:\nEvery joint is a lever, with a localized fulcrum and multiple usable \"far ends\".\n\nNested levers exist: wrist within elbow, skull within neck, scapula within thorax.\n\nOptimal control points are not always the most distal—but the most structurally efficient for torque, disruption, or redirection.\n\n🔬 Training Implication:\nTrain awareness of micro-levers and bone stack manipulation.\n\nRecognize that precision at the far end yields results up the chain.\n\nExplore positional drilling that teaches students to \"climb the lever backwards\"—from far-end contact to root disruption.\n\nSummary:\nFar-end leverage is not about distance—it's about influence. Grappling mastery comes from identifying and exploiting the lever point that does the most with the least.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.06,
    "axis_mental_physical": 0.06,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-040",
    "concept": "Heuristics",
    "description": "Fast, experience-based rules-of-thumb used to make real-time decisions under pressure. Heuristics reduce cognitive load by replacing exhaustive analysis with pattern recognition and tactical defaults.\n\nHeuristics ≠ techniques. They’re decision frameworks that reduce chaos into action.\n\nThey should be taught alongside techniques as meta-skills.\n\nGood heuristics are adaptive, not rigid.\n\nHeuristics are simplification.  All simplifications are wrong, but some are useful.\n\nWhy Heuristics Matter\nGrappling is dynamic and chaotic.\n\nTime for deep reasoning = zero.\n\nHeuristics enable speed with survivability—even if not always optimal, they are robust.\n\nExamples of BJJ Heuristics\nHeuristic;Application\n“Frame when you can’t move, move when you can’t frame”;Guides positional defense.\n\n“Two on one beats one”; Arm drag, grip breaking, shoulder control.\n\n“Head higher, hips heavier”;Passing posture, pressure principles.\n\n“If they post, you sweep”;Cue for transitioning from submission to reversal.\n\n“Control the inside space”;Dominant frames, underhooks, collar ties.\n\n“If you can see the back, take it”;Positional hierarchy—reward opportunity.\n\n“When in doubt, fight for the underhook”\tUniversal in scrambling and control.\n\n“If they push, pull. If they pull, push.”\t;Kuzushi and tempo control.\n\nHeuristics in BJJ are mental guardrails. They trade perfect choices for fast, repeatable, mostly-right actions under pressure. They're how instincts are built—and how instinct wins.\n\nYou use heuristics to frame your training, and hopefully once they're integrated you don't need to think about them anymore.  Unconscious Competence.",
    "short_description": "",
    "category": "Training",
    "color": "#00CED1",
    "axis_self_opponent": 0.86,
    "axis_mental_physical": 0.87,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-083",
    "concept": "Knee-Elbow",
    "description": "A biomechanical closed frame formed by connecting the knee and elbow on the same side of the body. It is one of the most fundamental and versatile defensive structures in grappling.\n\n🛡️ Primary Function: Structural Defense\nConnects upper and lower body into a compact shell.\n\nProtects against crossface, underhooks, and leg penetration.\n\nPrevents opponent from inserting wedges between limbs (e.g., knee slices, body locks).\n\n⚙️ Biomechanics:\nClosed kinetic chain: Elbow and knee reinforce each other via core tension and skeletal alignment.\n\nLow energy cost: Once connected, minimal muscular effort required to maintain posture.\n\nMobile base: Can shift, pivot, or bridge while maintaining structural integrity.\n\n🔁 Applications in Grappling:\nContext\tUse\nGuard retention\tReconnect frame during inversion or shrimping.\nBottom side control\tKnee-elbow recovery to reinsert guard.\nMount escape\tFrame inside knee to trap and bridge.\nPassing prevention\tBlock incoming knee slice or smash pass.\nBack defense\tElbow fights hook; knee tucks to block second hook.\n\n🧠 Tactical Principle:\n“If you lose frames, reattach elbow to knee.”\n\nIt’s a reset button for defensive posture—restoring structure, slowing momentum, and buying time to rebuild position.\n\n🧩 Training Focus:\nRepetition under fatigue: train instinct to reconnect elbow to knee under pressure.\n\nCombine with hip escape, inversion, and turtle transitions.\n\nSummary:\nKnee-elbow is the grappler’s shield. It’s compact, efficient, and adaptable. Learn it, keep it, rebuild it—it's your first line of survival.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.19,
    "axis_mental_physical": 0.81,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-083",
    "concept": "Knee-Elbow",
    "description": "A biomechanical closed frame formed by connecting the knee and elbow on the same side of the body. It is one of the most fundamental and versatile defensive structures in grappling.\n\n🛡️ Primary Function: Structural Defense\nConnects upper and lower body into a compact shell.\n\nProtects against crossface, underhooks, and leg penetration.\n\nPrevents opponent from inserting wedges between limbs (e.g., knee slices, body locks).\n\n⚙️ Biomechanics:\nClosed kinetic chain: Elbow and knee reinforce each other via core tension and skeletal alignment.\n\nLow energy cost: Once connected, minimal muscular effort required to maintain posture.\n\nMobile base: Can shift, pivot, or bridge while maintaining structural integrity.\n\n🔁 Applications in Grappling:\nContext\tUse\nGuard retention\tReconnect frame during inversion or shrimping.\nBottom side control\tKnee-elbow recovery to reinsert guard.\nMount escape\tFrame inside knee to trap and bridge.\nPassing prevention\tBlock incoming knee slice or smash pass.\nBack defense\tElbow fights hook; knee tucks to block second hook.\n\n🧠 Tactical Principle:\n“If you lose frames, reattach elbow to knee.”\n\nIt’s a reset button for defensive posture—restoring structure, slowing momentum, and buying time to rebuild position.\n\n🧩 Training Focus:\nRepetition under fatigue: train instinct to reconnect elbow to knee under pressure.\n\nCombine with hip escape, inversion, and turtle transitions.\n\nSummary:\nKnee-elbow is the grappler’s shield. It’s compact, efficient, and adaptable. Learn it, keep it, rebuild it—it's your first line of survival.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.19,
    "axis_mental_physical": 0.81,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-084",
    "concept": "Wedges",
    "description": "A wedge is a structural insertion that creates or preserves space, disrupts alignment, or amplifies force. In grappling, wedges are anatomical tools—elbows, knees, feet, hands—placed between the opponent and the ground or between limbs to create mechanical advantage.\n\n🔩 Core Functions:\nDisrupt Structure – Break posture, frames, or base\n\nCreate Leverage – Serve as pivot points for sweeps or submissions\n\nMaintain Space – Prevent opponent from collapsing into dominant position\n\nTransfer Force – Direct energy into weak structural angles (e.g., armpit, hip crease)\n\n🦴 Biomechanical Reality:\nA wedge is effective when it's:\n\nInserted deep (near fulcrum)\n\nStructurally aligned (bones stacked, tension braced)\n\nTimed under pressure (before collapse or counter)\n\nElbow inside knee = wedge for guard recovery\n\nKnee in armpit = wedge for omoplata or shoulder control\n\nFoot on hip = wedge for distance and framing\n\nShoulder under chin = wedge for passing or neck control\n\n🧠 Strategic Use:\nBottom Game: Wedges buy space and time\n\nTop Game: Wedges isolate limbs, elevate hips, and dismantle defense\n\nTransitions: Wedges control tempo—insert to slow them, remove to accelerate you\n\n🔁 Principle:\nGrappling without wedges is pushing a door with no hinge.\nInsert wedge → load structure → rotate or collapse opponent.\n\nSummary:\nWedges are grappling’s invisible levers. They convert pressure into posture breaks, space into control, and friction into force.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.34,
    "axis_mental_physical": 0.24,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-085",
    "concept": "Joint Above",
    "description": "To apply breaking pressure to a joint, you must immobilize or control the joint above it in the kinetic chain. This prevents your opponent from moving their body in a way that dissipates force, rotates out, or structurally relieves the pressure.\n\nIf a joint under attack is free to move proximally (upstream in the chain), the pressure disperses rather than focuses.\n\nControlling the proximal joint anchors the limb in place, forcing the targeted joint to bear the full load of the submission.\n\nHeel hook attacks the knee ligaments from the ankle, and requires hip control.\n\nArmbar attacks the elbow joint, but without shoulder control they can rotate and adjust the angle to relieve pressure and escape.\n\nKimura attacks the shoulder girdle, but unless you control the ribcage/spine they can rotate out.\n\nStraight ankle lock raises their knee naturally, unless its held in place.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.04,
    "axis_mental_physical": 0.11,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-041",
    "concept": "Always Protect Yourself",
    "description": "Don’t Put Yourself at the Mercy of Others.  In training, relying solely on your partner’s control, restraint, or decision-making to avoid injury can be reckless. A single mistake can result in sudden, serious injury.  Position before trust.  Your safety is your responsibility.  Don't outsource control.  \n\nAvoid hanging in an inverted position where their weight might drop on you suddenly and spike your spine.\n\nDon't be **too loose, loads of slack in, say, your arm while trying to escape and you miss the sudden bridging pressure and can't tap in time.\n\nBad heel hook defense trying to tough it out.\n\nWait until you feel pain beefore tapping.",
    "short_description": "",
    "category": "Training",
    "color": "#00CED1",
    "axis_self_opponent": 0.4,
    "axis_mental_physical": 0.58,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-086",
    "concept": "Back-Heeling",
    "description": "retracting your heel backward into your own body to generate clamping pressure.  Hamstrings for knee flexion.  Tension and rotational torque.\n\narmbars; back-heel is a primary control of the torso/shoulder, to get your hips closer to their center of mass.\n\nleglocks; back-heel above their knee to lock it into place.\n\ntriangle, body triangle, leg clamps; back-heeling is everywhere.\n\ncommon mistake; extend or relax the legs too much, this can open space and reduce pressure.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.13,
    "axis_mental_physical": 0.5,
    "brightness": 1,
    "size": 1
  },
  {
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
    "id": "BJJ-042",
    "concept": "Last Battle",
    "description": "Do no fight the last battle.   Realize when the game has changed, when the battleground has shifted.   Accept that your defenses have failed and switch to damage mitigation and recovery.\n\nsimilar to Keenan's \"Win small battles then don't realize are happening\" (about passing over the knee in worm guard)",
    "short_description": "",
    "category": "Tactics",
    "color": "#8A2BE2",
    "axis_self_opponent": 0.33,
    "axis_mental_physical": 0.33,
    "brightness": 5,
    "size": 3
  },
  {
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
    "id": "BJJ-007",
    "concept": "Murder Yoga",
    "description": "see. Involutary Yoga, with a more r/iambadass vibe.",
    "short_description": "",
    "category": "Memes",
    "color": "#8A2BE2",
    "axis_self_opponent": 0.92,
    "axis_mental_physical": 0.86,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-008",
    "concept": "Legal Strangulation",
    "description": "Where the dojo becomes a place where consenting adults can legally strangle each other for their personal fullfilment.",
    "short_description": "",
    "category": "Memes",
    "color": "#8A2BE2",
    "axis_self_opponent": 0.72,
    "axis_mental_physical": 0.65,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-052",
    "concept": "so strong!",
    "description": "e.g. \"your technique sucks and your just power through everything bro\"",
    "short_description": "",
    "category": "Memes",
    "color": "#8A2BE2",
    "axis_self_opponent": 0.35,
    "axis_mental_physical": 0.3,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-084",
    "concept": "Wedges",
    "description": "A wedge is a structural insertion that creates or preserves space, disrupts alignment, or amplifies force. In grappling, wedges are anatomical tools—elbows, knees, feet, hands—placed between the opponent and the ground or between limbs to create mechanical advantage.\n\n🔩 Core Functions:\nDisrupt Structure – Break posture, frames, or base\n\nCreate Leverage – Serve as pivot points for sweeps or submissions\n\nMaintain Space – Prevent opponent from collapsing into dominant position\n\nTransfer Force – Direct energy into weak structural angles (e.g., armpit, hip crease)\n\n🦴 Biomechanical Reality:\nA wedge is effective when it's:\n\nInserted deep (near fulcrum)\n\nStructurally aligned (bones stacked, tension braced)\n\nTimed under pressure (before collapse or counter)\n\nElbow inside knee = wedge for guard recovery\n\nKnee in armpit = wedge for omoplata or shoulder control\n\nFoot on hip = wedge for distance and framing\n\nShoulder under chin = wedge for passing or neck control\n\n🧠 Strategic Use:\nBottom Game: Wedges buy space and time\n\nTop Game: Wedges isolate limbs, elevate hips, and dismantle defense\n\nTransitions: Wedges control tempo—insert to slow them, remove to accelerate you\n\n🔁 Principle:\nGrappling without wedges is pushing a door with no hinge.\nInsert wedge → load structure → rotate or collapse opponent.\n\nSummary:\nWedges are grappling’s invisible levers. They convert pressure into posture breaks, space into control, and friction into force.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.34,
    "axis_mental_physical": 0.24,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-076",
    "concept": "Fascia Activation",
    "description": "Fascia activation refers to the stimulation or engagement of the body’s connective tissue network (fascia) through movement, load, or specific exercises, prompting it to respond mechanically and metabolically to support posture, force transmission, and tissue health.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.06,
    "axis_mental_physical": 0.86,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-077",
    "concept": "Loading & Unloading",
    "description": "Loading and Unloading Limbs\n\nRefers to the shifting of weight and tension through the limbs to enable or restrict movement—core to mobility, balance, and attack setups in grappling.\n\nLoading = transferring weight onto a limb.\n\nFunction: creates base, applies pressure, pins opponent.\n\nExample: posting a leg during a guard pass, weighting an elbow to trap an arm.\n\nBiomechanics: compressive force through joints; engages stabilizers and closes kinetic chains.\n\nUnloading = removing weight from a limb.\n\nFunction: frees limb for movement, redirection, or attack.\n\nExample: lifting a foot for a knee cut, freeing an arm to post or grip.\n\nBiomechanics: initiates open-chain movement; reduces friction and muscular load.\n\nTraining Implication: Elite grapplers cycle load dynamically—loading to create structure, unloading to strike or transition. Mastery lies in timing: unloading just as balance is preserved elsewhere.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.33,
    "axis_mental_physical": 0.87,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-078",
    "concept": "Cloth Tension",
    "description": "Cloth Tension (in Judo)\n\nThe tautness or slack in the gi, created through grip, body positioning, and movement. It serves as a tactile feedback system and force transmission medium.\n\nTight Cloth: Indicates connection. Force applied through the grip transmits efficiently. Enables kuzushi (off-balancing), control, and entries.\n\nExample: pulling the sleeve tight while circling sets up a seoi nage.\n\nBiomechanically: cloth behaves like a tensioned ligament—storing and releasing energy, guiding direction.\n\nLoose Cloth: Reduces connection. Slows force transfer, blunts responsiveness. Can be defensive (to prevent grip breaks) or offensive (to bait reactions).\n\nExample: slackening the lapel grip to induce overcommitment, then re-engaging.\n\nNeuromechanical cue: athletes often read slack/tension changes to anticipate attacks.\n\nTraining Methodology:\nDrills should cultivate tension awareness—feeling when cloth is \"live\" vs \"dead.\" Smart grip fighting isn’t just where you grip, but how tension is maintained or manipulated.\n\nIn short: control the cloth, and you control the connection.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.3,
    "axis_mental_physical": 0.1,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-089",
    "concept": "Negate Grips",
    "description": "Sometimes a grip needs to be broken, often you can simply render it useless.\n\ne.g., they grab you sleeve, but you use that hand to grab their knee or their belt, suddenly they don't quite have the control they expected anymore.\n\nturning their grips into wristlocks opportunities is another option.",
    "short_description": "",
    "category": "Tactics",
    "color": "#8A2BE2",
    "axis_self_opponent": 0.03,
    "axis_mental_physical": 0.02,
    "brightness": 1,
    "size": 1
  },
  {
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
  },
  {
    "id": "BJJ-092",
    "concept": "Communicate well",
    "description": "",
    "short_description": "",
    "category": "Coaching",
    "color": "#6b6d70",
    "axis_self_opponent": 0.71,
    "axis_mental_physical": 0.73,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-093",
    "concept": "Different learning patterns",
    "description": "",
    "short_description": "",
    "category": "Coaching",
    "color": "#6b6d70",
    "axis_self_opponent": 0.69,
    "axis_mental_physical": 0.73,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-094",
    "concept": "Cut your nails",
    "description": "Scratchy scratch training partner no good.\ndangerous, unhygienic, may lead to divorces.\n\nYeah, toenails too.",
    "short_description": "",
    "category": "White Belt Tips",
    "color": "#edeff2",
    "axis_self_opponent": 0.2,
    "axis_mental_physical": 0.88,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-095",
    "concept": "Clean Feet",
    "description": "Wash your feet at least a little bit before you offer someone a toe-hold.   Full shower, body wipes, some water a towel, some disinfecting alcohol... something.",
    "short_description": "",
    "category": "White Belt Tips",
    "color": "#edeff2",
    "axis_self_opponent": 0.14,
    "axis_mental_physical": 0.85,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-096",
    "concept": "Accept the Firehose",
    "description": "You'll be drinking from a firehose at first, even an empty cup will fill up fast, information overload... it's ok.  Just retain what you can and file the rest away somewhere in the recess of your brain.  Enjoy the constant discoveries.",
    "short_description": "",
    "category": "White Belt Tips",
    "color": "#edeff2",
    "axis_self_opponent": 0.94,
    "axis_mental_physical": 0.84,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-097",
    "concept": "Jewelry off",
    "description": "Best case nothing happens, but let's list the potential negatives; earring or piercing get ripped and you get hurt, you scratch a training partner to blood, your jewelry gets broken and you lose it, your ring fingers gets so swollen that you can't take your ring off anymore, and you need medical help to cut the ring (happened to me! painful... soap, dental floss, nothing worked... doctor actually refered me to firefighters to deal with it, and they had a special tiny saw for rings.)",
    "short_description": "",
    "category": "White Belt Tips",
    "color": "#edeff2",
    "axis_self_opponent": 0.1,
    "axis_mental_physical": 0.93,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-098",
    "concept": "Transparent Pricing",
    "description": "Free Trial, drop-in fee for beginner? no drop-in for black belts? be transparent on the website, it makes it easier to people to drop by and potentially join.",
    "short_description": "",
    "category": "Coaching",
    "color": "#6b6d70",
    "axis_self_opponent": 0.88,
    "axis_mental_physical": 0.2,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-099",
    "concept": "Remember names",
    "description": "it's hard when there are loads of students, and that one reason why I like Japan where it's common for blue-belts to start embroidering their names on their belts.\n\nHumans appreciate when they're acknowledged.\nStudents and athletes are hopefully a bit more than just paying customers.",
    "short_description": "",
    "category": "Coaching",
    "color": "#6b6d70",
    "axis_self_opponent": 0.89,
    "axis_mental_physical": 0.8,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-100",
    "concept": "Identify misconceptions",
    "description": "If a student is not getting something, reflect on what other building block they might be missing that they're not getting this.",
    "short_description": "",
    "category": "Coaching",
    "color": "#6b6d70",
    "axis_self_opponent": 0.75,
    "axis_mental_physical": 0.26,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-101",
    "concept": "Invisible Jiu Jitsu",
    "description": "Rickson Gracie, Henry Akins... Miyamoto Musashi before them.\n\"第六に、あらゆることについて、ものごとの本質を見分ける力を養うこと。\n第七に、目に見えぬ本質をさとること。\"\n6. In everything, develop the ability to see the essence.\n7. Become aware of the essence the eyes cannot see.\n\nit's mostly weight distribution and proprioception shutting down even attempts at adjusting.\n\nyeah, it's micro-adjusments.\n\nmicro-adjustements done by a white belt : Bullshit\nmicro-adjustments done by a legend : invisible jiu jitsu magic",
    "short_description": "",
    "category": "Internal",
    "color": "#4F8EF7",
    "axis_self_opponent": 0.28,
    "axis_mental_physical": 0.68,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-102",
    "concept": "Distance Management",
    "description": "You can neither let them get away nor invade your space.  Especially crucial if striking is involved.\n\nThe tools to prevent them coming in are frames and protecting the inside space.\nThe tools to prevent them from retreating too much are hooks, clamps, entanglements, russian-tie, grips, etc.",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.22,
    "axis_mental_physical": 0.5,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-103",
    "concept": "1/32 Connection",
    "description": "Establishing a connection with the opponent is how we ensure that our movements affects their center of gravity and balance and ability to recover.\n\nMy take on it is that you can;\ngrab someone and have no connection.\ngrab some cloth (gi) and have some connection if there's cloth-tension.\n\nhaving an keeping connection requires some level of training and proprioception awareness.\n\nit is most obviously achieved through the bones, either very obvious connection like hip-bone to hip-bone in a mount escape scenario, or more subtle, like grabbing a wrist and creating enough tension that it allows you to manipulate their shoulder or more.\n",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.5,
    "axis_mental_physical": 0.5,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-104",
    "concept": "3/32 Distance",
    "description": "see distance management",
    "short_description": "",
    "category": "32 Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.33,
    "axis_mental_physical": 0.5,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-105",
    "concept": "Breathing",
    "description": "Physiological control, panic, oxygenation and exhaustion, out of breath as a key indicator for the opponent, faking fatigue or calmness... so many elements to breath.\n\nManage panic during escapes\nOptimize frames under pressure\nConserve energy\nTime explosing movements\nMask fatigue\nCreate deception",
    "short_description": "",
    "category": "Internal",
    "color": "#4F8EF7",
    "axis_self_opponent": 0.5,
    "axis_mental_physical": 0.99,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-106",
    "concept": "Cursing Cursor",
    "description": "vibe coding is not for the faint of heart; #AngerManagement",
    "short_description": "",
    "category": "Internal",
    "color": "#4F8EF7",
    "axis_self_opponent": 0.61,
    "axis_mental_physical": 0.71,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-107",
    "concept": "4-Steps-System",
    "description": "1. takedown (takes away explosive kinetic energy)\n2. pass the dangerous legs\n3. hierarchy of pins (rated on their ability to harm an opponent on the ground with strikes)\n4. submission\n\n\"beautiful, elegant, and deadly effective\"\n                            - John Danaher\n\nwhere do leg locks fit?",
    "short_description": "",
    "category": "Strategy",
    "color": "#FF8C00",
    "axis_self_opponent": 0.89,
    "axis_mental_physical": 0.83,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-108",
    "concept": "Fluid Momentum",
    "description": "\"Fluid Momentum, leading to positions, then submissions\"\nAnother model, 3 steps.  Similar to Flow-Pressure-Finish.\nDefinitely a very valid way to explain how it's supposed to unfold at high levels.  Also Karel loves to train in water, fluid ^^\n",
    "short_description": "",
    "category": "Strategy",
    "color": "#FF8C00",
    "axis_self_opponent": 0.81,
    "axis_mental_physical": 0.68,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-109",
    "concept": "Flow-Pressure-Finish",
    "description": "Antother Triadic Model, Flow–Pressure–Finish model is with the Ribeiro Ryuuha.\n\n\nFlow:\nMovement without resistance; maintaining balance and adapting to the opponent.  Emphasis on staying mobile and relaxed, especially early in exchanges. Supple.\n\nPressure:\nOnce the opportunity arises, apply pressure to control and fatigue the opponent.  This includes top pressure, positional dominance, and even psychological pressure.\n\nFinish:\nAfter pressure breaks down resistance, go for the submission cleanly and decisively.  Ideally the submission is not forced but the result of the first two phases being executed correctly.\n\n\nMeasured, technical, and composed. Rather than forcing submissions, they emphasize structure, timing, and progressive dominance. You \"flow\" to find openings, apply \"pressure\" to trap your opponent, then \"finish\" once resistance is nullified and they have no more options.\n",
    "short_description": "",
    "category": "Strategy",
    "color": "#FF8C00",
    "axis_self_opponent": 0.81,
    "axis_mental_physical": 0.79,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-110",
    "concept": "Kuzushi-Tsukuri-Kake",
    "description": "We hear a lot of people talk about Kuzushi (often mispronunced Kazushi like Sakuraba's firt name, lol)\n\nNot enough focus is on the either side of the equation according to Kano, i.e. Kuzushi disrupts the other, Tsukuri is about building yourself.\n\nThat is fucking deep.\nI'm obsesses with this idea.\n\nto be even more precise and a total nerd about this, Kano Jigoro wrote that Tsukuri (building) is made of two parts:\n(Kuzushi) disrupting the opponent + Jibun wo Tsukuru (building yourself) = Tsukuri (Set-Up)\n\nonce the set-up is accomplished, you are in strong position to generate force, they are compromised, then a technique can be executed (kake).\n\nsource: Kodokan judo website, 30 years in Japan.\n\n\n---https://www.kuzushi.xyz/2019/10/31/kuzushi-tsukuri-kake-the-doctrine-and-purpose-of-judo/\n\nThe doctrine and purpose of Judo.\n\n崩し Kuzushi comes from the verb 崩す (Kuzusu) meaning…many things : destroy, tear down, pull apart, sit at ease, lose one’s balance, write in cursive style, break a big bill in small bills, get sick.\n\n作る Tsukuru can mean : Make, build, produce, establish, set-up, found, form, write, compose, etc.\n\n掛ける Kakeru also has multipel uses, most relevant ones here would be : start (an engine), turn (a switch on), put ( a burden) on someone, catch (a fish in a net, a bear in a trap)\n\n「崩し」imbalance (the opponent) | Break | Disrupt\n\n「作り」set-up (your own body) | Set | Prepare\n\n「掛け」perform (the technique) | Do | Execute\n\n技の原理\n\n「身体と精神を最も有効に働かせる」、これが柔道の根本原理で、この原理を技の上に生かしたのが「作り」と「掛け」の理論となります。\n\n「作り」は、相手の体を不安定にする「くずし」と、自分の体が技を施すのに最も良い位置と姿勢をとる「自分を作る」ことから成り立っています。 「掛け」は、この作られた一瞬に最後の決め手を施すことをいいます。\n\nこの「作り」と「掛け」は、柔道の根本原理に従った技術原理ということができます。\n\n互いに、精力善用・自他共栄の根本原理に即した作りと掛けを競い合う間に、自然とこの根本原理を理解し、体得して、社会百般の実生活に生かそうとしています。\n\n「技から道に入る」わけです。\n\nThe principle of Waza\n\n(www.kuzushi.xyz translation)\n\nThe “optimal use of body and mind” is a foundational principle of Judo, which comes to life through the theories of Tsukuri (set-up) and Kake (performing the technique).\n\nTsukuri is made of both breaking the balance of the other (Kuzushi) and setting up one’s own body with the best position and posture (Jibun wo  tsukuru – Building oneself).\n\nKake (perform) is what we call the culmination of that one instant which we set-up.   \n\nWe can call Tsukuri and Kake the technical principles that follow the basic principles of Judo.\n\nBreak (the other), Set (oneself), Catch (in our trap)\n\nBreak (the other), Set (oneself), do (the technique)\n\nBreak (the other), Set (oneself), execute\n\nTherefore I propose these mnemonics :\nbreak – set – catch\n\n[break~set] – do\n\n[set~break] – execute\n\n(the order of the first two is interchangeable)\n\nThere are three ways, traditionally, of making kuzushi happen:\n\ndirect action (e.g. pulling or pushing while entering for a throw);\n\ninducing opponent’s action (e.g. a feint or combination attack);\n\ndirect action by opponent (e.g. a counter throw).\n\nBy Jelaludo\n\n\n",
    "short_description": "",
    "category": "Strategy",
    "color": "#FF8C00",
    "axis_self_opponent": 0.96,
    "axis_mental_physical": 0.68,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-111",
    "concept": "Positional Dominance",
    "description": "\"Position before submission\"\n\nA generic model of what to prioritize.  Limited but still useful.\n\nCaveats; high-level competitions have plenty of examples of explosive submissions coming out of nowhere fast.",
    "short_description": "",
    "category": "Strategy",
    "color": "#FF8C00",
    "axis_self_opponent": 0.72,
    "axis_mental_physical": 0.6,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-112",
    "concept": "Micro-Adjustments",
    "description": "a white belt on reddit talked about winning a round by doing \"micro-adjustments\", and it was seen as cringe and boasting and vague.    Yet doing micro-adjustments is entirely legit, small rotation of the shoulder girdle, slight weight shift, forearm angle change as they try to collapse your frames, \"micro adjustments2 *are everywhere.  It just felt funny to the m̶i̶n̶d̶h̶i̶v̶e̶c community because it came from mere white belt.  Boastful? sure, but cut him some slack ^^",
    "short_description": "",
    "category": "Memes",
    "color": "#8A2BE2",
    "axis_self_opponent": 0.3,
    "axis_mental_physical": 0.2,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-113",
    "concept": "Two Inches",
    "description": "\"A black belt only covers two inches of your ass. You have to cover the rest.\"  Royce Gracie",
    "short_description": "",
    "category": "Black Belt Wisdom",
    "color": "#FF6B35",
    "axis_self_opponent": 0.77,
    "axis_mental_physical": 0.65,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-114",
    "concept": "You will be hunted",
    "description": "Coloured Belt younger folks will hunt your like you were a video game achievement: \"Tapped my first black belt!\".  And it is ok.\n\n\"A purple belt is a mini-black\", parts of their game might be sharper than yours.",
    "short_description": "",
    "category": "Black Belt Wisdom",
    "color": "#FF6B35",
    "axis_self_opponent": 0.61,
    "axis_mental_physical": 0.55,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-115",
    "concept": "Uncomfortable Deference",
    "description": "In some places you get uncomfortable deference for being a black belt, lining up in a special spot, people asking you for authorization to get on the mats.  Every gym is a bit different.  Don't let it get to your head.",
    "short_description": "",
    "category": "Black Belt Wisdom",
    "color": "#FF6B35",
    "axis_self_opponent": 0.59,
    "axis_mental_physical": 0.26,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-116",
    "concept": "Keep Learning.",
    "description": "Advice for each belt : \nWhite : Relax\nBlue : Relax\nPurple : Relax\nBrown : Relax\nBlack : Keep Learning\n-- Jocko?\n\nnot a bad model ^^\nkeep learning, it never stops!",
    "short_description": "",
    "category": "Black Belt Wisdom",
    "color": "#FF6B35",
    "axis_self_opponent": 0.67,
    "axis_mental_physical": 0.75,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-117",
    "concept": "Noob Spaz",
    "description": "Uncontrolled danger, the worst kind.\n\nExplodes, flails, muscles through everything, refuses to tap... *sigh*",
    "short_description": "",
    "category": "Player Types",
    "color": "#1b4b01",
    "axis_self_opponent": 0.11,
    "axis_mental_physical": 0.14,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-118",
    "concept": "Chill Veteran",
    "description": "been there, done that.  Ok to tap, playful, just want to keep moving and learning new fancy spinning shit, even if it is not the highest-percentage meta.",
    "short_description": "",
    "category": "Player Types",
    "color": "#1b4b01",
    "axis_self_opponent": 0.94,
    "axis_mental_physical": 0.81,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-119",
    "concept": "White/Blue Belt IG influencer",
    "description": "more in it for the vibes? still chill, all good.",
    "short_description": "",
    "category": "Player Types",
    "color": "#1b4b01",
    "axis_self_opponent": 0.13,
    "axis_mental_physical": 0.72,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-120",
    "concept": "Unmoved in Mind",
    "description": "\"[...] learn to be unmoved in mind even in the heat of battle.\"\n   Miyamoto Musashi\n\nand a competition is not even a real battle... ^^\n\nEveryone has some nerves before a competition, I'd reckon.  Some elevated heartbeat, some anticipation.\n\nLet's learn to calm the anxious mind, breathe, face competition as just another hard training round.\n",
    "short_description": "",
    "category": "Competition",
    "color": "#9e1010",
    "axis_self_opponent": 0.79,
    "axis_mental_physical": 0.71,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-121",
    "concept": "Private Lessons w/Champions",
    "description": "$200 to $500+/h\n\nGreat if you can afford it.  Some Champions make for fantastic coaches (they adapt their teachings to you) others not so much (they'll just teach their same go-to to everyone).",
    "short_description": "",
    "category": "Resources",
    "color": "#4f7e16",
    "axis_self_opponent": 0.77,
    "axis_mental_physical": 0.99,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-122",
    "concept": "@craighutchisonjj",
    "description": "Great IG follow.  Concise and valuable tips.",
    "short_description": "",
    "category": "Resources",
    "color": "#4f7e16",
    "axis_self_opponent": 0.04,
    "axis_mental_physical": 0.06,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-123",
    "concept": "BJJ Fanatics",
    "description": "  Danaher                     (hours) \n1. System : Back Attack\t\t8 \n2. System : Leglock\t\t10\n3. System : Kimura\t\t10\n4. System : Front Headlock\t10\n5. System : Triangle\t\t10\n6. System : Armbar\t\t11.5\n\nHours upon hours of instructionals.\n\nthe \"correct\" way to consumer such long instructionals is to watch until you get some insight, or something specific to work you >> go physically do it.\n\nonce you've reasonably figured out this new piece, keep watching.\n\nnow, you could say that the 11.5 hours of Armbar instructions by Danaher could be distilled into 2, possibly.   it remains that there are hundreds of hours worth of material to be seen on BJJ Fanatics.\n\n\n",
    "short_description": "",
    "category": "Resources",
    "color": "#4f7e16",
    "axis_self_opponent": 0.99,
    "axis_mental_physical": 0.71,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-124",
    "concept": "BeltChecker.com",
    "description": "a cool community, an open-source alternative to the IBJJF.  Register, join the discussions, find new people to visit when traveling worldwide.  Linked with the Globetrotters.\nbjjglobetrotters.com",
    "short_description": "",
    "category": "Resources",
    "color": "#4f7e16",
    "axis_self_opponent": 0.38,
    "axis_mental_physical": 0.21,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-125",
    "concept": "bjjglobetrotters.com",
    "description": "www.bjjglobetrotters.com/bjjcamps\n\ndays or weeklongs camps in beautiful venues.\nHundreds to thousands of $\n\nlooks like so much fun.  One day I shall make the time.",
    "short_description": "",
    "category": "Resources",
    "color": "#4f7e16",
    "axis_self_opponent": 0.99,
    "axis_mental_physical": 0.87,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-126",
    "concept": "YT @BJJGlobetrotters",
    "description": "a great YouTube Channel with dozens of videos from @BJJGBlobetrotters camps, typically 40m  (20m to 1h+) \n\nsome gems in there.",
    "short_description": "",
    "category": "Resources",
    "color": "#4f7e16",
    "axis_self_opponent": 0.99,
    "axis_mental_physical": 0.11,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-127",
    "concept": "r/bjj",
    "description": "a bjj community... 866k members (Summer 2025)\nsome great discussions, some silly memes.",
    "short_description": "",
    "category": "Resources",
    "color": "#4f7e16",
    "axis_self_opponent": 0.24,
    "axis_mental_physical": 0.03,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-128",
    "concept": "Passing Definition",
    "description": "Occupying the space between the knee and the armpit.  Regardless of the dozens of passes, they all accomplish some version of doing this; you started with their legs or hands as obstacles between you and the space between their knees/hip and armpit.\n\nIf you've passed the knee but they're still framing with their hands, you haven't really passed.\n\nIf you do some fancy reverse de la worm grip and you've reached the stage where you got above their knee, you've lowkey already passed, essentially. (\"Omae no Gaado ha mou shinderu\")",
    "short_description": "",
    "category": "Grappling Primitives",
    "color": "#848a94",
    "axis_self_opponent": 0.35,
    "axis_mental_physical": 0.5,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-129",
    "concept": "Suffocating Comfort",
    "description": "You're chilling, they're dying.\n\nThe idea is to maintain a relaxed, energy-efficient position while forcing our opponent into a state of escalating discomfort and desperation. Rather than chasing submissions or transitions aggressively, the focus is on creating a biomechanical and psychological trap: the opponent feels pressure mounting, breathing restricted, and escape options dwindling.   All while the controlling grappler expends minimal effort. \n\nThis can occur from dominant pins, Dagestani Cuffs, tight bodylocks, spine-twists; any slow-cooking positional advantage. The essence of Suffocating Comfort is that asymmetry where one person suffers and scrambles, while the other remains calm, heavy, and opportunistic, waiting for fatigue or panic to create the opening.\n\n\nDead Weight.\n\"Make sure they're always uncomfortable\"\nPain maximization.\nRelaxed torture; your leisure is their torment.",
    "short_description": "",
    "category": "Strategy",
    "color": "#FF8C00",
    "axis_self_opponent": 0.23,
    "axis_mental_physical": 0.19,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-130",
    "concept": "Young Competition Beast",
    "description": "Something to prove.  Great and always ready to show it off, accumulating trophies, be it literal cheap ones from the IBJJF, or figurative ones like tapping the slightly out-of-shape hobbyist browns and blacks.",
    "short_description": "",
    "category": "Player Types",
    "color": "#1b4b01",
    "axis_self_opponent": 0.9,
    "axis_mental_physical": 0.16,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-131",
    "concept": "Dominant Champion",
    "description": "So good they don't really need to be aggro.  Gordon Ryan's competition style stands out in this way.",
    "short_description": "",
    "category": "Player Types",
    "color": "#1b4b01",
    "axis_self_opponent": 0.99,
    "axis_mental_physical": 0.96,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-132",
    "concept": "Thenar Muscles",
    "description": "They're the fat pads at the base of the thumb and the base of the little finger.  Crucial to control the hand.\n\nuse the opponent's Thenar and Hypothenar eminences as control point and levers for wristlocks, use your own for grips and chin-straps.\n\nAn awareness of those muscles allows more precise control in grips, with mechanical advantage and reduction in tension to fatigue more slowly.",
    "short_description": "",
    "category": "Anatomy Awareness",
    "color": "#848a94",
    "axis_self_opponent": 0.58,
    "axis_mental_physical": 0.61,
    "brightness": 5,
    "size": 1
  },
  {
    "id": "BJJ-133",
    "concept": "Elbow Point",
    "description": "The bony tip of the elbow serves as a powerful wedge when inserted into tight spaces, such as under an armpit, against a hip, or into a neck fold. Its sharp structure allows for high pressure with minimal effort, creating space or immobilizing a limb when used in framing.\n\nOne direct use of the elbow point is to break an attempt to prevent the Kimura by holding one's belt.",
    "short_description": "",
    "category": "Anatomy Awareness",
    "color": "#848a94",
    "axis_self_opponent": 0.72,
    "axis_mental_physical": 0.34,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-134",
    "concept": "Tibia",
    "description": "The Shin-Bone.\n\nFor knee-slices, knee-on-belly, leg-ride, shin-on-shin.\n\nThe ridge of the shin acts as a slicing or grinding tool When driven across the opponent’s body, it is sharp and creates discomfort and disrupts alignment.\n\nAlso key to angle it properly for calf-slicers.",
    "short_description": "",
    "category": "Anatomy Awareness",
    "color": "#848a94",
    "axis_self_opponent": 0.67,
    "axis_mental_physical": 0.27,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-135",
    "concept": "Ulna",
    "description": "Ulna and Radius.  The forearm bones.\n\nUse it to frame, or to drive your weight into the soft tissue of the neck.\n\nSlice it into their biceps as your elbow controls theirs.\n\n",
    "short_description": "",
    "category": "Anatomy Awareness",
    "color": "#848a94",
    "axis_self_opponent": 0.81,
    "axis_mental_physical": 0.25,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-136",
    "concept": "Heel",
    "description": "Heel as an anchor and pressure tool.  Set-it close to their hips to reduce movement, or in their neck or ribs, back heel, hook.\n\nJust bringing attention to the idea that whereas its obvious you have heels, start to recognize it as an active tool.",
    "short_description": "",
    "category": "Anatomy Awareness",
    "color": "#848a94",
    "axis_self_opponent": 0.64,
    "axis_mental_physical": 0.3,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-137",
    "concept": "Inion",
    "description": "I knew that one in Japanese first 後頭部隆起 (literal : Back of the head protuberance), had to look it up.\n\nIt's the best spot to control someone's head, and helpfully there's a little protuberance that allows for some slight hooking.\n\n",
    "short_description": "",
    "category": "Anatomy Awareness",
    "color": "#848a94",
    "axis_self_opponent": 0.62,
    "axis_mental_physical": 0.15,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-138",
    "concept": "Glute Dominance",
    "description": "The Glutes are the engine of bridging, and having strong glutes is key to protecting one's knees.\n\nFeel what's activating when you move.",
    "short_description": "",
    "category": "Anatomy Awareness",
    "color": "#848a94",
    "axis_self_opponent": 0.8,
    "axis_mental_physical": 0.76,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-139",
    "concept": "Lats",
    "description": "The latissimus dorsi forms a powerful link between your arms and core. I mainly focus on that when doing armpit grips a la Silver Fox.\n\nWhether you're dragging, collar-tying, or maintaining a clamp, lats stabilize the shoulder girdle and transmit force efficiently. Lat connection ensures pulling doesn’t rely only on biceps or grip, but the full body chain.",
    "short_description": "",
    "category": "Anatomy Awareness",
    "color": "#848a94",
    "axis_self_opponent": 0.92,
    "axis_mental_physical": 0.85,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-140",
    "concept": "Sternum Stacking",
    "description": "aligning the head and chest over the hips to maintain structure, prevent folding, and generate clean pressure during pins or passes.",
    "short_description": "",
    "category": "Anatomy Awareness",
    "color": "#848a94",
    "axis_self_opponent": 0.21,
    "axis_mental_physical": 0.18,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-141",
    "concept": "Scapular Glide",
    "description": "The scapulae must move smoothly over the rib cage to allow functional arm movement without compromising posture. Grapplers benefit from controlled scapular positioning,i.e. retracting, protracting, depressing as needed to maintain frames, deliver pressure, relieve pressure, rotate out of an armbar attempt, etc. \n\nLose Scapula = lack of connection",
    "short_description": "",
    "category": "Anatomy Awareness",
    "color": "#848a94",
    "axis_self_opponent": 0.35,
    "axis_mental_physical": 0.3,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-142",
    "concept": "Pelvic Tilt",
    "description": "The sacrum's orientation can be 1) tucking (posterior tilt) or 2) arching (anterior tilt).\n\nThis influences pelvic posture and spinal mechanics. A neutral or slightly posterior tilt stabilizes the core, reinforces base in guard, and supports safe spinal stacking. Awareness of sacral tilt is foundational for resisting sweeps or generating hip motion.\n\nThere's a \"trick\" in close guard whereby engaging the pelvis can mostly negate attempts to break you forward with strong harmstring leg pulls.",
    "short_description": "",
    "category": "Anatomy Awareness",
    "color": "#848a94",
    "axis_self_opponent": 0.2,
    "axis_mental_physical": 0.3,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-143",
    "concept": "Psoas",
    "description": "The psoas connects the spine to the femur and plays a vital role in hip flexion and core stability.   It is the only (?) muscle connecting upper and lower body.\n\nSubtle but powerful, conscious psoas engagement improves posture, it can anchor the hips and spine together.\n\n",
    "short_description": "",
    "category": "Anatomy Awareness",
    "color": "#848a94",
    "axis_self_opponent": 0.35,
    "axis_mental_physical": 0.74,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-144",
    "concept": "Diaphragm Breathing",
    "description": "Diaphragmatic breathing shifts the work of respiration from the chest to the core, promoting relaxation, endurance, and internal pressure control. In grappling, it enables you to feel more bottom-weighted, anchored, engaging your core.\n\nA key component of calm, efficient movement under pressure.",
    "short_description": "",
    "category": "Anatomy Awareness",
    "color": "#848a94",
    "axis_self_opponent": 0.27,
    "axis_mental_physical": 0.7,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-145",
    "concept": "#1/21 Persistence",
    "description": "it's part of the \"7 P's\"... hard to model on this axis ^^",
    "short_description": "",
    "category": "21 Immutable Principles",
    "color": "#FFD700",
    "axis_self_opponent": 0.85,
    "axis_mental_physical": 0.7,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-146",
    "concept": "Arrhichion of Phigalia",
    "description": "OG Badass no-gi grappler.  Αρριχίων ο Φιγαλεύς) (died 564 BC) was a champion pankratiast in the ancient Olympic Games.\n\nHe died while successfully defending his championship in the pankration at the 54th Olympiad (564 BC). Arrhichion has been described as \"the most famous of all pankratiasts\".",
    "short_description": "",
    "category": "Noteworthy Grapplers",
    "color": "#ff00d4",
    "axis_self_opponent": 0.95,
    "axis_mental_physical": 0.95,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-147",
    "concept": "Roger Gracie",
    "description": "Old School GOAT",
    "short_description": "",
    "category": "Noteworthy Grapplers",
    "color": "#ff00d4",
    "axis_self_opponent": 0.97,
    "axis_mental_physical": 0.05,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-148",
    "concept": "Problem-Solving Itch",
    "description": "There's an element of puzzle-solving in BJJ that scratches a cognitive itch.  Every opponent is slightly different, either in build, experience or intensity.  Each with a  unique set of reactions, habits, and structural patterns. Training becomes a lively back-and-forth, your strategies are built, tested, broken, and refined. It's the joy of figuring things out, over and over again. ",
    "short_description": "",
    "category": "Why Do We Train?",
    "color": "#6c9aea",
    "axis_self_opponent": 0.77,
    "axis_mental_physical": 0.83,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-149",
    "concept": "Coaching Fullfilment",
    "description": "Teaching someone grateful to learn is an extremely rewarding human interaction.   Teaching can be more rewarding than winning. Watching someone get light-bulbs moments, seeing confidence and competence bloom, techniques sharpening, etc. can be a profound source of satisfaction. Coaching others also deepens your own understanding, as you need to grok everything more deeply.",
    "short_description": "",
    "category": "Why Do We Train?",
    "color": "#6c9aea",
    "axis_self_opponent": 0.91,
    "axis_mental_physical": 0.15,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-150",
    "concept": "Fitness",
    "description": "we have to do *something*! to stay active.  might as well also have all those other benefits.",
    "short_description": "",
    "category": "Why Do We Train?",
    "color": "#6c9aea",
    "axis_self_opponent": 0.93,
    "axis_mental_physical": 0.65,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-151",
    "concept": "Self-Defense",
    "description": "Everything has limitations, many martial arts claim to be \"the best\" for self-defense.  There's a case to be made that striking arts can be better at self-defense via offense, e.g. knocking out someone cold.  That comes with a host of other potential legal issues.\n\nThe ability to protect your space, get up if taken down, hopefully some awareness of rolling while avoiding punches, etc. can be beneficial if a situation ever gets hands on.  \n\nCeteris Paribus, other things being equal.\nMultiple Attackers, Weapons, Drug-crazed maniacs, Syringes full of HIV and broken glass on the ground, there are of course limits to what Jocko Willink called a \"super power\" and \"the 2nd best tool for self-defense\" (concealed carry #1).\n\nStill, any blue belt should be able to handle someone untrained with a good amount of control.\n\nI certainly prefer that my nieces know how to strangle someone with their legs effectively rather than being totally defenseless.\n\nHaving self-defense has a goal is not paranoia.  Some cities are safer than others (Tokyo, Singapore), none are entirely free of personal danger.  Being prepared just in case while having fun training is not a bad idea.",
    "short_description": "",
    "category": "Why Do We Train?",
    "color": "#6c9aea",
    "axis_self_opponent": 0.89,
    "axis_mental_physical": 0.81,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-152",
    "concept": "Existential",
    "description": "Training can give a sense of identity, a sense of lifelong pursuit. \n\nMiyamoto Musashi and others spoke of \"the path\", a way of life shaped not just by what we do, but by how we do it ? or that walking the path itself is more important than the destination.  Grappling can become more than a hobby; it becomes an obsession, something that reflects your values, evolves with you, allows you to meet others on a similar path, from wildly different backgrounds, yet kindred spirits. It's not (just) about winning or mastering others, but it can be about walking a path of refinement, humility (in the face of injuries, or those stronger than us), and deep engagement with the self, overcoming lack of motivation, tapping into the discipline to push forward. For those driven by this existential motivation, quitting can feel like abandoning a part of who they are, perhaps more so than other hobbies ?",
    "short_description": "",
    "category": "Why Do We Train?",
    "color": "#6c9aea",
    "axis_self_opponent": 0.97,
    "axis_mental_physical": 0.88,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-153",
    "concept": "Self-Mastery",
    "description": "You definitely learn about yourself under pressure.  You learn to handle various types of people and your own emotions, be it in the day-to-day struggle to get better, or when entering competition and the clash of egos and skills.",
    "short_description": "",
    "category": "Why Do We Train?",
    "color": "#6c9aea",
    "axis_self_opponent": 0.87,
    "axis_mental_physical": 0.89,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-154",
    "concept": "Curisosity & Exploration",
    "description": "Some people, perhaps especially older black belts, perhaps train simply because they're curious. What happens if I try this grip? Can I solve that escape? Grappling becomes a sandbox for experimentation,an endless field of biomechanical and strategic possibilities, you constantly think of your body in three dimensions and how it entertwines with that of the opponent.\n\nNot every skill or move we learn has to be the absolute best and most effective meta.",
    "short_description": "",
    "category": "Why Do We Train?",
    "color": "#6c9aea",
    "axis_self_opponent": 0.78,
    "axis_mental_physical": 0.65,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-155",
    "concept": "Tribe & Belonging",
    "description": "The need for belonging is 3rd in Maslow's pyramid (well, 4th if you consider Wifi access before physiological needs).\n\nOnce you join a grappling tribe, you know that wherever you travel you'll meet fellow members of that crazy tribe.  I'm sure it's true of Golfers and Bridge Players too.  For many, training fills a social gap: friendship, camaraderie, mutual struggle. You first show up for the techniques, then stay for the people.",
    "short_description": "",
    "category": "Why Do We Train?",
    "color": "#6c9aea",
    "axis_self_opponent": 0.37,
    "axis_mental_physical": 0.87,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-156",
    "concept": "Recognition",
    "description": "Achievements, recognition from your peers. \n\nBelts, medals, praise, social status perhaps.  These matter to some. Not always in a shallow way either, but as a way to mark progress. Grappling provides structure, milestones, and the validation of a hard-earned nod from those you respect.",
    "short_description": "",
    "category": "Why Do We Train?",
    "color": "#6c9aea",
    "axis_self_opponent": 0.28,
    "axis_mental_physical": 0.73,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-157",
    "concept": "Therapy",
    "description": "Some show up because it’s the only place they can breathe and forget about the world.  You don't think about that work presentation that went wrong or a problem in your couple while Joe is trying to strangle you. Grappling grounds you in the moment, offers an outlet for stress, grief, or restless thoughts. Being on the mats becomes a kinetic meditation.  \n\nr/bjj will always recommend that you do not *substitute true therapy with BJJ, it's not a panacea :)",
    "short_description": "",
    "category": "Why Do We Train?",
    "color": "#6c9aea",
    "axis_self_opponent": 0.68,
    "axis_mental_physical": 0.86,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-158",
    "concept": "Shared Practice & Bonding",
    "description": "Whether it’s parent-child, a couple, siblings or lifelong friends, grappling becomes a shared language. Training together builds trust like few other things can, there's something about the body-to-body, moment-to-moment, about the shared struggles, about growing better together.\n\nI've trained with my son since he was 10 or 11, now he's a young adult, and rolling with him is still in the top 3 most fullfilling things in life.  I hope one day I get to roll with my grand-children.\n\nEspecially in a world where increasingly everything is done through a screen, there's something...primal... primitive... about grappling with our closed ones.\n\nSo many other animals do it too! All the big cats, bears, wolves and dogs, primates... they all play-fight, even elephants and horses and meerkats and otters and... ^^",
    "short_description": "",
    "category": "Why Do We Train?",
    "color": "#6c9aea",
    "axis_self_opponent": 0.76,
    "axis_mental_physical": 0.22,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-159",
    "concept": "Routine & Structure",
    "description": "2x, 3x, 5x a week.  It becomes part of the rhytm of your life, it gives a reason to get up early, or a place to go after work (and excuse to refuse drinks with colleagues), it can become part of a more balanced and healthy life.",
    "short_description": "",
    "category": "Why Do We Train?",
    "color": "#6c9aea",
    "axis_self_opponent": 0.59,
    "axis_mental_physical": 0.61,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-160",
    "concept": "Career",
    "description": "Building toward pro athlete status or coaching roles.  There's not much money to be made, yet, but the sports is growing.",
    "short_description": "",
    "category": "Why Do We Train?",
    "color": "#6c9aea",
    "axis_self_opponent": 0.1,
    "axis_mental_physical": 0.9,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-161",
    "concept": "Competition as Entertainment",
    "description": "If it becomes professional fighting, with money on the line, you're not just doing it to win the fight anymore, it must also be entertaining for the audience.   The locus shifts.",
    "short_description": "",
    "category": "Why Do We Train?",
    "color": "#6c9aea",
    "axis_self_opponent": 0.39,
    "axis_mental_physical": 0.37,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-162",
    "concept": "Social Media Identity",
    "description": "Making content as a public persona, whether it’s as a coach or athlete, or lifestyle brand, or thirst trap.  It's meant to be consumed by others.",
    "short_description": "",
    "category": "Why Do We Train?",
    "color": "#6c9aea",
    "axis_self_opponent": 0.32,
    "axis_mental_physical": 0.23,
    "brightness": 1,
    "size": 1
  },
  {
    "id": "BJJ-163",
    "concept": "External Pressure",
    "description": "Maybe it's in the family, or your parents really think you should... Like the Williams Sisters from Tennis.  Not the most stable of motivations, but it can happen.",
    "short_description": "",
    "category": "Why Do We Train?",
    "color": "#6c9aea",
    "axis_self_opponent": 0.22,
    "axis_mental_physical": 0.3,
    "brightness": 1,
    "size": 1
  }
];
