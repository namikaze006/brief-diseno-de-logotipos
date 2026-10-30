import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileDown,
  X,
  CheckCircle2,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Palette,
  Mail,
  Copy,
  Check,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { BrandBriefData, LOGO_STRUCTURE_OPTIONS } from '../types/brief';
import { generateBrandBriefPDF } from '../utils/pdfGenerator';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BrandBriefData;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, data }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStatus, setProgressStatus] = useState('');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const selectedOptions = LOGO_STRUCTURE_OPTIONS.filter((opt) =>
    data.selectedStructures.includes(opt.id)
  );

  const handleDownloadPDF = async () => {
    try {
      setIsGenerating(true);
      setErrorMessage(null);
      setDownloadSuccess(false);

      const doc = await generateBrandBriefPDF(data, (status) => {
        setProgressStatus(status);
      });

      // Save PDF file
      const safeBrandName = data.brandName.trim().replace(/[^a-zA-Z0-9_-]/g, '_') || 'MiMarca';
      const filename = `Brief_Logo_${safeBrandName}_MiguelMarin.pdf`;
      doc.save(filename);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setErrorMessage('Ocurrió un error al compilar el PDF. Por favor verifica que las imágenes adjuntas sean válidas.');
    } finally {
      setIsGenerating(false);
      setProgressStatus('');
    }
  };

  const handleCopySummary = () => {
    const summaryText = `
=== BRIEF DE DISEÑO DE LOGOTIPO ===
Diseñador: Miguel Marín (UI/UX & Brand Designer)
Email: miguel.marin.art@gmail.com
-----------------------------------
1. INFORMACIÓN BÁSICA:
- Marca: ${data.brandName || 'Sin especificar'}
- Tagline: ${data.tagline || 'Ninguno'}
- Industria: ${data.industry || 'General'}
- Propósito: ${data.brandDescription || 'No especificado'}
- Público Objetivo: ${data.targetAudience || 'No especificado'}

2. ESTRUCTURA DE MARCA SELECCIONADA:
${selectedOptions.map((o) => `• ${o.title} (${o.tag}) - ${o.subtitle}`).join('\n')}

3. IDENTIDAD CROMÁTICA & ESTILO:
- Colores preferidos: ${data.preferredColors.join(', ')}
- Colores a evitar: ${data.avoidColors.join(', ') || 'Ninguno'}
- Modernidad: ${data.brandPersonality.modernity}% | Simplicidad: ${data.brandPersonality.simplicity}% | Tono: ${data.brandPersonality.vibe}%

4. REFERENCIAS VISUALES:
- Cantidad de imágenes adjuntas: ${data.references.length}

5. CLIENTE & PROYECTO:
- Contacto: ${data.clientName || 'Cliente'} (${data.clientEmail || 'Sin email'})
- Plazo objetivo: ${data.targetDeadline}
- Rango de inversión: ${data.projectBudget}
- Notas adicionales: ${data.additionalNotes || 'Sin notas extra'}
===================================
`.trim();

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  const mailtoUrl = `mailto:miguel.marin.art@gmail.com?subject=${encodeURIComponent(
    `Nuevo Brief de Logotipo: ${data.brandName || 'Proyecto de Marca'}`
  )}&body=${encodeURIComponent(
    `Hola Miguel,\n\nTe comparto el brief de diseño de marca para ${data.brandName || 'nuestro proyecto'}.\n\nPropósito: ${data.brandDescription}\nEstructuras deseadas: ${data.selectedStructures.join(', ')}\nReferencias adjuntas: ${data.references.length} imágenes.\n\nAdjunto encontrarás el PDF descargado con todos los detalles visuales.\n\nSaludos,\n${data.clientName || ''}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative max-w-3xl w-full my-8 rounded-3xl bg-[#0e1022] border border-white/10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-[#14162e] via-[#101225] to-[#14162e] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 p-[1.5px]">
              <div className="w-full h-full bg-[#0d0f1e] rounded-[10px] flex items-center justify-center text-white font-bold text-sm">
                MM
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-400">
                  Miguel Marín • Brief Master
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="text-[10px] text-cyan-400">PDF Ready</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Resumen Ejecutivo & Exportación del Brief
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {downloadSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>¡PDF descargado con éxito! Todas las imágenes y referencias fueron incluidas.</span>
            </div>
          )}

          {/* Quick Summary Card */}
          <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-4">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
              <div>
                <span className="text-[11px] font-mono text-slate-400">NOMBRE DE LA MARCA</span>
                <h4 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-cyan-300">
                  {data.brandName || 'Sin Nombre Definido'}
                </h4>
                {data.tagline && (
                  <p className="text-xs text-slate-400 italic">"{data.tagline}"</p>
                )}
              </div>
              {data.industry ? (
                <div className="text-right sm:text-right">
                  <span className="text-[11px] text-slate-400 block">Industria:</span>
                  <span className="text-xs font-semibold text-purple-300 px-2.5 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20">
                    {data.industry}
                  </span>
                </div>
              ) : null}
            </div>

            {/* Description */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                Propósito del Negocio:
              </span>
              <p className="text-xs text-slate-200 leading-relaxed bg-black/20 p-3 rounded-xl border border-white/5">
                {data.brandDescription || 'No se detalló una descripción completa en el formulario.'}
              </p>
            </div>

            {/* Selected Structures */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Estructura(s) Seleccionada(s):</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedOptions.map((opt) => (
                  <div
                    key={opt.id}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-purple-950/20 border border-purple-500/20"
                  >
                    <img
                      src={opt.imageUrl}
                      alt={opt.title}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="overflow-hidden">
                      <span className="text-[10px] font-bold text-purple-300 uppercase block">
                        {opt.tag}
                      </span>
                      <span className="text-xs font-semibold text-white truncate block">
                        {opt.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* References preview */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block mb-1.5 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-pink-400" />
                <span>Referencias Visuales ({data.references.length}):</span>
              </span>
              {data.references.length > 0 ? (
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {data.references.map((ref, idx) => (
                    <div
                      key={ref.id}
                      className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-white/10 group"
                    >
                      <img
                        src={ref.dataUrl || ref.previewUrl}
                        alt={ref.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 px-1 rounded bg-black/70 text-[9px] font-mono text-white">
                        #{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">
                  Sin imágenes adjuntas (se incluirá nota para que Miguel Marín proponga moodboard).
                </p>
              )}
            </div>

            {/* Colors */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block mb-1.5 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-purple-400" />
                <span>Paleta de Colores Preferidos:</span>
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {data.preferredColors.map((col, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs"
                  >
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: col }} />
                    <span className="font-mono text-[10px] text-white">{col}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer / Actions */}
        <div className="p-6 border-t border-white/10 bg-[#0d0f1e] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Copy Summary */}
            <button
              type="button"
              onClick={handleCopySummary}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSummary ? '¡Copiado!' : 'Copiar Texto'}</span>
            </button>

            {/* Send to Miguel Marín email */}
            <a
              href={mailtoUrl}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 text-xs font-semibold text-purple-300 hover:text-white transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Enviar por Email</span>
            </a>
          </div>

          {/* Main Action: Download PDF */}
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{progressStatus || 'Compilando PDF...'}</span>
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4" />
                <span>Descargar Brief en PDF</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
