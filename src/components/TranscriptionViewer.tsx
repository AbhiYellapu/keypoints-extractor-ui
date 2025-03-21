import React from 'react';
import { Transcription } from '../types';
import { Clock, Globe, FileText, BookOpen } from 'lucide-react';

interface TranscriptionViewerProps {
  transcription: Transcription;
}

export function TranscriptionViewer({ transcription }: TranscriptionViewerProps) {
  if (transcription.status === 'processing') {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{transcription.fileName}</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          {transcription.language && (
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-1" />
              <span>{transcription.language}</span>
            </div>
          )}
          {transcription.duration && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{Math.round(transcription.duration / 60)} mins</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center text-gray-700 mb-2">
            <FileText className="w-5 h-5 mr-2" />
            <h4 className="font-medium">Transcription</h4>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="whitespace-pre-wrap">{transcription.text}</p>
          </div>
        </div>

        {transcription.summary && (
          <div>
            <div className="flex items-center text-gray-700 mb-2">
              <BookOpen className="w-5 h-5 mr-2" />
              <h4 className="font-medium">Key Points</h4>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="whitespace-pre-wrap">{transcription.summary}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}