import { Button } from 'antd';
import useStore from './useStore';

const ZustandDemo = () => {
    const { count, increase } = useStore();
    console.log('count: ', count);
    return (
        <div>
            count: {count}
            <Button onClick={increase}>click</Button>
        </div>
    );
};

export default ZustandDemo;
