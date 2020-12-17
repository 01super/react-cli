// 返回vnode
let i = 0;
function createElement(type, props, ...children) {
  console.log(++i);
  console.log(type, props, children);
  return {
    type,
    props: {
      ...props,
      children
    }
  };
}

export default {
  createElement
};
