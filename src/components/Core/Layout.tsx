import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TeamCredits } from './TeamCredits';
import { ManifestoModal } from './ManifestoModal';

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
    return (
        <div
            className={twMerge(
                clsx(
                    "relative w-full h-screen overflow-hidden",
                    "bg-nostalgia-white text-nostalgia-black",
                    "font-sans selection:bg-nostalgia-black selection:text-nostalgia-white",
                    "flex flex-col items-center justify-center", // Default centering
                    className
                )
            )}
        >
            {/* Background Grid or Texture could go here */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply" />

            <TeamCredits />
            <ManifestoModal />

            {children}
        </div>
    );
};
