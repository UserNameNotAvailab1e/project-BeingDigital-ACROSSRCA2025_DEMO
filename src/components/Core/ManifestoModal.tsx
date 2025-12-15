import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

export const ManifestoModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 left-4 z-50 p-2 text-nostalgia-black/40 hover:text-nostalgia-black transition-colors"
                title="SYSTEM PROTOCOL"
            >
                <Info size={16} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-black text-white p-8 md:p-12 max-w-lg mx-4 border border-white/20 shadow-2xl relative"
                        >
                            {/* Decorative header */}
                            <div className="flex justify-between items-center mb-8 border-b border-white/20 pb-4">
                                <h2 className="font-mono text-xs tracking-widest text-white/50">SYSTEM_PROTOCOL_V.99</h2>
                                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">CLOSE [X]</button>
                            </div>

                            <div className="space-y-6 font-serif">
                                <p className="text-2xl leading-tight">
                                    The automobile is dead.
                                </p>
                                <p className="text-lg opacity-80">
                                    We simulate the ghost in the machine. A high-frequency trading terminal for the sensation of combustion, danger, and mechanical resistance.
                                </p>
                                <p className="text-lg opacity-80">
                                    We re-forge the soul through Artificial Intelligence.
                                </p>
                            </div>

                            <div className="mt-12 pt-4 border-t border-white/10 font-mono text-[10px] text-white/40 flex justify-between">
                                <span>LEGAL: WAIVER_SIGNED</span>
                                <span>RISK: CRITICAL</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
