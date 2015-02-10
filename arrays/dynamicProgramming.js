var fib = function (n) {
    return (fib.seq[n]) ? fib.seq[n] : fib.seq[n] = fib(n-1) + fib(n-2);
}

fib.seq = [0,1,1];


Array.prototype.max = function () {
    var i = 1, larg = this[0];
    for (; i < this.length; i++) {
        if (this[i] > larg) {
            larg = this[i];
        }
    }
    return larg;
}

var lcs = function (str1, str2) {
    var max = 0, index, i = 0, j,
        matches = [];
    for (; i < str1.length; i++) {
        matches.push([]); //creates array for each letter in str1
        for (j = 0; j < str2.length; j++) {
            if (str1[i] === str2[j]) {
                matches[i][j] = (i === 0 || j === 0) ? 1 : matches[i-1][j-1] + 1;
            } else {
                matches[i][j] = 0;
            }
        }
        if (matches[i].max() > max) {
            max = matches[i].max();
            index = i;
        }
    };
    return str1.slice(index + 1 - max, index + 1);
}; 

var knapsack = function (cap, vals, weights, n) {
    if (cap === 0 || n === 0) {
        return 0;
    }
    if (weights[n - 1] > cap) {
        return knapsack(cap, vals, weights, n - 1);
    } else {
        return Math.max((vals[n - 1] + knapsack(cap - weights[n - 1], vals, weights, n - 1)), knapsack(cap, vals, weights, n - 1));
    }
}

var knapsack = function (cap, itemV, itemW) {
    var k = [], i = 0, w, n = itemV.length;
    for (; i < n; i++) {
        k[i] = [];
        for (w = 0; w <= cap; w++) {
            if (itemW[i] > w || i === 0) {
                k[i][w] = (i !== 0) ? k[i-1][w] : 0;
            } else { 
                k[i][w] = Math.max(itemV[i] + k[i-1][w-itemW[i]], k[i-1][w]);
            }
        }
    }
    return k[n-1][cap];
}
