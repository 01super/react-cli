import { Button } from 'antd';
import { memo, useEffect } from 'react';
import useStore from './useStore';

const Count = () => {
    const { count, increase } = useStore((state) => ({
        count: state.count,
        increase: state.increase,
    }));

    useEffect(() => {
        console.log('increase change');
    }, [increase]);

    // const  = store;

    return (
        <div className="section">
            <div>count: {count}</div>
            <Button onClick={increase}>increase count</Button>
        </div>
    );
};

export default memo(Count);
