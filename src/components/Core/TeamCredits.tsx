import React, { useState } from 'react';
import { contributors } from '../../data/credits';
import { motion, AnimatePresence } from 'framer-motion';

export const TeamCredits: React.FC = () => {
    const [selectedMember, setSelectedMember] = useState<typeof contributors[0] | null>(null);

    return (
        <>
            <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 text-[10px] font-mono text-nostalgia-black/60 select-none">
                <span className="opacity-50">SYSTEM_ARCH:</span>
                <div className="flex gap-2">
                    {contributors.map((member, index) => (
                        <div key={member.id} className="relative group">
                            <button
                                onClick={() => setSelectedMember(member)}
                                className="hover:text-nostalgia-black hover:underline cursor-pointer transition-all"
                            >
                                {member.name}
                            </button>
                            {index < contributors.length - 1 && <span className="opacity-30">/</span>}
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedMember && (
                    <div className="fixed inset-0 z-[60] flex items-end justify-end p-4 pointer-events-none">
                        {/* Backdrop to close */}
                        <div className="absolute inset-0 pointer-events-auto" onClick={() => setSelectedMember(null)} />

                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="pointer-events-auto bg-nostalgia-white border border-nostalgia-black p-6 max-w-xs shadow-xl mb-8 mr-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h4 className="font-serif text-lg mb-2">{selectedMember.name}</h4>
                            <p className="font-mono text-xs text-nostalgia-grey leading-relaxed">
                                {selectedMember.role}
                            </p>
                            <button
                                onClick={() => setSelectedMember(null)}
                                className="mt-4 text-[8px] font-mono border-b border-nostalgia-black/50 hover:border-nostalgia-black"
                            >
                                CLOSE_BIO
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
