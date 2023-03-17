import React from 'react';
import { Radio, Button } from 'antd';
import ClassicalDemo from '@/components/ClassicalDemo';
import BatchedUpdates from '@/components/BarchedUpdates';

const Home: React.FC = () => {
    const [value, setValue] = React.useState(1);

    return (
        <section>
            <Radio.Group value={value} onChange={(v) => setValue(v.target.value)}>
                <Radio value={1}>1</Radio>
                <Radio value={2}>2</Radio>
                <Radio value={3}>3</Radio>
            </Radio.Group>
            <Button onClick={() => setValue(null)}>清除</Button>
            <ClassicalDemo />
            <BatchedUpdates />
        </section>
    );
};
export default Home;
