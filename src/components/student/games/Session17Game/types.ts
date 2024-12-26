export type GameAnswer = {
  grupos: string;
  elementosPorGrupo: string;
  multiplicacion1: string;
  multiplicacion2: string;
  suma1: string;
  suma2: string;
  suma3: string;
  suma4?: string;
  suma5?: string;
  suma6?: string;
  resultado: string;
  total: string;
}

export type Activity = {
  id: string;
  titulo: string;
  imagen: string;
  respuestas: GameAnswer;
}

export type NumberInputProps = {
  id: keyof GameAnswer;
  value: string;
  onChange: (id: keyof GameAnswer, value: string) => void;
  isCorrect: boolean | null;
}