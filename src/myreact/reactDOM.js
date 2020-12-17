// 将vnode转换为node并且挂载到container上
function render(vnode, container) {
  console.log('render...');
  console.log(vnode, container);
  const node = createNode(vnode);
  container.appendChild(node);
}

function createNode(vnode) {
  console.log('vnode: ', vnode);
  // 创建文本节点和标签节点
  const { type, props } = vnode;
  let node;
  if (type === 'TEXT') {
    node = document.createTextNode('');
  } else if (type === undefined) {
    node = document.createDocumentFragment();
  } else {
    node = document.createElement(type);
  }
  if (props && props.className) {
    node.className = props.className;
  }
  if (node.nodeName !== '#document-fragment') updateNode(node, props);
  props && props.children && reconcileChildren(props.children, node);
  return node;
}

function reconcileChildren(children, node) {
  children.forEach((i) => {
    render(i, node);
  });
}

function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter((k) => k !== 'children')
    .forEach((v) => {
      try {
        node[v] = nextVal[v];
      } catch (e) {
        console.warn(node.nodeName);
      }
    });
}

export default {
  render
};
