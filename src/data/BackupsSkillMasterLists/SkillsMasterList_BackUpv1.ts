export const categories = [
  { name: 'Technique', color: '#4F8EF7' },  // Blue
  { name: 'Biomechanics', color: '#F74F4F' },  // Red
  { name: 'Mental', color: '#4FF74F' },  // Green
  { name: '21 Immutable Principles (Paulo)', color: '#FFD700' },  // Gold
  { name: 'Strategy', color: '#FF8C00' },  // Dark Orange
  { name: 'Tactic', color: '#8A2BE2' },  // Blue Violet
  { name: 'Training', color: '#00CED1' },  // Dark Turquoise
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
    id: "BJJ-001",
    concept: "Dilemmas",
    description: "Create Dilemmas, not problems.  Damned if they do, damned if they don't. Always having multiple answers to their most likely reactions, funnel into a situation with only bad options.",
    short_description: "",
    category: "Strategy",
    color: "#FF8C00",
    axis_self_opponent: 0.7,
    axis_mental_physical: 0.6,
    brightness: 3,
    size: 3
  },
  {
    id: "BJJ-002",
    concept: "Collapse Frames",
    description: "Frames are typically strong in one direction yet can be collapsed in another.",
    short_description: "",
    category: "Biomechanics",
    color: "#F74F4F",
    axis_self_opponent: 0.2,
    axis_mental_physical: 0.2,
    brightness: 1,
    size: 1
  },
  {
    id: "BJJ-003",
    concept: "Grip Fighting",
    description: "Controlling and breaking grips to dominate exchanges.",
    short_description: "",
    category: "Technique",
    color: "#4F8EF7",
    axis_self_opponent: 0.3,
    axis_mental_physical: 0.3,
    brightness: 2,
    size: 3
  },
  {
    id: "BJJ-004",
    concept: "Anticipation ",
    description: "Anticipation is the first line of defense.  Don't be surprised by a guard pull or a jumping armbar. You should know what threats are possible from any given positions.",
    short_description: "",
    category: "Mental",
    color: "#4FF74F",
    axis_self_opponent: 0.9,
    axis_mental_physical: 0.1,
    brightness: 1,
    size: 1
  },
  {
    id: "BJJ-005",
    concept: "Wet Rug",
    description: "#3/21 If you're stiff as a log you're easy to move.  Imagine a rug soaked in water, it's hard to pick and manipulate.  Be like water, be like a water-clogged rug, waterboarding your opponent's entire body.",
    short_description: "",
    category: "21 Immutable Principles (Paulo)",
    color: "#FFD700",
    axis_self_opponent: 0.3,
    axis_mental_physical: 0.8,
    brightness: 1,
    size: 1
  },
  {
    id: "BJJ-006",
    concept: "Tailored Resistance",
    description: "Offer realistic but partial resistance during drills/games/R&D/sparring",
    short_description: "",
    category: "Training",
    color: "#00CED1",
    axis_self_opponent: 0.98,
    axis_mental_physical: 0.97,
    brightness: 1,
    size: 1
  },
  {
    id: "BJJ-007",
    concept: "More is too much",
    description: "Opponent pushes you? move back even further\nOpponent pulls you? move in even further\nOpponent Rotates you? rotate further\nGive them more of what they want, so it becomes too much and interferes with their plan.  e.g. after a failed hip bump.",
    short_description: "",
    category: "Tactic",
    color: "#8A2BE2",
    axis_self_opponent: 0.09,
    axis_mental_physical: 0.12,
    brightness: 1,
    size: 1
  }
]; 