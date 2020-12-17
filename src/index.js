import React from './myreact';
import ReactDOM from './myreact/reactDOM';

const jsx = (
  <>
    <div className="container">
      <div className="wrapper">hello world</div>
      <a href="www.baidu.com">baidu</a>
    </div>
    <div>wawa</div>
  </>
);

// 会调动React.createElement将jsx对象转换成js对象
console.log('jsx', jsx);

ReactDOM.render(jsx, document.getElementById('root'));
