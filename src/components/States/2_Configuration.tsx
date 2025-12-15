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
    // Critical if ANY value > 80
    const isCritical = config.danger > 80 || config.noise > 80 || config.inefficiency > 80;

    const [showConfirmation, setShowConfirmation] = useState(false);

    // Threshold Warning Logic
    const [hasWarned, setHasWarned] = useState(false);
    const [showThresholdWarning, setShowThresholdWarning] = useState(false);

    // User must accept risk to enable the visual glitching
    const [acceptedRisk, setAcceptedRisk] = useState(false);

    useEffect(() => {
        if (isCritical) {
            if (!hasWarned) {
                setShowThresholdWarning(true);
                setHasWarned(true);
            }
        } else {
            // Reset warning if we go back to safe levels
            setHasWarned(false);
            // Also optionally reset acceptedRisk if we want them to re-accept when going critical again?
            // "3 factors, anytime slide to threshold, need popup" -> implies yes.
            setAcceptedRisk(false);
        }
    }, [isCritical, hasWarned]);

    // Calculate Glitch Intensity (0 to 1)
    // Only applies if acceptedRisk is true AND we are critical
    const getMaxExcess = () => {
        const d = Math.max(0, config.danger - 80);
        const n = Math.max(0, config.noise - 80);
        const i = Math.max(0, config.inefficiency - 80);
        return Math.max(d, n, i); // Max excess is 20 (100 - 80)
    };

    const glitchIntensity = acceptedRisk ? (getMaxExcess() / 20) : 0;

    // Dynamic styles for progressive glitch
    const containerStyle = acceptedRisk ? {
        filter: `blur(${glitchIntensity * 2}px)`,
        transform: `translate(${Math.random() * glitchIntensity * 4}px, ${Math.random() * glitchIntensity * 4}px)` // Minimal shake handled by CSS class usually, but let's do inline for dynamic scale
    } : {};

    return (
        <div
            className={`w-full h-full flex flex-col md:flex-row p-8 md:p-24 relative transition-all duration-200`}
            style={containerStyle}
        >
            {/* Threshold Warning Modal - COLD & ELEGANT */}
            {showThresholdWarning && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-nostalgia-white p-12 max-w-sm border border-nostalgia-black shadow-2xl text-center"
                    >
                        <h3 className="font-serif text-xl mb-6 tracking-wide text-nostalgia-black">SYSTEM NOTICE</h3>
                        <p className="font-mono text-xs mb-8 text-nostalgia-grey leading-relaxed">
                            Asset volatility exceeding safety protocols (80%). Hardware instability is imminent.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => {
                                    setShowThresholdWarning(false);
                                    setAcceptedRisk(true); // Enable glitches
                                }}
                                className="px-6 py-3 border border-nostalgia-black bg-transparent text-nostalgia-black font-mono text-[10px] tracking-widest hover:bg-nostalgia-black hover:text-white transition-colors"
                            >
                                I UNDERSTAND. PROCEED.
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Background Chaos if Critical AND Accepted */}
            {isCritical && acceptedRisk && (
                <div
                    className="absolute inset-0 z-[-1] bg-red-500 mix-blend-multiply pointer-events-none"
                    style={{ opacity: glitchIntensity * 0.2 }}
                />
            )}

            {/* Cost Index - Always visible in corner */}
            <div className="absolute top-8 right-8 md:top-12 md:right-12 text-right">
                <div className="flex items-center justify-end gap-2 mb-1 group relative">
                    <p className="font-mono text-xs text-nostalgia-grey tracking-widest cursor-help">PROJECTED COST</p>
                    <div className="relative">
                        <button className="w-4 h-4 rounded-full border border-nostalgia-grey/50 flex items-center justify-center text-[8px] text-nostalgia-grey hover:bg-nostalgia-black hover:text-white transition-colors">?</button>
                        <div className="absolute right-0 top-6 w-48 p-3 bg-white border border-nostalgia-black shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                            <p className="font-sans text-[10px] text-nostalgia-black text-left leading-relaxed">
                                Real-time calculation of neuromorphic resource usage. Fluctuations indicate simulated market volatility and biological resistance.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={`font-mono text-xl md:text-3xl text-nostalgia-black ${isCritical ? 'rgb-split' : ''}`}>
                    $ <span className="blur-[1px]">{displayCost.toLocaleString('en-US', { maximumFractionDigits: 0, minimumIntegerDigits: 7 }).slice(0, -3)}</span>
                    <span className="opacity-50">{displayCost.toFixed(0).slice(-3)}</span> / sec
                </div>
            </div>

            <div className={`flex-1 flex flex-col justify-center max-w-xl z-10`}>
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
                        description="Simulates the acoustic pressure of an internal combustion engine. Higher values induce temporary auditory threshold shifts."
                        min={soulLogic.soul_parameters.noise.min}
                        max={soulLogic.soul_parameters.noise.max}
                        value={config.noise}
                        onChange={(v) => updateConfig('noise', v)}
                        formatLabel={getNoiseLabel}
                    />

                    <RailSlider
                        label={soulLogic.soul_parameters.danger.label}
                        description="The probability of simulated catastrophic failure. Increases the release of adrenaline and cortisol neurotransmitters."
                        min={soulLogic.soul_parameters.danger.min}
                        max={soulLogic.soul_parameters.danger.max}
                        value={config.danger}
                        onChange={(v) => updateConfig('danger', v)}
                        formatLabel={getDangerLabel}
                    />

                    <RailSlider
                        label={soulLogic.soul_parameters.inefficiency.label}
                        description="Introduces mechanical friction and resistance. Required to feel the 'weight' of the machine."
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
