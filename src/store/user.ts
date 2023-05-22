import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useHomeState = create(
    persist(
        (set, get) => ({
            title: 'test',
            setTitle: (title) => set({ title }),
        }),
        {
            name: 'p-title',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);

export default useHomeState;
