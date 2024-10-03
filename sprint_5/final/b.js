// https://contest.yandex.ru/contest/24810/run-report/119298966/

/*
ИДЕЯ АЛГОРИТМА И ДОКАЗАТЕЛЬСТВО ПРАВИЛЬНОСТИ

В основе алгоритма лежит неполный обход BST дерева.
Итак, сначала рекусивно находим удаляемый узел, далее если потомок у узла только один,
то просто на место удаляемого ставим потомка. Иначе у левого потомка рекурсивно находим самого правого
потомка (mostRightLeftNode), и если такой есть, то у его родителя меням правую ссылку на левого
потомка найденого узла, потом найденому узлу присваиваем потомков удалемого.
Далее меняем удаляемый узел на mostRightLeftNode.

Если же такого узла не нашлось (mostRightLeftNode) та за место удалемого ставим его левый узел с
измененной правой ссылкой на правого потомка удаляемого элемента.

ВРЕМЕННАЯ СЛОЖНОСТЬ
Операция удаления в BST занимает O(log(n)) времени. Так как при поиске удаляемого элемента мы проходим по уровням дерева, которых в дереве в силу его двоичности log(n) + 1

ПРОСТРАНСТВЕННАЯ  СЛОЖНОСТЬ
Доп памяти не занимает.
*/

if (process.env.REMOTE_JUDGE !== 'true') {
  const {generateTree, test} = require('../utils')

  test(() => {
    const a = generateTree([
      [0, 5, 1, 2],
      [1, 3, 3, 4],
      [2, 7, 5, 6],
      [3, 1, , 7],
      [4, 4, 9, 10],
      [5, 6],
      [6, 8, , 8],
      [7, 2],
      [8, 9],
      [9, 3.5],
      [10, 4.5]
    ])

    console.log(remove(a, 5).toString())
  })
}

function mostRight(node, parent) {
  let currentNodeParent = parent
  let currentNode = node

  while (currentNode !== null && currentNode.right) {
    currentNodeParent = currentNode
    currentNode = currentNode.right
  }

  return {
    parent: currentNodeParent,
    node: currentNode
  }
}

function remove(node, key) {
  if (node === null) {
    return null
  }

  if (node.value === key) {
    const leftNode = node.left
    const rightNode = node.right

    node.left = null
    node.right = null

    if (leftNode !== null && rightNode !== null) {
      const mostRightLeftNode = mostRight(leftNode.right, leftNode)
      if (mostRightLeftNode.node) {
        mostRightLeftNode.parent.right = mostRightLeftNode.node.left
        mostRightLeftNode.node.left = leftNode
        mostRightLeftNode.node.right = rightNode
        return mostRightLeftNode.node
      }

      leftNode.right = rightNode
      return leftNode
    }

    if (leftNode) {
      return leftNode
    }

    return rightNode
  }

  if (node.value > key) {
    node.left = remove(node.left, key)
    return node
  }

  node.right = remove(node.right, key)
  return node
}

