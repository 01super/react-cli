import { create } from 'zustand';

type IStore = {
    count: number;
    increase: () => void;
};

const useStore = create<IStore>((set, get) => ({
    count: 1,
    increase: () => set(() => ({ count: get().count + 1 })),
}));

export default useStore;
