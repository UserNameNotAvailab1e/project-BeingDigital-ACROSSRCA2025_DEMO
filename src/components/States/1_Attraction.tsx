import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';

export const Attraction: React.FC = () => {
    const setState = useAppStore((state) => state.setState);
    const [isScanning, setIsScanning] = useState(false);
    const [scanStatus, setScanStatus] = useState("SYSTEM READY // WAITING FOR INPUT");
    const [invert, setInvert] = useState(false);

    const handleScan = () => {
        if (isScanning) return;
        setIsScanning(true);
        setScanStatus("READING_BIO...");

        // Sequence
        setTimeout(() => setScanStatus("ANALYZING_RETINA..."), 1000);
        setTimeout(() => setScanStatus("CHECKING_ASSETS..."), 2000);
        setTimeout(() => setScanStatus("NET_WORTH: ∞"), 3000);

        setTimeout(() => {
            setScanStatus("ACCESS GRANTED: GUEST_CLASS_A");
            setInvert(true);
            // Flash effect duration
            setTimeout(() => {
                setInvert(false);
                setState('CONFIG');
            }, 2000);
        }, 4000);
    };

    return (
        <div
            className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden transition-colors duration-100 ${invert ? 'bg-white text-black invert' : ''}`}
        >
            {/* Background Pulse (Clickable Trigger) */}
            {!isScanning && (
                <motion.div
                    onClick={handleScan}
                    className="absolute w-64 h-64 rounded-full border border-nostalgia-black/20 cursor-pointer z-50 hover:bg-nostalgia-black/5 transition-colors"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.5, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    whileHover={{ scale: 1.1, opacity: 0.8 }}
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mono text-[10px] opacity-0 hover:opacity-100 transition-opacity">INITIALIZE_SCAN</span>
                    </div>
                </motion.div>
            )}

            {/* Laser Scan Line */}
            <AnimatePresence>
                {isScanning && (
                    <motion.div
                        className="absolute left-0 w-full h-[2px] bg-red-500 z-50 shadow-[0_0_10px_rgba(255,0,0,0.8)]"
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 3, ease: "linear" }}
                    />
                )}
            </AnimatePresence>

            <div className="z-10 text-center space-y-8">
                <motion.h1
                    className="font-serif text-4xl md:text-6xl tracking-widest"
                    animate={isScanning ? { opacity: [1, 0.5, 1] } : {}}
                    transition={{ duration: 0.2, repeat: Infinity }}
                >
                    NOSTALGIA BROKER
                </motion.h1>

                <motion.div
                    className="font-mono text-xs md:text-sm tracking-[0.2em] text-nostalgia-black"
                >
                    {scanStatus}
                </motion.div>
            </div>

            {/* Success Flash Overlay (Backup if CSS invert fails/is subtle) */}
            {invert && (
                <div className="absolute inset-0 bg-white z-[60] mix-blend-difference" />
            )}
        </div>
    );
};
