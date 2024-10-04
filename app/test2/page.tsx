"use client"
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

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
            setError('Error generating image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>Image Generator</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt"
                    style={{ padding: '0.5rem', width: '300px' }}
                />
                <button type="submit" style={{ padding: '0.5rem', marginLeft: '0.5rem' }}>
                    Generate Image
                </button>
            </form>

            {loading && <p>Generating image...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {imageUrl && (
                <div>
                    <h3>Generated Image:</h3>
                    <Image src={imageUrl} alt="Generated" width={512} height={512} />
                </div>
            )}
        </div>
    );
}
