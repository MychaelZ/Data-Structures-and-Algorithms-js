var arrayMaker = function (size) {
    this.data = [];
    this.pos = 0;
    for (var i = 0; i < size; i++) {
        this.data[i] = i;
    }
};

arrayMaker.prototype = {
    insert: function (el) {
        this.data[this.data.length] = el;
    },

    swap: function (ind1, ind2) {
        var el1 = this.data[ind1], 
            el2 = this.data[ind2];
        this.data[ind1] = el2;
        this.data[ind2] = el1;
    },

    clear: function () {
        for (var i = 0; i < this.data.length; i++) {
            this.data[i] = 0;
        }
    },

    setData: function () {
        var size = this.data.length, i;
        for (i = 0; i < size; i++) {
            this.data[i] = Math.floor(Math.random() * (size + 1));
        }
    },

    toString: function () {
        var str = '', i;
        for (i = 0; i < this.data.length; i++) {
            str += this.data[i] + ' ';
            if (i > 0 && i % 10 === 0) {
                str += '\n';
            }
        }
        return str;
    },

    bubbleSort: function () { 
        var sorted = true, i;
        while (!sorted) {
          sorted = true;
          for (i = 0; i < this.data.length - 1; i++) {
              if (this.data[i] > this.data[i + 1]) {
                  sorted = false;
                  this.swap(i, i + 1);
              }
          }
        }
        return this.data;
    },

    selectionSort: function () {
        var smallest,
            index,
            num,
            i, j;

        for (i = 0; i < this.data.length; i++) {
            smallest = this.data[i];
            index = i;
            for (j = i; j < this.data.length; j++) {
                num = this.data[j];
                if (smallest > num) {
                    smallest = num;
                    index = j;
                }
            }
            this.swap(i, index);
        }
        return this.data;
    },

    insertSort: function () {
        var temp, i = 1;
        for (; i < this.data.length; i++) {
            currNum = this.data[i];
            index = i;
            while (index > 0 && this.data[index - 1] >= currNum) {
                this.data[index] = this.data[index - 1];
                index--;
            }
            this.data[index] = currNum;
        }
        return this.data;
    },

    shellSort: function () {
        var gap = 5, i, j;
        for (; gap >= 1; gap -= 2) {
            for (i = gap; i < this.data.length; i++) {
                var currNum = this.data[i];
                for (j = i; j >= gap && this.data[j - gap] > currNum; j -= gap) {
                    this.data[j] = this.data[j - gap];
                }
                this.data[j] = currNum;
            }
        }
        return this.data;
    },

    mergeSort: function () {
        var i, container = [], 
            sort = function (arr1, arr2) {
                var subArr = [], i;
                while (arr1.length > 0 && arr2.length > 0) {
                    (arr1[0] > arr2[0]) ? subArr.push(arr2.shift()) : subArr.push(arr1.shift());
                }
                subArr = arr1.length > arr2.length ? subArr.concat(arr1) : subArr.concat(arr2);
                return subArr;
            };
        for (i = 0; i < this.data.length; i++) {
            container.push([this.data[i]]);
        }
        while (container.length !== 1) {
            if (container.length % 2 !== 0) container.splice(0, 2, sort(container[0], container[1]));
            for (i = 0; i < container.length; i++) {  
                container.splice(i, 2, sort(container[i], container[i + 1]));
            }
        };
        this.data = container[0];
        return this.data;
    },

    quickSort: function (arr) {
        var arr = arr || this.data,
            pivot, i = 1, left = [], right = [];
        if (arr.length === 0) return [];
        pivot = arr[0];
        for (; i < arr.length; i++) {
            (pivot < arr[i]) ? right.push(arr[i]) : left.push(arr[i]);
        }
        return this.quickSort(left).concat(pivot, this.quickSort(right));
    },

    binSearch: function (item) {
        this.selectionSort();
        var data = this.data, 
            upper = data.length,
            lower = 0,
            mid = Math.floor((upper + lower)/2);
        while (mid > 1) {
            if (data[mid] > item) {
                upper = mid;
            } else if (data[mid] < item) {
                lower = mid;
            } else {
                return mid;
            }
            mid = Math.floor((upper + lower)/2);
        }
        return data[mid] === item ? mid : -1;
    },

    numberOf: function (item) {
        var index = this.binSearch(item),
            i = index,
            count = -1;
        for (; this.data[i] === item; i--) {
            count++;
        };
        for (i = index; this.data[i] === item; i++) {
            count++;
        };
        return count;
    },
    test: function (method) {
        var sumOfMils = 0,
            arr = new arrayMaker(1000),
            i = 0, mil1, mil2;
        for (; i < 100; i++) {
            arr.setData();
            mil1 = new Date().getTime();
            arr[method]();
            mil2 = new Date().getTime();
            sumOfMils += (mil2 - mil1);
            arr.clear();
        }
        return sumOfMils / 100;
    }
};

var arr = new arrayMaker(100);
arr.setData();