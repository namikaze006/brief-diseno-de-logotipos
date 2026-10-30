import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Palette,
  Sliders,
  FileText,
  User,
  Mail,
  Plus,
  X,
  Sparkles,
  Ban,
  Check,
  Send,
  HelpCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { BrandBriefData } from '../types/brief';

interface StepAdditionalInfoProps {
  data: BrandBriefData;
  onChange: (updates: Partial<BrandBriefData>) => void;
  onFinishAndExport: () => void;
  onPrev: () => void;
}

const COLOR_PALETTES = [
  {
    name: 'Cyberpunk & Neon Glow',
    colors: ['#a855f7', '#06b6d4', '#ec4899', '#3b82f6']
  },
  {
    name: 'Luxury & Obsidian Gold',
    colors: ['#0f172a', '#eab308', '#f8fafc', '#713f12']
  },
  {
    name: 'Tech Indigo & Mint',
    colors: ['#4f46e5', '#10b981', '#06b6d4', '#1e1b4b']
  },
  {
    name: 'Sunset & Creative Coral',
    colors: ['#f43f5e', '#fb923c', '#fbbf24', '#881337']
  },
  {
    name: 'Organic Earth & Botanical',
    colors: ['#15803d', '#a3e635', '#78350f', '#fef08a']
  },
  {
    name: 'Monochrome Minimalist',
    colors: ['#000000', '#475569', '#94a3b8', '#ffffff']
  }
];

const COMMON_AVOID_COLORS = ['Rojo', 'Amarillo chillón', 'Marrón / Café', 'Negro puro', 'Verde neón', 'Rosa pastel'];

export const StepAdditionalInfo: React.FC<StepAdditionalInfoProps> = ({
  data,
  onChange,
  onFinishAndExport,
  onPrev
}) => {
  const [customColorInput, setCustomColorInput] = useState('#8b5cf6');
  const [newAvoidTag, setNewAvoidTag] = useState('');

  const addPreferredColor = (color: string) => {
    if (!data.preferredColors.includes(color) && data.preferredColors.length < 8) {
      onChange({ preferredColors: [...data.preferredColors, color] });
    }
  };

  const removePreferredColor = (color: string) => {
    onChange({
      preferredColors: data.preferredColors.filter((c) => c !== color)
    });
  };

  const toggleAvoidColor = (colorName: string) => {
    if (data.avoidColors.includes(colorName)) {
      onChange({
        avoidColors: data.avoidColors.filter((c) => c !== colorName)
      });
    } else {
      onChange({
        avoidColors: [...data.avoidColors, colorName]
      });
    }
  };

  const handleAddCustomAvoid = () => {
    if (newAvoidTag.trim() && !data.avoidColors.includes(newAvoidTag.trim())) {
      onChange({
        avoidColors: [...data.avoidColors, newAvoidTag.trim()]
      });
      setNewAvoidTag('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
          <Palette className="w-3.5 h-3.5 text-cyan-400" />
          <span>Fase 04 • Dirección Estética & Detalles</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Identidad Cromática & Notas Adicionales
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Define tus preferencias de color, el tono de comunicación de la marca y cualquier requerimiento o nota especial para Miguel Marín.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Color Palette & Personality */}
        <div className="lg:col-span-7 space-y-6">
          {/* Paleta de Colores Preferidos */}
          <div className="glass-card p-5 sm:p-6 rounded-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-white flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-400" />
                <span>Colores Preferidos / Sugeridos</span>
              </label>
              <span className="text-xs text-slate-400">
                {data.preferredColors.length} de 8 seleccionados
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Haz clic en una paleta prediseñada o agrega colores específicos que te gusten para la identidad de tu marca:
            </p>

            {/* Curated Palettes Presets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
              {COLOR_PALETTES.map((pal, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onChange({ preferredColors: [...pal.colors] })}
                  className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-purple-500/30 text-left transition-all group"
                >
                  <div className="flex h-5 rounded-md overflow-hidden mb-1.5 shadow-sm">
                    {pal.colors.map((c, cIdx) => (
                      <div key={cIdx} className="flex-1 h-full" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-slate-300 group-hover:text-white truncate block">
                    {pal.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Custom Color Selector Bar */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customColorInput}
                  onChange={(e) => setCustomColorInput(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                />
                <input
                  type="text"
                  value={customColorInput}
                  onChange={(e) => setCustomColorInput(e.target.value)}
                  className="w-20 px-2 py-1 rounded bg-black/40 border border-white/10 text-xs font-mono text-white text-center uppercase"
                />
              </div>

              <button
                type="button"
                onClick={() => addPreferredColor(customColorInput)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-all shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir a mi paleta</span>
              </button>

              {/* Active Preferred Colors Swatches */}
              <div className="flex flex-wrap items-center gap-2 ml-auto">
                {data.preferredColors.map((color, i) => (
                  <div
                    key={i}
                    className="group relative flex items-center gap-1 px-2 py-1 rounded-lg border border-white/20 bg-slate-800 text-xs text-white"
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/30"
                      style={{ backgroundColor: color }}
                    />
                    <span className="font-mono text-[10px]">{color}</span>
                    <button
                      type="button"
                      onClick={() => removePreferredColor(color)}
                      className="text-slate-400 hover:text-red-400 ml-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Colores a Evitar */}
            <div className="mt-5 pt-4 border-t border-white/5">
              <label className="text-xs font-semibold text-red-300 flex items-center gap-1.5 mb-1.5">
                <Ban className="w-3.5 h-3.5 text-red-400" />
                <span>Colores que prefieres NO utilizar en el diseño</span>
              </label>

              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {COMMON_AVOID_COLORS.map((col) => {
                  const isAvoided = data.avoidColors.includes(col);
                  return (
                    <button
                      key={col}
                      type="button"
                      onClick={() => toggleAvoidColor(col)}
                      className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                        isAvoided
                          ? 'bg-red-500/20 text-red-300 border border-red-500/40 font-semibold'
                          : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5'
                      }`}
                    >
                      {col} {isAvoided && '✕'}
                    </button>
                  );
                })}
              </div>

              {/* Custom avoid input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newAvoidTag}
                  onChange={(e) => setNewAvoidTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomAvoid())}
                  placeholder="Otro color a evitar (ej. Tonos flúor, marrón oscuro)..."
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-400"
                />
                <button
                  type="button"
                  onClick={handleAddCustomAvoid}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>

          {/* Atributos de Personalidad de Marca */}
          <div className="glass-card p-5 sm:p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Atributos & Personalidad Visual</span>
              </label>
              <span className="text-xs text-slate-400">Espectro de estilo</span>
            </div>

            <p className="text-xs text-slate-400 mb-5">
              Ajusta los sliders para definir la dirección visual exacta que deseas transmitir:
            </p>

            <div className="space-y-5">
              {/* Slider 1: Modernidad */}
              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-400">Clásico / Tradicional</span>
                  <span className="text-purple-300 font-bold">{data.brandPersonality.modernity}%</span>
                  <span className="text-cyan-400">Futurista / Moderno</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={data.brandPersonality.modernity}
                  onChange={(e) =>
                    onChange({
                      brandPersonality: {
                        ...data.brandPersonality,
                        modernity: Number(e.target.value)
                      }
                    })
                  }
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              {/* Slider 2: Simplicidad */}
              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                  <span className="text-cyan-400">Minimalista / Esencial</span>
                  <span className="text-purple-300 font-bold">{data.brandPersonality.simplicity}%</span>
                  <span className="text-slate-400">Detallado / Artístico</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={data.brandPersonality.simplicity}
                  onChange={(e) =>
                    onChange({
                      brandPersonality: {
                        ...data.brandPersonality,
                        simplicity: Number(e.target.value)
                      }
                    })
                  }
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Slider 3: Tono */}
              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-400">Sobrio / Corporativo</span>
                  <span className="text-purple-300 font-bold">{data.brandPersonality.vibe}%</span>
                  <span className="text-pink-400">Audaz / Dinámico</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={data.brandPersonality.vibe}
                  onChange={(e) =>
                    onChange({
                      brandPersonality: {
                        ...data.brandPersonality,
                        vibe: Number(e.target.value)
                      }
                    })
                  }
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Additional Notes & Client Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* Campo 4.2: Textarea de Notas Adicionales */}
          <div className="glass-card p-5 sm:p-6 rounded-2xl relative">
            <label htmlFor="additionalNotes" className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Notas, Restricciones o Ideas Especiales</span>
            </label>
            <p className="text-xs text-slate-400 mb-3">
              ¿Hay algún símbolo, tipografía o concepto que tengas en mente o que debamos evitar por completo?
            </p>

            <textarea
              id="additionalNotes"
              rows={4}
              value={data.additionalNotes}
              onChange={(e) => onChange({ additionalNotes: e.target.value })}
              placeholder="Ej: Nos gustaría que el símbolo funcione bien como icono de app móvil en fondo oscuro. Evitar clichés como engranajes o bombillas..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-purple-400 resize-none leading-relaxed"
            />
          </div>

          {/* Client Information for PDF Header & Follow-up */}
          <div className="glass-card p-5 sm:p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-400" />
              <span>Datos del Solicitante / Cliente</span>
            </h3>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Tu Nombre o Razón Social:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={data.clientName}
                  onChange={(e) => onChange({ clientName: e.target.value })}
                  placeholder="Ej. Carlos Mendoza"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Correo Electrónico de Contacto:
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={data.clientEmail}
                  onChange={(e) => onChange({ clientEmail: e.target.value })}
                  placeholder="Ej. carlos@tuempresa.com"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1 mb-1">
                  <Clock className="w-3 h-3 text-purple-400" />
                  <span>Plazo estimado:</span>
                </label>
                <select
                  value={data.targetDeadline}
                  onChange={(e) => onChange({ targetDeadline: e.target.value })}
                  className="w-full px-2.5 py-2 rounded-lg bg-slate-900/80 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-400"
                >
                  <option value="Urgente (1-2 semanas)">1-2 semanas (Urgente)</option>
                  <option value="2-4 semanas">2-4 semanas (Estándar)</option>
                  <option value="1-2 meses">1-2 meses (Holgado)</option>
                  <option value="Flexible">Sin fecha estricta</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1 mb-1">
                  <DollarSign className="w-3 h-3 text-emerald-400" />
                  <span>Rango inversión:</span>
                </label>
                <select
                  value={data.projectBudget}
                  onChange={(e) => onChange({ projectBudget: e.target.value })}
                  className="w-full px-2.5 py-2 rounded-lg bg-slate-900/80 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-400"
                >
                  <option value="Starter / Emprendimiento">Starter / Emprendedor</option>
                  <option value="Medio / Profesional">Profesional / Pyme</option>
                  <option value="Premium / Enterprise">Premium / Corporativo</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <button
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 text-sm font-semibold transition-all"
        >
          ← Volver a Referencias Visuales
        </button>

        <button
          onClick={onFinishAndExport}
          className="flex items-center gap-2.5 px-7 py-3 rounded-xl font-bold text-sm transition-all shadow-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Send className="w-4 h-4" />
          <span>Finalizar y Exportar Brief</span>
        </button>
      </div>
    </div>
  );
};
