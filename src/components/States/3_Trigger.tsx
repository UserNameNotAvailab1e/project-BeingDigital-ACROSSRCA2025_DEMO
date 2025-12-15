import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { GlitchText } from '../UI/GlitchText';

export const Trigger: React.FC = () => {
    const setState = useAppStore((state) => state.setState);
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("FORCING_NEURAL_PATHWAYS...");
    const [flash, setFlash] = useState(false);

    useEffect(() => {
        // Non-linear progress simulation
        const progressTimeline = async () => {
            // Fast start
            for (let i = 0; i < 30; i++) {
                setProgress(i);
                await new Promise(r => setTimeout(r, 20));
            }

            // Stuck at 30%
            await new Promise(r => setTimeout(r, 1000));
            setStatusText("HALLUCINATING_REALITY...");

            // Jump to 80%
            setProgress(80);
            await new Promise(r => setTimeout(r, 800));
            setStatusText("RENDERING_PAIN...");

            // Finish
            setProgress(100);
            await new Promise(r => setTimeout(r, 500));
            setState('EXPERIENCE');
        };

        progressTimeline();

        // Subliminal Flashes
        const flashInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                setFlash(true);
                setTimeout(() => setFlash(false), 50); // 50ms flash
            }
        }, 200);

        return () => clearInterval(flashInterval);
    }, [setState]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden relative">
            {/* Background Jitter Layer */}
            <motion.div
                className="absolute inset-0 bg-nostalgia-white"
                animate={{
                    x: [-5, 5, -2, 2, 0],
                    backgroundColor: ["#FFFFFF", "#F0F0F0", "#FFFFFF"]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 0.2,
                    repeatType: "mirror"
                }}
            />

            {/* Subliminal Flash Image (Abstract placeholder) */}
            {flash && (
                <div className="absolute inset-0 z-50 bg-black flex items-center justify-center">
                    <div className="w-64 h-64 bg-white/20 rotate-45" /> {/* Abstract shape flash */}
                </div>
            )}

            <div className="z-10 text-center w-full max-w-md px-8">
                {/* Main Status */}
                <motion.h1
                    className="font-mono text-2xl md:text-4xl mb-8"
                    animate={{ skewX: [0, -10, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                >
                    <GlitchText text={statusText} />
                </motion.h1>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-nostalgia-black/10 mt-8 relative overflow-hidden">
                    <motion.div
                        className="h-full bg-nostalgia-black"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "tween", ease: "linear", duration: 0.2 }} // Smooth local updates manually controlled
                    />
                </div>
                <p className="font-mono text-xs mt-2 text-right">{progress}%</p>
            </div>

            {/* Decorative Glitch Bars */}
            <motion.div
                className="absolute top-1/4 w-full h-[1px] bg-nostalgia-black"
                animate={{
                    opacity: [0, 1, 0],
                    y: [0, 100, 0]
                }}
                transition={{ repeat: Infinity, duration: 0.3 }}
            />
            <motion.div
                className="absolute bottom-1/4 w-full h-[2px] bg-nostalgia-black"
                animate={{
                    opacity: [0, 1, 0],
                    y: [0, -50, 0]
                }}
                transition={{ repeat: Infinity, duration: 0.7 }}
            />
        </div>
    );
};
