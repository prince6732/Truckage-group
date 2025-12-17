import { create } from "zustand";

interface LoaderState {
    loading: boolean;
    setLoading: (value: boolean) => void;
}

export const useGlobalLoader = create<LoaderState>((set) => ({
    loading: false,
    setLoading: (value) => set({ loading: value }),
}));
