import { useEffect, useLayoutEffect, useRef, useState } from 'react';
/**
 * useEffect
1、click setstate (value)
2、拟DOM设置到真实DOM上
3、渲染
4、执行useEffect回调
5、setstate(value)
6、虚拟DOM设置到真实DOM上
7、渲染
 */

/**
 * useLayoutEffect
 * dom结构更新后，渲染之前执行，在渲染时是同步执行，相当于防抖
1,click setstate (value)
2、虚拟DOM设置到真实DOM上
3、执行useLayEffect回调
4、setstate(value)
5、虚拟D0M设置到真实DOM上
6、渲染
 */

const LayoutEffectDemo = () => {
    const boxRef = useRef(null);
    const [height, setHeight] = useState(10);

    // useLayoutEffect(() => {
    //     if (height === 0) setHeight(20 + Math.random() * 100);
    // }, [height]);

    useEffect(() => {
        if (height === 0) {
            for (let i = 0; i < 9000000000; i++) {
                const a = 0,
                    b = 12;
                const c = a + b;
            }
            setHeight(20 + Math.random() * 100);
        }
    }, [height]);

    return (
        <div>
            <span style={{ border: '1px solid #ccc' }}>{height}</span>
            <div className="box" ref={boxRef} style={{ width: 400 }}></div>
            <button onClick={() => setHeight(0)}>setState</button>
        </div>
    );
};

export default LayoutEffectDemo;
