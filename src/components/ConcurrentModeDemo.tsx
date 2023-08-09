import { Button } from 'antd';
import { useDeferredValue, useState, useTransition } from 'react';

const ConcurrentModeDemo = () => {
  console.log('ConcurrentModeDemo render');

  const [list, setList] = useState<number[]>([]);
  const [list1, setList1] = useState<number[]>([]);
  const [isPadding, startTransition] = useTransition();

  const handleAdd = () => {
    startTransition(() => {
      setList(Array(40000).fill(1));
    });
  };

  const deferedList1 = useDeferredValue(list1);

  const handleAdd1 = () => {
    setList1(Array(40000).fill(1));
  };

  return (
    <div>
      <Button onClick={handleAdd}>useTransition add 40000 item</Button>
      {isPadding ? (
        <p>isPadding</p>
      ) : (
        <ul style={{ height: 300, overflow: 'scroll', width: 300, background: 'white' }}>
          {list.map((v, i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
      <Button onClick={handleAdd1}>useDeferredValue add 40000 item</Button>
      <ul style={{ height: 300, overflow: 'scroll', width: 300, background: 'white' }}>
        {deferedList1.map((v, i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
};

export default ConcurrentModeDemo;
