import React, { useEffect, useState } from 'react';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_!@#$%^&*";

interface GlitchTextProps {
    text: string;
    className?: string;
    trigger?: boolean;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className, trigger = true }) => {
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
        if (!trigger) return;

        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((_char, index) => {
                        if (index < iterations) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iterations >= text.length) {
                clearInterval(interval);
            }

            iterations += 1 / 3; // Speed
        }, 30);

        return () => clearInterval(interval);
    }, [text, trigger]);

    return <span className={className}>{displayText}</span>;
};
