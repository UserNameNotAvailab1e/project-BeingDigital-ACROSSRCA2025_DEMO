import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface RailSliderProps {
    label: string;
    description?: string;
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
    formatLabel?: (val: number) => string;
}

export const RailSlider: React.FC<RailSliderProps> = ({
    label,
    description,
    min,
    max,
    value,
    onChange,
    formatLabel
}) => {
    // Convert value to x position (simplistic mapping for initial render would require measurement,
    // but for a draggable slider we mostly care about x -> value)
    // To keep it simple, we rely on the parent state for the visual "fill" or "handle" position if we weren't dragging.
    // However, framer-motion drag is easiest if we let it control the handle and report back.

    // Since we need precise control from external state, we'll implement a custom click/drag behavior on the rail
    // rather than just `drag="x"`.

    const trackRef = useRef<HTMLDivElement>(null);
    const [showTooltip, setShowTooltip] = useState(false);

    const handlePointerDown = (e: React.PointerEvent) => {
        updateValue(e.clientX);
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
    };

    const handlePointerMove = (e: PointerEvent) => {
        updateValue(e.clientX);
    };

    const handlePointerUp = () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
    };

    const updateValue = (clientX: number) => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const percentage = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
        const newValue = min + percentage * (max - min);
        onChange(newValue);
    };

    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className="w-full space-y-4">
            <div className="flex justify-between items-end">
                <div className="flex items-center gap-2 relative">
                    <label className="font-mono text-xs tracking-widest text-nostalgia-black/60">{label.toUpperCase()}</label>
                    {description && (
                        <div
                            className="relative"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        >
                            <button className="w-4 h-4 rounded-full border border-nostalgia-black/20 flex items-center justify-center text-[8px] font-mono text-nostalgia-grey hover:bg-nostalgia-black hover:text-white transition-colors cursor-help">?</button>
                            {showTooltip && (
                                <div className="absolute left-6 top-0 w-48 p-3 bg-white border border-nostalgia-black shadow-xl z-50 text-[10px] font-sans leading-relaxed text-nostalgia-black pointer-events-none">
                                    {description}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <span className="font-mono text-xs text-nostalgia-black">{formatLabel ? formatLabel(value) : value.toFixed(0)}</span>
            </div>

            <div
                ref={trackRef}
                onPointerDown={handlePointerDown}
                className="relative w-full h-8 flex items-center cursor-pointer group"
            >
                {/* Rail Line */}
                <div className="absolute w-full h-[1px] bg-nostalgia-black/20 group-hover:bg-nostalgia-black/50 transition-colors" />

                {/* Active Line (optional, maybe just the handle is enough for the "Anti-gravity" feel? 
            Let's keep it minimal: Just the track and the handle) */}

                {/* Handle */}
                <motion.div
                    className="absolute w-4 h-4 rounded-full bg-nostalgia-black -ml-2"
                    style={{ left: `${percentage}%` }}
                    layoutId={`handle-${label}`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            </div>
        </div>
    );
};
