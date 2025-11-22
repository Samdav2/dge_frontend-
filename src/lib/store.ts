import { create } from 'zustand';

interface AppState {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    user: { name: string; email: string } | null;
    setUser: (user: { name: string; email: string } | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
    theme: 'light',
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    user: null,
    setUser: (user) => set({ user }),
}));
