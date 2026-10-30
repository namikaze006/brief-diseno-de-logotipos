import jsPDF from 'jspdf';
import { BrandBriefData, LOGO_STRUCTURE_OPTIONS } from '../types/brief';
import { STRUCTURE_IMAGES } from '../assets/structureImages';
import { processImageForPDF, getImageDimensions } from './imageProcessor';

/**
 * Generates a high-fidelity branded PDF for Miguel Marín's client brand brief
 */
export async function generateBrandBriefPDF(
  briefData: BrandBriefData,
  onProgress?: (status: string) => void
): Promise<jsPDF> {
  // CRITICAL STEP: Pre-process and convert ALL user reference images in parallel BEFORE building the PDF
  onProgress?.('Procesando y convirtiendo imágenes de referencia a JPEG...');

  const processedReferences = await Promise.all(
    (briefData.references || []).map(async (ref, idx) => {
      onProgress?.(`Procesando referencia ${idx + 1} de ${briefData.references.length}...`);
      try {
        const rawSource = ref.dataUrl || ref.previewUrl;
        const base64Jpeg = await processImageForPDF(rawSource);
        const dims = await getImageDimensions(base64Jpeg);
        return {
          ...ref,
          dataUrl: base64Jpeg,
          width: dims.width,
          height: dims.height,
          aspect: dims.aspect || 1.33
        };
      } catch (err) {
        console.error('Error pre-processing reference image:', ref.name, err);
        return {
          ...ref,
          dataUrl: ref.dataUrl || '',
          width: 800,
          height: 600,
          aspect: 1.33
        };
      }
    })
  );

  onProgress?.('Iniciando maquetación del documento PDF...');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210 mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297 mm
  const margin = 18;
  const contentWidth = pageWidth - margin * 2; // 174 mm
  let currentY = margin;

  const primaryDark = [11, 12, 22]; // #0b0c16
  const purpleAccent = [168, 85, 247]; // #a855f7
  const cyanAccent = [6, 182, 212]; // #06b6d4
  const textLight = [100, 116, 139];

  const now = new Date();
  const dateFormatted = now.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  const briefFolio = `MM-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Header helper function for each page
  const drawPageHeader = (isFirstPage: boolean) => {
    // Top subtle gradient bar
    doc.setFillColor(purpleAccent[0], purpleAccent[1], purpleAccent[2]);
    doc.rect(0, 0, pageWidth, 4, 'F');
    doc.setFillColor(cyanAccent[0], cyanAccent[1], cyanAccent[2]);
    doc.rect(pageWidth / 2, 0, pageWidth / 2, 4, 'F');

    if (!isFirstPage) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(purpleAccent[0], purpleAccent[1], purpleAccent[2]);
      doc.text('MIGUEL MARÍN', margin, 12);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(140, 150, 165);
      doc.text(`Brief de Marca: ${briefData.brandName || 'Sin Nombre'} | Folio ${briefFolio}`, margin + 30, 12);

      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.3);
      doc.line(margin, 15, pageWidth - margin, 15);
    }
  };

  const drawPageFooter = (pageNum: number) => {
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(purpleAccent[0], purpleAccent[1], purpleAccent[2]);
    doc.text('MIGUEL MARÍN', margin, pageHeight - 9);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 130, 145);
    doc.text('UI/UX, Brand Designer & Illustrator • miguel.marin.art@gmail.com', margin + 26, pageHeight - 9);

    const pageStr = `Pág. ${pageNum}`;
    doc.text(pageStr, pageWidth - margin - 12, pageHeight - 9);
  };

  // Check available space and add page if needed
  const ensureSpace = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - 20) {
      doc.addPage();
      currentY = 22;
      drawPageHeader(false);
    }
  };

  // Section header helper
  const drawSectionTitle = (title: string, subtitle?: string) => {
    ensureSpace(16);
    doc.setFillColor(243, 232, 255);
    doc.roundedRect(margin, currentY, contentWidth, 7.5, 1.5, 1.5, 'F');

    doc.setFillColor(purpleAccent[0], purpleAccent[1], purpleAccent[2]);
    doc.rect(margin, currentY, 2.5, 7.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
    doc.text(title.toUpperCase(), margin + 5, currentY + 5.2);

    if (subtitle) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(textLight[0], textLight[1], textLight[2]);
      doc.text(subtitle, pageWidth - margin - 4, currentY + 5.2, { align: 'right' });
    }

    currentY += 12;
  };

  // ================= PAGE 1 =================
  drawPageHeader(true);
  currentY = 16;

  // Hero Card Banner
  doc.setFillColor(15, 18, 32);
  doc.roundedRect(margin, currentY, contentWidth, 38, 3, 3, 'F');

  // Accent badge
  doc.setFillColor(purpleAccent[0], purpleAccent[1], purpleAccent[2]);
  doc.roundedRect(margin + 6, currentY + 6, 44, 5.5, 1, 1, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('MIGUEL MARÍN • STUDIO', margin + 9, currentY + 9.8);

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('BRIEF DE IDENTIDAD & LOGOTIPO', margin + 6, currentY + 20);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(190, 200, 220);
  doc.text('Documento maestro de requerimientos creativos y dirección de arte.', margin + 6, currentY + 26);

  // Metadata block in banner
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(cyanAccent[0], cyanAccent[1], cyanAccent[2]);
  doc.text(`FOLIO: ${briefFolio}`, pageWidth - margin - 6, currentY + 11, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 190, 210);
  doc.text(`Fecha: ${dateFormatted}`, pageWidth - margin - 6, currentY + 18, { align: 'right' });
  doc.text('Contacto: miguel.marin.art@gmail.com', pageWidth - margin - 6, currentY + 25, { align: 'right' });

  currentY += 44;

  // Metadata Row: Cliente & Contacto
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, currentY, contentWidth, 16, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, currentY, contentWidth, 16, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(textLight[0], textLight[1], textLight[2]);
  doc.text('CLIENTE / PROMOTOR:', margin + 4, currentY + 5.5);
  doc.text('CORREO CONTACTO:', margin + 60, currentY + 5.5);
  doc.text('TIEMPO ESTIMADO:', margin + 120, currentY + 5.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
  doc.text(briefData.clientName || 'No especificado', margin + 4, currentY + 11.5);
  doc.text(briefData.clientEmail || 'No especificado', margin + 60, currentY + 11.5);
  doc.text(briefData.targetDeadline || 'Estándar', margin + 120, currentY + 11.5);

  currentY += 21;

  // ================= 1. INFORMACIÓN BÁSICA DE LA MARCA =================
  drawSectionTitle('1. Información Básica de la Marca', 'Identidad & Propósito');

  // Brand Name Box (Cleanly separated: Name on top line, Tagline clearly below to NEVER overlap)
  const hasTagline = Boolean(briefData.tagline?.trim());
  const nameBoxHeight = hasTagline ? 24 : 17;

  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, currentY, contentWidth, nameBoxHeight, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(purpleAccent[0], purpleAccent[1], purpleAccent[2]);
  doc.text('NOMBRE DE LA MARCA', margin + 4, currentY + 5);

  // Line 1: Brand Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
  doc.text(briefData.brandName || 'Sin Nombre Especificado', margin + 4, currentY + 12);

  // Line 2: Tagline (Underneath, never overlapping)
  if (hasTagline) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(textLight[0], textLight[1], textLight[2]);
    doc.text(`Eslogan / Tagline: "${briefData.tagline.trim()}"`, margin + 4, currentY + 19);
  }

  currentY += nameBoxHeight + 5;

  // Target Audience & optional Industry
  if (briefData.industry) {
    const halfCol = (contentWidth - 4) / 2;
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, currentY, halfCol, 16, 2, 2, 'F');
    doc.roundedRect(margin + halfCol + 4, currentY, halfCol, 16, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(textLight[0], textLight[1], textLight[2]);
    doc.text('INDUSTRIA / SECTOR:', margin + 4, currentY + 5.5);
    doc.text('PÚBLICO OBJETIVO:', margin + halfCol + 8, currentY + 5.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
    doc.text(briefData.industry, margin + 4, currentY + 11.5);

    const targetLines = doc.splitTextToSize(briefData.targetAudience || 'Público general / Consumidores afines', halfCol - 8);
    doc.text(targetLines[0] || 'No definido', margin + halfCol + 8, currentY + 11.5);
    currentY += 20;
  } else {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, currentY, contentWidth, 16, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(textLight[0], textLight[1], textLight[2]);
    doc.text('PÚBLICO OBJETIVO:', margin + 4, currentY + 5.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
    const targetLines = doc.splitTextToSize(briefData.targetAudience || 'Público general / Consumidores afines', contentWidth - 8);
    doc.text(targetLines[0] || 'No definido', margin + 4, currentY + 11.5);
    currentY += 20;
  }

  // ¿Qué hace la marca?
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
  doc.text('¿QUÉ HACE LA MARCA / PROPÓSITO DEL NEGOCIO?', margin, currentY);
  currentY += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 60, 75);

  const descText = briefData.brandDescription.trim() || 'No se suministró una descripción detallada en el cuestionario inicial.';
  const splitDescription = doc.splitTextToSize(descText, contentWidth - 4);

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  const descBoxHeight = Math.max(18, splitDescription.length * 4.8 + 6);
  doc.roundedRect(margin, currentY, contentWidth, descBoxHeight, 2, 2, 'FD');

  doc.text(splitDescription, margin + 4, currentY + 6);
  currentY += descBoxHeight + 8;

  // ================= 2. ESTRUCTURA DE MARCA SELECCIONADA =================
  drawSectionTitle('2. Estructura de Marca Seleccionada', 'Tipología Gráfica Deseada');

  const selectedOptions = LOGO_STRUCTURE_OPTIONS.filter((opt) =>
    briefData.selectedStructures.includes(opt.id)
  );

  if (selectedOptions.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(textLight[0], textLight[1], textLight[2]);
    doc.text('El cliente no seleccionó ninguna estructura específica (abierto a propuesta del diseñador).', margin, currentY);
    currentY += 8;
  } else {
    for (const opt of selectedOptions) {
      ensureSpace(44);

      const cardHeight = 38;
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(purpleAccent[0], purpleAccent[1], purpleAccent[2]);
      doc.roundedRect(margin, currentY, contentWidth, cardHeight, 2, 2, 'FD');

      // Left Column: Reference Image chosen by the user
      const imgW = 34;
      const imgH = 30;
      const imgX = margin + 4;
      const imgY = currentY + 4;

      // Frame background
      doc.setFillColor(255, 255, 255);
      doc.rect(imgX - 0.5, imgY - 0.5, imgW + 1, imgH + 1, 'F');

      // Load pre-encoded base64 JPEG structure image
      const structureImgSrc = STRUCTURE_IMAGES[opt.id] || opt.imageUrl;
      if (structureImgSrc) {
        try {
          doc.addImage(structureImgSrc, 'JPEG', imgX, imgY, imgW, imgH);
        } catch (err) {
          console.warn('Could not insert structure image into PDF:', err);
        }
      }

      // Right Column: Details & Texts
      const textX = margin + imgW + 8;
      const textW = contentWidth - imgW - 12;

      // Tag badge
      doc.setFillColor(purpleAccent[0], purpleAccent[1], purpleAccent[2]);
      doc.roundedRect(textX, currentY + 4, 48, 5, 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(255, 255, 255);
      doc.text(opt.tag, textX + 3, currentY + 7.5);

      // Title & Subtitle
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
      doc.text(opt.title, textX + 52, currentY + 8);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(textLight[0], textLight[1], textLight[2]);
      doc.text(`— ${opt.subtitle}`, textX + 52 + doc.getTextWidth(opt.title) + 3, currentY + 8);

      // Description
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(60, 70, 85);
      const descLines = doc.splitTextToSize(opt.description, textW);
      doc.text(descLines, textX, currentY + 14);

      // Famous examples line
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(purpleAccent[0], purpleAccent[1], purpleAccent[2]);
      doc.text('Referencias icónicas:', textX, currentY + 31);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
      doc.text(opt.famousExamples.join(' • '), textX + 27, currentY + 31);

      currentY += cardHeight + 5;
    }
  }

  // ================= PAGE 2: IDENTIDAD, COLORES & DETALLES =================
  ensureSpace(60);
  drawSectionTitle('3. Identidad Visual, Personalidad & Colores', 'Dirección Estética');

  // Preferred Colors swatches
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
  doc.text('PALETA DE COLORES PREFERIDOS / DE REFERENCIA:', margin, currentY);
  currentY += 5;

  if (briefData.preferredColors && briefData.preferredColors.length > 0) {
    let swatchX = margin;
    briefData.preferredColors.forEach((hex) => {
      const cleanHex = hex.replace('#', '');
      const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
      const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
      const b = parseInt(cleanHex.substring(4, 6), 16) || 0;

      doc.setFillColor(r, g, b);
      doc.setDrawColor(200, 200, 200);
      doc.roundedRect(swatchX, currentY, 26, 12, 1.5, 1.5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
      doc.text(hex.toUpperCase(), swatchX + 13, currentY + 16, { align: 'center' });

      swatchX += 30;
    });
    currentY += 20;
  } else {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(textLight[0], textLight[1], textLight[2]);
    doc.text('Sin preferencias de color estrictas (El diseñador propondrá la paleta).', margin, currentY);
    currentY += 8;
  }

  // Avoided Colors & Color Notes
  if (briefData.avoidColors && briefData.avoidColors.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(220, 38, 38);
    doc.text('COLORES QUE PREFIERE EVITAR: ', margin, currentY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(70, 80, 95);
    doc.text(briefData.avoidColors.join(', '), margin + 50, currentY);
    currentY += 6;
  }

  if (briefData.colorNotes) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textLight[0], textLight[1], textLight[2]);
    doc.text(`Nota sobre color: ${briefData.colorNotes}`, margin, currentY);
    currentY += 6;
  }

  currentY += 4;

  // Personality meters
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
  doc.text('ATRIBUTOS DE PERSONALIDAD DE LA MARCA:', margin, currentY);
  currentY += 5;

  const meters = [
    { labelLeft: 'Clásico & Tradicional', labelRight: 'Moderno & Futurista', value: briefData.brandPersonality.modernity },
    { labelLeft: 'Minimalista & Esencial', labelRight: 'Detallado & Artístico', value: briefData.brandPersonality.simplicity },
    { labelLeft: 'Sobrio & Corporativo', labelRight: 'Audaz & Juguetón', value: briefData.brandPersonality.vibe }
  ];

  meters.forEach((meter) => {
    ensureSpace(12);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(textLight[0], textLight[1], textLight[2]);
    doc.text(meter.labelLeft, margin, currentY + 3);
    doc.text(meter.labelRight, pageWidth - margin, currentY + 3, { align: 'right' });

    // Track
    const trackX = margin + 45;
    const trackWidth = contentWidth - 90;
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(trackX, currentY, trackWidth, 3.5, 1.5, 1.5, 'F');

    // Fill
    const fillWidth = (meter.value / 100) * trackWidth;
    doc.setFillColor(purpleAccent[0], purpleAccent[1], purpleAccent[2]);
    doc.roundedRect(trackX, currentY, fillWidth, 3.5, 1.5, 1.5, 'F');

    currentY += 8;
  });

  currentY += 6;

  // 4. INFORMACIÓN ADICIONAL
  if (briefData.additionalNotes) {
    drawSectionTitle('4. Notas Adicionales & Requerimientos', 'Comentarios del Cliente');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(50, 60, 75);

    const notesSplit = doc.splitTextToSize(briefData.additionalNotes.trim(), contentWidth - 6);
    const boxHeight = Math.max(16, notesSplit.length * 4.6 + 6);

    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, currentY, contentWidth, boxHeight, 2, 2, 'F');
    doc.text(notesSplit, margin + 4, currentY + 5.5);

    currentY += boxHeight + 8;
  }

  // ================= 5. REFERENCIAS VISUALES ADJUNTAS (PASO 3) =================
  onProgress?.('Renderizando galería de referencias visuales del Paso 3...');

  // Dedicated section for visual references chosen and attached by the user in Step 3
  doc.addPage();
  currentY = 22;
  drawPageHeader(false);

  drawSectionTitle(
    '5. Galería de Referencias Visuales Adjuntas (Paso 3)',
    `${processedReferences.length} imagen(es) aportada(s) por el cliente`
  );

  if (processedReferences.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(textLight[0], textLight[1], textLight[2]);
    doc.text('No se adjuntaron archivos o imágenes de referencia en el Paso 3 del formulario.', margin, currentY);
    doc.text('El diseñador realizará la búsqueda de referentes y moodboard inicial independiente.', margin, currentY + 6);
    currentY += 16;
  } else {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(70, 80, 95);
    doc.text(
      'A continuación se detallan e ilustran todas las imágenes de referencia adjuntadas por el cliente:',
      margin,
      currentY
    );
    currentY += 7;

    for (let i = 0; i < processedReferences.length; i++) {
      const ref = processedReferences[i];
      if (!ref.dataUrl) continue;

      const aspect = ref.aspect || 1.33;

      // Generous, high-resolution rendering dimensions
      let imgW = 135;
      let imgH = imgW / aspect;

      if (imgH > 85) {
        imgH = 85;
        imgW = imgH * aspect;
      }
      if (imgW > contentWidth - 12) {
        imgW = contentWidth - 12;
        imgH = imgW / aspect;
      }

      const itemCardHeight = imgH + (ref.notes ? 20 : 14);

      // Check if we need a new page
      ensureSpace(itemCardHeight + 8);

      // Card container
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, currentY, contentWidth, itemCardHeight, 2, 2, 'FD');

      // Top info bar
      doc.setFillColor(purpleAccent[0], purpleAccent[1], purpleAccent[2]);
      doc.roundedRect(margin + 3, currentY + 3, 24, 4.5, 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(255, 255, 255);
      doc.text(`REF #${i + 1}`, margin + 5, currentY + 6.2);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
      const safeName = ref.name || `Imagen Referencial ${i + 1}`;
      doc.text(safeName.substring(0, 48), margin + 30, currentY + 6.5);

      const sizeKb = Math.round((ref.size || 102400) / 1024);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(textLight[0], textLight[1], textLight[2]);
      doc.text(`${sizeKb} KB`, pageWidth - margin - 5, currentY + 6.5, { align: 'right' });

      // Embed the image centered
      const imgX = margin + (contentWidth - imgW) / 2;
      const imgY = currentY + 9;

      // White background frame behind image
      doc.setFillColor(255, 255, 255);
      doc.rect(imgX - 0.5, imgY - 0.5, imgW + 1, imgH + 1, 'F');

      // SYNCHRONOUS AND INSTANT EMBEDDING INTO jsPDF (Always 'JPEG')
      try {
        doc.addImage(ref.dataUrl, 'JPEG', imgX, imgY, imgW, imgH);
      } catch (err) {
        console.error('CRITICAL: Error embedding reference image into PDF:', err);
      }

      // If user left notes on this reference image
      if (ref.notes) {
        const noteY = currentY + imgH + 12;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(purpleAccent[0], purpleAccent[1], purpleAccent[2]);
        doc.text('Comentario del cliente: ', margin + 4, noteY);

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7.5);
        doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
        const noteLines = doc.splitTextToSize(`"${ref.notes}"`, contentWidth - 45);
        doc.text(noteLines, margin + 40, noteY);
      }

      currentY += itemCardHeight + 6;
    }
  }

  // Draw footers on all pages
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    drawPageFooter(p);
  }

  onProgress?.('¡Documento PDF completado exitosamente!');
  return doc;
}
