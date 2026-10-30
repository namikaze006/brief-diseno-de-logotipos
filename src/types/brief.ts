import { STRUCTURE_IMAGES } from '../assets/structureImages';

export interface ReferenceImage {
  id: string;
  name: string;
  size: number;
  dataUrl: string; // Base64
  previewUrl: string;
  notes?: string;
  uploadedAt: string;
}

export type LogoStructureType = 'logotipo' | 'imagotipo' | 'isologo' | 'mascot';

export interface LogoStructureOption {
  id: LogoStructureType;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  imageUrl: string;
  fallbackIcon: string;
  famousExamples: string[];
}

export interface BrandBriefData {
  // Campo 1: Info básica
  brandName: string;
  brandDescription: string;
  tagline: string;
  industry: string;
  targetAudience: string;

  // Campo 2: Estructura de marca
  selectedStructures: LogoStructureType[];
  allowMultipleStructures: boolean;

  // Campo 3: Referencias visuales
  references: ReferenceImage[];

  // Campo 4: Información adicional
  preferredColors: string[];
  avoidColors: string[];
  colorNotes: string;
  brandPersonality: {
    modernity: number; // 0 = Clásico, 100 = Futurista/Moderno
    simplicity: number; // 0 = Minimalista, 100 = Detallado/Artístico
    vibe: number; // 0 = Sobrio/Elegante, 100 = Audaz/Divertido
  };
  additionalNotes: string;
  clientName: string;
  clientEmail: string;
  projectBudget: string;
  targetDeadline: string;
}

export const LOGO_STRUCTURE_OPTIONS: LogoStructureOption[] = [
  {
    id: 'logotipo',
    title: 'Logotipo',
    subtitle: 'Wordmark / Tipográfico puro',
    tag: 'SOLO TEXTO',
    description: 'La marca se compone exclusivamente por su tipografía o lettering trabajado especialmente sin icono adicional. Gran legibilidad e impacto directo.',
    imageUrl: STRUCTURE_IMAGES.logotipo || 'https://i.pinimg.com/1200x/68/07/16/680716a89e4cac964c70229ca16d4982.jpg',
    fallbackIcon: 'Type',
    famousExamples: ['Google', 'Coca-Cola', 'Sony', 'Canon', 'Disney']
  },
  {
    id: 'imagotipo',
    title: 'Imagotipo',
    subtitle: 'Combinación armónica e independiente',
    tag: 'TEXTO + SÍMBOLO SEPARADOS',
    description: 'Un símbolo gráfico o isotipo convive de forma equilibrada junto al nombre escrito. Ambos elementos pueden funcionar juntos o por separado con total reconocimiento.',
    imageUrl: STRUCTURE_IMAGES.imagotipo || 'https://i.pinimg.com/1200x/5a/01/80/5a0180169cf5c10d6ae9a4f883938f81.jpg',
    fallbackIcon: 'Shapes',
    famousExamples: ['Nike', 'Apple', 'Adidas', 'Spotify', 'Twitter / X']
  },
  {
    id: 'isologo',
    title: 'Isologo',
    subtitle: 'Emblema unitario e inseparable',
    tag: 'SÍMBOLO + TEXTO FUSIONADOS',
    description: 'El texto y el elemento gráfico o escudo forman una sola pieza indivisible. Si se separan, la identidad pierde su integridad original.',
    imageUrl: STRUCTURE_IMAGES.isologo || 'https://i.pinimg.com/1200x/eb/19/c8/eb19c8f21313ca59f88c95952ce04594.jpg',
    fallbackIcon: 'Shield',
    famousExamples: ['BMW', 'Starbucks', 'Harley Davidson', 'Burger King', 'Ford']
  },
  {
    id: 'mascot',
    title: 'Mascot Logo',
    subtitle: 'Personaje ilustrado + Tipografía',
    tag: 'DISEÑO DE MASCOTA + TEXTO',
    description: 'Diseño centrado en un personaje carismático, caricatura o figura ilustrada que humaniza la marca, genera alta recordación y empatía inmediata.',
    imageUrl: STRUCTURE_IMAGES.mascot || 'https://i.pinimg.com/1200x/eb/fd/cc/ebfdcc5fe5a813c06d87681eb4a0973d.jpg',
    fallbackIcon: 'Sparkles',
    famousExamples: ['KFC (Coronel Sanders)', 'Michelin (Bibendum)', 'Pringles', 'Red Bull', 'Duolingo']
  }
];

export const INITIAL_BRIEF_DATA: BrandBriefData = {
  brandName: '',
  brandDescription: '',
  tagline: '',
  industry: '',
  targetAudience: '',
  selectedStructures: [],
  allowMultipleStructures: true,
  references: [],
  preferredColors: ['#a855f7', '#06b6d4', '#ec4899'],
  avoidColors: [],
  colorNotes: '',
  brandPersonality: {
    modernity: 80,
    simplicity: 25,
    vibe: 70
  },
  additionalNotes: '',
  clientName: '',
  clientEmail: '',
  projectBudget: 'Medio / Profesional',
  targetDeadline: '2-4 semanas'
};
