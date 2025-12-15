import React from 'react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { useAppStore } from '../../store/useAppStore';
import { ProjectInfoModal } from '../Core/ProjectInfoModal';

export const Receipt: React.FC = () => {
    const { config, costIndex } = useAppStore();
    const date = new Date().toISOString();

    return (
        <div className="w-full h-full flex items-end justify-center pb-0 md:pb-12 overflow-hidden bg-nostalgia-offwhite">
            <motion.div
                className="bg-nostalgia-white w-full md:w-[400px] p-8 shadow-2xl relative border-t-2 md:border-2 border-nostalgia-black"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                    delay: 0.5
                }}
            >
                {/* Receipt Header */}
                <div className="text-center mb-8 border-b border-nostalgia-black pb-4 border-dashed">
                    <h2 className="font-serif text-2xl tracking-widest mb-2">NOSTALGIA BROKER</h2>
                    <p className="font-mono text-xs text-nostalgia-grey">TRANSACTION RECORD</p>
                    <p className="font-mono text-[10px] text-nostalgia-grey mt-1">{date}</p>
                </div>

                {/* Line Items */}
                <div className="font-mono text-xs space-y-4 mb-8">
                    <div className="flex justify-between">
                        <span>AUDITORY_FEEDBACK</span>
                        <span>LVL {config.noise.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>MORTALITY_RISK</span>
                        <span>LVL {config.danger.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>MECH_RESISTANCE</span>
                        <span>LVL {config.inefficiency.toFixed(0)}</span>
                    </div>

                    <div className="border-b border-nostalgia-black pt-2" />

                    <div className="flex justify-between text-lg font-bold">
                        <span>TOTAL_COST</span>
                        <span>$ {(costIndex * 5).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                </div>

                {/* QR Code */}
                {/* QR Code and Actions */}
                <div className="flex flex-col items-center justify-center space-y-4 pt-4 border-t border-nostalgia-black border-dashed">
                    <div className="bg-white p-4 border border-nostalgia-black">
                        <QRCode value={`NOSTALGIA-BROKER-${Date.now()}`} size={160} />
                    </div>
                    <p className="font-mono text-[10px] mt-2 tracking-widest text-nostalgia-black/60">
                        SCAN TO OWN THIS MEMORY
                    </p>
                    <p className="font-mono text-[8px] mt-1 text-nostalgia-black/40">
                        NON-FUNGIBLE MEMORY (NFM) TOKEN MINTED
                    </p>

                    <div className="mt-8 flex flex-col items-center gap-2 w-full">
                        <button
                            onClick={() => {
                                // Reset everything manually or via store action 
                                // For now just hard reload state to IDLE, config stays or resets? 
                                // Let's reset config too for fresh start
                                window.location.reload();
                            }}
                            className="w-full py-3 border border-nostalgia-black font-mono text-xs hover:bg-nostalgia-black hover:text-white transition-colors"
                        >
                            INITIATE_NEW_CYCLE
                        </button>

                        <ProjectInfoModal />
                    </div>
                </div>

                {/* Tear-off effect at bottom (Visual only) */}
                <div className="absolute bottom-[-10px] left-0 w-full h-[20px] bg-transparent"
                    style={{
                        backgroundImage: "radial-gradient(circle, transparent 50%, #FFFFFF 50%)",
                        backgroundSize: "20px 20px",
                        backgroundPosition: "0px -10px"
                    }}
                />
            </motion.div>
        </div>
    );
};
