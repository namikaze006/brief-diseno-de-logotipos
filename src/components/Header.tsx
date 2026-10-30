import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, FileText, CheckCircle2, Palette, Layers, Image as ImageIcon, Send } from 'lucide-react';

interface HeaderProps {
  currentStep: number;
  totalSteps: number;
  onSelectStep: (step: number) => void;
  brandName: string;
  onOpenExportModal: () => void;
  canExport: boolean;
}

const STEP_LABELS = [
  { id: 1, name: 'Información Básica', icon: FileText, desc: 'Nombre & Propósito' },
  { id: 2, name: 'Estructura de Marca', icon: Layers, desc: 'Tipo de Logotipo' },
  { id: 3, name: 'Referencias Visuales', icon: ImageIcon, desc: 'Moodboard & Subidas' },
  { id: 4, name: 'Identidad & Detalles', icon: Palette, desc: 'Colores & Notas' },
];

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  totalSteps,
  onSelectStep,
  brandName,
  onOpenExportModal,
  canExport,
}) => {
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <header className="relative w-full pt-6 pb-4 border-b border-white/5 bg-[#0b0c16]/80 backdrop-blur-xl sticky top-0 z-40 transition-all">
      {/* Glow ambient background highlights */}
      <div className="absolute -top-10 left-1/4 w-72 h-32 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-10 right-1/4 w-72 h-32 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar: Brand, Designer, and Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
          <div className="flex items-center gap-3.5">
            {/* Miguel Marín Designer Avatar / Monogram */}
            <div className="relative group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 p-[1.5px] shadow-lg shadow-purple-500/20">
                <div className="w-full h-full bg-[#0d0f1e] rounded-[14px] flex items-center justify-center font-bold text-transparent bg-clip-text bg-gradient-to-tr from-purple-300 via-pink-200 to-cyan-200 text-lg">
                  MM
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0b0c16]" title="Disponible para nuevos proyectos" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-purple-400">
                  Miguel Marín Studio
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="text-[11px] text-cyan-400/90 font-medium">
                  UI/UX & Brand Designer & Illustrator
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>Brief de Diseño de Logotipo</span>
                {brandName && (
                  <span className="hidden sm:inline-block text-xs font-medium px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    {brandName}
                  </span>
                )}
              </h1>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 self-end md:self-center">
            <button
              onClick={onOpenExportModal}
              disabled={!canExport}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 shadow-lg ${
                canExport
                  ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-500 text-white shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-white/5 text-slate-400 border border-white/5 cursor-not-allowed opacity-60'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Finalizar y Exportar Brief</span>
            </button>
          </div>
        </div>

        {/* Stepper Navigation */}
        <div className="pt-2">
          {/* Progress bar line */}
          <div className="relative w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full"
              initial={{ width: '25%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {STEP_LABELS.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isPassed = currentStep > step.id;

              return (
                <button
                  key={step.id}
                  onClick={() => onSelectStep(step.id)}
                  className={`group relative flex items-center gap-2.5 p-2 rounded-xl text-left transition-all duration-200 border ${
                    isActive
                      ? 'bg-purple-950/40 border-purple-500/40 text-white shadow-sm shadow-purple-900/50'
                      : isPassed
                      ? 'bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/[0.05]'
                      : 'bg-transparent border-transparent text-slate-500 hover:text-slate-400'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-gradient-to-tr from-purple-600 to-cyan-500 text-white shadow-sm'
                        : isPassed
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white/5 text-slate-500 group-hover:bg-white/10'
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
                  </div>

                  <div className="overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-slate-400">Paso 0{step.id}</span>
                    </div>
                    <p className={`text-xs font-semibold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {step.name}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
