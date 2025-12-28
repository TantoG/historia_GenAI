import React, { useState, useEffect } from 'react';
import { Eye, Brain, Zap, Layers, Cpu, Search, Image as ImageIcon, CheckCircle, RefreshCw, Sliders, Play, Maximize2, Info, AlertTriangle, Copyright, VenetianMask, Scale, Sparkles } from 'lucide-react';
import { SlideData, ImageSize, SearchResult } from '../types';
import { generateImage, searchLatestAIInfo } from '../services/geminiService';

interface SlideContentProps {
  data: SlideData;
  onInteract: () => void;
}

// --- SUB-COMPONENTS FOR INTERACTIVITY ---

const TimelineView = ({ onInteract }: { onInteract: () => void }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const timelineData = [
    { 
        year: '1989', 
        label: 'CNNs', 
        sub: 'El Ojo', 
        icon: <Eye size={20} />,
        desc: "LeNet-5: La primera red capaz de leer dígitos manuscritos en cheques bancarios. Imitaba la corteza visual biológica.",
        author: "Yann LeCun (AT&T Labs)"
    },
    { 
        year: '2012', 
        label: 'AlexNet', 
        sub: 'Deep Learning', 
        icon: <Layers size={20} />,
        desc: "El momento 'Big Bang'. Usó GPUs para entrenar una red profunda y ganó el concurso ImageNet por un margen histórico.",
        author: "Krizhevsky, Sutskever & Hinton (U. Toronto)"
    },
    { 
        year: '2017', 
        label: 'Transformers', 
        sub: 'Atención', 
        icon: <Zap size={20} />,
        desc: "Paper 'Attention Is All You Need'. Aunque nació para texto, su capacidad de paralelización revolucionó luego la visión.",
        author: "Google Brain"
    },
    { 
        year: '2021', 
        label: 'DALL-E', 
        sub: 'Generación', 
        icon: <Brain size={20} />,
        desc: "La IA aprendió a asociar conceptos visuales con palabras, permitiendo crear imágenes surrealistas desde cero.",
        author: "OpenAI"
    },
    { 
        year: '2025', 
        label: 'Gemini', 
        sub: 'Multimodal', 
        icon: <Cpu size={20} />,
        desc: "Modelos nativamente multimodales. No son redes separadas pegadas con cinta; entienden audio, video e imagen fluidamente.",
        author: "Google DeepMind"
    }
  ];

  const handleClick = (year: string) => {
    setSelected(year);
    onInteract();
  };

  const activeItem = timelineData.find(d => d.year === selected);

  return (
    <div className="w-full flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-between items-center w-full mt-10 relative gap-8 md:gap-0">
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10"></div>
        {timelineData.map((m, idx) => (
            <button 
                key={idx} 
                onClick={() => handleClick(m.year)}
                className="flex flex-col items-center group cursor-pointer transition-all duration-500 hover:-translate-y-2 focus:outline-none"
            >
            <div className={`border-4 p-4 rounded-full shadow-lg z-10 transition-colors duration-300
                ${selected === m.year ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-blue-500 text-blue-600 group-hover:bg-blue-500 group-hover:text-white'}
            `}>
                {m.icon}
            </div>
            <span className="font-bold text-slate-800 mt-4 text-lg">{m.year}</span>
            <span className="text-blue-600 font-semibold">{m.label}</span>
            <span className="text-xs text-slate-500 uppercase tracking-wider">{m.sub}</span>
            </button>
        ))}
        </div>

        {/* Info Card Area */}
        <div className="mt-8 w-full max-w-2xl h-32 flex justify-center">
            {activeItem ? (
                <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-lg animate-fade-in text-left w-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                    <h4 className="font-bold text-lg text-slate-800 mb-1 flex justify-between">
                        {activeItem.label} ({activeItem.year})
                        <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-1 rounded">{activeItem.author}</span>
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{activeItem.desc}</p>
                </div>
            ) : (
                <div className="flex items-center text-slate-400 text-sm italic animate-pulse">
                    <Info size={16} className="mr-2" /> Toca un año para ver los detalles del hito.
                </div>
            )}
        </div>
    </div>
  );
};

const CNNDemo = ({ onInteract }: { onInteract: () => void }) => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  
  // 5x5 Grid
  const grid = Array(25).fill(0);

  const handleHover = (i: number) => {
    setHoverIdx(i);
    onInteract();
  }

  return (
    <div className="flex flex-col items-center mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 shadow-inner">
      <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
        <Search size={18} /> Simulación de Convolución
      </h3>
      <p className="text-sm text-slate-600 mb-4 text-center max-w-md">
        Pasa el mouse (o toca) para ver cómo un "Kernel" (el recuadro rojo) escanea los píxeles para detectar rasgos.
      </p>
      <div className="grid grid-cols-5 gap-1" onTouchMove={onInteract}>
        {grid.map((_, i) => (
          <div 
            key={i} 
            onMouseEnter={() => handleHover(i)}
            onTouchStart={() => handleHover(i)}
            className={`w-10 h-10 md:w-12 md:h-12 border rounded transition-colors duration-300 flex items-center justify-center text-xs text-gray-400 select-none cursor-crosshair
              ${hoverIdx !== null && 
                (i === hoverIdx || i === hoverIdx + 1 || i === hoverIdx - 1 || i === hoverIdx + 5 || i === hoverIdx - 5 || i === hoverIdx + 6 || i === hoverIdx -6 || i === hoverIdx + 4 || i === hoverIdx -4 )
                ? 'bg-red-100 border-red-500' 
                : 'bg-white border-slate-300'}
            `}
          >
            {Math.floor(Math.random() * 9)}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs font-mono text-blue-600">
        Operación: Producto escalar local
      </p>
    </div>
  );
};

const AlexNetIngredients = ({ onInteract }: { onInteract: () => void }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const items = [
        { 
            name: "ReLU", 
            sub: "Rectified Linear Unit",
            desc: "Función de activación que convierte valores negativos a cero. Solucionó problemas matemáticos complejos y aceleró el entrenamiento de la red.", 
            icon: "⚡" 
        },
        { 
            name: "Dropout", 
            sub: "Olvido Estratégico",
            desc: "Técnica que 'apaga' neuronas aleatoriamente durante el entrenamiento. Obliga a la red a no memorizar datos, sino a aprender características generales.", 
            icon: "🗑️" 
        },
        { 
            name: "GPUs", 
            sub: "Potencia Gráfica",
            desc: "Uso de tarjetas gráficas (originalmente para videojuegos) para realizar millones de cálculos en paralelo, haciendo viable el Deep Learning.", 
            icon: "🎮" 
        }
    ];

    const toggle = (i: number) => {
        setActiveIndex(activeIndex === i ? null : i);
        onInteract();
    };

    return (
        <div className="mt-8 flex flex-col md:flex-row gap-4 w-full justify-center">
            {items.map((item, i) => (
                <button 
                    key={i}
                    onClick={() => toggle(i)}
                    className={`relative p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-3 shadow-sm hover:shadow-md text-left md:text-center
                        ${activeIndex === i ? 'border-blue-500 bg-blue-50 flex-grow md:w-1/2' : 'border-slate-200 bg-white md:w-1/4 hover:border-blue-300'}`}
                >
                    <span className="text-4xl">{item.icon}</span>
                    <div>
                        <h4 className="font-bold text-slate-800">{item.name}</h4>
                        {activeIndex !== i && <p className="text-xs text-slate-500">{item.sub}</p>}
                    </div>
                    
                    {activeIndex === i && (
                        <div className="animate-fade-in mt-2 border-t border-blue-200 pt-2">
                             <p className="text-sm font-semibold text-blue-800 mb-1">{item.sub}</p>
                             <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
                        </div>
                    )}
                    {activeIndex === i && <CheckCircle size={16} className="text-blue-600 absolute top-3 right-3" />}
                </button>
            ))}
        </div>
    )
}

const ResNetCompare = ({ onInteract }: { onInteract: () => void }) => {
    const [mode, setMode] = useState<'plain' | 'resnet'>('plain');

    const handleMode = (m: 'plain' | 'resnet') => {
        setMode(m);
        onInteract();
    }

    return (
        <div className="flex flex-col items-center mt-6 w-full max-w-2xl">
            <div className="flex bg-slate-100 p-1 rounded-full mb-6">
                <button 
                    onClick={() => handleMode('plain')}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${mode === 'plain' ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}
                >
                    Red Profunda Normal
                </button>
                <button 
                    onClick={() => handleMode('resnet')}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${mode === 'resnet' ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}
                >
                    ResNet (Con Atajos)
                </button>
            </div>

            <div className="relative flex items-center gap-2 md:gap-4 overflow-hidden p-8 border border-slate-200 rounded-xl bg-slate-50 w-full justify-center">
                {/* Layers */}
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`w-12 h-20 rounded-md border-2 flex items-center justify-center transition-all duration-500
                        ${mode === 'plain' 
                            ? `bg-slate-300 border-slate-400 opacity-${Math.max(10, 100 - i * 20)}` // Degradation simulation
                            : 'bg-blue-100 border-blue-500 opacity-100'} 
                    `}>
                        <div className="w-full h-1 bg-slate-400"></div>
                    </div>
                ))}

                {/* Skip Connection Visualization */}
                {mode === 'resnet' && (
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{zIndex: 10}}>
                         <path d="M 60 40 Q 150 5 250 40" fill="none" stroke="#2563EB" strokeWidth="3" markerEnd="url(#arrow)" strokeDasharray="5,5" className="animate-pulse" />
                         <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#2563EB" />
                            </marker>
                        </defs>
                    </svg>
                )}
            </div>
            <p className="mt-4 text-center text-sm text-slate-600">
                {mode === 'plain' 
                    ? "Sin atajos, la señal (información) se degrada a medida que la red se hace más profunda."
                    : "Los 'Saltos de Identidad' permiten que la información fluya sin degradarse, permitiendo 152+ capas."}
            </p>
        </div>
    )
}

const AttentionVisualizer = ({ onInteract }: { onInteract: () => void }) => {
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    const handleClick = (i: number) => {
        setFocusedIndex(i);
        onInteract();
    }

    return (
        <div className="mt-6 w-full max-w-2xl bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="text-center font-bold text-slate-700 mb-6">Mecanismo de Auto-Atención</h4>
            <div className="flex justify-between items-center relative h-40">
                {/* Inputs */}
                <div className="flex flex-col gap-8 justify-center h-full w-1/4">
                    {['Gato', 'Comiendo', 'Pescado'].map((w, i) => (
                        <button 
                            key={i} 
                            onClick={() => handleClick(i)}
                            className={`p-2 rounded text-center font-semibold text-sm transition-all
                                ${focusedIndex === i ? 'bg-blue-600 text-white scale-110 shadow-md' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}
                            `}
                        >
                            {w}
                        </button>
                    ))}
                </div>

                {/* Connections (simulated with SVG) */}
                <div className="flex-1 h-full relative mx-4">
                    <svg className="w-full h-full">
                        {/* Lines from Gato to everyone */}
                        <line x1="0" y1="20%" x2="100%" y2="20%" stroke={focusedIndex === null || focusedIndex === 0 ? "#2563EB" : "#e2e8f0"} strokeWidth={focusedIndex === 0 ? "4" : "1"} className="transition-all duration-300" />
                        <line x1="0" y1="20%" x2="100%" y2="50%" stroke={focusedIndex === null || focusedIndex === 0 ? "#2563EB" : "#e2e8f0"} strokeWidth={focusedIndex === 0 ? "2" : "1"} className="transition-all duration-300" />
                        <line x1="0" y1="20%" x2="100%" y2="80%" stroke={focusedIndex === null || focusedIndex === 0 ? "#2563EB" : "#e2e8f0"} strokeWidth={focusedIndex === 0 ? "1" : "0.5"} className="transition-all duration-300" />
                        
                        {/* Lines from Comiendo */}
                        <line x1="0" y1="50%" x2="100%" y2="20%" stroke={focusedIndex === null || focusedIndex === 1 ? "#9333EA" : "#e2e8f0"} strokeWidth={focusedIndex === 1 ? "2" : "1"} className="transition-all duration-300" />
                        <line x1="0" y1="50%" x2="100%" y2="50%" stroke={focusedIndex === null || focusedIndex === 1 ? "#9333EA" : "#e2e8f0"} strokeWidth={focusedIndex === 1 ? "4" : "1"} className="transition-all duration-300" />
                        
                         {/* Lines from Pescado */}
                         <line x1="0" y1="80%" x2="100%" y2="20%" stroke={focusedIndex === null || focusedIndex === 2 ? "#EC4899" : "#e2e8f0"} strokeWidth={focusedIndex === 2 ? "1" : "0.5"} className="transition-all duration-300" />
                         <line x1="0" y1="80%" x2="100%" y2="80%" stroke={focusedIndex === null || focusedIndex === 2 ? "#EC4899" : "#e2e8f0"} strokeWidth={focusedIndex === 2 ? "4" : "1"} className="transition-all duration-300" />
                    </svg>
                </div>

                {/* Contextualized Output */}
                <div className="flex flex-col gap-8 justify-center h-full w-1/4">
                    {['Contexto 1', 'Contexto 2', 'Contexto 3'].map((w, i) => (
                        <div key={i} className={`p-2 border rounded text-center text-xs text-slate-500 transition-colors ${focusedIndex === i ? 'border-blue-500 bg-blue-50 text-blue-700 font-bold' : 'border-slate-300'}`}>
                            {w}
                        </div>
                    ))}
                </div>
            </div>
            <p className="text-xs text-center mt-4 text-slate-500 animate-pulse">
                Toca las palabras de la izquierda para ver su atención.
            </p>
        </div>
    )
}

const ViTSlicer = ({ onInteract }: { onInteract: () => void }) => {
    const [sliced, setSliced] = useState(false);
    // Use a specific image ID to ensure consistency and a nice subject
    const imgUrl = "https://picsum.photos/id/237/600/600";

    const handleSlice = () => {
        setSliced(!sliced);
        onInteract();
    }

    return (
      <div className="flex flex-col items-center mt-6 select-none">
        <div className={`relative transition-all duration-700 ease-in-out grid grid-cols-4 ${sliced ? 'gap-2' : 'gap-0'}`}>
          {[...Array(16)].map((_, i) => {
            // Calculate position for 4x4 grid
            // 0, 33.333, 66.666, 100
            const x = (i % 4) * (100 / 3);
            const y = Math.floor(i / 4) * (100 / 3);

            return (
                <div 
                  key={i} 
                  className={`w-16 h-16 md:w-24 md:h-24 transition-all duration-700 bg-no-repeat relative overflow-hidden
                    ${sliced ? 'rounded-lg shadow-md scale-95 border border-slate-300' : 'rounded-none scale-100 border-none'}
                  `}
                  style={{ 
                    backgroundImage: `url("${imgUrl}")`,
                    // Critical: 400% size means the full image is 4x the size of this cell.
                    // This allows us to show just a "window" (patch) of the full image.
                    backgroundSize: '400% 400%', 
                    backgroundPosition: `${x}% ${y}%`
                  }} 
                >
                    {/* Token Label overlay when sliced */}
                    <div className={`absolute inset-0 flex items-center justify-center bg-black/20 text-white font-mono font-bold text-lg transition-opacity duration-500 ${sliced ? 'opacity-100' : 'opacity-0'}`}>
                        {i + 1}
                    </div>
                </div>
            )
          })}
        </div>
        
        <button 
            className="mt-8 flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition shadow-lg font-bold" 
            onClick={handleSlice}
        >
            <Maximize2 size={18}/> {sliced ? "Unificar Imagen (Visión Humana)" : "Tokenizar en Parches (Visión Transformer)"}
        </button>
        <p className="mt-4 text-sm text-slate-600 max-w-md text-center">
            {sliced 
                ? "El modelo recibe estos 16 'parches' como una secuencia (1, 2, 3...), igual que palabras en una oración."
                : "A diferencia de las CNN que escanean píxeles, ViT rompe la imagen en fichas y analiza la relación entre todas ellas a la vez."}
        </p>
      </div>
    );
};

const DiffusionSlider = ({ onInteract }: { onInteract: () => void }) => {
    const [noise, setNoise] = useState(100);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNoise(100 - Number(e.target.value));
        onInteract();
    }
    
    return (
      <div className="flex flex-col items-center mt-6 w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg border border-slate-100">
        <h3 className="font-bold text-slate-700 mb-2">Difusión Latente</h3>
        <div className="relative w-64 h-64 bg-slate-100 rounded-lg overflow-hidden shadow-inner mb-6">
          {/* Base Image */}
          <img 
            src="https://picsum.photos/500/500?grayscale" 
            alt="Result" 
            className="absolute inset-0 w-full h-full object-cover transition-all duration-200"
            style={{ filter: noise > 50 ? 'blur(4px)' : 'blur(0px)'}}
          />
          {/* Noise Overlay */}
          <div 
            className="absolute inset-0 bg-gray-400 mix-blend-hard-light" 
            style={{ opacity: noise / 100 }}
          >
             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                  <filter id="noiseFilter">
                      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
                  </filter>
                  <rect width="100%" height="100%" filter="url(#noiseFilter)" />
              </svg>
          </div>
        </div>
        
        <div className="flex items-center w-full gap-4">
            <span className="text-xs font-bold text-slate-500">Ruido</span>
            <input 
                type="range" 
                min="0" 
                max="100" 
                value={100 - noise} 
                onChange={handleChange}
                className="flex-1 h-2 bg-gradient-to-r from-gray-300 to-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-xs font-bold text-blue-600">Imagen</span>
        </div>
        <p className="mt-2 text-xs text-slate-500 text-center italic">
          El modelo "elimina el ruido" progresivamente para revelar la imagen.
        </p>
      </div>
    );
};

const ImageGenerator = ({ onInteract }: { onInteract: () => void }) => {
    const [prompt, setPrompt] = useState('');
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt) return;
        setLoading(true);
        setError(null);
        setResultUrl(null);
        onInteract(); // Interaction confirmed on click

        try {
            // Updated to use the simpler function signature
            const url = await generateImage(prompt);
            setResultUrl(url);
        } catch (e) {
            setError("Error al generar imagen. Intenta con un prompt más simple.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden mt-4">
            {/* Header / Prompt Area in Dark Mode */}
            <div className="bg-slate-900 p-6 text-white">
                <div className="flex items-center gap-2 mb-3 text-purple-400 font-bold tracking-wider text-sm uppercase">
                    <Sparkles size={16} /> 
                    Laboratorio de Generación
                </div>
                <label className="text-sm font-bold text-slate-300 mb-2 block">Prompt (Tu imaginación):</label>
                <div className="relative">
                    <textarea 
                        className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none text-slate-100 placeholder-slate-500 text-lg shadow-inner transition-all"
                        rows={3}
                        placeholder="Escribe aquí... ej: Un astronauta montando un caballo en Marte, estilo cyberpunk"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <div className="absolute bottom-3 right-3">
                         <button 
                            onClick={handleGenerate}
                            disabled={loading || !prompt}
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2 shadow-lg hover:shadow-purple-500/25"
                        >
                            {loading ? <RefreshCw className="animate-spin" size={18} /> : <ImageIcon size={18} />}
                            Generar
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Area */}
            <div className="p-6 bg-slate-50 min-h-[100px] flex flex-col items-center justify-center">
                {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>}

                {loading && (
                    <div className="flex flex-col items-center gap-3 text-slate-400 animate-pulse">
                        <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-purple-500 animate-spin"></div>
                        <span className="text-sm font-medium">Interpretando tu sueño...</span>
                    </div>
                )}

                {resultUrl && (
                    <div className="animate-fade-in w-full flex flex-col items-center">
                        <img src={resultUrl} alt="Generated" className="rounded-lg shadow-2xl border-4 border-white max-h-[400px] object-contain" />
                        <a href={resultUrl} download="generated-ai.png" className="mt-4 text-xs text-slate-500 hover:text-purple-600 underline">Descargar Imagen</a>
                    </div>
                )}

                {!resultUrl && !loading && !error && (
                    <div className="text-slate-400 text-sm italic">
                        La imagen generada aparecerá aquí.
                    </div>
                )}
            </div>
        </div>
    )
}

const VideoSearch = ({ onInteract }: { onInteract: () => void }) => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<{text: string, links: SearchResult[]} | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (searchQuery: string) => {
        setQuery(searchQuery);
        setLoading(true);
        onInteract(); // Interaction confirmed
        const data = await searchLatestAIInfo(searchQuery);
        setResult(data);
        setLoading(false);
    }

    const searchOptions = [
        { label: "Noticias sobre SORA", query: "Últimas noticias sobre modelo Sora de OpenAI y su fecha de lanzamiento" },
        { label: "Lo último de IA en video", query: "Avances recientes en generación de video con IA: Veo, Runway, Pika" },
        { label: "Uso profesional en cine", query: "Cómo usan los cineastas y artistas modelos como Sora o Veo en producciones reales" }
    ];

    return (
        <div className="w-full max-w-3xl mt-4 flex flex-col items-center">
             <div className="flex flex-wrap gap-3 mb-6 justify-center">
                 {searchOptions.map((opt, i) => (
                     <button
                        key={i}
                        onClick={() => handleSearch(opt.query)}
                        disabled={loading}
                        className="bg-white border-2 border-blue-100 hover:border-blue-500 hover:bg-blue-50 text-slate-700 px-4 py-3 rounded-xl font-semibold transition-all shadow-sm active:scale-95 disabled:opacity-50"
                     >
                        {opt.label}
                     </button>
                 ))}
             </div>
             
             {loading && (
                 <div className="flex items-center gap-2 text-slate-500 animate-pulse my-4">
                     <RefreshCw className="animate-spin" size={20} /> Buscando información en tiempo real...
                 </div>
             )}

             {result && !loading && (
                 <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 animate-fade-in text-left w-full">
                     <h4 className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-wider">Resultados para: "{query}"</h4>
                     <p className="text-slate-700 mb-4 whitespace-pre-wrap leading-relaxed">{result.text}</p>
                     
                     {result.links.length > 0 && (
                         <div className="mt-4 pt-4 border-t border-slate-100">
                             <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">Fuentes:</h4>
                             <ul className="space-y-2">
                                 {result.links.map((link, i) => (
                                     <li key={i} className="flex items-start gap-2">
                                         <div className="mt-1 bg-blue-100 p-1 rounded-full"><Search size={10} className="text-blue-600"/></div>
                                         <a href={link.uri} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm break-all">
                                             {link.title}
                                         </a>
                                     </li>
                                 ))}
                             </ul>
                         </div>
                     )}
                 </div>
             )}
        </div>
    )
}

const EthicsExplorer = ({ onInteract }: { onInteract: () => void }) => {
    const [activeTopic, setActiveTopic] = useState<number | null>(null);

    const toggle = (i: number) => {
        setActiveTopic(activeTopic === i ? null : i);
        onInteract();
    }

    const topics = [
        { 
            title: 'Copyright', 
            icon: <Copyright size={32} />, 
            color: 'text-orange-500', 
            bg: 'bg-orange-50', 
            borderColor: 'border-orange-200',
            desc: "El Dilema de la Propiedad: Los modelos se entrenan con millones de imágenes de internet. ¿Es justo usar el arte de un humano para entrenar una máquina que luego compite contra él? Actualmente hay múltiples demandas legales en curso."
        },
        { 
            title: 'Sesgos', 
            icon: <Scale size={32} />, 
            color: 'text-purple-500', 
            bg: 'bg-purple-50',
            borderColor: 'border-purple-200',
            desc: "Prejuicios Heredados: Si la IA aprende de internet, aprende también nuestros defectos. Puede generar imágenes que perpetúan estereotipos raciales o de género (ej. asociar ciertas profesiones solo a hombres) si no se filtra cuidadosamente."
        },
        { 
            title: 'Deepfakes', 
            icon: <VenetianMask size={32} />, 
            color: 'text-red-500', 
            bg: 'bg-red-50',
            borderColor: 'border-red-200',
            desc: "La Verdad en Peligro: La capacidad de generar rostros y voces hiperrealistas permite suplantar identidades. Esto crea riesgos enormes de desinformación política, fraude y acoso. Necesitamos herramientas de 'marca de agua' digital."
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-5xl">
             {topics.map((topic, i) => (
                 <div 
                    key={i} 
                    onClick={() => toggle(i)}
                    className={`${topic.bg} border-2 ${activeTopic === i ? 'border-slate-400 shadow-md scale-105' : topic.borderColor} p-6 rounded-2xl hover:shadow-lg transition-all cursor-pointer group flex flex-col items-center text-center`}
                 >
                     <div className={`${topic.color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        {topic.icon}
                     </div>
                     <h3 className="font-bold text-slate-800 mb-2 text-lg">{topic.title}</h3>
                     
                     <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeTopic === i ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                         <p className="text-sm text-slate-700 leading-relaxed border-t border-slate-200/50 pt-2">
                             {topic.desc}
                         </p>
                     </div>
                     
                     {activeTopic !== i && (
                        <p className="text-xs text-slate-500 mt-2 animate-pulse">Toca para saber más</p>
                     )}
                 </div>
             ))}
         </div>
    );
};

// --- MAIN SLIDE RENDERER ---

export const SlideContent: React.FC<SlideContentProps> = ({ data, onInteract }) => {
  return (
    <div className="flex flex-col items-center w-full h-full text-center">
      {/* Researcher Badge if available */}


      {/* Main Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-blue-600 mb-2">
        {data.title}
      </h2>
      {data.subtitle && <h3 className="text-lg text-slate-500 font-medium mb-6">{data.subtitle}</h3>}

      {/* Author Info Badge */}
      {data.authorInfo && (
        <div className="flex items-center justify-center gap-3 bg-white p-3 rounded-full shadow-md mb-6 animate-fade-in border border-slate-200">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
            <img src={data.authorInfo.imageUrl} alt={data.authorInfo.name} className="w-full h-full object-cover"/>
          </div>
          <div className="text-left pr-2">
            <p className="font-bold text-slate-800 text-sm leading-tight">{data.authorInfo.name}</p>
            <p className="text-blue-600 text-xs">{data.authorInfo.role}</p>
          </div>
        </div>
      )}

      {/* Content Text */}
      <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mb-8">
        {data.content}
      </p>

      {data.image && (
        <img 
          src={data.image} 
          alt={data.title} 
          className="w-full rounded-lg shadow-md mb-8"
        />
      )}

      {/* Interactive Component Switch */}
      <div className="w-full flex justify-center flex-1">
        {data.type === 'timeline' && <TimelineView onInteract={onInteract} />}
        {data.type === 'interactive-cnn' && <CNNDemo onInteract={onInteract} />}
        {data.type === 'interactive-alexnet' && <AlexNetIngredients onInteract={onInteract} />}
        {data.type === 'interactive-resnet' && <ResNetCompare onInteract={onInteract} />}
        {data.type === 'interactive-attention' && <AttentionVisualizer onInteract={onInteract} />}
        {data.type === 'interactive-vit' && <ViTSlicer onInteract={onInteract} />}
        {data.type === 'interactive-diffusion' && <DiffusionSlider onInteract={onInteract} />}
        {data.type === 'interactive-gen-image' && <ImageGenerator onInteract={onInteract} />}
        {data.type === 'interactive-video-search' && <VideoSearch onInteract={onInteract} />}
        {data.type === 'future-ethics' && <EthicsExplorer onInteract={onInteract} />}
        {data.type === 'conclusion' && (
            <div className="flex flex-col items-center justify-center animate-fade-in-up">
                <div className="text-6xl mb-6">🚀</div>
                <p className="text-xl font-bold text-slate-800">¡Gracias por completar el recorrido!</p>
            </div>
        )}
      </div>
    </div>
  );
};
