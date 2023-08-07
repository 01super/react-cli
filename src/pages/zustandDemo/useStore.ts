import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

type IStore = {
    count: number;
    increase: () => void;

    randomNum: number;
    setRandomNum: () => void;
};

const useStore = create(
    devtools<IStore>((set, get) => ({
        count: 1,
        increase: () => set(() => ({ count: get().count + 1 })),
        randomNum: 0,
        setRandomNum: () => set(() => ({ randomNum: Math.random() })),
    })),
    shallow,
);

export default useStore;
