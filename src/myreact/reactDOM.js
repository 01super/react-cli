// 将vnode转换为node并且挂载到container上
function render(vnode, container) {
  console.log('render...');
  console.log(vnode, container);
  const node = createNode(vnode);
  container.appendChild(node);
}

function createNode(vnode) {
  // 创建文本节点和标签节点
  const { type, props } = vnode;
  console.log('props: ', props);
  const node = document.createElement(type);
  return node;
}

export default {
  render
};
