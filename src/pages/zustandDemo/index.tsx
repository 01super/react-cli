import Count from './Count';
import Random from './Random';
import Count1 from './GetNewVal';
import SyncExternalStore from './SyncExternalStore';
import './style.global.less';
import { memo } from 'react';
import WidthImmer from './WidthImmer';

const ZustandDemo = () => {
    return (
        <div className="zustand-demo box">
            <ul>
                <li>Zustand存储是一个外部存储，这使得它更适合于需要在React之外进行访问。</li>
                <li>可以在react组件之外修改、获取state</li>
                <li>不需要使用context provider包裹</li>
            </ul>
            <SyncExternalStore />
            <Count />
            <Random />
            <Count1 />
            <WidthImmer />
            <div className="box">
                常用的中间件：devtools(store, {'{name: "MyStore"}'}
                )、Persist、immer、subscribeWithSelector
            </div>
        </div>
    );
};

export default memo(ZustandDemo);
