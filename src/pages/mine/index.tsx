import React, { useCallback, useState } from 'react';
import useHomeStore from '@/store/user';
import style from './style.less';
import ConcurrentModeDemo from '@/components/ConcurrentModeDemo';

const Mine: React.FC = () => {
    const homeStore = useHomeStore();

    const [state, setState] = useState(0);
    const [height, setHeight] = useState(0);

    const measuredRef = useCallback((node) => {
        if (node !== null) {
            setHeight(node.getBoundingClientRect().height);
        }
    }, []);

    return (
        <div className={style.name}>
            {homeStore.title}
            <h1>hello world</h1>
            <h2
                onClick={(e) => {
                    e.preventDefault();
                    setState((pre) => pre + 1);
                }}
            >
                {state}
            </h2>
            <code>console.log(8111111188)</code>
            <div>happy ending! 1</div>
            <input
                type="text"
                value={homeStore.title}
                onChange={(v) => homeStore.setTitle(v.target.value)}
            />
            <h1 ref={measuredRef}>{homeStore.title}</h1>
            <h2>The above header is {Math.round(height)}px tall</h2>
            <ConcurrentModeDemo />
        </div>
    );
};

export default Mine;
