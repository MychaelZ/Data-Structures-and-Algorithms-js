var Node = function (el) {
    var obj = {};
    obj.element = el;
    obj.next = null;
    return obj;
}

var LinkedList = {
    insert: function (item, at) {
        var at = this.find(at || this.head.element);
        if (typeof item !== 'object') {
            item = Node(item);
        }
        item.next = at.next;
        at.next = item;
    },
    remove: function (item) {
        var prevNode = this.findPrevious(item),
            node = prevNode.next,
            afterNode = (node) ? node.next : null;
        prevNode.next = afterNode;
        node.next = null;
    },
    find: function (item) {
        var current = this.head;
        while (current !== null && current.element !== item) {
            current = current.next;
        }
        return current;
    },
    findPrevious: function (item) {
        var current = this.head;
        while (current !== null && current.next.element !== item) {
            current = current.next;
        }
        return current;
    },
    run: function (cb) {
        var node = this.head;
        while (node !== null) {
            cb(node);
            node = node.next;
        }
    },
    display: function () {
        this.run(function (e) {
            console.log(e.element);
        });
    }
}

var makeLinkedList = function () {
    var obj = Object.create(LinkedList);
    obj.head = Node('head');
    return obj;
}

var node1 = Node(1);
var node2 = Node(2);
var list = makeLinkedList();

list.insert(node1);
list.insert(node2, 1);

//example 2

var Node = function (el) {
    var obj = {};
    obj.element = el;
    obj.next = null;
    obj.prev = null;
    return obj;
}


var DoubleLinkedList = {
    insert: function (item, at) {
        var at = this.find(at || this.head.element);
        if (typeof item !== 'object') {
            item = Node(item);
        }
        item.next = at.next;
        item.prev = at;
        at.next = item;
    },
    remove: function (item) {
        var prevNode = this.find(item).prev,
            node = prevNode.next,
            afterNode = (node) ? node.next : null;
        if (afterNode) {
            afterNode.prev = prevNode;
        }
        prevNode.next = afterNode;
        node.next = null;
        node.prev = null;
    },
    find: function (item) {
        var current = this.head;
        while (current !== null && current.element !== item) {
            current = current.next;
        }
        return current;
    },
    run: function (cb) {
        var node = this.head.next;
        while (node !== null) {
            cb(node);
            node = node.next;
        }
    },
    display: function () {
        this.run(function (e) {
            console.log(e.element);
        });
    },
    last: function () {
        var current = this.head;
        while (current.next !== null) {
            current = current.next;
        }
        return current;
    },
    runRev: function (cb) {
        var start = this.last();
        while (start.prev !== null) {
            cb(start);
            start = start.prev;
        }
    },
    displayRev: function () {
        this.runRev(function (e) {
            console.log(e.element)
        });
    }
}
var makeLinkedList = function () {
    var obj = Object.create(DoubleLinkedList);
    obj.head = Node('head');
    return obj;
}

var node1 = Node(1);
var node2 = Node(2);
var list = makeLinkedList();

list.insert(node1);
list.insert(node2, 1);

//example 3

var Node = function (el) {
    var obj = {};
    obj.element = el;
    obj.next = null;
    obj.prev = null
    return obj;
}

var circularLinkingList = {
    insert: function (item, at) {
        var at = this.find(at || this.head.element);
        if (typeof item !== 'object') {
            item = Node(item);
        }
        at.next.prev = item;
        item.next = at.next;
        item.prev = at;
        at.next = item;
    },
    remove: function (item) {
        var prevNode = this.find(item).prev,
            node = prevNode.next,
            afterNode = (node) ? node.next : null;
        if (afterNode) {
            afterNode.prev = prevNode;
        }
        prevNode.next = afterNode;
        node.next = null;
        node.prev = null;
    },
    find: function (item) {
        var current = this.head.next;
        while (current !== this.head && current.element !== item) {
            current = current.next;
        }
        return current;
    },
    run: function (cb) {
        var node = this.head.next;
        while (node !== this.head) {
            cb(node);
            node = node.next;
        }
    },
    display: function () {
        this.run(function (e) {
            console.log(e.element);
        });
    },
    last: function () {
        var current = this.head.next;
        while (current.next !== this.head) {
            current = current.next;
        }
        return current;
    },
    runRev: function (cb) {
        var start = this.last();
        while (start.prev !== null) {
            cb(start);
            start = start.prev;
        }
    },
    displayRev: function () {
        this.runRev(function (e) {
            console.log(e.element)
        });
    }}

var makeLinkedList = function () {
    var obj = Object.create(circularLinkingList);
    obj.head = Node('head');
    obj.head.next = obj.head;
    return obj;
}

var arr = [];

for (var i = 1; i < 10; i++) {
   arr.push(Node(i));
}

var list = makeLinkedList();

for (var i = 0; i < arr.length; i++) {
    list.insert(arr[i]);
}

//example 4

var Node = function (el) {
    var obj = {};
    obj.element = el;
    obj.next = null;
    obj.prev = null
    return obj;
}

var circularLinkingList = {
    insert: function (item, at) {
        var at = this.find(at || this.head.element);
        if (typeof item !== 'object') {
            item = Node(item);
        }
        at.next.prev = item;
        item.next = at.next;
        item.prev = at;
        at.next = item;
    },
    remove: function (item) {
        var prevNode = this.find(item).prev,
            node = prevNode.next,
            afterNode = (node) ? node.next : null;
        if (afterNode) {
            afterNode.prev = prevNode;
        }
        prevNode.next = afterNode;
        node.next = null;
        node.prev = null;
    },
    advance: function (item, moves) {
        var node = this.find(item),
            start = node,
            i;
        for (i = 0; i < moves; i++) {
            start = start.next;
        }
        this.adjust(node, start);
    },
    back: function (item, moves) {
        var node = this.find(item),
            start = node.prev,
            i;
        for (i = 0; i < moves; i++) {
            start = (start.prev) ? start.prev : this.last();
        }
        this.adjust(node, start);
    },
    adjust: function (node, start) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        node.prev = start;
        node.next = start.next;
        node.next.prev = node;
        start.next = node;
    },
    find: function (item) {
        var current = this.head.next;
        while (current !== this.head && current.element !== item) {
            current = current.next;
        }
        return current;
    },
    run: function (cb) {
        var node = this.head.next;
        while (node !== this.head) {
            cb(node);
            node = node.next;
        }
    },
    display: function () {
        this.run(function (e) {
            console.log(e.element);
        });
    },
    last: function () {
        var current = this.head.next;
        while (current.next !== this.head) {
            current = current.next;
        }
        return current;
    },
    runRev: function (cb) {
        var start = this.last();
        while (start.prev !== null) {
            cb(start);
            start = start.prev;
        }
    },
    displayRev: function () {
        this.runRev(function (e) {
            console.log(e.element)
        });
    }}

var makeLinkedList = function () {
    var obj = Object.create(circularLinkingList);
    obj.head = Node('head');
    obj.head.next = obj.head;
    return obj;
}

var arr = [];

for (var i = 10; i > 0; i--) {
   arr.push(Node(i));
}

var list = makeLinkedList();

for (var i = 0; i < arr.length; i++) {
    list.insert(arr[i]);
}