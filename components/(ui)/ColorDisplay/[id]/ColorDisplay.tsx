// components/SizeDisplay/SizeDisplay.tsx
"use client";

import { useEffect, useState } from 'react';
import styles from './ColorDisplay.module.css';

interface Size {
    _id: string;
    name: string;
}

interface SizeDisplayProps {
    productId: string;
}

const SizeDisplay = ({ productId }: SizeDisplayProps) => {
    const [sizes, setSizes] = useState<Size[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSizes = async () => {
            try {
                const res = await fetch(`/api/products/${productId}`);
                const productData = await res.json();

                if (res.ok) {
                    setSizes(productData.sizes || []);
                } else {
                    setError('Failed to fetch sizes');
                }
            } catch (error) {
                console.error('Error fetching sizes:', error);
                setError('Error fetching sizes');
            }
        };

        fetchSizes();
    }, [productId]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.container}>
            {sizes.map((size: Size) => (
                <div className={styles.sizeCircle} key={size._id}>
                    <span className={styles.sizeTitle}>{size.name}</span>
                </div>
            ))}
        </div>
    );
};

export default SizeDisplay;
