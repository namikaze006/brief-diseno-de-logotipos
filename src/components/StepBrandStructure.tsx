import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  Maximize2,
  X,
  Layers,
  Sparkles,
  Info,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import { BrandBriefData, LOGO_STRUCTURE_OPTIONS, LogoStructureOption, LogoStructureType } from '../types/brief';

interface StepBrandStructureProps {
  data: BrandBriefData;
  onChange: (updates: Partial<BrandBriefData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const StepBrandStructure: React.FC<StepBrandStructureProps> = ({
  data,
  onChange,
  onNext,
  onPrev
}) => {
  const [activeModalOption, setActiveModalOption] = useState<LogoStructureOption | null>(null);

  const handleCardClick = (id: LogoStructureType) => {
    if (data.allowMultipleStructures) {
      if (data.selectedStructures.includes(id)) {
        onChange({
          selectedStructures: data.selectedStructures.filter((item) => item !== id)
        });
      } else {
        onChange({
          selectedStructures: [...data.selectedStructures, id]
        });
      }
    } else {
      // Single selection mode: click toggles on/off
      if (data.selectedStructures.includes(id)) {
        onChange({ selectedStructures: [] });
      } else {
        onChange({ selectedStructures: [id] });
      }
    }
  };

  const toggleMultipleMode = () => {
    const nextMode = !data.allowMultipleStructures;
    onChange({
      allowMultipleStructures: nextMode,
      selectedStructures: nextMode
        ? data.selectedStructures
        : (data.selectedStructures.length > 0 ? [data.selectedStructures[0]] : [])
    });
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Fase 02 • Anatomía Gráfica</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Estructura de Marca Deseada
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Selecciona la categoría formal que mejor represente la personalidad y funcionalidad gráfica de tu negocio.
          </p>
        </div>

        {/* Toggle Single / Multiple */}
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-white/10 shrink-0 self-start md:self-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
            <span>Selección múltiple (Explorar variantes):</span>
          </div>
          <button
            type="button"
            onClick={toggleMultipleMode}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              data.allowMultipleStructures ? 'bg-gradient-to-r from-purple-500 to-cyan-500' : 'bg-slate-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                data.allowMultipleStructures ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Helper note */}
      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-white">Tip de Miguel Marín:</span> Si no estás completamente seguro, puedes seleccionar más de una estructura y exploraremos bocetos conceptuales en diferentes direcciones gráficas durante la fase inicial de diseño.
        </div>
      </div>

      {/* Grid with 4 Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LOGO_STRUCTURE_OPTIONS.map((option) => {
          const isSelected = data.selectedStructures.includes(option.id);

          return (
            <motion.div
              key={option.id}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleCardClick(option.id)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                isSelected
                  ? 'glass-card-selected ring-1 ring-purple-400/50 shadow-2xl shadow-purple-950/60'
                  : 'glass-card border border-white/10 hover:border-purple-400/40'
              }`}
            >
              {/* Selected Gradient Glow aura */}
              {isSelected && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-500 rounded-2xl opacity-30 blur-sm pointer-events-none" />
              )}

              {/* Card Image Container with overlay */}
              <div className="relative h-56 sm:h-64 w-full bg-[#0a0b16] overflow-hidden">
                <img
                  src={option.imageUrl}
                  alt={option.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Gradient shade over image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e1c] via-[#0d0e1c]/40 to-transparent" />

                {/* Tag Badge Top Left */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-lg text-[11px] font-extrabold tracking-wider uppercase bg-[#090b16]/85 backdrop-blur-md text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-200 to-cyan-300 border border-purple-400/30 shadow-md">
                    {option.tag}
                  </span>
                </div>

                {/* Selection indicator Badge Top Right */}
                <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalOption(option);
                    }}
                    title="Ver imagen en alta resolución"
                    className="w-8 h-8 rounded-lg bg-black/60 hover:bg-black/90 backdrop-blur-md text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-gradient-to-tr from-purple-500 to-cyan-400 text-white shadow-lg shadow-purple-500/50 scale-105'
                        : 'bg-black/60 border border-white/20 text-transparent'
                    }`}
                  >
                    <Check className={`w-4 h-4 stroke-[3] ${isSelected ? 'text-white' : 'opacity-0'}`} />
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 relative z-10 bg-[#0e1022]/90 backdrop-blur-md border-t border-white/5">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <span>{option.title}</span>
                    {isSelected && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-medium">
                        Seleccionado
                      </span>
                    )}
                  </h3>
                </div>

                <p className="text-xs font-medium text-cyan-400/90 mb-2">
                  {option.subtitle}
                </p>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {option.description}
                </p>

                {/* Famous Examples Chips */}
                <div className="pt-3 border-t border-white/5">
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span>Ejemplos de referencia mundial:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {option.famousExamples.map((ex, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/5 text-slate-300"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox / Detail Modal for Option */}
      <AnimatePresence>
        {activeModalOption && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-2xl w-full rounded-2xl bg-[#0f1124] border border-white/10 overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#14162e]">
                <div>
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                    {activeModalOption.tag}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {activeModalOption.title} — {activeModalOption.subtitle}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalOption(null)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Image */}
              <div className="max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activeModalOption.imageUrl}
                  alt={activeModalOption.title}
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
              </div>

              {/* Modal Description */}
              <div className="p-5 space-y-3 bg-[#0d0f20]">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeModalOption.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-slate-400">
                    Marcas icónicas: {activeModalOption.famousExamples.join(', ')}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!data.selectedStructures.includes(activeModalOption.id)) {
                        handleCardClick(activeModalOption.id);
                      }
                      setActiveModalOption(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-semibold shadow-md"
                  >
                    Elegir este estilo
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <button
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 text-sm font-semibold transition-all"
        >
          ← Volver a Info Básica
        </button>

        <button
          onClick={onNext}
          disabled={data.selectedStructures.length === 0}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg ${
            data.selectedStructures.length > 0
              ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02]'
              : 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5'
          }`}
        >
          <span>
            {data.selectedStructures.length > 0
              ? `Continuar: Referencias Visuales (${data.selectedStructures.length} seleccionada${data.selectedStructures.length > 1 ? 's' : ''})`
              : 'Selecciona al menos una estructura para continuar'}
          </span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
