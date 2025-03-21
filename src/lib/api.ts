const API_BASE_URL = 'http://127.0.0.1:5000/api';

export async function extractKeypoints(file: File): Promise<{ text: string, keypoints: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const requestOptions = {
    method: 'POST',
    body: formData,
    redirect: 'follow' as RequestRedirect,
  };

  const response = await fetch(`${API_BASE_URL}/keypoints-extractor`, requestOptions);
  if (!response.ok) {
    throw new Error('Failed to process file');
  }

  const result = await response.json();
  return {
    text: result.text,
    keypoints: result.keypoints,
  };
}
