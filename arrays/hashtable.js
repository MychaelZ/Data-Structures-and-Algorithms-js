var hashTable = {
    hash: function (data) {
        return data.split('')
                   .map(function (n) {return n.charCodeAt(0)})
                   .reduce(function (a,b) {return a + b})
    },
    showDistro: function() {
        return this.table.forEach(function (n, i) {
            if (n !== 'undefined') {
                console.log(i + ' -> ' + n);
            }
        });
    },
    put: function (data) {
        this.table[this.hash(data)] = data;
    },
    get: function (n) {
        return this.table[n];
    }
}

var createHashTable = function () {
    var obj = Object.create(hashTable);
    obj.table = [];
    return obj;
}

