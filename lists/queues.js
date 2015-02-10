var queue = {
    length: 0,
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

var newQueue = function () {
    var obj = Object.create(queue);
    obj.data = [];
    return obj;
}

/*
  //example 1
var shoppingLine = newQueue();


shoppingLine.enqueue('Char');
shoppingLine.enqueue('Meow');
shoppingLine.enqueue('Derp');
shoppingLine.enqueue('Molo');
console.log(shoppingLine.toString());
console.log('front is char right ? ' + shoppingLine.peek());
console.log('back is Molo right ? ' + shoppingLine.end());
shoppingLine.dequeue();
console.log(shoppingLine.toString());

*/

/*
//book example 2


var femaleList = newQueue();
var maleList = newQueue();

var dancers = "F Emma; F Olivia; F Ava; F Sophia; F Isabela; M Liam; M Noah; M Jacod; M Mason; M Jackson; M Ethan; M Alexander";

var sortDancers = function (list) {
    var dancerList = list.split(';').map(function (el) {return el.trim()}).map(function (el) {return el.split(' ')});
    dancerList.forEach(function (arr) {
        (arr[0] === 'M') ? maleList.enqueue(arr[1]) : femaleList.enqueue(arr[1]);
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
*/
/*
//example 3
var sortByRadix = function (arr) {
    var bins = [],
        temp = [],
        storeTemp = function (n) { //store in temp array
            n.run(function (e) {temp.push(e)});
        };
    for (var i = 0; i < 10; i++) { //list of bins
        bins[i] = newQueue();
    }
    arr.forEach(function(n) { //sort by first digit
        bins[n % 10].enqueue(n);
    })
    bins.forEach(storeTemp);
    temp.forEach(function(n) { //sort by second digit
        if (n.toString().length === 1) {
            bins[0].enqueue(n);
        } else {
            bins[Math.floor(n / 10)].enqueue(n);
        }
    })
    temp = [];
    bins.forEach(storeTemp);
    return temp;
};
*/
/*
//example 4
var newPriorityQueue = function () {
    var obj = Object.create(queue);
    obj.data = [];
    obj.enqueue = function (el) {
        this.length++;
        return this.data.push(el);
    };
    obj.dequeue = function () {
        var priority = this.data[0].code,
            place = 0,
            i;
        for (i = 1; i < this.data.length; i++) {
            if (this.data[i].code > priority) {
                priority = this.data[i].code;
                place = i;
            }
        }
        this.length--;
        return this.data.splice(place,1);
    };
    obj.peek = function () {
        var priority = this.data[0].code,
            place = 0,
            i;
        for (i = 1; i < this.data.length; i++) {
            if (this.data[i].code > priority) {
                priority = this.data[i].code;
                place = i;
            }
        }
        return this.data[place];
    };
    return obj;
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
}

var randomCodeGen = function () {
    var code = Math.floor(Math.random() * 6);
    return (code === 0 || code > 5) ? randomCodeGen() : code;
}

var randomPerson = function () {
    var obj = {};
    obj.name = nameGen();
    obj.code = randomCodeGen();
    return obj;
};

var er = newPriorityQueue();

for (var i = 0; i < 12; i++) {
    er.enqueue(randomPerson());
}
*/

/*
//example 5
var newDeque = function () {
    var obj = Object.create(queue);
    obj.data = [];
    obj.enqFront = function (el) {
        this.data.unshift(el);
    }
    return obj;
};

var isPalindrome = function (str) {
    var store = newDeque(),
        i = 0,
        palin = true;
    str.split('').forEach(function (let) {
        if (let !== ' ') store.enqFront(let);
    });
    str = str.split(' ').join('');
    for (; i < str.length; i++) {
        if (str[i] !== store.data[i]) palin = false;
    }
    return palin;
};
*/

