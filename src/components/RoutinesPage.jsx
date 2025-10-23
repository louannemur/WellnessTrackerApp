import { useState, useEffect } from 'react'
import './RoutinesPage.css'

function RoutinesPage() {
  const [activeRoutine, setActiveRoutine] = useState('AM') // 'AM' or 'PM'
  const [simplifiedMode, setSimplifiedMode] = useState(false)
  const [completedSteps, setCompletedSteps] = useState({})
  const [skippedSteps, setSkippedSteps] = useState({})
  const [activeTimer, setActiveTimer] = useState(null)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [expandedStep, setExpandedStep] = useState(null)
  const [expandedSubDetail, setExpandedSubDetail] = useState({})

  // Morning routine steps with detailed instructions
  const morningRoutine = [
    {
      id: 'am-1',
      time: '7:00 AM',
      duration: 180,
      title: 'In-Bed Activation',
      description: 'Gentle stretches before getting up',
      essential: true,
      details: [
        {
          summary: 'Eye massage: Rub palms together, place over eyes',
          expandable: true,
          expanded: [
            'Before opening eyes, rub palms together vigorously 20 times',
            'Place warm palms gently over closed eyes',
            'Hold for 10 seconds, feeling the warmth',
            'Helps stimulate vagus nerve and reduce morning puffiness'
          ]
        },
        {
          summary: 'Ankle pumps & circles: 15 pumps each foot',
          expandable: true,
          expanded: [
            'Point toes down, then flex up (like pressing gas pedal)',
            '15 pumps each foot',
            'Circle ankles: 10 clockwise, 10 counter-clockwise',
            'This activates calf muscles that stabilize ankles',
            'Do these BEFORE putting weight on joints (hypermobility protection)'
          ]
        },
        {
          summary: 'Knee squeezes: 10 times each leg',
          expandable: true,
          expanded: [
            'Straighten leg, tighten thigh muscle',
            'Hold 5 seconds, release',
            '10 times each leg',
            'Activates quadriceps to protect knee joint',
            'Important for hypermobility - builds stability'
          ]
        },
        {
          summary: 'Finger & wrist prep: Make fists, spread fingers',
          expandable: true,
          expanded: [
            'Make fists, then spread fingers wide',
            '15 times',
            'Wrist circles: 10 each direction',
            'Important before weight-bearing exercises',
            'Prepares joints for the day ahead'
          ]
        },
        {
          summary: 'Shoulder rolls: 10 backward, 10 forward',
          expandable: true,
          expanded: [
            'Bring shoulders up to ears, back, then down',
            '10 backward rolls (opens chest)',
            '10 forward rolls',
            'Activates stabilizing muscles',
            'Helps with posture throughout the day'
          ]
        },
        {
          summary: 'Gentle spinal twist: Hold 10 seconds each side',
          expandable: true,
          expanded: [
            'Still lying down, knees bent',
            'Drop knees gently to right, hold 10 seconds',
            'Return to center, drop to left',
            'Prepares spine for movement',
            'Never force - gentle is key'
          ]
        }
      ]
    },
    {
      id: 'am-2',
      time: '7:03 AM',
      duration: 120,
      title: 'Acupressure Energy Points',
      description: 'Activate energy points for the day',
      essential: false,
      details: [
        {
          summary: 'Zu San Li (ST36): 30 seconds each leg',
          expandable: true,
          expanded: [
            'Find it: 4 finger-widths below kneecap, 1 finger-width outside of shinbone',
            'Feel for: Slight depression in muscle',
            'Press: Use thumb, firm circular pressure',
            'Duration: 30 seconds each leg',
            'Benefits: Boosts energy, improves digestion, reduces fatigue'
          ]
        },
        {
          summary: 'Bai Hui (GV20): Gentle tapping on top of head, 30 seconds',
          expandable: true,
          expanded: [
            'Find it: Top of head, center point between ears',
            'Press: Gentle tapping with fingertips',
            'Duration: 30 seconds',
            'Benefits: Mental clarity, reduces brain fog',
            'Perfect for ADHD - helps focus'
          ]
        }
      ]
    },
    {
      id: 'am-3',
      time: '7:05 AM',
      duration: 120,
      title: 'Morning Hydration Ritual',
      description: 'Warm lemon water',
      essential: true,
      details: [
        {
          summary: 'Drink 12-16 oz warm water with 1/2 lemon',
          expandable: true,
          expanded: [
            'Keep water glass/bottle by bedside night before',
            'Room temperature is best (easier on digestion)',
            '12-16 oz warm water + juice of 1/2 lemon',
            'Sip slowly while sitting on bed edge',
            'Opens digestive system gently'
          ]
        },
        {
          summary: 'Alternative: Apple cider vinegar with cinnamon',
          expandable: true,
          expanded: [
            'Week 3+ option',
            '1 tbsp apple cider vinegar + pinch cinnamon in warm water',
            'Tuesday/Thursday rotation',
            'Helps with blood sugar regulation',
            'Good for PCOS insulin sensitivity'
          ]
        },
        {
          summary: 'Weekend: Can try warm bone broth if stomach ready',
          expandable: true,
          expanded: [
            'Only after Week 3+',
            'Great for gut healing (Crohn\'s)',
            'Sip slowly, 8-12 oz',
            'Can add pinch of salt',
            'Very gentle on digestive system'
          ]
        }
      ]
    },
    {
      id: 'am-4',
      time: '7:07 AM',
      duration: 120,
      title: 'Light Activation',
      description: 'Open curtains and breathe',
      essential: true,
      details: [
        {
          summary: 'Open all curtains/blinds immediately',
          expandable: false
        },
        {
          summary: 'Stand at window for 5 deep breaths',
          expandable: true,
          expanded: [
            'Look outside at natural light',
            'Breathe deeply: 4 counts in, 4 counts out',
            'Focus on something far away (relaxes eyes)',
            'Light exposure crucial for PCOS circadian rhythm',
            'Helps regulate hormones'
          ]
        },
        {
          summary: 'Think of ONE thing you\'re looking forward to',
          expandable: true,
          expanded: [
            'Can be tiny! (your morning coffee, a text from a friend)',
            'Positive mindset setting',
            'Helpful for ADHD focus',
            'Reduces morning anxiety'
          ]
        }
      ]
    },
    {
      id: 'am-5',
      time: '7:10 AM',
      duration: 1200,
      title: 'Movement Practice',
      description: 'Choose: Pool, Gym, or Qi Gong',
      essential: false,
      details: [
        {
          summary: 'Pool: Water walking, jogging, leg exercises (20 min)',
          expandable: true,
          expanded: [
            'WHAT TO BRING: Water bottle, towel, optional water weights',
            '',
            'Minutes 1-3: WARM-UP WALK',
            '• Enter pool at shallow end (waist to chest deep)',
            '• Walk normally across pool',
            '• Focus on full foot contact with pool bottom',
            '• Arms swing naturally',
            '',
            'Minutes 4-6: WATER MARCHING',
            '• Stand in chest-deep water',
            '• March in place, bringing knees up high',
            '• Knee comes up to hip level if possible',
            '• Opposite arm comes forward (like running)',
            '• If too hard: Reduce knee height',
            '',
            'Minutes 7-9: LATERAL MOVEMENT',
            '• Stand sideways, chest-deep water',
            '• Step-Together-Step pattern',
            '• Push water away with arms',
            '• Works outer thighs (PCOS weight pattern)',
            '',
            'Minutes 10-12: WATER JOGGING',
            '• Jog in place or in small circles',
            '• Lean slightly forward',
            '• Land on balls of feet',
            '• Core engaged (belly button to spine)',
            '',
            'Minutes 13-15: LEG EXERCISES AT WALL',
            '• Hold pool edge with both hands',
            '• Flutter kicks: 30 seconds',
            '• Rest: 15 seconds',
            '• Bicycle: 30 seconds',
            '• Rest: 15 seconds',
            '• Leg lifts to side: 30 seconds',
            '',
            'Minutes 16-18: RESISTANCE WORK',
            '• Water push-downs: Arms out, push down through water, 1 min',
            '• Standing crunches: Knee to opposite elbow, 1 min',
            '',
            'Minutes 19-20: COOL DOWN',
            '• Slow walk across pool',
            '• Gentle arm circles underwater',
            '• 5 deep breaths before exiting',
            '• Use handrail when leaving (joints looser after exercise)'
          ]
        },
        {
          summary: 'Gym: Wall push-ups, squats, resistance bands (20 min)',
          expandable: true,
          expanded: [
            'WHAT YOU NEED: Sneakers, water, towel, optional resistance band',
            '',
            'Minutes 1-3: WALK TO GYM + DYNAMIC WARM-UP',
            '• 10 arm circles forward, 10 backward',
            '• 10 gentle torso twists',
            '• 10 ankle circles each foot',
            '',
            'Minutes 4-6: WALL PUSH-UPS (3 sets of 8-10)',
            '• Stand arm\'s length from wall',
            '• Palms flat at shoulder height',
            '• Lower until nose almost touches wall',
            '• Push back to start',
            '• Breathe: Inhale down, exhale up',
            '• PROGRESSION: Week 1-2 close to wall, Week 3-4 step back',
            '• AVOID: Hips sagging, elbows flared out',
            '',
            'Minutes 7-9: SUPPORTED SQUATS (3 sets of 8-10)',
            '• TRX version: Hold straps, arms extended',
            '• Or bench version: Touch bench lightly with bottom',
            '• Push hips back like sitting in chair',
            '• Go as low as comfortable',
            '• Push through heels to stand',
            '• Knees track over toes, don\'t cave inward',
            '• Rest 30 seconds between sets',
            '',
            'Minutes 10-12: RESISTANCE BAND WORK',
            '• Band pull-aparts: 15 reps (for posture)',
            '• Monster walks: 10 steps each direction (hip stability)',
            '• Band bicep curls: 12 reps',
            '',
            'Minutes 13-15: CORE WORK (Modified Plank)',
            '• Week 1-2: Wall plank, 20 seconds, 3 sets',
            '• Week 3-4: Incline plank on bench, 20-30 seconds',
            '• Week 5+: Knee plank, 20-30 seconds',
            '• IMPORTANT: Don\'t let hips pike up or sag',
            '',
            'Minutes 16-18: STANDING EXERCISES',
            '• Calf raises on step edge: 15 reps, 2 sets',
            '• Seated leg lifts: 10 reps, 2 sets',
            '',
            'Minutes 19-20: STRETCHING COOL-DOWN',
            '• Hip flexor stretch: 30 seconds each side',
            '• Chest doorway stretch: 30 seconds each side',
            '• Seated forward fold: 30 seconds'
          ]
        },
        {
          summary: 'Qi Gong: Lifting the Sky, Carrying the Moon (20 min)',
          expandable: true,
          expanded: [
            'WHAT THIS IS: Ancient Chinese moving meditation',
            '• Very gentle, joint-friendly',
            '• Focuses on energy circulation',
            '• Perfect for fatigue or flare days',
            '• Can do in apartment or on balcony',
            '• Barefoot or socks, no equipment needed',
            '',
            'Minutes 1-5: "LIFTING THE SKY"',
            'Purpose: Opens chest, improves breathing, raises energy',
            '',
            'Starting Position:',
            '• Feet hip-width apart',
            '• Knees slightly bent (never locked)',
            '• Arms relaxed at sides',
            '• Tongue gently touching roof of mouth',
            '',
            'Movement:',
            '1. INHALE (4 counts): Slowly raise arms out to sides',
            '   • Continue up until palms meet overhead',
            '   • Imagine lifting a light balloon',
            '   • Eyes follow hands up',
            '2. HOLD (2 counts): Arms overhead, gentle stretch',
            '3. EXHALE (4 counts): Separate hands, lower down sides',
            '   • Imagine pushing energy into ground',
            '• REPEAT 10 times',
            '• Move like moving through honey - slow and smooth',
            '• Never force range of motion',
            '',
            'Minutes 6-10: "CARRYING THE MOON"',
            'Purpose: Reduces facial puffiness, lymphatic drainage',
            '',
            'Movement:',
            '1. INHALE (4 counts): Raise arms like hugging huge beach ball',
            '   • Bring overhead, forming large circle',
            '   • Palms face down',
            '2. EXHALE (4 counts): Lower "moon" down past face to belly',
            '   • Imagine moon\'s energy filling body',
            '3. RELEASE: Let arms return to sides',
            '• REPEAT 8 times',
            '• Benefits for PCOS: Moves fluid retention, calms nervous system',
            '',
            'Minutes 11-15: "ROTATING THE WAIST"',
            'Purpose: Helps with PCOS belly weight, improves digestion',
            '',
            '• Feet slightly wider than hips',
            '• Hands on lower back/kidneys',
            '• Hip circles RIGHT: 10 circles, slow like hula hoop',
            '• Hip circles LEFT: 10 circles',
            '• Figure-8 pattern: Advanced option',
            '• Breathing: Natural, don\'t hold breath',
            '',
            'Minutes 16-20: WALKING MEDITATION',
            'Indoor: Walk room perimeter, count "1-2-3-4" (ADHD-friendly)',
            'Outdoor: Walk to mailbox, focus on feet, air, sounds',
            '• Gets vitamin D exposure'
          ]
        },
        {
          summary: 'Pick based on your energy level today',
          expandable: true,
          expanded: [
            'HIGH ENERGY: Pool workout - most cardio',
            'MEDIUM ENERGY: Gym calisthenics - strength building',
            'LOW ENERGY: Qi Gong - gentle movement',
            'FLARE DAY: Skip or just 5-minute Qi Gong',
            'JOINT PAIN: Pool only (water supports joints)',
            '',
            'Remember: Something is better than nothing!',
            'Even 5 minutes counts as a win.'
          ]
        }
      ]
    },
    {
      id: 'am-6',
      time: '7:30 AM',
      duration: 600,
      title: 'Korean Skincare Routine',
      description: 'Cleanse, tone, moisturize, SPF',
      essential: false,
      details: [
        {
          summary: 'Week 1-2: Basic routine (cleanser, moisturizer, SPF)',
          expandable: true,
          expanded: [
            'CLEANSING (2 minutes):',
            '• Water temperature: Lukewarm (hot water worsens redness)',
            '• Splash face 5-6 times',
            '• Pump Biore cleanser once into palm',
            '• Add drop of water, create lather',
            '• Start at T-zone (oiliest area)',
            '• Gentle circles on forehead 10 seconds',
            '• Down nose (focus on sides where blackheads form)',
            '• Across chin in small circles',
            '• Gentle swipes up cheeks (upward always)',
            '• Rinse with cool water 10 times',
            '• Pat dry with clean towel (change 2x weekly)',
            '',
            'MOISTURIZER (1 minute):',
            '• Amount: Pea-sized for face, rice grain for neck',
            '• Dot on: forehead, both cheeks, nose, chin',
            '• Use middle three fingers',
            '• Upward strokes on cheeks',
            '• Outward strokes on forehead',
            '• Gentle taps around eyes (ring finger only)',
            '• Upward strokes on neck',
            '• Pat gently all over',
            '',
            'SUNSCREEN (2 minutes):',
            '• Amount: 1/4 teaspoon',
            '• Three-finger rule: Line along 3 fingers',
            '• Dot all over face',
            '• Pat in (don\'t rub - maintains protection)',
            '• Don\'t forget: Ears, neck, back of hands',
            '• Wait 2 minutes before makeup',
            '',
            'PRODUCTS TO BUY:',
            '• Biore cleansing foam (~$8)',
            '• Neutrogena Hydro Boost moisturizer (~$15)',
            '• Skin Aqua UV Moisture Milk SPF 50 (~$12)',
            '• Total Week 1 cost: ~$35'
          ]
        },
        {
          summary: 'Week 2+: Add toner (Pyunkang Yul Essence Toner)',
          expandable: true,
          expanded: [
            'AFTER cleansing, BEFORE moisturizer',
            '',
            'METHOD 1 - PATTING (Best for hydration):',
            '• Pour toner into palm (nickel-sized)',
            '• Rub palms together',
            '• Press palms gently onto face',
            '• Pat all over for 30 seconds',
            '• For dry days: Layer 3 times (7-skin method)',
            '',
            'METHOD 2 - COTTON PAD (Gentle exfoliation):',
            '• Soak cotton pad',
            '• Swipe gently from center outward',
            '• Use fresh pad for neck',
            '',
            'PRODUCT INFO:',
            '• Pyunkang Yul Essence Toner (~$15)',
            '• Where: YesStyle, Soko Glam, Amazon',
            '• Why: Minimal ingredients, good for sensitive skin',
            '• Size: 200ml (lasts 3 months)'
          ]
        },
        {
          summary: 'Week 4+: Add essence (COSRX Snail 96 Mucin)',
          expandable: true,
          expanded: [
            'AFTER toner, BEFORE moisturizer',
            '',
            'APPLICATION:',
            '• Pump 2-3 times into palm',
            '• TEXTURE NOTE: It\'s stringy/slimy - this is normal!',
            '• Warm between palms',
            '• Press into skin, focus on acne scars',
            '• Tap face all over for 30 seconds',
            '• Slight tackiness is normal',
            '• Wait 1 minute before next step',
            '',
            'PRODUCT INFO:',
            '• COSRX Snail 96 Mucin Power Essence (~$20)',
            '• Where: Ulta, Amazon, K-beauty sites',
            '• Why: Healing, acne scar improvement',
            '• Size: 100ml (lasts 4 months)',
            '• Benefits: Hydration, wound healing, anti-aging'
          ]
        },
        {
          summary: 'Week 6+: Add serum (Beauty of Joseon Glow Deep)',
          expandable: true,
          expanded: [
            'AFTER essence, BEFORE moisturizer',
            '',
            'APPLICATION:',
            '• Use 3-4 drops only',
            '• Drop directly onto hyperpigmentation areas',
            '• Pat in with ring finger',
            '• Spread remainder over rest of face',
            '• Contains arbutin + rice water for brightening',
            '',
            'PRODUCT INFO:',
            '• Beauty of Joseon Glow Deep Serum (~$18)',
            '• Where: YesStyle, StyleKorean',
            '• Why: Rice water + arbutin for brightening',
            '• Size: 30ml (lasts 2 months)',
            '• Best for: Hyperpigmentation, dull skin'
          ]
        },
        {
          summary: 'If exercised: Add oil cleanser first (double cleanse)',
          expandable: true,
          expanded: [
            'ONLY IF you worked out and are sweaty/oily',
            '',
            'OIL CLEANSE (1 minute):',
            '• Dry hands, dry face (water deactivates oil)',
            '• Pump Kose Softymo oil cleanser 3 times',
            '• Massage into face for 60 seconds',
            '• Add water to emulsify (turns milky)',
            '• Rinse thoroughly',
            '',
            'THEN: Regular cleanser (1 minute)',
            '',
            'PRODUCT INFO:',
            '• Kose Softymo Speedy Cleansing Oil (~$10)',
            '• Where: Amazon, Japanese markets',
            '• Why: Removes sunscreen/sweat, won\'t clog pores',
            '• Size: 230ml (lasts 3 months)'
          ]
        }
      ]
    },
    {
      id: 'am-7',
      time: '7:40 AM',
      duration: 300,
      title: 'Morning Eating',
      description: 'Protein + fat + complex carb within 60 min',
      essential: true,
      details: [
        {
          summary: '⚠️ CRITICAL: Eat within 60 minutes of waking',
          expandable: true,
          expanded: [
            'RESEARCH SHOWS:',
            '• Largest meal at breakfast reduces insulin resistance 54%',
            '• Reduces testosterone 50% (huge for PCOS!)',
            '• Must include: Protein + Fat + Complex Carb',
            '',
            'BEST OPTIONS:',
            '• Greek yogurt with berries, walnuts, cinnamon',
            '• 2 tbsp almond butter on whole grain toast',
            '• Hard-boiled egg with avocado on toast',
            '',
            '❌ AVOID: Just fruit or simple carbs alone',
            '• No just banana, no just juice',
            '• These spike insulin (bad for PCOS)'
          ]
        },
        {
          summary: 'Option 1: Greek yogurt with berries & walnuts',
          expandable: true,
          expanded: [
            'INGREDIENTS:',
            '• 1 cup plain Greek yogurt (full-fat or 2%)',
            '• 1/2 cup berries (blueberries, strawberries)',
            '• 1/4 cup walnuts or almonds',
            '• Sprinkle of cinnamon',
            '',
            'WHY THIS WORKS:',
            '• Protein: Greek yogurt (15-20g)',
            '• Fat: Nuts (healthy omega-3s)',
            '• Complex carb: Berries (fiber + antioxidants)',
            '• Cinnamon helps blood sugar regulation',
            '',
            'PREP TIP: Pre-portion yogurt night before'
          ]
        },
        {
          summary: 'Option 2: Almond butter on whole grain toast',
          expandable: true,
          expanded: [
            'INGREDIENTS:',
            '• 1 slice whole grain bread (Dave\'s Killer Bread)',
            '• 2 tbsp almond butter',
            '• Optional: Sliced banana on top',
            '',
            'WHY THIS WORKS:',
            '• Protein: Almond butter (7g)',
            '• Fat: Almond butter (healthy fats)',
            '• Complex carb: Whole grain bread (fiber)',
            '',
            'PREP TIP: Keep bread in freezer, toast from frozen'
          ]
        },
        {
          summary: 'Option 3: Hard-boiled egg with avocado',
          expandable: true,
          expanded: [
            'INGREDIENTS:',
            '• 1-2 hard-boiled eggs',
            '• 1/4 avocado, sliced',
            '• 1 slice whole grain toast',
            '• Everything bagel seasoning',
            '',
            'WHY THIS WORKS:',
            '• Protein: Eggs (6-12g)',
            '• Fat: Avocado + egg yolk (healthy fats)',
            '• Complex carb: Whole grain toast',
            '',
            'PREP TIP: Boil dozen eggs on Sunday, keep in fridge'
          ]
        },
        {
          summary: 'Bare minimum (if nauseous): Egg + 5 almonds',
          expandable: true,
          expanded: [
            'IF YOU FEEL NAUSEOUS:',
            '• 1 hard-boiled egg with salt',
            '• Or 5 almonds',
            '• Or protein smoothie (1/2 portion)',
            '',
            'REMEMBER: Something is better than nothing',
            '• Even 50 calories helps stabilize blood sugar',
            '• Lemon water alone is okay Week 1-2',
            '',
            'NAUSEA TIPS:',
            '• Keep crackers on nightstand',
            '• Eat one before getting up',
            '• Ginger candy after lemon water',
            '• B6 supplement at night may help'
          ]
        }
      ]
    }
  ]

  // Evening routine steps with detailed instructions
  const eveningRoutine = [
    {
      id: 'pm-1',
      time: '8:00 PM',
      duration: 300,
      title: 'Tea Ceremony Meditation',
      description: 'Mindful tea preparation',
      essential: true,
      details: [
        {
          summary: 'Choose tea: Spearmint (Mon/Thu), Chamomile (Tue/Fri/Weekend), Green (Wed)',
          expandable: true,
          expanded: [
            'SAFE WITH ADALIMUMAB:',
            '• Monday/Thursday: Spearmint tea (2 cups daily)',
            '  - Reduces testosterone 15%',
            '  - Must-have for PCOS',
            '• Tuesday/Friday/Weekend: Chamomile',
            '  - Calming, anti-inflammatory',
            '  - Safe with medication',
            '• Wednesday: Green tea',
            '  - Anti-inflammatory',
            '  - Antioxidants',
            '',
            '⚠️ AVOID WITHOUT MEDICAL CLEARANCE:',
            '• Echinacea (immune-stimulating)',
            '• Ginseng (interferes with immunosuppression)',
            '• St. John\'s Wort (affects drug metabolism)',
            '• Holy Basil/Tulsi (removed from rotation)',
            '• Chrysanthemum (verify with doctor)',
            '• Oolong (verify with doctor)'
          ]
        },
        {
          summary: 'Water heating: Fill kettle, count 4 breaths',
          expandable: true,
          expanded: [
            'MINDFUL HEATING:',
            '• Fill kettle',
            '• Turn on heat',
            '• Stand and watch (don\'t multitask!)',
            '• Count 4 slow breaths',
            '• Notice the sound',
            '• This is meditation practice'
          ]
        },
        {
          summary: 'Pouring practice: Pour mindfully, count 4 breaths',
          expandable: true,
          expanded: [
            'POUR WITH INTENTION:',
            '• Pour water over tea',
            '• Count 4 as you pour',
            '• Watch steam rise',
            '• Count 4 more breaths',
            '• ADHD tip: This counting helps focus'
          ]
        },
        {
          summary: 'While steeping: Press Yin Tang, Tai Yang, Shen Men points',
          expandable: true,
          expanded: [
            'STEEPING MEDITATION (2 minutes):',
            '• Set timer for tea steeping',
            '',
            'ACUPRESSURE POINTS:',
            '1. Yin Tang (third eye point): Press 30 seconds',
            '   - Between eyebrows',
            '   - Calms mind, reduces anxiety',
            '',
            '2. Tai Yang (temples): Circular massage 30 seconds',
            '   - Side of eyebrows',
            '   - Relieves tension, headaches',
            '',
            '3. Shen Men (ear point): Gentle pulls on earlobes 30 seconds',
            '   - Top of ear fold',
            '   - Promotes relaxation',
            '',
            '4. An Mian (behind ear): Press 30 seconds',
            '   - Behind earlobe',
            '   - Promotes sleep'
          ]
        },
        {
          summary: 'First sip ritual: Smell, small sip, hold, swallow',
          expandable: true,
          expanded: [
            'MINDFUL FIRST SIP:',
            '• Hold cup with both hands',
            '• Smell first (activates parasympathetic nervous system)',
            '• Take small sip',
            '• Count 4 while holding in mouth',
            '• Notice temperature, flavor',
            '• Swallow mindfully',
            '• This ritual signals body: time to wind down'
          ]
        }
      ]
    },
    {
      id: 'pm-2',
      time: '8:05 PM',
      duration: 120,
      title: 'Oil Cleanse',
      description: 'Remove sunscreen and daily buildup',
      essential: true,
      details: [
        {
          summary: 'Apply oil cleanser to DRY face (water deactivates it)',
          expandable: true,
          expanded: [
            'CRITICAL: Dry hands, dry face!',
            '• Water deactivates oil cleanser',
            '• Don\'t wet face first',
            '• Hands should be completely dry'
          ]
        },
        {
          summary: 'Massage in circular motions for 60 seconds',
          expandable: true,
          expanded: [
            'MASSAGE PATTERN:',
            '• Pump Kose Softymo 3 times into palm',
            '• Start at forehead - circular motions',
            '• Down temples (where sunscreen accumulates)',
            '• Focus on nose creases 20 seconds (blackhead areas)',
            '• Gentle circles on chin',
            '• Sweep up cheeks',
            '• Don\'t forget hairline and ears',
            '',
            'WHY 60 SECONDS:',
            '• Oil needs time to break down sunscreen',
            '• Dissolves sebum in pores',
            '• Gentle enough for sensitive skin'
          ]
        },
        {
          summary: 'Add water to emulsify (turns milky white)',
          expandable: true,
          expanded: [
            'EMULSIFICATION - KEY STEP:',
            '• Wet hands with warm water',
            '• Massage face again',
            '• Oil turns milky white',
            '• This is the oil lifting dirt away',
            '• Keep massaging for 15-20 seconds',
            '• You\'ll feel texture change',
            '',
            'THEN: Rinse thoroughly with lukewarm water 15 times',
            '• Make sure all oil is removed',
            '• Face should feel clean, not greasy'
          ]
        }
      ]
    },
    {
      id: 'pm-3',
      time: '8:07 PM',
      duration: 60,
      title: 'Water-Based Cleanse',
      description: 'Second cleanse for clean skin',
      essential: true,
      details: [
        {
          summary: 'Use regular cleanser, 30-second massage',
          expandable: true,
          expanded: [
            'SECOND CLEANSE:',
            '• Use Biore cleanser (same as morning)',
            '• Pump once into palm',
            '• 30-second gentle massage',
            '• Less aggressive than morning',
            '• Focus on T-zone',
            '• Rinse with cool water 10 times',
            '',
            'WHY DOUBLE CLEANSE:',
            '• First cleanse removes oil/sunscreen',
            '• Second cleanse cleans skin itself',
            '• Korean skincare essential',
            '• Prevents clogged pores'
          ]
        }
      ]
    },
    {
      id: 'pm-4',
      time: '8:08 PM',
      duration: 180,
      title: 'Treatment & Toner',
      description: 'BHA on Tue/Fri, toner other days',
      essential: false,
      details: [
        {
          summary: 'Tue/Fri: Apply BHA to cotton pad, focus on nose/chin',
          expandable: true,
          expanded: [
            'EXFOLIATION NIGHTS (Tuesday & Friday only):',
            '',
            'PRODUCT: COSRX BHA Blackhead Power Liquid',
            '',
            'APPLICATION:',
            '• After cleansing, face should be DRY',
            '• Apply BHA to cotton pad',
            '• Focus areas: Nose (especially creases), chin, forehead center',
            '• Avoid eye area and cheeks if sensitive',
            '',
            'WAIT 10 MINUTES:',
            '• BHA needs time to work',
            '• During wait: Clip nails, brush teeth, pack gym bag',
            '• Don\'t apply anything else yet',
            '',
            'PRODUCT INFO:',
            '• COSRX BHA Blackhead Power Liquid (~$20)',
            '• Where: Ulta, Amazon, K-beauty sites',
            '• Why: Gentle BHA for blackheads',
            '• Size: 100ml (lasts 6 months with 2x/week use)',
            '',
            'WHAT TO EXPECT:',
            '• May cause "purging" first 2-4 weeks',
            '• Small whiteheads where you usually break out',
            '• This is NORMAL - keep going',
            '• Skin will clear after purge period'
          ]
        },
        {
          summary: 'Other days: Apply toner in 3 light layers',
          expandable: true,
          expanded: [
            'NON-EXFOLIATION NIGHTS:',
            '',
            '7-SKIN METHOD (Modified):',
            '• Pour toner into palm',
            '• Pat onto face',
            '• Wait 10 seconds',
            '• Repeat 2 more times (3 layers total)',
            '• Pat gently between each layer',
            '',
            'WHY 3 LAYERS:',
            '• Builds up hydration',
            '• Plumps skin',
            '• Traditional Korean method',
            '• Perfect for dry skin',
            '',
            'PRODUCT: Pyunkang Yul Essence Toner (~$15)'
          ]
        }
      ]
    },
    {
      id: 'pm-5',
      time: '8:10 PM',
      duration: 120,
      title: 'Essence & Moisturize',
      description: 'Hydrate and seal in moisture',
      essential: false,
      details: [
        {
          summary: 'Apply snail mucin essence (extra pump at night)',
          expandable: true,
          expanded: [
            'EVENING ESSENCE:',
            '• Pump 3-4 times (more than morning)',
            '• Warm between palms',
            '• Press into skin, focus on acne scars',
            '• Tap face all over for 30 seconds',
            '• Don\'t rub - patting is better for absorption',
            '',
            'PRODUCT: COSRX Snail 96 Mucin (~$20)',
            '',
            'NIGHT BENEFITS:',
            '• Skin repairs itself at night',
            '• Extra essence helps healing',
            '• Reduces morning puffiness',
            '• Improves acne scarring over time'
          ]
        },
        {
          summary: 'Apply moisturizer with upward strokes',
          expandable: true,
          expanded: [
            'NIGHT MOISTURIZER:',
            '• Use slightly more than morning',
            '• Pea-sized + rice-grain extra',
            '• Apply with upward strokes',
            '• Massage into skin',
            '',
            'OPTIONAL: Add 2 drops rosehip oil',
            '• Mix with moisturizer in palm',
            '• Helps with scarring',
            '• Anti-aging benefits',
            '• Great for dry skin',
            '',
            'PRODUCT: Neutrogena Hydro Boost (~$15)',
            'OR: CeraVe PM Moisturizer (~$14)'
          ]
        }
      ]
    },
    {
      id: 'pm-6',
      time: '8:12 PM',
      duration: 180,
      title: 'Gua Sha Massage',
      description: 'Reduce puffiness (optional)',
      essential: false,
      details: [
        {
          summary: 'Apply facial oil first, stroke upward/outward',
          expandable: true,
          expanded: [
            'GUA SHA ROUTINE (3 minutes):',
            '',
            'PREP:',
            '• Apply facial oil or extra moisturizer',
            '• Gua sha tool from fridge (cold reduces puffiness)',
            '',
            'PATTERN (Always upward/outward):',
            '1. Jaw to ear: 3 strokes each side',
            '   - Use firm pressure',
            '   - Helps with jaw tension',
            '',
            '2. Mouth corner to ear: 3 strokes',
            '   - Lifts smile lines',
            '',
            '3. Nose side to temple: 3 strokes',
            '   - Reduces sinus pressure',
            '',
            '4. Under eye to temple: 3 strokes',
            '   - GENTLE pressure only',
            '   - Reduces dark circles',
            '',
            '5. Forehead to hairline: 5 strokes',
            '   - Center, left side, right side',
            '',
            'BENEFITS FOR PCOS:',
            '• Reduces facial puffiness (hormone-related)',
            '• Lymphatic drainage',
            '• Relaxing before bed',
            '',
            'PRODUCT INFO:',
            '• Jade roller or Gua Sha tool (~$10-15)',
            '• Where: TJ Maxx, Amazon',
            '• Tip: Keep in fridge',
            '• Clean weekly with soap and water'
          ]
        }
      ]
    },
    {
      id: 'pm-7',
      time: '8:15 PM',
      duration: 60,
      title: 'Supplements',
      description: 'Evening supplements (Adalimumab-safe)',
      essential: false,
      details: [
        {
          summary: 'Spearmint capsule (if not drinking tea)',
          expandable: true,
          expanded: [
            '✓ SAFE with Adalimumab',
            '• Dose: 400mg',
            '• Or: 2 cups spearmint tea daily',
            '• Benefits: Reduces androgens/testosterone 15%',
            '• Critical for PCOS management'
          ]
        },
        {
          summary: 'Omega-3 (1000mg) - Reduces autoimmune risk 22%',
          expandable: true,
          expanded: [
            '✓ SAFE with Adalimumab',
            '• Dose: 1000mg EPA/DHA',
            '• Brand: Nordic Naturals',
            '• Benefits:',
            '  - Inflammation reduction',
            '  - Reduces autoimmune risk 22%',
            '  - Skin health',
            '  - Hormone balance',
            '• Take with food for better absorption'
          ]
        },
        {
          summary: 'Vitamin D (2000-4000 IU) - Essential for both conditions',
          expandable: true,
          expanded: [
            '✓ SAFE with Adalimumab',
            '• Dose: 2000-4000 IU (get levels tested)',
            '• Benefits:',
            '  - Hormone regulation',
            '  - Mood support',
            '  - Essential for PCOS & Crohn\'s',
            '  - Immune system',
            '• Take with fat for absorption',
            '• Most PCOS patients are deficient'
          ]
        },
        {
          summary: 'Magnesium glycinate - Choose oxide form for less GI effect',
          expandable: true,
          expanded: [
            '✓ SAFE with Adalimumab',
            '• Dose: 200-400mg',
            '• Form: Glycinate preferred, or oxide if Crohn\'s sensitive',
            '• Benefits:',
            '  - Sleep improvement',
            '  - Insulin sensitivity',
            '  - Muscle cramps reduction',
            '  - Anxiety reduction',
            '• Take away from other minerals',
            '• Causes drowsiness - perfect for bedtime'
          ]
        },
        {
          summary: 'Inositol (2-4g daily, 40:1 ratio myo:D-chiro)',
          expandable: true,
          expanded: [
            '✓ SAFE with Adalimumab',
            '• Dose: 2-4g daily',
            '• Ratio: 40:1 myo-inositol to D-chiro-inositol',
            '• Brand: Ovasitol',
            '• Benefits:',
            '  - Insulin sensitivity (huge for PCOS)',
            '  - Ovarian function improvement',
            '  - May restore regular cycles',
            '  - Reduces testosterone',
            '• Take half in morning, half at night',
            '• Mix powder in water or tea'
          ]
        },
        {
          summary: '⚠️ NOT INCLUDED: Probiotics, NAC (require medical approval)',
          expandable: true,
          expanded: [
            '❌ REMOVED FROM ROUTINE:',
            '',
            '1. PROBIOTICS:',
            '• Previous dose: 10+ billion CFU',
            '• Reason removed: Moderate interaction risk with adalimumab',
            '• DO NOT take without gastroenterologist approval',
            '',
            '2. NAC (N-Acetyl Cysteine):',
            '• Previous dose: 600mg',
            '• Reason removed: Theoretical concern (same pathway as adalimumab)',
            '• DO NOT take without medical supervision',
            '',
            '3. ANY LIVE CULTURE SUPPLEMENTS:',
            '• DO NOT take without gastroenterologist approval',
            '• This includes kombucha, kefir supplements',
            '',
            'WHY THIS MATTERS:',
            '• Adalimumab suppresses immune system',
            '• Live cultures may interfere',
            '• Safety first - always ask doctor'
          ]
        }
      ]
    },
    {
      id: 'pm-8',
      time: '8:16 PM',
      duration: 180,
      title: 'Legs Up the Wall',
      description: 'Reduce fluid retention',
      essential: true,
      details: [
        {
          summary: 'Lie on back near wall, extend legs up',
          expandable: true,
          expanded: [
            'SETUP:',
            '• Lie on back near wall',
            '• Scoot bottom as close to wall as comfortable',
            '• Extend legs up wall',
            '• Arms relaxed at sides, palms up',
            '• Head on pillow if more comfortable',
            '',
            'HOLD FOR 3 MINUTES:',
            '• Breathe normally',
            '• Close eyes',
            '• Focus on breath',
            '• Let gravity do the work',
            '',
            'BENEFITS:',
            '• Reduces fluid retention in legs/face',
            '• Helps with PCOS puffiness',
            '• Calms nervous system',
            '• Prepares body for sleep',
            '• Gentle inversion',
            '',
            'MODIFICATIONS:',
            '• Hypermobility: Don\'t lock knees',
            '• Can bend knees slightly',
            '• If uncomfortable: Put cushion under hips',
            '',
            'WHEN TO SKIP:',
            '• During menstruation (first 2 days)',
            '• If you have eye pressure issues',
            '• If it causes discomfort'
          ]
        }
      ]
    }
  ]

  // Simplified mode - only essential tasks
  const simplifiedMorning = morningRoutine.filter(step => step.essential)
  const simplifiedEvening = eveningRoutine.filter(step => step.essential)

  const currentRoutine = activeRoutine === 'AM'
    ? (simplifiedMode ? simplifiedMorning : morningRoutine)
    : (simplifiedMode ? simplifiedEvening : eveningRoutine)

  // Timer effect
  useEffect(() => {
    let interval
    if (activeTimer !== null) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 0) {
            clearInterval(interval)
            setActiveTimer(null)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeTimer])

  const toggleComplete = (stepId) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }))
    if (skippedSteps[stepId]) {
      setSkippedSteps(prev => {
        const newSkipped = { ...prev }
        delete newSkipped[stepId]
        return newSkipped
      })
    }
  }

  const toggleSkip = (stepId) => {
    setSkippedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }))
    if (completedSteps[stepId]) {
      setCompletedSteps(prev => {
        const newCompleted = { ...prev }
        delete newCompleted[stepId]
        return newCompleted
      })
    }
  }

  const startTimer = (stepId, duration) => {
    setActiveTimer(stepId)
    setTimerSeconds(duration)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const toggleExpanded = (stepId) => {
    setExpandedStep(expandedStep === stepId ? null : stepId)
  }

  const toggleSubDetail = (detailKey) => {
    setExpandedSubDetail(prev => ({
      ...prev,
      [detailKey]: !prev[detailKey]
    }))
  }

  const completedCount = Object.values(completedSteps).filter(Boolean).length
  const totalSteps = currentRoutine.length
  const progress = (completedCount / totalSteps) * 100

  return (
    <div className="routines-page">

      {/* Header */}
      <header className="routines-header">
        <h1 className="page-title">Routines</h1>
        <div className="header-subtitle">
          {completedCount} of {totalSteps} completed
        </div>
      </header>

      {/* Progress bar */}
      <div className="routine-progress-bar">
        <div
          className="routine-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* AM/PM Toggle */}
      <div className="routine-toggle-container">
        <button
          className={`routine-toggle-btn ${activeRoutine === 'AM' ? 'active' : ''}`}
          onClick={() => setActiveRoutine('AM')}
        >
          🌅 Morning
        </button>
        <button
          className={`routine-toggle-btn ${activeRoutine === 'PM' ? 'active' : ''}`}
          onClick={() => setActiveRoutine('PM')}
        >
          🌙 Evening
        </button>
      </div>

      {/* Simplified Mode Toggle */}
      <div className="simplified-mode-container">
        <label className="simplified-toggle">
          <input
            type="checkbox"
            checked={simplifiedMode}
            onChange={(e) => setSimplifiedMode(e.target.checked)}
          />
          <span className="toggle-label">
            Simplified Mode (bad day? just the essentials)
          </span>
        </label>
      </div>

      {/* Routine steps */}
      <div className="routine-steps">
        {currentRoutine.map((step, index) => (
          <div
            key={step.id}
            className={`routine-step ${completedSteps[step.id] ? 'completed' : ''} ${skippedSteps[step.id] ? 'skipped' : ''}`}
          >

            {/* Main step content */}
            <div className="step-main">

              {/* Time badge */}
              <div className="step-time-badge">{step.time}</div>

              {/* Step number */}
              <div className="step-number">{index + 1}</div>

              {/* Step info */}
              <div className="step-info" onClick={() => toggleExpanded(step.id)}>
                <h3 className="step-title">
                  {step.title}
                  {step.essential && <span className="essential-badge">Essential</span>}
                </h3>
                <p className="step-description">{step.description}</p>
                <div className="step-duration">{formatTime(step.duration)}</div>
              </div>

              {/* Checkbox */}
              <button
                className="step-checkbox"
                onClick={() => toggleComplete(step.id)}
                aria-label={completedSteps[step.id] ? 'Mark incomplete' : 'Mark complete'}
              >
                {completedSteps[step.id] && <span className="checkmark">✓</span>}
              </button>

            </div>

            {/* Expanded details */}
            {expandedStep === step.id && (
              <div className="step-details">
                <ul className="step-details-list">
                  {step.details.map((detail, idx) => {
                    const detailKey = `${step.id}-detail-${idx}`
                    return (
                      <li key={idx} className="step-detail-item">
                        <div className="detail-summary">
                          {detail.summary}
                          {detail.expandable && (
                            <button
                              className="detail-expand-btn"
                              onClick={() => toggleSubDetail(detailKey)}
                            >
                              {expandedSubDetail[detailKey] ? '− Less' : '+ More'}
                            </button>
                          )}
                        </div>
                        {detail.expandable && expandedSubDetail[detailKey] && (
                          <div className="detail-expanded">
                            {detail.expanded.map((line, lineIdx) => (
                              <div key={lineIdx} className="detail-line">
                                {line}
                              </div>
                            ))}
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="step-actions">

              {/* Timer button */}
              <button
                className={`action-btn timer-btn ${activeTimer === step.id ? 'active' : ''}`}
                onClick={() => startTimer(step.id, step.duration)}
                disabled={activeTimer === step.id}
              >
                ⏱️ {activeTimer === step.id ? formatTime(timerSeconds) : 'Start Timer'}
              </button>

              {/* Skip button */}
              <button
                className={`action-btn skip-btn ${skippedSteps[step.id] ? 'active' : ''}`}
                onClick={() => toggleSkip(step.id)}
              >
                {skippedSteps[step.id] ? '↩️ Unskip' : '⏭️ Skip (no guilt!)'}
              </button>

              {/* Expand button */}
              <button
                className="action-btn expand-btn"
                onClick={() => toggleExpanded(step.id)}
              >
                {expandedStep === step.id ? '▲ Less' : '▼ More'}
              </button>

            </div>

          </div>
        ))}
      </div>

      {/* Completion message */}
      {completedCount === totalSteps && (
        <div className="completion-message">
          <span className="celebration-emoji">🎉</span>
          <h3>Amazing job!</h3>
          <p>You completed your {activeRoutine === 'AM' ? 'morning' : 'evening'} routine!</p>
        </div>
      )}

    </div>
  )
}

export default RoutinesPage
