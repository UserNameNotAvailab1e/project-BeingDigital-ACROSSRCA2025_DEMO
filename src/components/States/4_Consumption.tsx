import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';

export const Consumption: React.FC = () => {
    const setState = useAppStore((state) => state.setState);
    const [integrity, setIntegrity] = useState(100);

    // Simulate Soul Integrity Decay
    useEffect(() => {
        const interval = setInterval(() => {
            setIntegrity(prev => Math.max(0, prev - Math.random() * 2));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // Auto transition to Receipt
    useEffect(() => {
        const timer = setTimeout(() => {
            setState('RECEIPT');
        }, 5000); // 5 seconds of experience
        return () => clearTimeout(timer);
    }, [setState]);

    return (
        <div className="w-full h-full relative overflow-hidden bg-black">
            {/* Background Video Placeholder - Simulated Driving via CSS Animation */}
            <div className="absolute inset-0 opacity-50">
                {/* Moving Horizon Grid */}
                <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:100%_40px] [perspective:500px] [transform-style:preserve-3d]">
                    <motion.div
                        className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:100px_100%]"
                        animate={{ transform: "translateZ(100px)" }} // Simple perspective trick requires more setup, doing simple moving lines instead
                    />
                </div>

                {/* Simple stripes passing by to simulate speed */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white/10"
                        initial={{
                            top: "50%",
                            left: "50%",
                            width: 2,
                            height: 2
                        }}
                        animate={{
                            top: ["50%", `${Math.random() * 100}%`],
                            left: ["50%", `${Math.random() * 100}%`],
                            width: [2, 100],
                            height: [2, 100],
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>

            {/* Video Overlay / HUD */}
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between z-10 pointer-events-none">
                {/* Top Bar */}
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <span className="font-mono text-xs text-white tracking-widest bg-red-600 px-2 py-1 inline-block mb-2 w-fit">LIVE SIMULATION</span>
                        <span className="font-mono text-xs text-white/70">REC // 00:04:21:19</span>
                    </div>
                    <div className="text-right">
                        <span className="font-mono text-xs text-white tracking-widest border border-white/30 px-2 py-1">NEURAL LINK: STABLE</span>
                    </div>
                </div>

                {/* Center Reticle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                </div>

                {/* Bottom Bar */}
                <div className="flex justify-between items-end">
                    <div>
                        <p className="font-mono text-xs text-white/50 tracking-widest mb-1">SOUL INTEGRITY</p>
                        <p className="font-mono text-4xl text-white">{Math.floor(integrity)}%</p>
                        {/* Bar */}
                        <div className="w-64 h-1 bg-white/20 mt-2">
                            <motion.div
                                className="h-full bg-white"
                                style={{ width: `${integrity}%` }}
                            />
                        </div>
                    </div>

                    <div className="text-right font-mono text-xs text-white/50">
                        <p>BUFFERING MEMORY FRAGMENTS...</p>
                        <p>lat: 34.0522 N / lon: 118.2437 W</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
