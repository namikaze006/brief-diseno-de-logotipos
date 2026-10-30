/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  CheckCircle2,
  FileDown,
  Layers,
  Palette,
  Image as ImageIcon,
  Send,
  Star,
  Check,
  Zap,
  Info,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ModularGrid } from './components/ModularGrid';
import { StepBasicInfo } from './components/StepBasicInfo';
import { StepBrandStructure } from './components/StepBrandStructure';
import { StepVisualReferences } from './components/StepVisualReferences';
import { StepAdditionalInfo } from './components/StepAdditionalInfo';
import { ExportModal } from './components/ExportModal';
import { BrandBriefData, INITIAL_BRIEF_DATA } from './types/brief';

export default function App() {
  const [briefData, setBriefData] = useState<BrandBriefData>(INITIAL_BRIEF_DATA);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState<boolean>(true);

  const totalSteps = 4;

  const handleUpdateBrief = (updates: Partial<BrandBriefData>) => {
    setBriefData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      scrollToWorkspace();
    } else {
      setIsExportModalOpen(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      scrollToWorkspace();
    }
  };

  const scrollToWorkspace = () => {
    const el = document.getElementById('workspace-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectStepFromExternal = (step: number) => {
    setCurrentStep(step);
    setIsWorkspaceOpen(true);
    setTimeout(() => {
      scrollToWorkspace();
    }, 50);
  };

  // Dynamic brief completion score calculation
  const calculateCompletionPercent = (): number => {
    let score = 0;
    if (briefData.brandName.trim().length >= 2) score += 25;
    if (briefData.selectedStructures.length > 0) score += 25;
    if (briefData.references.length > 0) score += 25;
    if (briefData.clientEmail.trim().length > 3 || briefData.preferredColors.length > 0) score += 25;
    return score;
  };

  const completionPercent = calculateCompletionPercent();
  const canExport = briefData.brandName.trim().length >= 2;

  const stepTabs = [
    { id: 1, label: '01. Datos Básicos', desc: 'Nombre & Propósito', icon: Sparkles },
    { id: 2, label: '02. Estructura', desc: 'Tipología de Logo', icon: Layers },
    { id: 3, label: '03. Moodboard', desc: 'Referencias Visuales', icon: ImageIcon },
    { id: 4, label: '04. Identidad', desc: 'Colores & Detalles', icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-[#060814] text-slate-100 flex flex-col relative selection:bg-indigo-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onStartBrief={() => handleSelectStepFromExternal(1)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        canExport={canExport}
        brandName={briefData.brandName}
        completedPercent={completionPercent}
      />

      {/* ========================================================================= */}
      {/* BLOQUE SUPERIOR OSCURO (HERO SECTION): ~60% DE LA ALTURA                 */}
      {/* Gradiente radial/lineal de azul marino muy oscuro a violeta profundo     */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-[56vh] flex flex-col justify-between pt-10 sm:pt-16 pb-12 sm:pb-16 overflow-hidden bg-gradient-to-b from-[#050713] via-[#090d25] to-[#140c2b]">
        {/* Subtle radial lighting orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-indigo-700/20 via-purple-600/15 to-cyan-500/10 rounded-full blur-[140px]" />
          <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-indigo-900/15 rounded-full blur-[130px]" />
          <div className="absolute top-1/3 -right-48 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[130px]" />
          {/* Subtle grid pattern mask */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_60%,transparent_100%)] opacity-70" />
        </div>

        {/* ----------------- ELEMENTOS FLOTANTES EXTERNOS ----------------- */}
        {/* Floating Pill Badge 1 (Superior Izquierda) */}
        <div className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/70 border border-indigo-500/30 text-indigo-200 text-xs font-semibold backdrop-blur-md absolute top-12 left-10 shadow-lg shadow-indigo-950/40 animate-pulse pointer-events-none">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Entrega Vectorial .AI .SVG .EPS</span>
        </div>

        {/* Floating Pill Badge 2 (Superior Derecha) */}
        <div className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/70 border border-purple-500/30 text-purple-200 text-xs font-semibold backdrop-blur-md absolute top-12 right-10 shadow-lg shadow-purple-950/40 pointer-events-none">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Calificación 5.0 en Branding</span>
        </div>

        {/* Floating Pill Badge 3 (Inferior Izquierda) */}
        <div className="hidden 2xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-white/10 text-slate-300 text-[11px] font-medium backdrop-blur-md absolute bottom-44 left-12 pointer-events-none">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>jsPDF Canvas Engine 1200px Base64</span>
        </div>

        {/* Floating Designer Profile Card (Derecha media) */}
        <div 
          id="designer-profile-section"
          className="hidden lg:flex flex-col p-4 rounded-2xl bg-[#0d1029]/80 border border-white/10 backdrop-blur-xl absolute top-28 right-8 2xl:right-16 shadow-2xl shadow-indigo-950/50 w-72 z-20 group hover:border-indigo-500/40 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-[1.5px] shadow-md">
                <div className="w-full h-full bg-[#090b1c] rounded-[10px] flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-tr from-white via-indigo-200 to-cyan-200 text-base">
                  MM
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0d1029]" />
            </div>

            <div className="overflow-hidden">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white truncate">Miguel Marín</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
                  PRO
                </span>
              </div>
              <span className="text-[11px] text-slate-400 block truncate">
                UI/UX & Brand Designer
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-300 leading-relaxed mb-3">
            Especialista en identidad visual, logotipos de alto impacto e ilustración digital.
          </div>

          <div className="pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px]">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Proyectos Abiertos
            </span>
            <a
              href="mailto:miguel.marin.art@gmail.com"
              className="text-indigo-300 hover:text-white transition-colors font-medium flex items-center gap-1"
            >
              Contactar
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* ----------------- EJE CENTRAL (INFORMACIÓN PRINCIPAL) ----------------- */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center my-auto">
          {/* Badge de encabezado */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-wide uppercase mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Brief Creativo Profesional • Miguel Marín Studio</span>
          </div>

          {/* H1 (Hero): Tipografía sans-serif gruesa (Bold), tamaño máximo, estructurada en DOS LÍNEAS */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
            <span className="block">Brief de Diseño de Logotipo</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-cyan-300">
              Para Marcas con Identidad Única
            </span>
          </h1>

          {/* Subtítulo: tono gris medio, regular, conciso */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300/90 max-w-2xl mx-auto leading-relaxed mb-8">
            Estructura tus requerimientos de logotipo, elige la tipología gráfica deseada, sube referencias visuales con conversión instantánea y genera un reporte PDF de alta fidelidad listo para producción.
          </p>

          {/* Botones de acción: Predominio de botones píldora (rounded-full) */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Botón Primario: Fondo índigo brillante, icono de flecha */}
            <button
              onClick={() => handleSelectStepFromExternal(1)}
              className="px-8 py-4 rounded-full text-sm sm:text-base font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/35 hover:shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer group"
            >
              <span>Comenzar Brief Interactivo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Botón Secundario: Cian / Glow suave */}
            <button
              onClick={scrollToWorkspace}
              className="px-7 py-4 rounded-full text-sm sm:text-base font-semibold bg-white/10 hover:bg-white/15 text-cyan-200 border border-cyan-400/30 hover:border-cyan-400/60 shadow-lg shadow-cyan-950/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Ver Pasos del Brief</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          {/* Microdatos y métricas breves */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 mt-10 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>4 Fases Guiadas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Soporte Drag & Drop + Pegado</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Exportación PDF Editorial</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* WORKSPACE ACTIVO: FORMULARIO INTERACTIVO (TODAS LAS FUNCIONALIDADES)       */}
      {/* ========================================================================= */}
      <section id="workspace-section" className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Workspace Container Card */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Header del Formulario con Stepper Horizontal */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                <span>Espacio de Trabajo</span>
                <span>•</span>
                <span>Paso {currentStep} de {totalSteps}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span>{stepTabs[currentStep - 1].label}</span>
                {briefData.brandName && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {briefData.brandName}
                  </span>
                )}
              </h2>
            </div>

            {/* Stepper Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {stepTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = currentStep === tab.id;
                const isPassed = currentStep > tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentStep(tab.id)}
                    className={`px-3 py-2 rounded-xl text-left transition-all border cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md shadow-indigo-950/40'
                        : isPassed
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                        : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${
                          isActive
                            ? 'bg-indigo-600 text-white font-bold'
                            : isPassed
                            ? 'bg-emerald-500 text-slate-950 font-bold'
                            : 'bg-white/10 text-slate-400'
                        }`}
                      >
                        {isPassed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : tab.id}
                      </div>
                      <span className="text-xs font-semibold truncate">{tab.label.split('.')[1]}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Step Components with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 1 && (
                <StepBasicInfo
                  data={briefData}
                  onChange={handleUpdateBrief}
                  onNext={handleNextStep}
                />
              )}

              {currentStep === 2 && (
                <StepBrandStructure
                  data={briefData}
                  onChange={handleUpdateBrief}
                  onNext={handleNextStep}
                  onPrev={handlePrevStep}
                />
              )}

              {currentStep === 3 && (
                <StepVisualReferences
                  data={briefData}
                  onChange={handleUpdateBrief}
                  onNext={handleNextStep}
                  onPrev={handlePrevStep}
                />
              )}

              {currentStep === 4 && (
                <StepAdditionalInfo
                  data={briefData}
                  onChange={handleUpdateBrief}
                  onFinishAndExport={() => setIsExportModalOpen(true)}
                  onPrev={handlePrevStep}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BLOQUE INFERIOR CLARO (FONDO LISO / BLANCO HUMO / GRIS SUMAMENTE CLARO)   */}
      {/* Contiene el H2 central y la cuadrícula modular de 8 contenedores (4x2)     */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-[#f4f6fb] text-slate-900 border-t border-slate-200">
        <ModularGrid
          onSelectStep={handleSelectStepFromExternal}
          onOpenExportModal={() => setIsExportModalOpen(true)}
          onShowDesignerInfo={() => {
            const el = document.getElementById('designer-profile-section');
            if (el) {
              window.scrollTo({ top: 100, behavior: 'smooth' });
            }
          }}
        />

        {/* Designer Quote & Portfolio Highlight in Light Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 text-center">
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 font-bold text-sm">
              MM
            </div>
            <blockquote className="text-base sm:text-lg font-medium text-slate-700 italic max-w-2xl mx-auto mb-4">
              "Un logotipo extraordinario no es solo un adorno visual; es la síntesis geométrica de los valores, la ambición y la confianza de tu proyecto."
            </blockquote>
            <div className="text-sm font-bold text-slate-900">Miguel Marín</div>
            <div className="text-xs text-slate-500">Diseñador de Logotipos, UI/UX Designer e Ilustrador</div>
          </div>
        </div>

        {/* Light Footer */}
        <footer className="border-t border-slate-200 py-10 bg-[#eef2f7]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">Miguel Marín Studio</span>
              <span>•</span>
              <span>Portafolio Profesional & Brief Interactivo</span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="mailto:miguel.marin.art@gmail.com"
                className="text-indigo-600 font-semibold hover:underline"
              >
                miguel.marin.art@gmail.com
              </a>
              <span>•</span>
              <span>© {new Date().getFullYear()} Todos los derechos reservados</span>
            </div>
          </div>
        </footer>
      </section>

      {/* Floating Bottom Quick Action on Mobile */}
      <div className="sm:hidden sticky bottom-0 z-40 p-3 bg-[#060814]/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-between gap-3">
        <div className="text-xs font-semibold text-slate-300">
          Paso {currentStep} de {totalSteps} ({completionPercent}%)
        </div>
        <button
          onClick={() => setIsExportModalOpen(true)}
          disabled={!canExport}
          className="px-4 py-2 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-md disabled:opacity-50 cursor-pointer"
        >
          Exportar PDF
        </button>
      </div>

      {/* Export & Review Modal (con motor asíncrono y Base64 procesado) */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        data={briefData}
      />
    </div>
  );
}
