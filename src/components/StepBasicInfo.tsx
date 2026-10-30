import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Target, Type, Check, AlertCircle, HelpCircle } from 'lucide-react';
import { BrandBriefData } from '../types/brief';

interface StepBasicInfoProps {
  data: BrandBriefData;
  onChange: (updates: Partial<BrandBriefData>) => void;
  onNext: () => void;
}

const PROMPT_SUGGESTIONS = [
  'Somos una cafetería de especialidad y repostería artesanal enfocada en jóvenes creativos y nómadas digitales.',
  'Plataforma SaaS que optimiza la gestión logística de pequeñas y medianas empresas mediante inteligencia de datos.',
  'Marca de ropa urbana sustentable con estética retro-futurista, confeccionada con textiles 100% reciclados.',
  'Estudio boutique de entrenamiento funcional y nutrición personalizada con enfoque holístico.'
];

export const StepBasicInfo: React.FC<StepBasicInfoProps> = ({ data, onChange, onNext }) => {
  const isBrandNameValid = data.brandName.trim().length >= 2;
  const wordCount = data.brandDescription.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Fase 01 • Cimientos de la Marca</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Información Básica del Proyecto
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          El corazón de todo diseño exitoso comienza con entender la esencia, la personalidad y el propósito comercial de tu marca.
        </p>
      </div>

      {/* Grid of Main Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-7 space-y-6">
          {/* Campo 1.1: Nombre de la Marca */}
          <div className="glass-card p-5 sm:p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-purple-500 to-cyan-400" />

            <div className="flex items-center justify-between mb-2">
              <label htmlFor="brandName" className="text-sm font-semibold text-white flex items-center gap-2">
                <Type className="w-4 h-4 text-purple-400" />
                <span>Nombre de la Marca</span>
                <span className="text-pink-400 font-bold">*</span>
              </label>

              {data.brandName.trim().length > 0 && (
                <span className="text-xs font-medium text-slate-400">
                  {data.brandName.length} caracteres
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400 mb-3">
              Indica exactamente cómo debe escribirse el nombre (mayúsculas, minúsculas o espaciado deseado).
            </p>

            <div className="relative">
              <input
                id="brandName"
                type="text"
                value={data.brandName}
                onChange={(e) => onChange({ brandName: e.target.value })}
                placeholder="Ej. Lumina, Nexora, Café Nómade..."
                className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-white placeholder-slate-500 focus:outline-none transition-all text-base sm:text-lg font-medium ${
                  !isBrandNameValid && data.brandName.length > 0
                    ? 'border-red-500/50 focus:ring-2 focus:ring-red-500/20'
                    : isBrandNameValid
                    ? 'border-purple-500/50 focus:ring-2 focus:ring-purple-500/30'
                    : 'border-white/10 focus:border-purple-400'
                }`}
              />
              {isBrandNameValid && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            {!isBrandNameValid && data.brandName.length > 0 && (
              <p className="text-xs text-red-400 mt-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Por favor ingresa al menos 2 caracteres para el nombre.</span>
              </p>
            )}

            {/* Tagline / Eslogan opcional */}
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="tagline" className="text-xs font-semibold text-slate-300">
                  Eslogan o Tagline secundario (Opcional)
                </label>
                <span className="text-[11px] text-slate-500">¿Llevará subtítulo el logo?</span>
              </div>
              <input
                id="tagline"
                type="text"
                value={data.tagline}
                onChange={(e) => onChange({ tagline: e.target.value })}
                placeholder="Ej. Specialty Coffee & Roasters, Creative Tech Studio..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/50 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>
          </div>

          {/* Campo 1.2: ¿Qué hace la marca? */}
          <div className="glass-card p-5 sm:p-6 rounded-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="brandDescription" className="text-sm font-semibold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" />
                <span>¿Qué hace la marca? / Propósito y Valor</span>
                <span className="text-pink-400 font-bold">*</span>
              </label>

              <span className="text-xs text-slate-400 font-mono">
                {wordCount} palabras
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-3">
              Describe los productos o servicios principales, qué problema resuelves y cuál es tu factor diferenciador.
            </p>

            <textarea
              id="brandDescription"
              rows={4}
              value={data.brandDescription}
              onChange={(e) => onChange({ brandDescription: e.target.value })}
              placeholder="Ej: Somos una marca que diseña experiencias gastronómicas memorables... Nuestro diferencial es el tueste artesanal en vivo y empaques compostables..."
              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-sm leading-relaxed transition-all resize-none"
            />

            {/* Quick Inspiration Chips */}
            <div className="mt-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                <span>¿Necesitas inspiración? Haz clic en un ejemplo para comenzar:</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {PROMPT_SUGGESTIONS.slice(0, 2).map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onChange({ brandDescription: suggestion })}
                    className="text-left text-xs p-2 rounded-lg bg-white/[0.03] hover:bg-purple-900/20 border border-white/5 hover:border-purple-500/30 text-slate-300 hover:text-white transition-all truncate"
                    title={suggestion}
                  >
                    💡 {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Industry, Target Audience & Live Preview */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Typography Preview Card */}
          <div className="glass-card p-5 rounded-2xl border border-purple-500/20 bg-gradient-to-b from-[#161830] to-[#0e1022] relative overflow-hidden">
            <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 flex items-center justify-between mb-3">
              <span>Vista Previa Tipográfica Dinámica</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">En Tiempo Real</span>
            </div>

            <div className="py-8 px-4 rounded-xl bg-[#090a14] border border-white/5 flex flex-col items-center justify-center text-center min-h-[140px]">
              {data.brandName.trim() ? (
                <>
                  <motion.div
                    key={data.brandName}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-cyan-200"
                  >
                    {data.brandName}
                  </motion.div>
                  {data.tagline.trim() && (
                    <motion.div
                      key={data.tagline}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs uppercase tracking-[0.25em] text-slate-400 mt-2 font-medium"
                    >
                      {data.tagline}
                    </motion.div>
                  )}
                </>
              ) : (
                <div className="text-slate-500 text-xs italic">
                  Escribe el nombre de tu marca para ver el render tipográfico previo...
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-400 mt-3 text-center">
              Miguel Marín diseñará exploraciones tipográficas personalizadas adaptadas a este concepto.
            </p>
          </div>

          {/* Público Objetivo */}
          <div className="glass-card p-5 rounded-2xl">
            <label className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-cyan-400" />
              <span>Público Objetivo Principal</span>
            </label>
            <input
              type="text"
              value={data.targetAudience}
              onChange={(e) => onChange({ targetAudience: e.target.value })}
              placeholder="Ej. Jóvenes 20-35 años, nómadas digitales, empresas B2B..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/60 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="text-xs text-slate-400">
          {!isBrandNameValid ? (
            <span className="text-amber-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Escribe el nombre de tu marca para avanzar
            </span>
          ) : (
            <span className="text-emerald-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              Información inicial completada
            </span>
          )}
        </div>

        <button
          onClick={onNext}
          disabled={!isBrandNameValid}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg ${
            isBrandNameValid
              ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02]'
              : 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5'
          }`}
        >
          <span>Continuar: Estructura de Marca</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
