import { Button } from 'antd';
import { memo } from 'react';
import useMyStore, { desc } from './useMyStore';
import { shallow } from 'zustand/shallow';

const Count = () => {
    const state = useMyStore(
        (state) => ({
            count: state.count,
            increase: state.increase,
        }),
        shallow,
    );
    const { count, increase } = state;
    console.log('state: ', state);

    return (
        <div className="section box">
            <h2>Count: {count}</h2>
            <Button onClick={increase}>increase count</Button>
            <Button onClick={desc}>desc count</Button>
            <Button
                onClick={() => {
                    useMyStore.setState({ count: state.count });
                }}
            >
                set count noChange
            </Button>
        </div>
    );
};

export default memo(Count);
