import { Button } from 'antd';
import useStore, { desc } from './useStore';

const ZustandDemo = () => {
    const { count, increase } = useStore();
    console.log('count: ', count);
    return (
        <div>
            count: {count}
            <Button onClick={increase}>click</Button>
            <Button onClick={() => {
                desc()
            }}>desc</Button>
        </div>
    );
};

export default ZustandDemo;
