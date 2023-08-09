// import { create } from 'zustand';
import { create } from '../zustandx';


const useStore = create((set, get) => ({
    count: 1,
    increase: () => set(() => ({ count: get().count + 1 })),
    randomNum: 0,
    setRandomNum: () => set(() => ({ randomNum: Math.random() })),
}));

export default useStore;

export const desc = () =>
    useStore().setState((p) => ({
        count: p + 1,
    }));
