var Queue = function () {
    this.length = 0;
    this.data = [];
};

Queue.prototype = {
    enqueue: function (el) {
        this.length++;
        return this.data.push(el);
    },

    dequeue: function() {
        if (this.length > 0) this.length--;
        return this.data.shift();
    },

    run: function (cb) {
        while(this.length !== 0) {
            cb(this.peek());
            this.dequeue();
      }
    },

    map: function (cb) {
        this.data = this.data.map(cb);
        return this.data;
    },

    newArr: function (cb) {
        return this.data.map(cb);
    },

    clear: function () {
        this.length = 0;
        this.data = [];
    },

    peek: function () {
        return this.data[0];
    },

    end: function() {
        if (this.data.length > -1) {
        return this.data[this.data.length - 1];
      }
    },

    toString: function () {
        var str = '';
        this.data.forEach(function (el) {
            str += (el + '\n');
        })
        return str;
    }
};

//example 1
var shoppingLine = new Queue();

shoppingLine.enqueue('Char');
shoppingLine.enqueue('Meow');
shoppingLine.enqueue('Derp');
shoppingLine.enqueue('Molo');
shoppingLine.toString();
shoppingLine.dequeue();
shoppingLine.toString();

//example 2
var femaleList = new Queue();
var maleList = new Queue();

var dancers = "F Emma; F Olivia; F Ava; F Sophia; F Isabela; M Liam; M Noah; M Jacod; M Mason; M Jackson; M Ethan; M Alexander";

var sortDancers = function (list) {
    var dancerList = list.split(';')
                         .map(function (el) {return el.trim()})
                         .map(function (el) {return el.split(' ')});
    dancerList.forEach(function (dancer) {
        (dancer[0] === 'M') ? maleList.enqueue(dancer[1]) : femaleList.enqueue(dancer[1]);
    });
};

var dance = function (list) {
    var story = '';
    sortDancers(list);
    while (femaleList.length && maleList.length) {
        story += (femaleList.dequeue() + ' & ' + maleList.dequeue() + '\n');
    }
    if (femaleList.length !== 0) story += (femaleList.peek() + " is waiting to dance.");
    if (maleList.length !== 0) story += (maleList.peek() + " is waiting to dance.")
    return story;
};

//example 3
var sortByRadix = function (arr) { 
    var ones = [], temp = [],
        storeInTemp = function (n) { 
            n.run(function (e) {temp.push(e)});
        };
    for (var i = 0; i < 10; i++) {
        ones[i] = new Queue();
    }
    arr.forEach(function(n) { //sort numbers by first digit
        ones[n % 10].enqueue(n);
    })
    ones.forEach(storeInTemp);
    temp.forEach(function(n) { //sort by second digit
        if (n.toString().length === 1) {
            ones[0].enqueue(n);
        } else {
            ones[Math.floor(n / 10)].enqueue(n);
        }
    })
    temp = [];
    ones.forEach(storeInTemp);
    return temp;
};

//example 4
var PriorityQueue = function () { //Queue that considers priority over order
    this.data = [];
};

PriorityQueue.prototype = Object.create(Queue.prototype);

PriorityQueue.prototype.firstPlace = function () { //finds place of the first high priority element
    var priority = this.data[0].code,
        place = 0, i;
    for (i = 1; i < this.data.length; i++) {
        if (this.data[i].code > priority) {
            priority = this.data[i].code;
            place = i;
        }
    }
    return place;
};

PriorityQueue.prototype.enqueue = function (el) {
    this.length++;
    return this.data.push(el);
};

PriorityQueue.prototype.dequeue = function () {
    this.length--;
    return this.data.splice(this.firstPlace(),1);
};

PriorityQueue.prototype.peek = function () {
        return this.data[this.firstPlace()];
};

var nameGen = function () {
    var name = '',
        numGen = function () {
            return Math.floor((97 + Math.random() * 25));
        },
        capitalize = function (str) {
            return str[0].toUpperCase() + str.slice(1);
        };
    for (var i = 0; i < Math.floor(Math.random() * 11); i++) {
        name += String.fromCharCode(numGen())
    }
    return name.length < 2 ? nameGen(): capitalize(name);
};

var randomCodeGen = function () {
    var code = Math.floor(Math.random() * 6);
    return (code === 0 || code > 5) ? randomCodeGen() : code;
};

var randomPerson = function () {
    var obj = {};
    obj.name = nameGen();
    obj.code = randomCodeGen();
    return obj;
};

var er = new PriorityQueue();

for (var i = 0; i < 12; i++) {
    er.enqueue(randomPerson());
}

//example 5
var Deque = function () {
    this.data = [];
};

Deque.prototype = Object.create(Queue);

Deque.enqFront = function (el) {
    this.data.unshift(el);
};

var isPalindrome = function (str) {
    var store = new Deque(),
        i = 0, palin = true;
    str.split('').forEach(function (ltr) {
        if (ltr !== ' ') store.enqFront(ltr);
    });
    str = str.split(' ').join('');
    for (; i < str.length; i++) {
        if (str[i] !== store.data[i]) palin = false;
    }
    return palin;
};


