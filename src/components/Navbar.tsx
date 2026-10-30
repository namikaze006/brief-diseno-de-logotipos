import React from 'react';
import { ArrowRight, Sparkles, FileDown, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  onStartBrief: () => void;
  onOpenExportModal: () => void;
  canExport: boolean;
  brandName?: string;
  completedPercent?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onStartBrief,
  onOpenExportModal,
  canExport,
  brandName,
  completedPercent = 0,
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="relative w-full z-40 bg-[#060814]/90 backdrop-blur-xl border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Logotipo con Isotipo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3.5 cursor-pointer group shrink-0"
        >
          {/* Isotipo Monograma MM */}
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#080a18] rounded-[10px] flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-tr from-white via-indigo-200 to-cyan-200 text-sm tracking-wider">
                MM
              </div>
            </div>
            <div 
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#060814]" 
              title="Disponible para proyectos" 
            />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
              <span>Miguel Marín Studio</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
                PRO
              </span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline-block">
              UI/UX & Brand Designer
            </span>
          </div>
        </div>

        {/* Center: Enlaces de navegación de bajo contraste */}
        <div className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-400">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection('workspace-section')}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Brief Interactivo</span>
            {completedPercent > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                {completedPercent}%
              </span>
            )}
          </button>
          <button
            onClick={() => scrollToSection('modular-grid-section')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Módulos de Trabajo
          </button>
          <button
            onClick={() => scrollToSection('designer-profile-section')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Portafolio & Estudio
          </button>
        </div>

        {/* Right: Enlace de texto + Botón píldora con flecha */}
        <div className="flex items-center gap-4 shrink-0">
          <a
            href="mailto:miguel.marin.art@gmail.com"
            className="hidden lg:inline-block text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            Contacto Directo
          </a>

          {canExport ? (
            <button
              onClick={onOpenExportModal}
              className="px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Exportar PDF</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onStartBrief}
              className="px-5 py-2.5 rounded-full text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Iniciar Brief</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
