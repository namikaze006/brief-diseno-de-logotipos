import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  Maximize2,
  FileText,
  Clipboard,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  Layers,
  Plus
} from 'lucide-react';
import { BrandBriefData, ReferenceImage } from '../types/brief';
import { PRESET_REFERENCES } from '../assets/presetReferences';
import { processImageForPDF } from '../utils/imageProcessor';

interface StepVisualReferencesProps {
  data: BrandBriefData;
  onChange: (updates: Partial<BrandBriefData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const StepVisualReferences: React.FC<StepVisualReferencesProps> = ({
  data,
  onChange,
  onNext,
  onPrev
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [pasteNotification, setPasteNotification] = useState<string | null>(null);
  const [activeModalImage, setActiveModalImage] = useState<ReferenceImage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Native Paste handler from clipboard
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const clipboardData = e.clipboardData;
      if (!clipboardData) return;

      const items = clipboardData.items;
      const imageFiles: File[] = [];

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            imageFiles.push(file);
          }
        }
      }

      if (imageFiles.length > 0) {
        e.preventDefault();
        processFiles(imageFiles, 'clipboard');
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, [data.references]);

  // Convert File to Base64 & ReferenceImage with bulletproof processImageForPDF
  const processFiles = async (files: FileList | File[], source: 'upload' | 'clipboard' | 'drop' = 'upload') => {
    const fileArray = Array.from(files);
    const validImageFiles = fileArray.filter((file) => file.type.startsWith('image/'));

    if (validImageFiles.length === 0) {
      return;
    }

    try {
      const newRefs: ReferenceImage[] = await Promise.all(
        validImageFiles.map(async (file) => {
          const base64Jpeg = await processImageForPDF(file);
          return {
            id: `ref-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: file.name.length > 3 ? file.name : `Captura_${Date.now().toString().slice(-4)}.jpg`,
            size: Math.round(base64Jpeg.length * 0.75),
            dataUrl: base64Jpeg,
            previewUrl: base64Jpeg,
            notes: '',
            uploadedAt: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
          };
        })
      );

      onChange({
        references: [...data.references, ...newRefs]
      });

      const msg = source === 'clipboard'
        ? `¡${newRefs.length} imagen(es) pegada(s) desde el portapapeles!`
        : `¡${newRefs.length} imagen(es) añadida(s) exitosamente!`;

      setPasteNotification(msg);
      setTimeout(() => setPasteNotification(null), 3500);
    } catch (err) {
      console.error('Error processing files for references:', err);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files, 'drop');
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files, 'upload');
      // Reset input value to allow uploading same file if needed
      e.target.value = '';
    }
  };

  const removeReference = (id: string) => {
    onChange({
      references: data.references.filter((ref) => ref.id !== id)
    });
  };

  const updateReferenceNotes = (id: string, notes: string) => {
    onChange({
      references: data.references.map((ref) => (ref.id === id ? { ...ref, notes } : ref))
    });
  };

  // Add preset reference immediately with zero network delay or CORS issue
  const addPresetReference = (preset: { name: string; url: string; notes: string }) => {
    const newRef: ReferenceImage = {
      id: `ref-preset-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: preset.name,
      size: 45000,
      dataUrl: preset.url,
      previewUrl: preset.url,
      notes: preset.notes,
      uploadedAt: 'Preset'
    };
    onChange({ references: [...data.references, newRef] });
    setPasteNotification(`Preset añadido: ${preset.name}`);
    setTimeout(() => setPasteNotification(null), 3000);
  };

  const totalBytes = data.references.reduce((acc, curr) => acc + curr.size, 0);
  const totalMb = (totalBytes / (1024 * 1024)).toFixed(2);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold mb-2">
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Fase 03 • Moodboard & Referencias</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Módulo Avanzado de Referencias Visuales
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Sube logotipos existentes, paletas de color, tipografías o estilos artísticos que te gusten para alinear la dirección creativa.
          </p>
        </div>

        {data.references.length > 0 && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-300 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{data.references.length} referencia(s) cargada(s) ({totalMb} MB)</span>
          </div>
        )}
      </div>

      {/* Floating Clipboard Notification */}
      <AnimatePresence>
        {pasteNotification && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-purple-500/30 border border-white/20"
          >
            <Clipboard className="w-4 h-4 animate-bounce" />
            <span>{pasteNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Dropzone Card */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative p-8 sm:p-12 rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden text-center group ${
          isDragging
            ? 'border-purple-400 bg-purple-950/40 scale-[1.01] shadow-2xl shadow-purple-900/50'
            : 'border-white/15 bg-gradient-to-b from-[#121429]/70 to-[#0e1022]/70 hover:border-purple-500/40 hover:bg-[#151833]/80'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-transparent to-cyan-500/10 pointer-events-none" />

        <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-cyan-400 p-[1.5px] mb-4 shadow-xl shadow-purple-500/20 group-hover:scale-110 transition-transform">
            <div className="w-full h-full bg-[#0d0f1e] rounded-[14px] flex items-center justify-center text-purple-300">
              <UploadCloud className="w-8 h-8 text-transparent bg-clip-text bg-gradient-to-tr from-purple-300 to-cyan-200" />
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            Arrastra y suelta tus imágenes aquí o haz clic para explorar
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 mb-4 max-w-md">
            Compatible con <strong className="text-purple-300">PNG, JPG, WEBP, SVG</strong>. También puedes presionar <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-mono">Ctrl + V</kbd> o <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-mono">Cmd + V</kbd> en cualquier lugar para pegar desde tu portapapeles.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
              <Clipboard className="w-3.5 h-3.5 text-cyan-400" />
              Soporte nativo Clipboard Paste
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Conversión automática a Base64 para PDF
            </span>
          </div>
        </div>
      </div>

      {/* Real-time Gallery of Uploaded Images */}
      {data.references.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Galería de Referencias Adjuntas ({data.references.length})</span>
            </h4>
            <button
              type="button"
              onClick={() => onChange({ references: [] })}
              className="text-xs text-red-400 hover:text-red-300 transition-colors"
            >
              Eliminar todas
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {data.references.map((ref, index) => {
                const sizeKb = Math.round(ref.size / 1024);

                return (
                  <motion.div
                    key={ref.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="glass-card rounded-2xl overflow-hidden border border-white/10 group relative flex flex-col justify-between"
                  >
                    {/* Image Preview Box */}
                    <div className="relative h-44 w-full bg-[#080914] overflow-hidden">
                      <img
                        src={ref.dataUrl || ref.previewUrl}
                        alt={ref.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Top Action Overlay */}
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModalImage(ref);
                          }}
                          title="Ampliar imagen"
                          className="w-7 h-7 rounded-lg bg-black/60 hover:bg-black/90 backdrop-blur-md text-slate-200 flex items-center justify-center transition-colors"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeReference(ref.id);
                          }}
                          title="Eliminar referencia"
                          className="w-7 h-7 rounded-lg bg-red-950/70 hover:bg-red-900 border border-red-500/30 text-red-300 flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Index Pill */}
                      <div className="absolute bottom-2.5 left-2.5">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/70 backdrop-blur-md text-white border border-white/10">
                          #{index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Metadata & User Notes */}
                    <div className="p-3.5 bg-[#0e1022] space-y-2.5 flex-1 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white truncate max-w-[160px]" title={ref.name}>
                          {ref.name}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {sizeKb} KB
                        </span>
                      </div>

                      {/* Client Note input per image */}
                      <div>
                        <label className="text-[10px] font-medium text-slate-400 block mb-1">
                          ¿Qué te gusta de esta referencia? (Opcional):
                        </label>
                        <input
                          type="text"
                          value={ref.notes || ''}
                          onChange={(e) => updateReferenceNotes(ref.id, e.target.value)}
                          placeholder="Ej: La paleta cromática, el minimalismo, etc."
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-purple-400"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Quick Preset Ideas Section */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/40 border border-white/5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs sm:text-sm font-semibold text-white">
              ¿No tienes referencias en tu dispositivo?
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">Inspiración rápida</span>
        </div>

        <p className="text-xs text-slate-400">
          Puedes agregar estas muestras pre-configuradas con un clic para dar una guía inicial al diseñador:
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {PRESET_REFERENCES.map((preset, i) => (
            <button
              key={i}
              type="button"
              onClick={() => addPresetReference(preset)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-purple-400" />
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Uploaded Image */}
      <AnimatePresence>
        {activeModalImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-3xl w-full rounded-2xl bg-[#0e1022] border border-white/10 overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#13152c]">
                <div>
                  <h3 className="text-sm font-bold text-white truncate max-w-md">
                    {activeModalImage.name}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    {Math.round(activeModalImage.size / 1024)} KB
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalImage(null)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-[65vh] bg-black flex items-center justify-center overflow-hidden p-4">
                <img
                  src={activeModalImage.dataUrl || activeModalImage.previewUrl}
                  alt={activeModalImage.name}
                  className="max-h-[60vh] max-w-full object-contain"
                />
              </div>

              {activeModalImage.notes && (
                <div className="p-4 bg-[#0a0b16] border-t border-white/5 text-xs text-purple-200">
                  <span className="font-semibold text-purple-400">Nota del cliente: </span>
                  {activeModalImage.notes}
                </div>
              )}
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
          ← Volver a Estructura de Marca
        </button>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02]"
        >
          <span>Continuar: Identidad, Colores & Notas</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
