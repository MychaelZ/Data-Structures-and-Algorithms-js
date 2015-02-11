var Node = function (el) {
    this.element = el;
    this.next = null;
};

var LinkedList = function () {
    this.head = new Node('head');
};

LinkedList.prototype = {
    insert: function (item, at) {
        var at = this.find(at || this.head.element);
        if (typeof item !== 'object') {
            item = new Node(item);
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

    last: function () {
        var current = this.head.next;
        while (current.next !== null) {
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
    }
};

var node1 = new Node(1);
var node2 = new Node(2);
var list = new LinkedList();

list.insert(node1);
list.insert(node2, 1);

//example 2

var Node = function (el) {
    this.element = el;
    this.next = null;
    this.prev = null;
};


var DoubleLinkedList = function () {
    this.head = new Node('head');
};

DoubleLinkedList.prototype = Object.create(LinkedList.prototype);

DoubleLinkedList.prototype.insert = function (item, at) {
    var at = this.find(at || this.head.element);
    if (typeof item !== 'object') {
        item = new Node(item);
    }
    item.next = at.next;
    item.prev = at;
    at.next = item;
};

DoubleLinkedList.prototype.remove = function (item) {
    var node = this.find(item),
        prevNode = node.prev,
        afterNode = (node) ? node.next : null;
    if (afterNode) {
        afterNode.prev = prevNode;
    }
    prevNode.next = afterNode;
    node.next = null;
    node.prev = null;
};

DoubleLinkedList.prototype.runRev = function (cb) {
    var start = this.last();
    while (start !== this.head) {
        cb(start);
        start = start.prev;
    }
};

DoubleLinkedList.prototype.displayRev = function () {
    this.runRev(function (e) {
        console.log(e.element);
    });
};


var node1 = new Node(1);
var node2 = new Node(2);
var list = new DoubleLinkedList();

list.insert(node1);
list.insert(node2, 1);

//example 3

var CircularLinkingList = function () {
    this.head = new Node('head');
    this.head.next = this.head;
};

CircularLinkingList.prototype = Object.create(DoubleLinkedList.prototype);

CircularLinkingList.prototype.insert = function (item, at) { 
    var at = this.find(at || this.head.element);
    if (typeof item !== 'object') {
        item = new Node(item);
    }
    at.next.prev = item;
    item.next = at.next;
    item.prev = at;
    at.next = item;
};

CircularLinkingList.prototype.find = function (item) { 
    var current = this.head.next;
    while (current !== this.head && current.element !== item) {
        current = current.next;
    }
    return current;
};

CircularLinkingList.prototype.run = function (cb) { 
    var node = this.head.next;
    while (node !== this.head) {
        cb(node);
        node = node.next;
    }
};

CircularLinkingList.prototype.last = function () { 
    var current = this.head.next;
    while (current.next !== this.head) {
        current = current.next;
    }
    return current;
};

CircularLinkingList.prototype.advance = function (item, moves) {
    var node = this.find(item),
        start = node, i;
    for (i = 0; i < moves; i++) {
        start = start.next;
    }
    this.adjust(node, start);
};

CircularLinkingList.prototype.back = function (item, moves) {
    var node = this.find(item),
        start = node.prev, i;
    for (i = 0; i < moves; i++) {
        start = (start.prev) ? start.prev : this.last();
    }
    this.adjust(node, start);
};

CircularLinkingList.prototype.adjust = function (node, start) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    node.prev = start;
    node.next = start.next;
    node.next.prev = node;
    start.next = node;
};


var arr = [];

for (var i = 1; i < 10; i++) {
    arr.push(new Node(i));
}

var list = new CircularLinkingList();

for (var i = arr.length - 1; i >= 0; i--) {
    list.insert(arr[i]);
}