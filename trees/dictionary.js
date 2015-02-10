var dictionary = {
    add: function (key, val) {
        this.data[key] = val;
    },
    remove: function (key) {
        delete this.data[key];
    },
    display: function () {
        for (var key in this.data) {
            if (this.data.hasOwnProperty(key)) {
               console.log(key + ' -> ' + this.data[key]);
            }
        }
    },
    find: function (key) {
        return this.data[key];
    },
    contains: function (key) {
        return this.data.hasOwnProperty(key);
    },
    length: function () {
        var count = 0,
            key;
        for (key in this.data) {
          count++;
        }
        return count;
    },
    clear: function () {
        var key;
        for (key in this.data) {
            delete this.data[key];
        }
    },
    increment: function (key) {
        (this.contains(key)) ? this.data[key]++ : this.add(key, 1);
    },
    sort: function (cb) {
        var newData = {},
            keysArr = [],
            dictionary = this,
            key;
        for (key in this.data) {
            keysArr.push(key);
        }
        keysArr.sort(cb);
        keysArr.forEach(function (key) {
            newData[key] = dictionary.data[key];
        })
        this.data = newData;
    }
}

var makeDictionary = function () {
    var obj = Object.create(dictionary);
    obj.data = {};
    return obj;
}

var obj = makeDictionary();
obj.add('uno', 1);
obj.add('dose', 'two');
obj.add('thress', 'three');
