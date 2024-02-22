class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  minDepth() {
    if (!this.root) return 0;
    let queue = [[this.root, 1]];

    while (queue.length) {
      let [node, depth] = queue.shift();
      if (!node.left && !node.right) return depth;
      if (node.left) queue.push([node.left, depth + 1]);
      if (node.right) queue.push([node.right, depth + 1]);
    }
  }

  maxDepth(node = this.root) {
    if (!node) return 0;
    return 1 + Math.max(this.maxDepth(node.left), this.maxDepth(node.right));
  }

  maxSum() {
    let maxPathSum = -Infinity;

    function findMaxPath(node) {
      if (node === null) return 0;
      let left = Math.max(0, findMaxPath(node.left));
      let right = Math.max(0, findMaxPath(node.right));
      maxPathSum = Math.max(maxPathSum, node.val + left + right);
      return node.val + Math.max(left, right);
    }

    findMaxPath(this.root);
    return maxPathSum;
  }

  nextLarger(lowerBound) {
    let result = null;

    function traverse(node) {
      if (node === null) return;
      if (node.val > lowerBound && (result === null || node.val < result)) {
        result = node.val;
      }
      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);
    return result;
  }

  static deserialize(str) {
    if (!str) return null;
    const values = str.split(",");
    let index = 0;
    const deserializeHelper = () => {
      if (index >= values.length || values[index] === "#") {
        index++;
        return null;
      }
      const node = new BinaryTreeNode(parseInt(values[index++], 10));
      node.left = deserializeHelper();
      node.right = deserializeHelper();
      return node;
    };
    return deserializeHelper();
  }

  static serialize(root) {
    if (!root) return "";
    const values = [];
    const serializeHelper = (node) => {
      if (!node) {
        values.push("#");
        return;
      }
      values.push(node.val);
      serializeHelper(node.left);
      serializeHelper(node.right);
    };
    serializeHelper(root);
    return values.join(",");
  }

}

module.exports = { BinaryTree, BinaryTreeNode };
