import { memo } from 'react';
import useMyStore from './useMyStore';
import { Button } from 'antd';

const GetNewVal = () => {
    const count = useMyStore((s) => s.count);

    const handlePlus = () => {
        useMyStore.setState({ count: count + 1 });

        // 不能拿到最新的值
        console.log('count: ', count);

        // 可以直接拿到最新的值
        console.log('useStore.getState: ', useMyStore.getState().count);
    };

    return (
        <div className="section box">
            <h2>可以直接拿到最新的值</h2>
            <div>count1====: {count}</div>
            <div>
                <Button onClick={handlePlus}>plus</Button>
            </div>
        </div>
    );
};

export default memo(GetNewVal);
