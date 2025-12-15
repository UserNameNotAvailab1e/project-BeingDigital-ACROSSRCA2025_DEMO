import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface RailSliderProps {
    label: string;
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
    formatLabel?: (val: number) => string;
}

export const RailSlider: React.FC<RailSliderProps> = ({ label, min, max, value, onChange, formatLabel }) => {
    // Convert value to x position (simplistic mapping for initial render would require measurement, 
    // but for a draggable slider we mostly care about x -> value)
    // To keep it simple, we rely on the parent state for the visual "fill" or "handle" position if we weren't dragging.
    // However, framer-motion drag is easiest if we let it control the handle and report back.

    // Since we need precise control from external state, we'll implement a custom click/drag behavior on the rail
    // rather than just `drag="x"`. 

    const railRef = useRef<HTMLDivElement>(null);

    const handlePointerDown = (e: React.PointerEvent) => {
        if (railRef.current) {
            updateValueFromPointer(e.clientX);
            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerup', handlePointerUp);
        }
    };

    const handlePointerMove = (e: PointerEvent) => {
        updateValueFromPointer(e.clientX);
    };

    const handlePointerUp = () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
    };

    const updateValueFromPointer = (clientX: number) => {
        if (railRef.current) {
            const rect = railRef.current.getBoundingClientRect();
            const percentage = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
            const newValue = min + percentage * (max - min);
            onChange(newValue);
        }
    };

    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className="w-full mb-8">
            <div className="flex justify-between font-mono text-xs tracking-widest mb-2 text-nostalgia-grey select-none">
                <span>{label.toUpperCase()}</span>
                <span>{formatLabel ? formatLabel(value) : value.toFixed(1)}</span>
            </div>

            <div
                ref={railRef}
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
