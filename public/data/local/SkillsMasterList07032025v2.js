export const categories = [
  {
    "_id": "683334f56fd5182fa18c7833",
    "name": "Training",
    "color": "#00CED1"
  },
  {
    "_id": "683334f56fd5182fa18c7835",
    "name": "32 Principles",
    "color": "#FFD700"
  },
  {
    "_id": "683334f56fd5182fa18c782f",
    "name": "Mental",
    "color": "#4FF74F"
  },
  {
    "_id": "683334f56fd5182fa18c7831",
    "name": "Strategy",
    "color": "#FF8C00"
  },
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
    "_id": "683334f56fd5182fa18c7830",
    "name": "21 Immutable Principles (Paulo)",
    "color": "#FFD700"
  },
  {
    "_id": "683334f56fd5182fa18c7832",
    "name": "Tactic",
    "color": "#8A2BE2"
  },
  {
    "_id": "683334f56fd5182fa18c7834",
    "name": "Memes",
    "color": "#8A2BE2"
  },
  {
    "_id": "68341021fb11be6de639917b",
    "name": "BJJ Definitions",
    "color": "#888888"
  }
];

export interface BJJConcept {
  _id?: string;
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
    "_id": "683409a61fa612ab8b07d0b1",
    "id": "BJJ-030",
    "concept": "6DoF",
    "description": "six degrees of freedom.  Realize there's more to mobility than left-right front-back.  6DoF (Six Degrees of Freedom)\n\nRefers to the six independent axes of movement a body can perform in 3D space:\n\nTranslation: forward/back (x), up/down (y), left/right (z)\n\nRotation: pitch (tilt up/down), yaw (turn left/right), roll (tilt side to side)\n\nIn BJJ and grappling:\n\nControlling an opponent means removing their degrees of freedom, one by one—pin the hips (blocks translation), isolate the shoulder (limits rotation), hook a leg (anchors a pivot).\n\nEscaping involves regaining degrees of freedom—hip escape restores translation, underhook returns rotational access.\n\nBiomechanically, the joints themselves have varying DoF (e.g., shoulder: 3 rotational DoF; knee: primarily 1). Training should build awareness of how to exploit or limit these DoF during transitions and submissions.\n\nGrappling, at its core, is 6DoF chess—with gravity and friction.\n\nTranslation: Linear movement through space—changing position.\n\nIn the body: shifting your hips during a shrimp, stepping forward for a takedown, bridging upward from bottom.\n\nIn 6DoF: represented by movement along x (left-right), y (up-down), z (forward-back).\n\nRotation: Angular movement around an axis—changing orientation.\n\nIn the body: turning your torso during a granby roll, rotating the arm for an underhook, rolling over a shoulder.\n\nIn 6DoF: pitch (nodding), yaw (shaking head \"no\"), roll (tilting head sideways).\n\nVibration: Micro-oscillations—rapid, often involuntary, repetitive motion. Not formally part of 6DoF, but biomechanically critical.\n\nIn the body: muscle spindle reflexes, tremors under fatigue, or rapid shaking to disengage grip pressure.\n\nIn grappling: can disrupt tension (micro-movements to break static grips), signal neuromuscular fatigue, or be used tactically (e.g., shimmying to unsettle base).\n\nSummary:\n\n6DoF = 3 translation + 3 rotation.\n\nVibration = higher-frequency motion layered on top of those freedoms—mechanically minor, neurologically significant.\n\nControl in grappling comes from limiting opponent's translation and rotation; understanding vibration improves sensitivity and adaptability.",
    "short_description": "",
    "category": "Biomechanics",
    "color": "#F74F4F",
    "axis_self_opponent": 0.05,
    "axis_mental_physical": 0.96,
    "brightness": 1,
    "size": 1
  },
  {
    "_id": "683409a61fa612ab8b07d095",
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
    "_id": "6841492dc0c378ef5989417f",
    "id": "BJJ-031",
    "concept": "Form Tension",
    "description": "Form tension in biomechanics refers to the internal force generated within a structure—such as a muscle, tendon, or connective tissue—when it is stretched or deformed, acting to resist the applied load and maintain the shape or integrity of the structure. This tension is a combination of passive (from non-contractile elements like connective tissue) and active (from contractile muscle fibers) components, and is fundamental for stabilizing and supporting body forms during movement and posture.   See Peng in Taichi.    The baseline muscular engagement required to maintain structural integrity during movement or static holds. Not maximal contraction—just enough to preserve alignment, transmit force, and prevent collapse under external load or pressure.\n\nIn grappling, form tension stabilizes frames, connects kinetic chains, and prevents overextension or sagging. Too little: collapse under pressure. Too much: wasted energy, sluggish transitions.\n\nBiomechanically, it manifests as isometric co-contraction (agonist + antagonist) across joints—common in closed guard, tripod base, or during guard passing posture. Good training teaches athletes to modulate tension: spike during bracing, relax during flow.\n\nEfficient grapplers breathe under load—keeping form tension without rigidity.",
    "short_description": "",
    "category": "Biomechanics",
    "color": "#F74F4F",
    "axis_self_opponent": 0.22,
    "axis_mental_physical": 0.69,
    "brightness": 1,
    "size": 1
  },
  {
    "_id": "68414abe7ebff7c7eb7477b5",
    "id": "BJJ-076",
    "concept": "Fascia Activation",
    "description": "Fascia activation refers to the stimulation or engagement of the body's connective tissue network (fascia) through movement, load, or specific exercises, prompting it to respond mechanically and metabolically to support posture, force transmission, and tissue health.",
    "short_description": "",
    "category": "Biomechanics",
    "color": "#F74F4F",
    "axis_self_opponent": 0.06,
    "axis_mental_physical": 0.86,
    "brightness": 1,
    "size": 1
  },
  {
    "_id": "68414d247ebff7c7eb7477b7",
    "id": "BJJ-077",
    "concept": "Loading & Unloading",
    "description": "Loading and Unloading Limbs\n\nRefers to the shifting of weight and tension through the limbs to enable or restrict movement—core to mobility, balance, and attack setups in grappling.\n\nLoading = transferring weight onto a limb.\n\nFunction: creates base, applies pressure, pins opponent.\n\nExample: posting a leg during a guard pass, weighting an elbow to trap an arm.\n\nBiomechanics: compressive force through joints; engages stabilizers and closes kinetic chains.\n\nUnloading = removing weight from a limb.\n\nFunction: frees limb for movement, redirection, or attack.\n\nExample: lifting a foot for a knee cut, freeing an arm to post or grip.\n\nBiomechanics: initiates open-chain movement; reduces friction and muscular load.\n\nTraining Implication: Elite grapplers cycle load dynamically—loading to create structure, unloading to strike or transition. Mastery lies in timing: unloading just as balance is preserved elsewhere.",
    "short_description": "",
    "category": "Biomechanics",
    "color": "#F74F4F",
    "axis_self_opponent": 0.33,
    "axis_mental_physical": 0.87,
    "brightness": 1,
    "size": 1
  },
  {
    "_id": "68414da47ebff7c7eb7477b8",
    "id": "BJJ-078",
    "concept": "Cloth Tension",
    "description": "Cloth Tension (in Judo)\n\nThe tautness or slack in the gi, created through grip, body positioning, and movement. It serves as a tactile feedback system and force transmission medium.\n\nTight Cloth: Indicates connection. Force applied through the grip transmits efficiently. Enables kuzushi (off-balancing), control, and entries.\n\nExample: pulling the sleeve tight while circling sets up a seoi nage.\n\nBiomechanically: cloth behaves like a tensioned ligament—storing and releasing energy, guiding direction.\n\nLoose Cloth: Reduces connection. Slows force transfer, blunts responsiveness. Can be defensive (to prevent grip breaks) or offensive (to bait reactions).\n\nExample: slackening the lapel grip to induce overcommitment, then re-engaging.\n\nNeuromechanical cue: athletes often read slack/tension changes to anticipate attacks.\n\nTraining Methodology:\nDrills should cultivate tension awareness—feeling when cloth is \"live\" vs \"dead.\" Smart grip fighting isn't just where you grip, but how tension is maintained or manipulated.\n\nIn short: control the cloth, and you control the connection.",
    "short_description": "",
    "category": "Biomechanics",
    "color": "#F74F4F",
    "axis_self_opponent": 0.3,
    "axis_mental_physical": 0.1,
    "brightness": 1,
    "size": 1
  },
  {
    "_id": "68414e117ebff7c7eb7477b9",
    "id": "BJJ-079",
    "concept": "Joint Slack",
    "description": "Joint Slack\n\nThe small range of passive, non-resistant movement within a joint before structural or muscular tension engages—pre-tension space.\n\nFunctionally: It's the \"dead zone\" before control kicks in.\n\nIn grappling, this is the danger window—where limbs can be moved or twisted before the opponent senses or resists.\n\nExample: a straight armbar exploits elbow slack; once it's gone, tension spikes and injury risk follows.\n\nBiomechanically: Joint slack is governed by capsular laxity, ligament elasticity, and neuromuscular readiness. More slack = more mobility, less stability.\n\nAthletes with high slack (hypermobility) can escape deeper into submissions—but risk delayed injury cues.\n\nAthletes with low slack (tight joints) are harder to manipulate but less flexible under pressure.\n\nTraining Insight:\n\nControl = removing slack: applying grips or pins that take up joint slack limits opponent's movement options.\n\nDefense = exploiting slack: creating micro-movements within slack zones buys time, space, and reversal windows.\n\nSummary:\nJoint slack is the hidden gap between freedom and control. Mastery is learning to feel and eliminate it—first in others, then in yourself.",
    "short_description": "",
    "category": "Biomechanics",
    "color": "#F74F4F",
    "axis_self_opponent": 0.03,
    "axis_mental_physical": 0.5,
    "brightness": 1,
    "size": 1
  },
  {
    "_id": "68414e577ebff7c7eb7477ba",
    "id": "BJJ-080",
    "concept": "Proprioception",
    "description": "The body's internal sense of position, movement, and force—joint awareness without sight. It's how you know where your arm is in space, or how much pressure you're applying, even with eyes closed.\n\nIn grappling: Proprioception guides balance, grip adjustment, limb positioning, and subtle angle changes under resistance.\n\nExample: adjusting hip angle in closed guard to set up an armbar without visual confirmation.\n\nHigh-level athletes can \"read\" opponents through tactile input alone—via pressure, resistance, and micro-movements.\n\nBiomechanically: Relies on mechanoreceptors in muscles (muscle spindles), tendons (Golgi tendon organs), and joint capsules. Fast, subconscious feedback loops.\n\nTrained proprioception enables smoother transitions, better weight distribution, and earlier detection of imbalance or threat.\n\nTraining Methodologies:\n\nClosed-eye drills, unstable surfaces, flow rolling, and positional sparring under constraint sharpen this system.\n\nInjury often disrupts proprioception—rehab must include retraining it, not just strength.\n\nIn essence: Proprioception is your sixth sense on the mat—feel without seeing, react without thinking.",
    "short_description": "",
    "category": "Biomechanics",
    "color": "#F74F4F",
    "axis_self_opponent": 1,
    "axis_mental_physical": 0.98,
    "brightness": 1,
    "size": 1
  },
  {
    "_id": "68414f9d7ebff7c7eb7477bb",
    "id": "BJJ-081",
    "concept": "Alioception",
    "description": "analogous to proprioception, but directed outward to the opponent. Afaik Coined by me Jelaludo.  \n\nAlioception: the embodied sense of an opponent's position, movement, and balance state through direct contact—enabling reactive and anticipatory adjustments in grappling.\n\nFrom Latin alius (\"other\") + -ception (\"perception\")\n\nThe embodied capacity to detect, interpret, and respond to the position, movement, tension, balance, and intention of another person's body through direct physical contact. Unlike proprioception, which governs awareness of one's own body, alioception operates outwardly—enabling real-time adaptation to external forces, subtle shifts in pressure, and structural vulnerabilities in an opponent.\n\nIn grappling, alioception underpins timing, sensitivity, and control. It allows practitioners to \"feel\" openings before they appear visually, to preempt resistance, and to maintain dynamic connection without overcommitting. It blends tactile input, kinesthetic intuition, and neuromuscular calibration into an opponent-centered perceptual system.\n\nIn short: alioception is the trained sense of the other's body, through your own.\n\nI see a similarity with Listening Skills in Taichi.\n\nListening Skill – 聴勁 / tīng jìn\nLiteral meaning: \"Listening energy\" or \"Listening force\"\n\nDefinition: The refined ability to perceive the opponent's intention, balance, structure, and movement through touch—without relying on sight.\n\nPracticed through constant physical contact (sticky hands, push hands), it trains the practitioner to feel shifts in pressure, alignment, relaxation, or tension.\n\nIt's not passive—it's an active, receptive awareness, like a radar tuned to another's body dynamics.\n\nTing jin emphasizes intent and energy; alioception leans into biomechanics and contact strategy, but they overlap in function.\n\nBoth are trainable through constant-contact drills, sparring, and tactile sensitivity work.\n\nBoth reject reliance on visual cues, favoring a deep embodied reading of the opponent.",
    "short_description": "",
    "category": "Biomechanics",
    "color": "#F74F4F",
    "axis_self_opponent": 0.99,
    "axis_mental_physical": 0.03,
    "brightness": 1,
    "size": 1
  },
  {
    "_id": "684152242fdabf8500a3d5fb",
    "id": "BJJ-082",
    "concept": "Far-End Lever",
    "description": "The specific point on a skeletal or soft-tissue lever—external or internal—where minimal force yields maximal positional or structural disruption to the target segment.\n\nIt's about mechanical advantage, not just limb length.\n\nWrist twist via carpal stack: Rotating the wrist by isolating bones at the base of the palm—not just bending the hand, but spiraling the radiocarpal lever to lock the forearm.\n\nKnee as a hip lever: Applying torque to the tibia/fibula to realign or fold the femur—used in knee cuts, leg locks, or half guard passing.\n\nElbow as an upper-arm handle: Not just breaking structure, but using elbow torque to reorient the shoulder girdle (e.g. kimura, shoulder clamp).\n\nSkull base / occiput control: Levering the base of the skull (not crown) to disrupt spinal alignment—used in guillotines, rear-naked chokes, or cervical control.\n\nMandible or chin lever: Control at the far end of the jaw provides torque over the cervical spine—used in face cranks, chin straps, or arm triangle adjustments.\n\nIn simple mechanical terms—yes, the force transmission in levers is often linear under ideal conditions. A 10% maladjustment at the far-end (wrong angle, suboptimal grip, slight slack) can equate to a 10% loss in force or control. But in grappling, it gets more nuanced:\n\nIn Theory (Ideal Lever Mechanics)\nForce output at the far end of a lever is:\n\nTorque = Force × Distance × sin(θ)\n\nA deviation in θ (angle), grip placement, or line of pull directly reduces torque.\n\nThus, a 10% error in geometry → ~10% efficiency loss, assuming all else is equal. Linear relationship.\n\nIn Grappling (Applied Reality)\nStill mostly linear—but layered with threshold effects and nonlinear break points:\n\nUnderload Zone\n\n<10% loss: feelable but manageable\n\nSlight inefficiencies accumulate but don't ruin the technique.\n\nThreshold Breach (~15–25%)\n\nLeverage drops below control threshold.\n\nOpponent regains degrees of freedom → escapes, rotates, posts.\n\nOverload Zone\n\nExcess force applied due to poor lever = wasted energy, self-exposure, or even self-injury.\n\nGrappling is built on levers, levers reward precision.\n\nKey Principles:\nEvery joint is a lever, with a localized fulcrum and multiple usable \"far ends\".\n\nNested levers exist: wrist within elbow, skull within neck, scapula within thorax.\n\nOptimal control points are not always the most distal—but the most structurally efficient for torque, disruption, or redirection.\n\n🔬 Training Implication:\nTrain awareness of micro-levers and bone stack manipulation.\n\nRecognize that precision at the far end yields results up the chain.\n\nExplore positional drilling that teaches students to \"climb the lever backwards\"—from far-end contact to root disruption.\n\nSummary:\nFar-end leverage is not about distance—it's about influence. Grappling mastery comes from identifying and exploiting the lever point that does the most with the least.",
    "short_description": "",
    "category": "Biomechanics",
    "color": "#F74F4F",
    "axis_self_opponent": 0.06,
    "axis_mental_physical": 0.06,
    "brightness": 1,
    "size": 1
  },
  {
    "_id": "6841579461e6e82e62aef3f0",
    "id": "BJJ-083",
    "concept": "Knee-Elbow",
    "description": "A biomechanical closed frame formed by connecting the knee and elbow on the same side of the body. It is one of the most fundamental and versatile defensive structures in grappling.\n\n🛡️ Primary Function: Structural Defense\nConnects upper and lower body into a compact shell.\n\nProtects against crossface, underhooks, and leg penetration.\n\nPrevents opponent from inserting wedges between limbs (e.g., knee slices, body locks).\n\n⚙️ Biomechanics:\nClosed kinetic chain: Elbow and knee reinforce each other via core tension and skeletal alignment.\n\nLow energy cost: Once connected, minimal muscular effort required to maintain posture.\n\nMobile base: Can shift, pivot, or bridge while maintaining structural integrity.\n\n🔁 Applications in Grappling:\nContext\tUse\nGuard retention\tReconnect frame during inversion or shrimping.\nBottom side control\tKnee-elbow recovery to reinsert guard.\nMount escape\tFrame inside knee to trap and bridge.\nPassing prevention\tBlock incoming knee slice or smash pass.\nBack defense\tElbow fights hook; knee tucks to block second hook.\n\n🧠 Tactical Principle:\n\"If you lose frames, reattach elbow to knee.\"\n\nIt's a reset button for defensive posture—restoring structure, slowing momentum, and buying time to rebuild position.\n\n🧩 Training Focus:\nRepetition under fatigue: train instinct to reconnect elbow to knee under pressure.\n\nCombine with hip escape, inversion, and turtle transitions.\n\nSummary:\nKnee-elbow is the grappler's shield. It's compact, efficient, and adaptable. Learn it, keep it, rebuild it—it's your first line of survival.",
    "short_description": "",
    "category": "Biomechanics",
    "color": "#F74F4F",
    "axis_self_opponent": 0.19,
    "axis_mental_physical": 0.81,
    "brightness": 1,
    "size": 1
  },
  {
    "_id": "68470782f95ceac914407304",
    "id": "BJJ-084",
    "concept": "Wedges",
    "description": "A wedge is a structural insertion that creates or preserves space, disrupts alignment, or amplifies force. In grappling, wedges are anatomical tools—elbows, knees, feet, hands—placed between the opponent and the ground or between limbs to create mechanical advantage.\n\n🔩 Core Functions:\nDisrupt Structure – Break posture, frames, or base\n\nCreate Leverage – Serve as pivot points for sweeps or submissions\n\nMaintain Space – Prevent opponent from collapsing into dominant position\n\nTransfer Force – Direct energy into weak structural angles (e.g., armpit, hip crease)\n\n🦴 Biomechanical Reality:\nA wedge is effective when it's:\n\nInserted deep (near fulcrum)\n\nStructurally aligned (bones stacked, tension braced)\n\nTimed under pressure (before collapse or counter)\n\nElbow inside knee = wedge for guard recovery\n\nKnee in armpit = wedge for omoplata or shoulder control\n\nFoot on hip = wedge for distance and framing\n\nShoulder under chin = wedge for passing or neck control\n\n🧠 Strategic Use:\nBottom Game: Wedges buy space and time\n\nTop Game: Wedges isolate limbs, elevate hips, and dismantle defense\n\nTransitions: Wedges control tempo—insert to slow them, remove to accelerate you\n\n🔁 Principle:\nGrappling without wedges is pushing a door with no hinge.\nInsert wedge → load structure → rotate or collapse opponent.\n\nSummary:\nWedges are grappling's invisible levers. They convert pressure into posture breaks, space into control, and friction into force.",
    "short_description": "",
    "category": "Biomechanics",
    "color": "#F74F4F",
    "axis_self_opponent": 0.34,
    "axis_mental_physical": 0.24,
    "brightness": 1,
    "size": 1
  },
  {
    "_id": "686487e85d5e3c06a35cb2bc",
    "id": "BJJ-085",
    "concept": "Joint Above",
    "description": "To apply breaking pressure to a joint, you must immobilize or control the joint above it in the kinetic chain. This prevents your opponent from moving their body in a way that dissipates force, rotates out, or structurally relieves the pressure.\n\nIf a joint under attack is free to move proximally (upstream in the chain), the pressure disperses rather than focuses.\n\nControlling the proximal joint anchors the limb in place, forcing the targeted joint to bear the full load of the submission.\n\nHeel hook attacks the knee ligaments from the ankle, and requires hip control.\n\nArmbar attacks the elbow joint, but without shoulder control they can rotate and adjust the angle to relieve pressure and escape.\n\nKimura attacks the shoulder girdle, but unless you control the ribcage/spine they can rotate out.\n\nStraight ankle lock raises their knee naturally, unless its held in place.",
    "short_description": "",
    "category": "Biomechanics",
    "color": "#F74F4F",
    "axis_self_opponent": 0.06,
    "axis_mental_physical": 0.12,
    "brightness": 1,
    "size": 1
  },
  {
    "_id": "6865e05dc3a34205335b67fe",
    "id": "BJJ-086",
    "concept": "Back-Heeling",
    "description": "retracting your heel backward into your own body to generate clamping pressure.  Hamstrings for knee flexion.  Tension and rotational torque.\n\narmbars; back-heel is a primary control of the torso/shoulder, to get your hips closer to their center of mass.\n\nleglocks; back-heel above their knee to lock it into place.\n\ntriangle, body triangle, leg clamps; back-heeling is everywhere.\n\ncommon mistake; extend or relax the legs too much, this can open space and reduce pressure.",
    "short_description": "",
    "category": "Biomechanics",
    "color": "#F74F4F",
    "axis_self_opponent": 0.13,
    "axis_mental_physical": 0.5,
    "brightness": 1,
    "size": 1
  }
];