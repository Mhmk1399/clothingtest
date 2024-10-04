"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
interface BubbleData {
    id: string;
    image: string;
  }
const Bubbles = () => {
    const [bubblesInPlace, setBubblesInPlace] = useState(false);
    const [bubbleData, setBubbleData] = useState<[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setBubblesInPlace(true);
        }, 0); // 1.5 seconds delay for the bubbles to complete the bounce animation
        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        const fetchBubbleData = async () => {
            try {
                const response = await axios.get('/api/trending'); // Adjust the endpoint as needed
                setBubbleData(response.data);
              
                
                
            } catch (error) {
                console.error('Error fetching bubble data:', error);
            }
        };

        fetchBubbleData();

        const timer = setTimeout(() => {
            setBubblesInPlace(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col gap-8 justify-center items-center h-auto mt-8">
            <p className="flex-col text-sm font-semibold text-center rounded-lg px-4 py-2 bg-transparent text-dark border-b-2 mb-10  ">
                پیشناهادات جذاب امروز
            </p>
            
            <div className="relative flex justify-center items-center w-fit h-full px-4 gap-4">

                {/* Bubble Container */}
                <div
                    className={`flex space-x-4 transition-transform duration-1500 ${bubblesInPlace ? "transform translate-x-0" : "transform -translate-x-full"
                        }`}
                >
                    {/* Bubbles */}
                    {bubbleData.map((bubble: BubbleData, index) => (
                        <div
                            key={bubble.id}
                            className={`min-w-[100px] min-h-[50px] rounded-full bounce  animate-bounce transition-all duration-1000`}
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <Image
                                width={100}
                                height={200}
                                src={bubble.image}
                                alt={`Bubble ${index + 1}`}
                                className="mx-auto w-auto h-auto rounded-xl"
                            />
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default Bubbles;
