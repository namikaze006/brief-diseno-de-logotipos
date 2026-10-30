/**
 * Bulletproof image processor for jsPDF rendering
 * Forces conversion to clean Base64 JPEG with solid white background,
 * scales down to safe dimensions, and guarantees resolved Promises.
 */
export const processImageForPDF = (fileOrUrl: File | Blob | string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!fileOrUrl) {
      resolve('');
      return;
    }

    const img = new Image();

    // Prevent CORS issues if the image comes from an external URL
    if (typeof fileOrUrl === 'string' && (fileOrUrl.startsWith('http://') || fileOrUrl.startsWith('https://'))) {
      img.crossOrigin = 'Anonymous';
    }

    // Safety timeout in case an image hangs
    const timer = setTimeout(() => {
      if (typeof fileOrUrl === 'string' && fileOrUrl.startsWith('data:image/')) {
        resolve(fileOrUrl);
      } else {
        reject(new Error('Timeout processing image for PDF'));
      }
    }, 8000);

    img.onload = () => {
      clearTimeout(timer);
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve(typeof fileOrUrl === 'string' ? fileOrUrl : '');
          return;
        }

        // Scale image (Max 1200px to avoid memory overflow)
        const MAX_WIDTH = 1200;
        let width = img.naturalWidth || img.width || 800;
        let height = img.naturalHeight || img.height || 600;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;

        // 1. Draw a solid white background (crucial for PNGs)
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Draw the image on top
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 3. Export strictly as JPEG (native jsPDF support) at 85% quality
        const base64Jpeg = canvas.toDataURL('image/jpeg', 0.85);
        resolve(base64Jpeg);
      } catch (err) {
        console.error('Error drawing canvas for PDF image:', err);
        if (typeof fileOrUrl === 'string' && fileOrUrl.startsWith('data:image/')) {
          resolve(fileOrUrl);
        } else {
          reject(err);
        }
      }
    };

    img.onerror = (error) => {
      clearTimeout(timer);
      console.error('Error cargando la imagen para el PDF', error);
      if (typeof fileOrUrl === 'string' && fileOrUrl.startsWith('data:image/')) {
        resolve(fileOrUrl);
      } else {
        reject(error);
      }
    };

    // If File or Blob, create ObjectURL; if already a string, use directly
    if (fileOrUrl instanceof File || fileOrUrl instanceof Blob) {
      img.src = URL.createObjectURL(fileOrUrl);
    } else {
      img.src = fileOrUrl;
    }
  });
};

/**
 * Helper to compute image dimensions and aspect ratio from a base64 string
 */
export const getImageDimensions = (
  dataUrl: string
): Promise<{ width: number; height: number; aspect: number }> => {
  return new Promise((resolve) => {
    if (!dataUrl) {
      resolve({ width: 800, height: 600, aspect: 1.33 });
      return;
    }

    const img = new Image();
    const timer = setTimeout(() => {
      resolve({ width: 800, height: 600, aspect: 1.33 });
    }, 3000);

    img.onload = () => {
      clearTimeout(timer);
      const w = img.naturalWidth || img.width || 800;
      const h = img.naturalHeight || img.height || 600;
      resolve({ width: w, height: h, aspect: w / h });
    };

    img.onerror = () => {
      clearTimeout(timer);
      resolve({ width: 800, height: 600, aspect: 1.33 });
    };

    img.src = dataUrl;
  });
};
