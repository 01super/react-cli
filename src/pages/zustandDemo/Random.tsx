import { Button } from 'antd';
import { memo } from 'react';
import useMyStore from './useMyStore';
import { shallow } from 'zustand/shallow';

const Random = () => {
    console.log('Random: render');
    const { randomNum, setRandomNum } = useMyStore(
        (state) => ({
            randomNum: state.randomNum,
            setRandomNum: state.setRandomNum,
        }),
        // 性能优化，为何导致此页面的重新渲染
        // 可以使用 react-dev-tools 的 Highlight updates when components render
        // 来查看当 状态变化时 页面的渲染情况
        // shallow,
    );

    return (
        <div className="section box">
            <h2>Random: : {randomNum}</h2>
            <Button onClick={setRandomNum}>setRandomNum</Button>
        </div>
    );
};

export default memo(Random);
