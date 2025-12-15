import { create } from 'zustand';

export type AppState = 'IDLE' | 'CONFIG' | 'PROCESSING' | 'EXPERIENCE' | 'RECEIPT';

interface ConfigValues {
    noise: number;
    danger: number;
    inefficiency: number;
}

interface AppStore {
    currentState: AppState;
    config: ConfigValues;
    costIndex: number;

    // Actions
    setState: (state: AppState) => void;
    updateConfig: (key: keyof ConfigValues, value: number) => void;
    setCostIndex: (value: number) => void;
}

export const useAppStore = create<AppStore>((set) => ({
    currentState: 'IDLE',
    config: {
        noise: 0,
        danger: 0,
        inefficiency: 0,
    },
    costIndex: 0,

    setState: (state) => set({ currentState: state }),
    updateConfig: (key, value) =>
        set((state) => ({
            config: { ...state.config, [key]: value }
        })),
    // Cost is now derived in components or via a computed selector.
    // But we keep setCostIndex for the visual ticker animation to update it.
    setCostIndex: (value) => set({ costIndex: value }),
}));
