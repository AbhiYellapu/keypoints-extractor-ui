import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { FileUpload } from './components/FileUpload';
import { TranscriptionViewer } from './components/TranscriptionViewer';
import { Transcription } from './types';
import { extractKeypoints } from './lib/api';
import { Headphones } from 'lucide-react';

export default function App() {
  const [currentTranscription, setCurrentTranscription] = useState<Transcription | null>(null);

  const handleFileSelect = async (file: File) => {
    try {
      // Create initial transcription state
      setCurrentTranscription({
        id: '',
        fileName: file.name,
        status: 'processing',
        createdAt: new Date().toISOString(),
      });

      // Extract keypoints
      const { text, keypoints } = await toast.promise(
        extractKeypoints(file),
        {
          loading: 'Processing file...',
          success: 'File processed successfully',
          error: 'Failed to process file',
        }
      );

      setCurrentTranscription({
        id: '',
        fileName: file.name,
        status: 'completed',
        text,
        summary: keypoints,
        language: 'en',
        duration: 120, // Assuming duration is 120 seconds for now
        createdAt: new Date().toISOString(),
      });

      toast.success('File processed successfully!');
    } catch (error) {
      setCurrentTranscription(prev => 
        prev ? { ...prev, status: 'failed' } : null
      );
      toast.error('Failed to process file');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <Headphones className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">AI Transcription</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <FileUpload 
            onFileSelect={handleFileSelect}
            isProcessing={currentTranscription?.status === 'processing'}
          />
          
          {currentTranscription && (
            <TranscriptionViewer transcription={currentTranscription} />
          )}
        </div>
      </main>
    </div>
  );
}