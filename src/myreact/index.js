// 返回vnode
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => (typeof child === 'object' ? child : createTextNode(child)))
    }
  };
}

function createTextNode(text) {
  return {
    type: 'TEXT',
    props: {
      children: [],
      nodeValue: text
    }
  };
}

export default {
  createElement
};
