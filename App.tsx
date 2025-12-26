import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';
import { SlideContent } from './components/SlideContent';
import { ChatWidget } from './components/ChatWidget';
import { SlideData } from './types';
import PortadaHistGenAI from './src/images/Portada_Hist_GenAI.jpg';
import YannLeCunImage from './src/images/LeCun.jpg';
import VaswaniImage from './src/images/Vaswani.jpeg';

// --- CONTENT DATA ---
const SLIDES: SlideData[] = [
  {
    id: 1,
    title: "Generación Visual",
    subtitle: "Historia de los modelos",
    content: "Bienvenido. Vamos a viajar por la historia de cómo las máquinas aprendieron a ver y, finalmente, a soñar. Desde los primeros píxeles hasta el video fotorrealista.",
    type: 'intro',
    image: PortadaHistGenAI,
  },
  {
    id: 2,
    title: "Cronología de la IA",
    content: "La historia no es una línea recta, es una explosión. Toca los hitos para explorar cómo pasamos de intentar 'entender' imágenes a 'crearlas'.",
    type: 'timeline',
  },
  {
    id: 3,
    title: "1989: El Nacimiento de las CNN",
    content: "Yann LeCun se inspiró en la corteza visual del cerebro. Usó 'convoluciones' (filtros pequeños) para leer códigos postales. La máquina aprende a detectar bordes, luego formas, luego objetos.",
    type: 'interactive-cnn',
    researcher: {
        name: "Yann LeCun",
        role: "AT&T Labs",
        description: "Padre de las Redes Convolucionales",
        image: YannLeCunImage,
    }
  },
  {
    id: 4,
    title: "2012: AlexNet y Deep Learning",
    content: "Un momento 'Big Bang'. AlexNet ganó ImageNet por goleada usando tres ingredientes clave que definieron la década.",
    type: 'interactive-alexnet',
  },
  {
    id: 5,
    title: "2015: ResNet",
    content: "Para hacer redes más profundas (Deep Learning real), necesitamos 'atajos'. ResNet permitió entrenar cientos de capas sin que la IA se 'confundiera'.",
    type: 'interactive-resnet',
  },
  {
    id: 6,
    title: "2017: Transformers",
    content: "Todo cambió con el paper 'Attention Is All You Need'. Ashish Vaswani propuso un mecanismo donde la IA mira todo el contexto a la vez, no en secuencia. Nació el cerebro moderno.",
    type: 'interactive-attention',
    researcher: {
        name: "Ashish Vaswani",
        role: "Google Brain",
        description: "Co-autor de Transformers",
        image: VaswaniImage,
    }
  },
  {
    id: 7,
    title: "2020: Vision Transformer (ViT)",
    content: "Si cortamos una imagen en pedacitos (parches) y los tratamos como palabras, los Transformers pueden 'ver' mejor que las CNN tradicionales a gran escala.",
    type: 'interactive-vit',
  },
  {
    id: 8,
    title: "2021: DALL-E & Generación",
    content: "La IA ya no solo clasifica (gato vs perro). Ahora crea. Escribe lo que quieras y usa el poder de Gemini 3 para visualizarlo.",
    type: 'interactive-gen-image',
  },
  {
    id: 9,
    title: "2022: Difusión Latente",
    content: "Stable Diffusion y DALL-E 2 perfeccionaron el arte. Comienzan con ruido estático y 'esculpen' la imagen paso a paso hasta que aparece la nitidez.",
    type: 'interactive-diffusion',
  },
  {
    id: 10,
    title: "Actualidad: Video y Sora",
    content: "La frontera final: Video consistente. Usa la búsqueda de Google para ver qué es lo último que está sucediendo hoy con modelos como Sora o Veo.",
    type: 'interactive-video-search',
  },
  {
    id: 11,
    title: "Ética y Futuro",
    content: "Un gran poder conlleva grandes responsabilidades. Derechos de autor, sesgos y la verdad misma están en juego.",
    type: 'future-ethics',
  },
  {
    id: 12,
    title: "Conclusión",
    content: "En una explosión de complejidad técnica que redujo los tiempos de entrenamiento de años a días, hemos pasado de que las arquitecturas solo 'entiendan' las imágenes a que puedan 'crearlas' desde cero. El avance se condensa en esto: la tecnología ha logrado democratizar herramientas que antes requerían supercomputadoras, permitiendo que cualquier usuario, simplemente usando el lenguaje natural, se convierta en un creador capaz de generar mundos visuales de alta fidelidad y realismo.",
    type: 'conclusion',
  }
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canAdvance, setCanAdvance] = useState(false);

  // Reset interaction state when slide changes
  useEffect(() => {
    // Intro and Conclusion are unlocked by default
    if (SLIDES[currentIndex].type === 'intro' || SLIDES[currentIndex].type === 'conclusion') {
      setCanAdvance(true);
    } else {
      setCanAdvance(false);
    }
  }, [currentIndex]);

  const handleInteraction = () => {
    setCanAdvance(true);
  };

  const nextSlide = () => {
    if (currentIndex < SLIDES.length - 1 && canAdvance) {
      setCurrentIndex(c => c + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(c => c - 1);
  };

  const restartApp = () => {
    setCurrentIndex(0);
    setCanAdvance(true);
  };

  const progress = ((currentIndex + 1) / SLIDES.length) * 100;
  const isLastSlide = currentIndex === SLIDES.length - 1;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 md:p-8 font-sans relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-6xl h-[85vh] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col relative z-10 overflow-hidden border border-slate-700/50">
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-100">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 scrollbar-hide">
            <SlideContent data={SLIDES[currentIndex]} onInteract={handleInteraction} />
        </div>

        {/* Navigation Bar */}
        <div className="bg-white border-t border-slate-100 p-4 md:p-6 flex justify-between items-center">
            
            <button 
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition font-medium"
            >
                <ChevronLeft size={24} /> <span className="hidden md:inline">Anterior</span>
            </button>

            <div className="text-slate-400 font-mono text-sm">
                {currentIndex + 1} <span className="mx-1 text-slate-300">/</span> {SLIDES.length}
            </div>

            {isLastSlide ? (
              <button 
                onClick={restartApp}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition shadow-lg font-bold"
              >
                Reiniciar <RotateCcw size={24} />
              </button>
            ) : (
              <button 
                onClick={nextSlide}
                disabled={!canAdvance}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition shadow-lg font-bold
                  ${canAdvance 
                    ? 'bg-slate-900 text-white hover:bg-slate-800' 
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-70'}
                `}
              >
                {canAdvance ? "Siguiente" : "Interactúa para continuar"} <ChevronRight size={24} />
              </button>
            )}
        </div>
      </div>

      {/* AI Assistant Widget */}
      <ChatWidget />

    </div>
  );
}