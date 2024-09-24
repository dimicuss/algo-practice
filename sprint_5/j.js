function _insert(root, node) {
  if (root === null) {
    return node
  }

  if (node.value >= root.value) {
    root.right = _insert(root.right, node)
  } else {
    root.left = _insert(root.left, node)
  }

  return root
}


function insert(root, key) {
  const node = new root.constructor(key)
  return _insert(root, node)
}

