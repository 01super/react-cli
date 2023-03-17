import { useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';

const BatchedUpdates = () => {
    const [num1, setNum1] = useState(100);
    const [num2, setNum2] = useState(1000);

    const handleChange = () => {
        setTimeout(() => {
            unstable_batchedUpdates(() => {
                setNum1((p) => p + 1);
                setNum2((p) => p + 1);
            });
        }, 0);
    };

    const handleChange1 = () => {
        setNum1((p) => p + 1);
        setNum2((p) => p + 1);
    };

    console.log('render......');

    return (
        <div>
            <p>num1: {num1}</p>
            <p>num2: {num2}</p>
            <p>
                在React18之前，非合成事件和setTimeout、Promise中的事件，多次setState，会触发多次render
            </p>
            <button onClick={handleChange1}>change</button>
            <button onClick={handleChange}>batchedUpdates change</button>
        </div>
    );
};

export default BatchedUpdates;
