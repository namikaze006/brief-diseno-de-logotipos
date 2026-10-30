import React from 'react';
import {
  FileText,
  Layers,
  Image as ImageIcon,
  Palette,
  FileDown,
  Sparkles,
  ShieldCheck,
  Send,
  ArrowRight
} from 'lucide-react';

interface ModularGridProps {
  onSelectStep: (step: number) => void;
  onOpenExportModal: () => void;
  onShowDesignerInfo?: () => void;
}

export const ModularGrid: React.FC<ModularGridProps> = ({
  onSelectStep,
  onOpenExportModal,
  onShowDesignerInfo,
}) => {
  const cards = [
    {
      id: 1,
      isFeatured: true, // Inversión de color: fondo azul índigo brillante
      icon: FileText,
      title: '01. Información Básica',
      description: 'Nombre de la marca, propuesta de valor, industria y público objetivo. El punto de partida de toda identidad visual sólida.',
      actionText: 'Completar Paso 01',
      onClick: () => onSelectStep(1),
    },
    {
      id: 2,
      isFeatured: false,
      icon: Layers,
      title: '02. Estructura y Tipología',
      description: 'Selecciona entre Logotipo, Imagotipo, Isologo o Mascot Logo con ejemplos reales de marcas de clase mundial.',
      actionText: 'Elegir Estructura',
      onClick: () => onSelectStep(2),
    },
    {
      id: 3,
      isFeatured: false,
      icon: ImageIcon,
      title: '03. Moodboard y Referencias',
      description: 'Arrastra imágenes, explora archivos o presiona Ctrl+V para pegar desde el portapapeles con conversión Base64 en tiempo real.',
      actionText: 'Subir Referencias',
      onClick: () => onSelectStep(3),
    },
    {
      id: 4,
      isFeatured: false,
      icon: Palette,
      title: '04. Paleta y Personalidad',
      description: 'Calibra colores preferidos, tonos a evitar y ajusta los sliders de modernidad, simplicidad y vibra de marca.',
      actionText: 'Definir Estilo',
      onClick: () => onSelectStep(4),
    },
    {
      id: 5,
      isFeatured: false,
      icon: FileDown,
      title: '05. Generador PDF Editorial',
      description: 'Compilación asíncrona en jsPDF de alta fidelidad con títulos ordenados e imágenes de referencia totalmente incrustadas.',
      actionText: 'Generar Reporte PDF',
      onClick: onOpenExportModal,
    },
    {
      id: 6,
      isFeatured: false,
      icon: Sparkles,
      title: '06. Portafolio Miguel Marín',
      description: 'Especialista en diseño de logotipos, sistemas UI/UX y creación de personajes ilustrados para startups y creadores.',
      actionText: 'Conocer Diseñador',
      onClick: onShowDesignerInfo || (() => {
        window.open('mailto:miguel.marin.art@gmail.com', '_blank');
      }),
    },
    {
      id: 7,
      isFeatured: false,
      icon: ShieldCheck,
      title: '07. Formatos y Entregables',
      description: 'Archivos vectoriales maestros (.AI, .SVG, .EPS), exportaciones web responsivas y especificaciones técnicas de color.',
      actionText: 'Ver Entregables',
      onClick: () => onSelectStep(4),
    },
    {
      id: 8,
      isFeatured: false,
      icon: Send,
      title: '08. Envío Directo y Contacto',
      description: 'Envía tu brief completado a miguel.marin.art@gmail.com con confirmación y opciones de seguimiento personalizado.',
      actionText: 'Contactar Estudio',
      onClick: () => {
        window.location.href = 'mailto:miguel.marin.art@gmail.com?subject=Brief%20de%20Diseño%20de%20Logotipo';
      },
    },
  ];

  return (
    <section id="modular-grid-section" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* H2 Sección Inferior: Tipografía sans-serif gruesa, tamaño grande, alineación central */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 inline-block mb-3">
          Sistema Modular de Trabajo
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Arquitectura Integral del Brief Creativo
        </h2>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
          Cada contenedor está diseñado para capturar la esencia de tu identidad con rigor técnico, asegurando una transición perfecta del concepto al diseño final.
        </p>
      </div>

      {/* Grid 4 columnas x 2 filas (8 contenedores rectangulares con esquinas redondeadas y sombra sutil) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          if (card.isFeatured) {
            // Tarjeta 1: Inversión de color (fondo azul índigo brillante con textos e iconos blancos)
            return (
              <div
                key={card.id}
                onClick={card.onClick}
                className="bg-indigo-600 text-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:shadow-indigo-600/30 transition-all duration-300 flex flex-col justify-between cursor-pointer group transform hover:-translate-y-1"
              >
                <div>
                  {/* Top: Icono circular blanco/transparente */}
                  <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* H3 en negrita */}
                  <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                    {card.title}
                  </h3>

                  {/* Párrafo descriptivo en blanco semitransparente */}
                  <p className="text-xs text-indigo-100/90 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Enlace interactivo en la parte inferior izquierda */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
                  <span>{card.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          }

          // Las 7 tarjetas restantes: Fondo blanco liso, icono circular top-left, H3, párrafo, enlace inferior izquierdo
          return (
            <div
              key={card.id}
              onClick={card.onClick}
              className="bg-white text-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl shadow-slate-200/50 border border-slate-200/70 transition-all duration-300 flex flex-col justify-between cursor-pointer group transform hover:-translate-y-1"
            >
              <div>
                {/* Icono circular en la parte superior izquierda */}
                <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-50 group-hover:scale-105 transition-all">
                  <Icon className="w-5 h-5" />
                </div>

                {/* H3 Título de tarjeta: tamaño intermedio, peso fuerte, alineado a la izquierda */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-2 text-left">
                  {card.title}
                </h3>

                {/* Cuerpo / párrafo descriptivo */}
                <p className="text-xs text-slate-500 leading-relaxed mb-6 text-left">
                  {card.description}
                </p>
              </div>

              {/* Enlace interactivo inferior izquierdo */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 group-hover:text-indigo-700 group-hover:translate-x-1 transition-transform self-start">
                <span>{card.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
