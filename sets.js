var Set = function () {
    this.data = [];
}

Set.prototype = {
    add: function (n) {
        if (!this.contains(n)) {
            this.data.push(n);
            return true;
        } else {
            return false;
        }
    },

    remove: function (e) {
        this.data.splice(this.data.indexOf(e), 1);
    },

    contains: function (e) {
        return this.data.indexOf(e) > -1 ? true : false;
    },

    union: function (set) { //combines unique elements of two sets
        var self = this;
        return this.data.concat(set.data.filter(function (e) {return !self.contains(e)}));
    },

    intersect: function (set) { 
        return this.data.filter(function (n) {return (set.contains(n))})
    },

    difference: function (set) {
        return this.data.filter(function (n) {return (!set.contains(n))})
    },

    subset: function (set) {
        return this.data.every(function (e) {return (set.contains(e))})
    },

    show: function () {
        return this.data;        
    },

    size: function () {
        return this.data.length;
    }
};


var obj = new Set();
obj.add(3);
obj.add(32);
obj.add(45);
obj.add(4);

var obj1 = new Set();
obj1.add(32);
obj1.add(3);
obj1.add(144);

