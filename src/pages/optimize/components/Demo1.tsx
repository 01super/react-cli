import { Button } from "antd"
import { useState } from "react"
import Demo2 from "./Demo2"

// const Demo1 = () => {
//   console.log('Demo1 render',);
//   const [count, setCount] = useState(1)

//   return (
//     <div className="box">
//       <h2>demo1: {count}</h2>
//       <div>
//         <Button onClick={() => setCount(p => p + 1)}>count++</Button>
//       </div>
//       <Demo2 />
//     </div>
//   )
// }


const Wrapper = ({ children }) => {
  const [count, setCount] = useState(1)
  console.log('Wrapper render',);

  return (<div className="box">
    <h2>demo1 wrapper: {count}</h2>
    <div>
      <Button onClick={() => setCount(p => p + 1)}>count++</Button>
    </div>
    {children}
  </div>)
}

const Demo1 = () => {
  console.log('Demo1 render',);
  return (
    <Wrapper>
      <Demo2 />
    </Wrapper>

  )
}



export default Demo1
