// import { create } from 'zustand';
import { create } from '../zustandx';

type IStore = {
    count: number;
    increase: () => void;
};

const useStore = create<IStore>((set, get) => ({
    count: 1,
    increase: () => set(() => ({ count: get().count + 1 })),
}));

export default useStore;

export const desc = () => useStore().setState(p => ({
  count: p+1
}))
