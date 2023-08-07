import { Button } from 'antd';
import { memo } from 'react';
import useStore from './useStore';

const Random = () => {
    const { randomNum, setRandomNum } = useStore((state) => ({
        randomNum: state.randomNum,
        setRandomNum: state.setRandomNum,
    }));

    return (
        <div className="section">
            <div>randomNum: {randomNum}</div>
            <Button onClick={setRandomNum}>setRandomNum</Button>
        </div>
    );
};

export default memo(Random);
