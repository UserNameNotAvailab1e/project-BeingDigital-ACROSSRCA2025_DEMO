import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProjectInfoModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const contributors = [
        { name: "David", role: "Architecting the system logic and behavioral mechanics. Provide visual support" },
        { name: "Florence", role: "Documenting the installation photographically." },
        { name: "Haoyu Xue", role: "Make the summary report, write the plot, design the storyboard, conduct aesthetic design." },
        { name: "Harry", role: "Help, understanding and expertise of the automotive sector" },
        { name: "Vaibhav", role: "Design, development, and production of digital games." },
    ];

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="mt-4 text-[10px] font-mono text-nostalgia-grey hover:text-nostalgia-black border-b border-transparent hover:border-nostalgia-black transition-all"
            >
                PROJECT_INFO // COLLABORATORS
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 backdrop-blur-md p-8"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            className="w-full max-w-lg border-2 border-nostalgia-black p-8 bg-white shadow-2xl overflow-y-auto max-h-[80vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="font-serif text-3xl mb-8 border-b-2 border-nostalgia-black pb-4">Collaboration</h2>

                            <ul className="space-y-6">
                                {contributors.map((c) => (
                                    <li key={c.name} className="font-mono text-xs">
                                        <span className="font-bold text-base block mb-1">{c.name}</span>
                                        <span className="text-nostalgia-grey">{c.role}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="mt-12 w-full py-4 bg-nostalgia-black text-white font-mono text-xs hover:bg-black transition-colors"
                            >
                                CLOSE_LOG
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
