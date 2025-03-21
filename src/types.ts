export interface Transcription {
  id: string;
  fileName: string;
  status: 'processing' | 'completed' | 'failed';
  text?: string;
  summary?: string;
  language?: string;
  duration?: number;
  createdAt: string;
}

export interface TranscriptionResponse {
  id: string;
  status: string;
  text: string;
  language: string;
  duration: number;
}

export interface SummaryResponse {
  summary: string;
}