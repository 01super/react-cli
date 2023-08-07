import { memo } from 'react';
import useStore from './useStore';

const Count1 = () => {
    const count = useStore((state) => state.count);

    // const  = store;

    return (
        <div className="section">
            <div>count1====: {count}</div>
        </div>
    );
};

export default memo(Count1);
