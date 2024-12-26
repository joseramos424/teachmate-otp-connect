export interface Exercise {
  id: number;
  question: string;
  imageUrls: string[];
  correctAnswer: "equal" | "notEqual";
}

export const exercises: Exercise[] = [
  {
    id: 1,
    question: "¿Son grupos iguales?",
    imageUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/florero-Obtu8nCtW7ULedcJViEpfm3S82ymnl.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/florero-Obtu8nCtW7ULedcJViEpfm3S82ymnl.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/florero-Obtu8nCtW7ULedcJViEpfm3S82ymnl.png"
    ],
    correctAnswer: "equal"
  },
  {
    id: 2,
    question: "¿Son grupos iguales?",
    imageUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/plato_iguales-t6fQi0U8miV5Xe3JVJPiTBHMj7CEEi.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/plato_iguales-t6fQi0U8miV5Xe3JVJPiTBHMj7CEEi.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/plato_manzanas_melocoton-ujFMpNl8VCCT6nWHiQI6IbzCQCkNDw.png"
    ],
    correctAnswer: "notEqual"
  },
  {
    id: 3,
    question: "¿Son grupos iguales?",
    imageUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tres_cerezas-wAaMHtLzSMWYnmbL8nxD3B0cfTkC6G.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tres_cerezas-wAaMHtLzSMWYnmbL8nxD3B0cfTkC6G.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tres_cerezas-wAaMHtLzSMWYnmbL8nxD3B0cfTkC6G.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dos_cerezas-lUcI8ULMS7Db4NJoVPSbMVfb8s1mT2.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tres_cerezas-wAaMHtLzSMWYnmbL8nxD3B0cfTkC6G.png"
    ],
    correctAnswer: "notEqual"
  },
  {
    id: 4,
    question: "¿Son grupos iguales?",
    imageUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/manzana_amarilla_abajo-5UBRZOPsQdD2s2ktL3em2icDRYdq4S.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/manzana_amarilla_abajo-5UBRZOPsQdD2s2ktL3em2icDRYdq4S.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/manzana_roja_abajo-ccVY0zvSA714ZpdAURQmlpVpCP3SCO.png"
    ],
    correctAnswer: "equal"
  },
  {
    id: 5,
    question: "¿Son grupos iguales?",
    imageUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/huevos_columnas-CTYebeawIBCS3KKT0tJZPRumrh5a5w.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/huevos_columnas-CTYebeawIBCS3KKT0tJZPRumrh5a5w.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/huevos_columnas-CTYebeawIBCS3KKT0tJZPRumrh5a5w.png"
    ],
    correctAnswer: "equal"
  },
  {
    id: 6,
    question: "¿Son grupos iguales?",
    imageUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_uvas-Qz2Q7gi8NTvqXWjEwdlwO1sfOWIAH3.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3_uvas-GvdyWSCSGBFB2SAhdVRmGhT5d6iVuT.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_uvas-Qz2Q7gi8NTvqXWjEwdlwO1sfOWIAH3.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_uvas-Qz2Q7gi8NTvqXWjEwdlwO1sfOWIAH3.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_uvas-Qz2Q7gi8NTvqXWjEwdlwO1sfOWIAH3.png"
    ],
    correctAnswer: "notEqual"
  },
  {
    id: 7,
    question: "¿Son grupos iguales?",
    imageUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_sacapuntas-ySUtg5SuuwF7NcvODEgsg55McGICtx.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3_sacapuntas-kvVc9BzH5xsO7gTe7mvPhIheKvP1yy.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_sacapuntas-ySUtg5SuuwF7NcvODEgsg55McGICtx.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_sacapuntas-ySUtg5SuuwF7NcvODEgsg55McGICtx.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_sacapuntas-ySUtg5SuuwF7NcvODEgsg55McGICtx.png"
    ],
    correctAnswer: "notEqual"
  }
];
