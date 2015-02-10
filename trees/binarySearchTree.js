var Node = function (data, val1, val2) { //Binary Tree Node
    this.data = data;
    this.left;
    this.right;
    this.count = 1;
    if (typeof val1 !== 'undefined') {
        this.append(val1)
    };
    if (typeof val2 !== 'undefined') {
        this.append(val2)
    };
}

Node.prototype = {
    show: function () {
        return this.data;
    },
    append: function (node) {
        this.data > node.data ? this.left = node : this.right = node;
    },
    showChildren: function () {
        var children = [];
        (typeof this.left !== 'undefined') ? children.push(this.left.data) : children.push(null);
        (typeof this.right !== 'undefined') ? children.push(this.right.data) : children.push(null);
        return children;
    }
}

var BinaryTree = function (root) {
    this.root = (typeof root !== 'object') ? new Node(root) : root;
}

BinaryTree.prototype = {
    find: function (n) {
        var start = this.root;
        while (typeof start !== 'undefined') {
            if (start.data === n) {
                return start;
            }
            n > start.data ? start = start.right : start = start.left;
        }
        return false;
    },
    findParent: function (data) {
        var start = this.root;
        if (typeof this.find(data) === 'object') {
            while (start.left.data !== data && start.right.data !== data) {
                (start.data > data) ? start = start.left : start = start.right;
            }
            return start;
        }
        return false;
    },
    insert: function (node) {
        var start = this.root;
        if (typeof node !== 'object') {
            node = new Node(node);
        }
        if (typeof this.root === 'undefined') {
            this.root = node;
            return node;
        }
        while (typeof start !== 'undefined') {
            if(start.data > node.data) {
                if (typeof start.left !== 'undefined') {
                start = start.left;
                } else {
                    start.left = node;
                    break;
                }
            } else { 
                if (typeof start.right !== 'undefined') {
                start = start.right;
                } else {
                    start.right = node;
                    break;
                }
            }
        }
    },
    update: function (n) {
        var node = this.find(n);
        if (node) {
            node.count++
        };
    },
    inOrder: function (node) { //traverses tree ascending order
        if (typeof node !== 'undefined') {
            BinaryTree.prototype.inOrder(node.left);
            console.log(node.show());
            BinaryTree.prototype.inOrder(node.right);
        }
    },
    preOrder: function (node) { //traverses tree from root to children
        if (typeof node !== 'undefined') {
            console.log(node.show());
            BinaryTree.prototype.preOrder(node.left);
            BinaryTree.prototype.preOrder(node.right);
        }
    },
    postOrder: function (node) { //traverses tree from children of left sub tree and right sub tree to root
        if (typeof node !== 'undefined') {
            BinaryTree.prototype.postOrder(node.left);
            BinaryTree.prototype.postOrder(node.right);
            console.log(node.show())
        }
    },
    getMin: function (start) {
        var start = start || this.root;
        while (typeof start.left !== 'undefined') {
            start = start.left;
        }
        return start.data;
    },
    getMax: function (start) {
        var start = start || this.root;
        while (typeof start.right !== 'undefined') {
            start = start.right;
        }
        return start.data;
    },
    remove: function (data) {
        var node = this.findParent(data),
            deadNode,
            rightSide;
        if (typeof node === 'object') {
            if (typeof node.right !== 'undefined' && node.right.data === data) {
                deadNode = node.right;
                rightSide = true;
            } else {
                deadNode = node.left;
                rightSide = false;
            }
            if (rightSide) {
                node.right = deadNode.left ? deadNode.left : deadNode.right;
            } else {
                node.left = deadNode.right ? deadNode.right : deadNode.left;
            }
        }
    },
    displayTree: function () {
        var tree = [this.root];
        while (tree.some(function (node) {return (node !== null)})) {
            console.log(tree.map(function (node) {
                return node ? node.data : node;
            }));
            newTree = [];
            tree.forEach(function (node) {
                if (node) {
                    node.left ? newTree.push(node.left) : newTree.push(null);
                    node.right ? newTree.push(node.right) : newTree.push(null);
                } else {
                    newTree.push(null);
                    newTree.push(null);
                }
            })
            tree = newTree;
        }
    },
    length: function () {
        var count = 0,
            tree = [this.root];
        while (tree.length !== 0) {
            count += tree.length;
            newTree = [];
            tree.forEach(function (node) {
                if (node.left) {
                    newTree.push(node.left);
                }
                if (node.right) {
                    newTree.push(node.right);
                }
            });
            tree = newTree;
        }
        return count;
    }
}


var n1 = new Node(56);
var n2 = new Node(81);
var n3 = new Node(22);
var n4 = new Node(10);
var n5 = new Node(30);
var n6 = new Node(77);
var n7 = new Node(92);

var tree = new BinaryTree(n1);
n1.append(n2);
n1.append(n3);
n2.append(n6);
n2.append(n7);
n3.append(n5);
n3.append(n4);