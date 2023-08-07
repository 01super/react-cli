import Count from './Count';
import Random from './Random';
import Demo from './Demo';
import './style.global.less';
import Count1 from './Count1';

const ZustandDemo = () => {
    // const [s, setS] = useState('1');
    return (
        <div className="zustand-demo">
            <Count />
            <Random />
            <Demo />
            <Count1 />
        </div>
    );
};

export default ZustandDemo;
