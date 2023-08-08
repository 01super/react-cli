import { Button } from "antd"
import { useState } from "react"

const Demo2 = () => {
  console.log('Demo2 render');
  const [count, setCount] = useState(1)

  return (
    <div className="border box">
      <h2>demo2: {count}</h2>
      <div>
        <Button onClick={() => setCount(p => p + 1)}>count++</Button>
      </div>
    </div>
  )
}

export default Demo2
