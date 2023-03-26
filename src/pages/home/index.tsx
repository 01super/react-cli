import React, { useCallback, useEffect } from 'react';
import { Radio, Button } from 'antd';
import ClassicalDemo from '@/components/ClassicalDemo';
import BatchedUpdates from '@/components/BatchedUpdates';
import LifeCycle from '@/components/LifeCycle';
import LayoutEffectDemo from '@/components/UseLayoutEffect';

const Home: React.FC = () => {
    const [value, setValue] = React.useState<number | null>(1);

    const changeValue = () => {
        setValue(666);
        alert(value);
    };

    useEffect(() => {
        if (value === 0) {
            setValue(888);
        }
    }, [value]);

    const fn = useCallback(() => {
        throw new Error('test');
    }, []);

    return (
        <section>
            <p>value: {value}</p>
            <button
                onClick={() => {
                    setValue(0);
                }}
            >
                设置value为0
            </button>
            <br />
            <button onClick={() => console.log(a.b)}>点击报错</button>
            <br />
            <Radio.Group value={value} onChange={(v) => setValue(v.target.value)}>
                <Radio value={1}>1</Radio>
                <Radio value={2}>2</Radio>
                <Radio value={3}>3</Radio>
            </Radio.Group>
            <button onClick={changeValue}>changeValue</button>
            <Button onClick={() => setValue(null)}>清除</Button>
            <ClassicalDemo />
            <BatchedUpdates />
            <LifeCycle name="LifeCycle" />
            <LayoutEffectDemo />
            <br />
            <button onClick={fn}>抛出报错，测试 errorboundary</button>
        </section>
    );
};
export default Home;
