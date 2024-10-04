"use client"

import Image from 'next/image';
import { ReactElement, useState } from 'react';

export default function ImageGenerator() {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        try {
          const response = await fetch('/api/generate-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          setImageUrl(data.imageUrl);
        } catch (error) {
          console.error('Error during image generation request:', error);
        }
      };
      

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
                    placeholder="Describe the outfit"
                />
                <button type="submit">Generate Image</button>
            </form>

            {imageUrl && (
                <div>
                    <h3>Generated Image:</h3>
                    <Image src={imageUrl} alt="Generated" width={200} height={200} />
                </div>
            )}
        </div>
    );
}