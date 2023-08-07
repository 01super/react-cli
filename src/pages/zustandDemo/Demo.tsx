import { create } from 'zustand';
// import create from "./zustand-demo";

import { devtools } from 'zustand/middleware';

import { Button } from 'antd';

const useStore = create(
    devtools((set, get) => ({
        count: 0,
        randomData: 1,
        increateCount: () => set({ count: get().count + 1 }),
        minusCount: () => set({ count: get().count - 1 }),
        changeRandomData: () => set({ randomData: Math.random() }),
    })),
);

const ShowCount = () => {
    const count = useStore((state) => state.count);
    return <div className='demo-item'>count:{count}</div>;
};

const IncreateCount = () => {
    const increateCount = useStore((state) => state.increateCount);
    return <Button onClick={increateCount}>+1</Button>;
};

const MinusCount = () => {
    const minusCount = useStore((state) => state.minusCount);
    return <Button onClick={minusCount}>-1</Button>;
};

const ShowRandomData = () => {
    const randomData = useStore((state) => state.randomData);
    return <div className='demo-item'>randomData:{randomData}</div>;
};

const ChangeRandomData = () => {
    const changeRandomData = useStore((state) => state.changeRandomData);
    return <Button onClick={changeRandomData}>随机数</Button>;
};

export default function Demo() {
    return (
        <div className="demo-app">
            <div>
                <IncreateCount />
                <MinusCount />
                <ChangeRandomData />
            </div>
            <ShowCount />
            <ShowRandomData />
            <ShowCount />
            <ShowRandomData />
            <ShowCount />
        </div>
    );
}
