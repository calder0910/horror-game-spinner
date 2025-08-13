import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Volume2, ChevronDown, Skull } from 'lucide-react';

const HorrorElementsSpinner = () => {
  const [selectedCategory, setSelectedCategory] = useState('🚪 Architectural Objects');
  const [currentStage, setCurrentStage] = useState(1);
  const [selectedObject, setSelectedObject] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [particles, setParticles] = useState([]);
  const [creatorMode, setCreatorMode] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);
  const [gameMode, setGameMode] = useState('random');
  
  const wheelRef = useRef(null);
  const audioContextRef = useRef(null);

  // Generate floating particles for background effect
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  // Complete horror elements data
  const horrorElements = {
    '🚪 Architectural Objects': {
      color: '#8B1538',
      glowColor: '#FF6B6B',
      items: {
  "Doors": ["creaky", "locked", "slammed shut", "slowly opening", "rotting wood", "rusted metal", "scratched surface", "bullet holes", "barricaded", "chained shut"],
  "Windows": ["broken", "boarded up", "shadows behind", "cracked glass", "foggy condensation", "blood smeared", "curtains moving", "face peering through", "shattered completely", "glowing from inside"],
  "Stairs": ["creaking", "blood stains", "leading to darkness", "broken steps", "spiral design", "carpet torn", "handrail missing", "floating steps", "infinite upward", "collapsing down"],
  "Mirrors": ["cracked", "showing different reflections", "blood written messages", "foggy surface", "shattered pieces", "antique frames", "no reflection showing", "multiple reflections", "distorted images", "moving on their own"],
  "Hallways": ["long", "narrow", "endless", "flickering lights", "paintings watching", "doors on both sides", "slanted floors", "getting smaller", "blood trail", "echoing footsteps"]
}
    },
    '🪑 Furniture & Props': {
      color: '#654321',
      glowColor: '#D2691E',
      items: {
  "Old furniture": ["rocking chairs", "antique beds", "dusty sofas", "broken tables", "tilted bookcases", "moth-eaten fabric", "creaking wood", "stained cushions", "missing legs", "cobweb covered"],
  "Medical equipment": ["gurneys", "IV stands", "wheelchairs", "surgical tables", "oxygen tanks", "heart monitors", "bloody syringes", "rusty scalpels", "broken machines", "specimen jars"],
  "Religious objects": ["crosses", "altars", "statues", "holy water fonts", "prayer books", "rosary beads", "candle holders", "church pews", "stained glass", "angel figures"],
  "Children's toys": ["dolls", "teddy bears", "music boxes", "rocking horses", "toy cars", "building blocks", "stuffed animals", "marbles scattered", "broken crayons", "abandoned playground equipment"],
  "Clocks": ["stopped", "ticking loudly", "backwards", "grandfather clocks", "digital displays", "melted faces", "multiple time zones", "alarm ringing", "pendulum swinging", "time moving fast"]
}
    },
    '📜 Documents & Texts': {
      color: '#2F2F2F',
      glowColor: '#708090',
      items: {
  "Old newspapers": ["dark headlines", "yellowed pages", "torn edges", "coffee stained", "missing persons ads", "death notices", "strange articles", "bloodstained", "burnt corners", "illegible text"],
  "Medical records": ["disturbing notes", "patient files", "X-ray images", "prescription bottles", "test results", "surgery reports", "psychological evaluations", "autopsy reports", "medical charts", "diagnosis papers"],
  "Diary entries": ["revealing backstory", "handwritten pages", "tear stains", "desperate writing", "crossed out words", "different ink colors", "sketch drawings", "love letters", "confession notes", "final messages"],
  "Warning signs": ["danger", "keep out", "no trespassing", "hazardous materials", "emergency exit", "wet floor", "high voltage", "quarantine zone", "authorized personnel only", "condemned building"],
  "Graffiti": ["desperate messages", "spray painted walls", "carved words", "chalk writings", "blood written", "gang tags", "protest slogans", "phone numbers", "love declarations", "curse words"]
}
    },
    '🔧 Mechanical Objects': {
      color: '#1E3A8A',
      glowColor: '#60A5FA',
      items: {
  "Old TVs": ["static", "disturbing images", "flickering screens", "broken antennas", "tube monitors", "multiple channels", "no signal", "ghostly faces", "security footage", "emergency broadcasts"],
  "Radios": ["crackling", "mysterious voices", "AM/FM static", "vintage models", "emergency signals", "foreign languages", "distress calls", "music boxes playing", "white noise", "police scanners"],
  "Elevators": ["broken", "trapped inside", "flickering lights", "emergency stops", "between floors", "creaking cables", "buttons not working", "doors stuck", "falling sensation", "going to wrong floors"],
  "Generators": ["failing power", "diesel engines", "sparking wires", "fuel leaking", "loud humming", "backup systems", "emergency lighting", "overheating", "smoke coming out", "sudden shutdowns"],
  "Security cameras": ["watching", "following", "red recording lights", "broken lenses", "static feed", "night vision mode", "motion detection", "multiple monitors", "zoom functions", "privacy violations"]
}
    },
    '🩸 Horror Specific Objects': {
      color: '#7F1D1D',
      glowColor: '#EF4444',
      items: {
  "Bloodstains": ["fresh", "dried", "patterns", "splattered walls", "pooled floors", "handprints", "drag marks", "arterial spray", "coagulated drops", "footprint trails"],
  "Bones & skulls": ["human remains", "animal skeletons", "scattered pieces", "cracked skulls", "jaw bones", "rib cages", "finger bones", "spine columns", "teeth marks", "burial sites"],
  "Chains & restraints": ["imprisonment themes", "handcuffs", "rope bindings", "metal shackles", "leather straps", "ball and chain", "straightjackets", "ankle cuffs", "neck collars", "padlocks"],
  "Surgical tools": ["sharp", "menacing", "scalpels", "bone saws", "forceps", "clamps", "needles", "drill bits", "scissors", "tweezers", "syringes", "medical implements"],
  "Ritual objects": ["pentagrams", "candles", "altars", "sacrifice tables", "ceremonial knives", "occult symbols", "spell books", "crystal balls", "tarot cards", "voodoo dolls"]
}
    },
    '🌿 Organic Objects': {
      color: '#14532D',
      glowColor: '#22C55E',
      items: {
  "Dead plants": ["withered", "twisted", "black leaves", "dried stems", "thorny vines", "poison ivy", "dead flowers", "bare branches", "rotting roots", "fungal growth"],
  "Spider webs": ["abandonment", "decay", "thick cobwebs", "corner accumulation", "dust covered", "insect remains", "multiple layers", "sticky strands", "broken patterns", "active spiders"],
  "Mold & fungus": ["spreading", "consuming", "green patches", "black spots", "fuzzy texture", "wall climbing", "corner growth", "moisture damage", "toxic spores", "mushroom clusters"],
  "Dead animals": ["crows", "rats", "cats", "roadkill", "decomposing", "skeletal remains", "maggot infested", "roadside casualties", "pet collars", "veterinary tables"]
}
    },
    '👹 Creature/Monster Visual Design': {
      color: '#581C87',
      glowColor: '#A855F7',
      items: {
  "Zombies": ["decay", "missing limbs", "bloody", "rotting flesh", "exposed bones", "dragging feet", "torn clothes", "vacant eyes", "bite marks", "shambling walk"],
  "Ghosts": ["translucent", "floating", "distorted", "cold breath", "flickering form", "pale skin", "flowing hair", "period clothing", "chain rattling", "phasing through walls"],
  "Possessed humans": ["glowing eyes", "unnatural movements", "contorted faces", "speaking backwards", "levitating", "head spinning", "multiple voices", "scratched skin", "religious symbols", "demonic features"],
  "Cultists": ["robes", "masks", "symbols", "ritual scars", "painted faces", "hooded figures", "ceremonial weapons", "chanting groups", "candle holders", "occult jewelry"],
  "Mutated humans": ["extra limbs", "deformities", "oversized features", "skin lesions", "tumor growths", "asymmetrical bodies", "laboratory experiments", "radiation effects", "genetic splicing", "bio-hazard suits"]
}
    },
    '🖥️ UI/Interface Design': {
      color: '#C2410C',
      glowColor: '#FB923C',
      items: {
  "HUD elements": ["health bars", "stamina", "inventory", "minimap display", "ammo counter", "objective markers", "interaction prompts", "status effects", "timer countdown", "resource meters"],
  "Menu design": ["main menu", "pause", "settings", "save/load screens", "character selection", "difficulty options", "audio controls", "video settings", "key bindings", "credits screen"],
  "Typography": ["horror fonts", "distressed text", "blood dripping letters", "scratched appearance", "gothic styles", "handwritten notes", "typewriter font", "glitch effects", "faded text", "carved inscriptions"],
  "Icons & symbols": ["creepy UI elements", "skull decorations", "occult symbols", "warning icons", "status indicators", "inventory items", "weapon icons", "magic runes", "achievement badges", "progress markers"]
}
    },
    '✨ Visual Effects (VFX)': {
      color: '#A16207',
      glowColor: '#FDE047',
      items: {
  "Particle systems": ["blood splatter", "smoke", "sparks", "dust clouds", "ash falling", "ember glow", "steam rising", "debris flying", "magic sparkles", "explosion fragments"],
  "Magic/supernatural effects": ["energy", "portals", "auras", "spell casting", "magical shields", "teleportation", "levitation", "spirit manifestation", "dimensional rifts", "otherworldly glow"],
  "Destruction effects": ["breaking glass", "crumbling walls", "collapsing structures", "shattering objects", "explosive damage", "fire spreading", "water flooding", "earth cracking", "metal bending", "wood splintering"],
  "Weather particles": ["rain drops", "snow", "ash", "fog rolling", "wind gusts", "lightning strikes", "hail stones", "sandstorms", "mist formation", "storm clouds"]
}
    },
    '🎭 Character Design (Non-Monster)': {
      color: '#BE185D',
      glowColor: '#F472B6',
      items: {
  "Protagonist appearance": ["clothing", "equipment", "facial features", "hair styles", "body build", "age variation", "gender options", "ethnic diversity", "clothing damage", "survival gear"],
  "NPCs design": ["survivors", "allies", "victims", "shop keepers", "quest givers", "background characters", "authority figures", "family members", "professionals", "elderly people"],
  "Character animations": ["walking", "running", "fear reactions", "combat moves", "idle poses", "climbing", "jumping", "interaction gestures", "facial expressions", "death sequences"]
}
    },
    '🏗 Material/Texture Design': {
      color: '#92400E',
      glowColor: '#F59E0B',
      items: {
  "Surface materials": ["rusty metal", "moldy wood", "cracked concrete", "peeling paint", "weathered stone", "corroded pipes", "stained fabric", "broken glass", "wet surfaces", "dusty floors"],
  "Fabric textures": ["torn cloth", "old leather", "blood-stained", "moth-eaten", "faded colors", "rough canvas", "silk curtains", "velvet upholstery", "denim patches", "lace details"],
  "Organic textures": ["skin", "flesh", "decay", "bark patterns", "leaf surfaces", "fur coating", "scale texture", "feather detail", "bone structure", "muscle fiber"]
}
    },
    '🎬 Post-Processing Effects': {
      color: '#6B21A8',
      glowColor: '#C084FC',
      items: {
  "Screen filters": ["film grain", "vignetting", "chromatic aberration", "sepia tone", "black and white", "high contrast", "low saturation", "vintage look", "polaroid effect", "security camera filter"],
  "Distortion effects": ["glitch", "static", "blur", "double vision", "fish eye lens", "barrel distortion", "pixel corruption", "scan lines", "VHS artifacts", "digital noise"]
}
    }
  };

  // Get current category data
  const getCurrentCategoryData = () => {
    return horrorElements[selectedCategory];
  };

  // Get current data based on stage
  const getCurrentData = () => {
    const categoryData = getCurrentCategoryData();
    if (currentStage === 1) {
      return Object.keys(categoryData.items);
    } else if (currentStage === 2 && selectedObject) {
      return categoryData.items[selectedObject];
    }
    return [];
  };

  const getCurrentColors = () => {
    const data = getCurrentData();
    const categoryData = getCurrentCategoryData();
    const baseColor = categoryData.color;
    
    if (currentStage === 1) {
      return data.map((_, index) => {
        const hue = (index * 360 / data.length) % 360;
        return `hsl(${hue}, 60%, 35%)`;
      });
    } else {
      // For properties, use variations of the base color
      return data.map((_, index) => {
        return adjustBrightness(baseColor, (index * 25) - 25);
      });
    }
  };

  // Helper function to adjust color brightness
  const adjustBrightness = (hex, percent) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
    return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
  };

  // Sound effects
  const playSound = (frequency, duration = 200) => {
    if (!soundEnabled) return;
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.7, audioContextRef.current.currentTime + duration / 1000);
      gainNode.gain.setValueAtTime(0.15, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000);
      
      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const spinWheel = () => {
    if (isSpinning) return;
    
    const data = getCurrentData();
    if (data.length === 0) return;

    setIsSpinning(true);
    playSound(200, 150);

    // Random spin amount (4-8 full rotations plus random position)
    const spins = 4 + Math.random() * 4;
    const randomDegree = Math.random() * 360;
    const totalRotation = rotation + (spins * 360) + randomDegree;
    
    setRotation(totalRotation);

    // Calculate which segment we landed on
    const segmentAngle = 360 / data.length;
    const normalizedAngle = (360 - (totalRotation % 360)) % 360;
    const selectedIndex = Math.floor(normalizedAngle / segmentAngle);
    const selectedItem = data[selectedIndex];

    setTimeout(() => {
      setIsSpinning(false);
      playSound(150, 400);
      
      // Update selection based on current stage
      if (currentStage === 1) {
        setSelectedObject(selectedItem);
        setCurrentStage(2);
        setSelectedProperty(null);
      } else if (currentStage === 2) {
        setSelectedProperty(selectedItem);
      }
    }, 3500);
  };

  const resetWheel = () => {
    setCurrentStage(1);
    setSelectedObject(null);
    setSelectedProperty(null);
    setRotation(0);
    playSound(100, 200);
  };

  const changeCategory = (category) => {
    setSelectedCategory(category);
    setCurrentStage(1);
    setSelectedObject(null);
    setSelectedProperty(null);
    setRotation(0);
    setShowCategoryDropdown(false);
    playSound(180, 120);
  };

  // Creator mode functions
  const toggleCreatorMode = () => {
    setCreatorMode(!creatorMode);
    playSound(creatorMode ? 100 : 250, 150);
  };

  const generatePromptText = () => {
    if (!selectedObject || !selectedProperty) return '';
    
    const concept = `${selectedCategory.split(' ')[0]} ${selectedObject} with "${selectedProperty}" property`;
    
    return `Act as an expert horror game visual prompt engineer. You specialize in creating optimized prompts for AI image generation that produce high-quality, atmospheric horror game assets.
Your task: Transform the given horror concept into a detailed, effective prompt for [MIDJOURNEY/DALLE/STABLE DIFFUSION].
**Requirements:**
- Maintain consistent dark, eerie horror game aesthetic
- Include technical specifications for high quality output
- Add appropriate atmospheric and lighting descriptors
- Incorporate negative prompts when necessary
- Ensure the specific element properties are clearly represented
**Input Concept:**
${concept}
**Generate optimized prompt for:** DALL-E`;
  };

  const copyPromptToClipboard = async () => {
    const promptText = generatePromptText();
    if (!promptText) return;
    
    try {
      await navigator.clipboard.writeText(promptText);
      setPromptCopied(true);
      playSound(400, 200);
      setTimeout(() => setPromptCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const data = getCurrentData();
  const colors = getCurrentColors();
  const segmentAngle = data.length > 0 ? 360 / data.length : 0;
  const categoryData = getCurrentCategoryData();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-red-950">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-red-500 animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `float ${particle.speed + 3}s ease-in-out infinite`,
              animationDelay: `${particle.id * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div className="relative z-10 max-w-5xl mx-auto p-4 md:p-6">
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center mb-4">
            <Skull className="w-8 h-8 md:w-12 md:h-12 text-red-500 mr-2 md:mr-4 animate-pulse" />
            <h1 className="text-3xl md:text-6xl font-bold text-white font-serif tracking-wider" 
                style={{ 
                  textShadow: '0 0 20px #ef4444, 0 0 40px #dc2626, 0 0 60px #b91c1c',
                  fontFamily: 'serif'
                }}>
              HORROR SPINNER
            </h1>
            <Skull className="w-8 h-8 md:w-12 md:h-12 text-red-500 ml-2 md:ml-4 animate-pulse" />
          </div>
          <p className="text-lg md:text-xl text-red-200 font-bold tracking-wide" 
             style={{ textShadow: '0 0 10px #fecaca' }}>
            ⚡ Generate Terrifying Elements ⚡
          </p>
        </div>

        {/* Mode Selector */}
        <div className="mb-8 md:mb-10">
          <div className="max-w-2xl mx-auto px-4">
            <h3 className="text-center text-xl md:text-2xl font-bold text-white mb-4 tracking-wide"
                style={{ textShadow: '0 0 15px #ef4444' }}>
              🎮 SELECT YOUR MODE 🎮
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setGameMode('random')}
                className={`px-6 py-4 rounded-xl font-bold text-lg transition-all border-4 ${
                  gameMode === 'random' 
                    ? 'bg-gradient-to-r from-red-600 to-red-800 text-white border-red-400' 
                    : 'bg-gradient-to-r from-gray-600 to-gray-800 text-gray-300 border-gray-500 hover:border-red-400'
                }`}
                style={{ 
                  boxShadow: gameMode === 'random' ? '0 0 30px #ef444460' : '0 0 20px #00000040',
                  textShadow: '0 0 10px #000000'
                }}
              >
                🎲 RANDOM ALL
              </button>
              <button
                onClick={() => setGameMode('manual')}
                className={`px-6 py-4 rounded-xl font-bold text-lg transition-all border-4 ${
                  gameMode === 'manual' 
                    ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white border-purple-400' 
                    : 'bg-gradient-to-r from-gray-600 to-gray-800 text-gray-300 border-gray-500 hover:border-purple-400'
                }`}
                style={{ 
                  boxShadow: gameMode === 'manual' ? '0 0 30px #a855f760' : '0 0 20px #00000040',
                  textShadow: '0 0 10px #000000'
                }}
              >
                ⚙️ MANUAL
              </button>
            </div>
          </div>
        </div>

        {/* Category Selector */}
        {gameMode === 'random' && (
        <div className="mb-8 md:mb-10">
          <div className="relative max-w-2xl mx-auto px-4">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="w-full flex items-center justify-between px-4 md:px-8 py-4 md:py-6 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white rounded-xl md:rounded-2xl border-2 md:border-4 border-red-600 hover:border-red-400 transition-all shadow-2xl"
              style={{ 
                boxShadow: `0 0 30px ${categoryData.glowColor}40, inset 0 0 20px #00000080`,
                textShadow: '0 0 10px #ffffff'
              }}
            >
              <span className="text-lg md:text-2xl font-bold tracking-wide break-words text-left">{selectedCategory}</span>
              <ChevronDown className={`w-6 h-6 md:w-8 md:h-8 transition-transform flex-shrink-0 ml-2 ${showCategoryDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showCategoryDropdown && (
              <div className="absolute top-full left-4 right-4 md:left-0 md:right-0 mt-2 bg-black rounded-xl md:rounded-2xl border-2 md:border-4 border-red-600 shadow-2xl z-50 max-h-80 md:max-h-96 overflow-y-auto"
                   style={{ boxShadow: '0 0 40px #ef444440' }}>
                {Object.keys(horrorElements).map((category, index) => (
                  <button
                    key={category}
                    onClick={() => changeCategory(category)}
                    className={`w-full px-4 md:px-8 py-3 md:py-4 text-left text-base md:text-lg font-semibold transition-all border-b border-gray-800 hover:bg-red-900 hover:text-white ${
                      category === selectedCategory ? 'bg-red-800 text-white' : 'text-red-200'
                    } ${index === 0 ? 'rounded-t-xl' : ''} ${
                      index === Object.keys(horrorElements).length - 1 ? 'rounded-b-xl border-b-0' : ''
                    }`}
                    style={{ textShadow: '0 0 8px #00000080' }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        )}

        {/* Stage Indicator */}
        {gameMode === 'random' && (
        <div className="flex justify-center mb-8 md:mb-10 px-4">
          <div className="flex items-center space-x-3 md:space-x-6 bg-black rounded-full px-4 md:px-10 py-3 md:py-6 border-2 md:border-4 border-gray-700"
               style={{ boxShadow: '0 0 30px #00000080, inset 0 0 20px #ffffff10' }}>
            <div className={`flex items-center space-x-2 md:space-x-4 px-3 md:px-8 py-2 md:py-4 rounded-full transition-all font-bold text-sm md:text-lg border-2 ${
              currentStage === 1 
                ? `bg-gradient-to-r from-red-600 to-red-800 text-white border-red-400` 
                : 'bg-gradient-to-r from-green-700 to-green-900 text-white border-green-400'
            }`}
            style={{ 
              boxShadow: currentStage === 1 
                ? '0 0 20px #ef444460' 
                : '0 0 20px #22c55e60',
              textShadow: '0 0 10px #000000'
            }}>
              <span className="text-lg md:text-xl">1</span>
              <span className="tracking-wide hidden sm:inline">OBJECT TYPE</span>
              <span className="tracking-wide sm:hidden">OBJ</span>
            </div>
            <div className="w-6 md:w-12 h-1 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full"></div>
            <div className={`flex items-center space-x-2 md:space-x-4 px-3 md:px-8 py-2 md:py-4 rounded-full transition-all font-bold text-sm md:text-lg border-2 ${
              currentStage === 2 
                ? `bg-gradient-to-r from-red-600 to-red-800 text-white border-red-400`
                : selectedProperty 
                ? 'bg-gradient-to-r from-green-700 to-green-900 text-white border-green-400' 
                : 'bg-gradient-to-r from-gray-700 to-gray-900 text-gray-300 border-gray-600'
            }`}
            style={{ 
              boxShadow: currentStage === 2 
                ? '0 0 20px #ef444460' 
                : selectedProperty 
                ? '0 0 20px #22c55e60'
                : '0 0 10px #00000040',
              textShadow: '0 0 10px #000000'
            }}>
              <span className="text-lg md:text-xl">2</span>
              <span className="tracking-wide hidden sm:inline">PROPERTIES</span>
              <span className="tracking-wide sm:hidden">PROP</span>
            </div>
          </div>
        </div>
        )}

        {/* Current Selections Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-10 px-4">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl md:rounded-2xl p-4 md:p-8 border-2 md:border-4 border-purple-600 shadow-2xl"
               style={{ boxShadow: '0 0 30px #a855f760, inset 0 0 20px #ffffff05' }}>
            <h3 className="text-purple-300 font-bold mb-2 md:mb-4 text-lg md:text-2xl tracking-wide flex items-center"
                style={{ textShadow: '0 0 10px #a855f7' }}>
              <span className="mr-2 md:mr-3">🗝️</span>
              <span className="hidden sm:inline">SELECTED OBJECT</span>
              <span className="sm:hidden">OBJECT</span>
            </h3>
            <p className="text-white text-xl md:text-3xl font-bold tracking-wide break-words"
               style={{ textShadow: '0 0 15px #ffffff80' }}>
              {selectedObject || '—'}
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl md:rounded-2xl p-4 md:p-8 border-2 md:border-4 border-orange-600 shadow-2xl"
               style={{ boxShadow: '0 0 30px #fb923c60, inset 0 0 20px #ffffff05' }}>
            <h3 className="text-orange-300 font-bold mb-2 md:mb-4 text-lg md:text-2xl tracking-wide flex items-center"
                style={{ textShadow: '0 0 10px #fb923c' }}>
              <span className="mr-2 md:mr-3">✨</span>
              <span className="hidden sm:inline">SELECTED PROPERTY</span>
              <span className="sm:hidden">PROPERTY</span>
            </h3>
            <p className="text-white text-xl md:text-3xl font-bold tracking-wide break-words"
               style={{ textShadow: '0 0 15px #ffffff80' }}>
              {selectedProperty || '—'}
            </p>
          </div>
        </div>

        {/* Manual Mode UI */}
        {gameMode === 'manual' && (
        <div className="flex flex-col items-center px-4 mb-8 md:mb-10">
          <h3 className="text-center text-xl md:text-3xl font-bold text-white mb-6 md:mb-8 tracking-wide"
              style={{ textShadow: '0 0 20px #a855f7' }}>
            ⚙️ MANUAL SELECTION MODE
          </h3>
          
          <div className="max-w-4xl w-full space-y-6">
            {/* Category Selection */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border-4 border-purple-600"
                 style={{ boxShadow: '0 0 30px #a855f760' }}>
              <label className="block text-purple-300 font-bold mb-4 text-lg"
                     style={{ textShadow: '0 0 10px #a855f7' }}>
                1️⃣ SELECT CATEGORY:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedObject(null);
                  setSelectedProperty(null);
                }}
                className="w-full px-4 py-3 bg-black text-white rounded-lg border-2 border-purple-400 font-bold text-lg"
                style={{ textShadow: '0 0 8px #000000' }}
              >
                {Object.keys(horrorElements).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Object Selection */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border-4 border-orange-600"
                 style={{ boxShadow: '0 0 30px #fb923c60' }}>
              <label className="block text-orange-300 font-bold mb-4 text-lg"
                     style={{ textShadow: '0 0 10px #fb923c' }}>
                2️⃣ SELECT OBJECT TYPE:
              </label>
              <select
                value={selectedObject || ''}
                onChange={(e) => {
                  setSelectedObject(e.target.value);
                  setSelectedProperty(null);
                }}
                className="w-full px-4 py-3 bg-black text-white rounded-lg border-2 border-orange-400 font-bold text-lg"
                style={{ textShadow: '0 0 8px #000000' }}
                disabled={!selectedCategory}
              >
                <option value="">-- Choose Object Type --</option>
                {selectedCategory && Object.keys(horrorElements[selectedCategory].items).map((object) => (
                  <option key={object} value={object}>
                    {object}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Selection */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border-4 border-green-600"
                 style={{ boxShadow: '0 0 30px #22c55e60' }}>
              <label className="block text-green-300 font-bold mb-4 text-lg"
                     style={{ textShadow: '0 0 10px #22c55e' }}>
                3️⃣ SELECT PROPERTY:
              </label>
              <select
                value={selectedProperty || ''}
                onChange={(e) => setSelectedProperty(e.target.value)}
                className="w-full px-4 py-3 bg-black text-white rounded-lg border-2 border-green-400 font-bold text-lg"
                style={{ textShadow: '0 0 8px #000000' }}
                disabled={!selectedObject}
              >
                <option value="">-- Choose Property --</option>
                {selectedObject && selectedCategory && horrorElements[selectedCategory].items[selectedObject]?.map((property) => (
                  <option key={property} value={property}>
                    {property}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        )}

        {/* Spinning Wheel */}
        {gameMode === 'random' && (
        <div className="flex flex-col items-center px-4">
          <div className="relative mb-6 md:mb-8">
            <h3 className="text-center text-xl md:text-3xl font-bold text-white mb-4 md:mb-6 tracking-wide"
                style={{ textShadow: '0 0 20px #ef4444' }}>
              {currentStage === 1 ? '🎯 SPIN FOR OBJECT TYPE' : `🎯 SPIN FOR ${selectedObject?.toUpperCase()} PROPERTIES`}
            </h3>
            
            {/* Wheel Container */}
            <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] mx-auto">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 rounded-full"
                   style={{ 
                     boxShadow: `0 0 40px ${categoryData.glowColor}, 0 0 80px ${categoryData.glowColor}40` 
                   }}></div>
              
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 md:-translate-y-4 z-30">
                <div className="relative">
                  <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 md:border-l-8 md:border-r-8 md:border-b-16 border-l-transparent border-r-transparent border-b-yellow-400 drop-shadow-2xl"
                       style={{ filter: 'drop-shadow(0 0 10px #fbbf24)' }}></div>
                  <div className="absolute top-1.5 md:top-2 left-1/2 transform -translate-x-1/2 w-3 h-6 md:w-4 md:h-8 bg-yellow-400 rounded-b-lg"
                       style={{ boxShadow: '0 0 15px #fbbf24' }}></div>
                </div>
              </div>
              
              {/* Wheel */}
              <div
                ref={wheelRef}
                className="w-full h-full rounded-full border-4 md:border-8 border-yellow-400 relative overflow-hidden shadow-2xl"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning ? 'transform 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
                  boxShadow: '0 0 40px #fbbf2480, inset 0 0 30px #00000060'
                }}
              >
                {data.map((item, index) => {
                  const startAngle = index * segmentAngle;
                  const endAngle = (index + 1) * segmentAngle;
                  const midAngle = (startAngle + endAngle) / 2;
                  
                  return (
                    <div
                      key={index}
                      className="absolute w-full h-full"
                      style={{
                        transform: `rotate(${startAngle}deg)`,
                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((segmentAngle * Math.PI) / 180)}% ${50 - 50 * Math.sin((segmentAngle * Math.PI) / 180)}%)`
                      }}
                    >
                      <div
                        className="w-full h-full flex items-center justify-center border-r-2 border-black border-opacity-30 relative"
                        style={{ 
                          background: `linear-gradient(135deg, ${colors[index]} 0%, ${adjustBrightness(colors[index], -20)} 100%)`,
                          boxShadow: 'inset 0 0 20px #00000040'
                        }}
                      >
                        <span
                          className="text-white font-bold text-xs md:text-sm text-center px-2 md:px-3 transform z-10"
                          style={{
                            transform: `rotate(${midAngle - 90}deg)`,
                            maxWidth: '80px',
                            textShadow: '0 0 8px #000000, 2px 2px 4px #000000',
                            lineHeight: '1.2'
                          }}
                        >
                          {item.length > 25 ? item.substring(0, 23) + '...' : item}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-gray-800 to-black rounded-full border-4 md:border-8 border-yellow-400 z-20 flex items-center justify-center"
                   style={{ boxShadow: '0 0 30px #fbbf2480, inset 0 0 15px #00000080' }}>
                <span className="text-yellow-400 text-xl md:text-3xl drop-shadow-lg"
                      style={{ filter: 'drop-shadow(0 0 8px #fbbf24)' }}>
                  {selectedCategory.split(' ')[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
            <button
              onClick={spinWheel}
              disabled={isSpinning || data.length === 0}
              className="flex items-center space-x-3 md:space-x-4 px-8 md:px-12 py-4 md:py-6 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white rounded-full font-bold text-lg md:text-2xl hover:from-red-700 hover:via-red-800 hover:to-red-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 border-2 md:border-4 border-red-400 w-full sm:w-auto"
              style={{ 
                boxShadow: '0 0 40px #ef444460, inset 0 0 20px #ffffff20',
                textShadow: '0 0 10px #000000'
              }}
            >
              <Play className="w-6 h-6 md:w-8 md:h-8" />
              <span className="tracking-wider">{isSpinning ? 'SPINNING...' : 'SPIN!'}</span>
            </button>
            
            <div className="flex gap-4 w-full sm:w-auto">
              <button
                onClick={resetWheel}
                className="flex items-center justify-center space-x-2 md:space-x-3 px-4 md:px-8 py-4 md:py-6 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-full font-bold text-sm md:text-xl hover:from-gray-700 hover:to-gray-900 transition-all border-2 md:border-4 border-gray-500 flex-1 sm:flex-none"
                style={{ 
                  boxShadow: '0 0 30px #6b728040, inset 0 0 15px #ffffff10',
                  textShadow: '0 0 8px #000000'
                }}
              >
                <RotateCcw className="w-5 h-5 md:w-6 md:h-6" />
                <span className="tracking-wide">RESET</span>
              </button>
              
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`flex items-center justify-center space-x-2 md:space-x-3 px-4 md:px-8 py-4 md:py-6 rounded-full font-bold text-sm md:text-xl transition-all border-2 md:border-4 flex-1 sm:flex-none ${
                  soundEnabled 
                    ? 'bg-gradient-to-r from-green-600 to-green-800 text-white hover:from-green-700 hover:to-green-900 border-green-400' 
                    : 'bg-gradient-to-r from-gray-600 to-gray-800 text-gray-300 hover:from-gray-700 hover:to-gray-900 border-gray-500'
                }`}
                style={{ 
                  boxShadow: soundEnabled 
                    ? '0 0 30px #22c55e40, inset 0 0 15px #ffffff10' 
                    : '0 0 30px #6b728040, inset 0 0 15px #ffffff10',
                  textShadow: '0 0 8px #000000'
                }}
              >
                <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
                <span className="tracking-wide">SOUND</span>
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 md:mt-8 text-center max-w-2xl px-4">
            <p className="text-red-200 text-lg md:text-2xl font-bold tracking-wide"
               style={{ textShadow: '0 0 15px #ef4444' }}>
              {currentStage === 1 && '🎲 SPIN TO CHOOSE AN OBJECT TYPE'}
              {currentStage === 2 && `🎲 NOW SPIN TO CHOOSE PROPERTIES FOR YOUR ${selectedObject?.toUpperCase()}`}
            </p>
          </div>
        </div>
        )}

          {/* Final Result */}
          {selectedObject && selectedProperty && (
            <div className="mt-8 md:mt-12 p-6 md:p-10 bg-gradient-to-br from-green-900 via-emerald-900 to-green-800 rounded-2xl md:rounded-3xl border-4 md:border-8 border-green-400 shadow-2xl max-w-4xl mx-4"
                 style={{ 
                   boxShadow: '0 0 60px #22c55e60, inset 0 0 30px #ffffff10',
                   background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)'
                 }}>
              <h3 className="text-green-200 font-bold mb-4 md:mb-6 text-xl md:text-3xl text-center tracking-wider flex items-center justify-center"
                  style={{ textShadow: '0 0 15px #22c55e' }}>
                <span className="mr-2 md:mr-4">🎯</span>
                <span className="hidden sm:inline">YOUR HORROR CONCEPT</span>
                <span className="sm:hidden">CONCEPT</span>
                <span className="ml-2 md:ml-4">🎯</span>
              </h3>
              <div className="text-center">
                <p className="text-white text-2xl md:text-4xl font-bold mb-2 md:mb-4 tracking-wide break-words"
                   style={{ textShadow: '0 0 20px #ffffff80' }}>
                  {selectedCategory.split(' ')[0]} {selectedObject}
                </p>
                <p className="text-green-200 text-lg md:text-2xl tracking-wide">
                  with <span className="text-yellow-300 font-bold text-xl md:text-3xl break-words"
                            style={{ textShadow: '0 0 15px #fbbf24' }}>
                    "{selectedProperty}"
                  </span> property
                </p>
              </div>
              <div className="mt-4 md:mt-6 text-center">
                <p className="text-green-100 text-lg md:text-xl italic tracking-wide"
                   style={{ textShadow: '0 0 10px #00000080' }}>
                  Perfect for creating atmospheric horror scenes! 👻💀
                </p>
              </div>
            </div>
          )}

          {/* Creator Watermark */}
          <div className="mt-8 md:mt-12 text-center px-4">
            <div className="inline-block px-4 md:px-8 py-3 md:py-4 bg-gradient-to-r from-black via-gray-900 to-black rounded-xl md:rounded-2xl border-2 md:border-4 border-red-600 shadow-2xl"
                 style={{ 
                   boxShadow: '0 0 40px #ef444440, inset 0 0 20px #ffffff05',
                   background: 'linear-gradient(135deg, #000000 0%, #1f1f23 50%, #000000 100%)'
                 }}>
              <p className="text-red-400 text-lg md:text-xl font-bold tracking-widest mb-1"
                 style={{ 
                   textShadow: '0 0 20px #ef4444, 0 0 40px #dc2626',
                   fontFamily: 'serif'
                 }}>
                💀 CREATED BY 💀
              </p>
              <p 
                className="text-white text-2xl md:text-3xl font-bold tracking-wider cursor-pointer select-none transition-all hover:text-red-200"
                style={{ 
                  textShadow: '0 0 25px #ffffff, 0 0 50px #ef4444, 0 0 75px #dc2626',
                  fontFamily: 'serif',
                  letterSpacing: '0.2em'
                }}
                onDoubleClick={toggleCreatorMode}
                title="Double-click for creator tools"
              >
                CALDER0910
              </p>
              {creatorMode && (
                <div className="mt-3 text-xs text-green-400 animate-pulse"
                     style={{ textShadow: '0 0 10px #22c55e' }}>
                  🔓 CREATOR MODE ACTIVE
                </div>
              )}
            </div>
          </div>

          {/* Hidden AI Prompt Generator */}
          {creatorMode && selectedObject && selectedProperty && (
            <div className="mt-8 px-4 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 rounded-2xl border-4 border-purple-500 shadow-2xl p-6 md:p-8"
                   style={{ 
                     boxShadow: '0 0 50px #a855f760, inset 0 0 30px #ffffff08',
                     background: 'linear-gradient(135deg, #4c1d95 0%, #3730a3 50%, #5b21b6 100%)'
                   }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-purple-200 font-bold text-xl md:text-2xl tracking-wider flex items-center"
                      style={{ textShadow: '0 0 15px #a855f7' }}>
                    <span className="mr-3">🤖</span>AI PROMPT GENERATOR
                  </h3>
                  <button
                    onClick={() => setCreatorMode(false)}
                    className="text-purple-300 hover:text-white transition-colors text-xl font-bold"
                    style={{ textShadow: '0 0 10px #a855f7' }}
                  >
                    ✕
                  </button>
                </div>
                
                <div className="bg-black bg-opacity-50 rounded-xl p-4 md:p-6 border-2 border-purple-400 mb-6">
                  <pre className="text-purple-100 text-sm md:text-base whitespace-pre-wrap font-mono leading-relaxed"
                       style={{ textShadow: '0 0 8px #00000080' }}>
                    {generatePromptText()}
                  </pre>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <button
                    onClick={copyPromptToClipboard}
                    className={`flex items-center space-x-3 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-lg transition-all border-4 w-full sm:w-auto ${
                      promptCopied 
                        ? 'bg-gradient-to-r from-green-600 to-green-800 text-white border-green-400' 
                        : 'bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 border-purple-400'
                    }`}
                    style={{ 
                      boxShadow: promptCopied 
                        ? '0 0 30px #22c55e60, inset 0 0 15px #ffffff20' 
                        : '0 0 30px #a855f760, inset 0 0 15px #ffffff20',
                      textShadow: '0 0 10px #000000'
                    }}
                  >
                    <span className="text-2xl">{promptCopied ? '✅' : '📋'}</span>
                    <span className="tracking-wide">{promptCopied ? 'COPIED!' : 'COPY PROMPT'}</span>
                  </button>
                  
                  <div className="text-purple-200 text-center text-sm">
                    <p style={{ textShadow: '0 0 8px #a855f7' }}>
                      💡 Paste this into ChatGPT/Claude to generate DALL-E prompts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>

      {/* Floating Watermark (Bottom Right) */}
      <div className="fixed bottom-3 md:bottom-6 right-3 md:right-6 z-20">
        <div className="px-2 md:px-4 py-1 md:py-2 bg-black bg-opacity-80 rounded-lg md:rounded-xl border border-red-500 md:border-2 shadow-lg"
             style={{ 
               boxShadow: '0 0 20px #ef444440',
               backdropFilter: 'blur(10px)'
             }}>
          <p className="text-red-400 text-xs md:text-sm font-bold tracking-wide"
             style={{ textShadow: '0 0 10px #ef4444' }}>
            © CALDER0910
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
      `}</style>
    </div>
  );
};

export default HorrorElementsSpinner;
