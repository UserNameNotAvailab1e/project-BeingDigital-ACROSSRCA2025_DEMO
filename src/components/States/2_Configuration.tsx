import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { RailSlider } from '../UI/RailSlider';
import soulLogic from '../../data/soulLogic.json';

export const Configuration: React.FC = () => {
    const { config, updateConfig, setCostIndex, setState } = useAppStore();
    const [displayCost, setDisplayCost] = useState(0);

    // Calculate distinct visual labels for the sliders
    const getNoiseLabel = (v: number) => v < 20 ? "SILENT" : v < 70 ? "HUM" : "ROAR";
    const getDangerLabel = (v: number) => v < 30 ? "SAFE" : v < 80 ? "RISKY" : "CRITICAL";
    const getInefficiencyLabel = (v: number) => v < 20 ? "SEAMLESS" : v < 60 ? "TEXTURED" : "GLITCHED";

    // Simulation: Unstable Pricing (Market Volatility)
    useEffect(() => {

        const animateCost = () => {
            const { noise, danger, inefficiency } = useAppStore.getState().config;
            const params = soulLogic.soul_parameters;

            const noiseCost = noise * params.noise.impact_on_cost;
            const dangerCost = danger * params.danger.impact_on_cost;
            const inefficiencyCost = inefficiency * params.inefficiency.impact_on_cost;

            const totalActivity = noiseCost + dangerCost + inefficiencyCost;

            if (totalActivity <= 0) {
                setCostIndex(0);
                setDisplayCost(0);
            } else {
                const baseCost = soulLogic.cost_base_fee + totalActivity * 100;
                // Add ±500 random noise for "Market Jitter"
                const jitter = (Math.random() - 0.5) * 1000;
                const unstableCost = baseCost + jitter;

                setCostIndex(unstableCost);
                // Instant update for chaotic feel, no lerp
                setDisplayCost(unstableCost);
            }

            // Throttle slightly to 10fps for "digital" feel? Or keep smooth but jittery value? 
            // Request calls 60fps. Jitter at 60fps is very blurry.
            // Let's rely on React state update batching or use a timeout inside rqaf if needed.
            // For now, pure RAF might be too fast for readable numbers. 
        };

        // Use interval for "Ticker" feel (e.g. 10 changes per second)
        const interval = setInterval(animateCost, 100);

        return () => clearInterval(interval);
    }, [setCostIndex]);

    // Derived state for Critical Zone styling
    const isCritical = config.danger > 80 || config.noise > 80 || config.inefficiency > 80;

    const [showConfirmation, setShowConfirmation] = useState(false);

    // Threshold Warning Logic
    const [hasWarned, setHasWarned] = useState(false);
    const [showThresholdWarning, setShowThresholdWarning] = useState(false);

    useEffect(() => {
        if (isCritical && !hasWarned) {
            setShowThresholdWarning(true);
            setHasWarned(true); // Only warn once per session to avoid annoying the user
        }
    }, [isCritical, hasWarned]);

    return (
        <div className={`w-full h-full flex flex-col md:flex-row p-8 md:p-24 relative transition-all duration-200 ${isCritical ? 'glitch-text' : ''}`}>
            {/* Threshold Warning Modal */}
            {showThresholdWarning && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="bg-nostalgia-white p-8 max-w-sm border-2 border-red-500 shadow-[0_0_20px_rgba(255,0,0,0.3)] text-center">
                        <h3 className="font-mono text-red-600 font-bold mb-4 animate-pulse">⚠ SYSTEM INSTABILITY DETECTED</h3>
                        <p className="font-serif text-sm mb-6">
                            Resource consumption is spiking. Continuing at these levels will drastically increase cognitive load and system cost.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => {
                                    // Option to reduce levels (Manual for now, user just goes back)
                                    setShowThresholdWarning(false);
                                    // Ideally we might reset sliders here, but let's just let them "choose to continue" by closing the modal
                                }}
                                className="px-4 py-2 bg-nostalgia-black text-nostalgia-white font-mono text-xs hover:bg-red-600"
                            >
                                I UNDERSTAND. PROCEED.
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Background Chaos if Critical */}
            {isCritical && (
                <div className="absolute inset-0 z-[-1] opacity-10 bg-red-500 animate-pulse mix-blend-multiply pointer-events-none" />
            )}

            {/* Cost Index - Always visible in corner */}
            <div className="absolute top-8 right-8 md:top-12 md:right-12 text-right">
                <p className="font-mono text-xs text-nostalgia-grey tracking-widest mb-1">PROJECTED COST</p>
                <div className={`font-mono text-xl md:text-3xl text-nostalgia-black ${isCritical ? 'rgb-split' : ''}`}>
                    $ <span className="blur-[1px]">{displayCost.toLocaleString('en-US', { maximumFractionDigits: 0, minimumIntegerDigits: 7 }).slice(0, -3)}</span>
                    <span className="opacity-50">{displayCost.toFixed(0).slice(-3)}</span> / sec
                </div>
            </div>

            <div className={`flex-1 flex flex-col justify-center max-w-xl z-10 ${isCritical ? 'animate-[shake_0.5s_infinite]' : ''}`}>
                <motion.h2
                    className="font-serif text-3xl mb-12"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    CONFIGURE ASSET
                </motion.h2>

                <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <RailSlider
                        label={soulLogic.soul_parameters.noise.label}
                        min={soulLogic.soul_parameters.noise.min}
                        max={soulLogic.soul_parameters.noise.max}
                        value={config.noise}
                        onChange={(v) => updateConfig('noise', v)}
                        formatLabel={getNoiseLabel}
                    />

                    <RailSlider
                        label={soulLogic.soul_parameters.danger.label}
                        min={soulLogic.soul_parameters.danger.min}
                        max={soulLogic.soul_parameters.danger.max}
                        value={config.danger}
                        onChange={(v) => updateConfig('danger', v)}
                        formatLabel={getDangerLabel}
                    />

                    <RailSlider
                        label={soulLogic.soul_parameters.inefficiency.label}
                        min={soulLogic.soul_parameters.inefficiency.min}
                        max={soulLogic.soul_parameters.inefficiency.max}
                        value={config.inefficiency}
                        onChange={(v) => updateConfig('inefficiency', v)}
                        formatLabel={getInefficiencyLabel}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-16"
                >
                    <button
                        onClick={() => setShowConfirmation(true)}
                        className="px-8 py-3 border-[1px] border-nostalgia-black font-mono text-xs tracking-[0.2em] hover:bg-nostalgia-black hover:text-nostalgia-white transition-colors duration-300"
                    >
                        INITIATE TRANSACTION
                    </button>
                </motion.div>
            </div>

            {/* Burn Assets Confirmation Modal */}
            {showConfirmation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-nostalgia-white p-8 md:p-12 max-w-md border-2 border-nostalgia-black shadow-2xl text-center"
                    >
                        <h3 className="font-mono text-sm tracking-widest mb-6 border-b border-nostalgia-black pb-2">AUTHORIZE ASSET TRANSFER</h3>

                        <p className="font-serif text-lg mb-8 text-nostalgia-black/80">
                            WARNING: This process will simulate a permanent memory. Biological rejection is possible.
                        </p>

                        <div className="mb-8 font-mono text-xl animate-pulse">
                            COST: $ {displayCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="px-6 py-3 font-mono text-xs tracking-widest text-nostalgia-grey hover:text-nostalgia-black"
                            >
                                CANCEL
                            </button>
                            <button
                                onClick={() => setState('PROCESSING')}
                                className="px-6 py-3 bg-nostalgia-black text-nostalgia-white font-mono text-xs tracking-widest hover:bg-red-600 hover:animate-[shake_0.2s_infinite]"
                            >
                                BURN ASSETS
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};
