var letterCase = function (str) {
  return str.split('').map(function (char) {
      return (/[a-z]/i.test(char)) ? char.toLowerCase().charCodeAt() - 96 : char;
  }).join('');
}

var matrixGen = function (rows, colums, vals) {
    var arr = [], i, j;
    for (i = 0; i < rows; i++) {
        arr[i] = [];
        for (j = 0; j < colums; j++) {
          arr[i][j] = vals;
        }
    }
    return arr;
}

var grades = [[65,78,89],[54,78,86],[67,89,76]];

var findMatrixLength = function (arr) {
    var total = 0;
    arr.forEach(function (col) {
        total += col.length
    });
    return total;
}

var sum = function (a,b) {
    return a + b;
}

var classAvg = function (grades) {
    var numOfTests = findMatrixLength(grades),
        total = grades.map(function (arr) {return arr.reduce(sum)}).reduce(sum);
    return (total/numOfTests).toFixed(2);
}

var studentAvg = function (grades) {
    var id = 0;
    return grades.map(function (arr) {
          id++;
          return 'Student ' + id + ' average score is ' + (arr.reduce(sum)/arr.length).toFixed(2);
      });
}

var testAvg = function (grades) {
    var tests = [], i, j,
        numOfTests = grades[0].length;
    for (i = 0; i < grades[0].length; i++) {
        total = 0;
        for (j = 0; j < grades.length; j++) {
            total += grades[j][i];
        }
        tests[i] = "Test" + (i + 1) + ' average score is ' + (total/numOfTests).toFixed(2);
    }
    return tests;
};

var weekTemps = function () {
    this.dataStore = [];
}

weekTemps.prototype = {
    weekAverage: function (wk) {
        return (this.dataStore[wk - 1].reduce(sum) / this.dataStore[wk - 1].length).toFixed(2);
    },

    weeksAverage: function () {
        var weeks = [],
            n = 0;
        this.dataStore
            .map(function (wk) {
              return (wk.reduce(sum) / wk.length).toFixed(2)
            })
            .forEach(function (wk) {
               n++; 
               weeks.push('week' + n + ' average: ' + wk) 
            });
        return weeks.join(', ');
    },

    monthAverage: function () {
        var numOfDays = 0;
        this.dataStore.forEach(function (wk) {
            numOfDays += wk.length;
        });
        return (this.dataStore.map(function (wk) { return wk.reduce(sum)}).reduce(sum)/numOfDays).toFixed(2);
    },

    add: function (temp) {
        if (this.dataStore.length === 0 || this.dataStore[this.dataStore.length - 1].length === 7) {
            this.dataStore.push([temp])
        } else {
            this.dataStore[this.dataStore.length - 1].push(temp);
        }
    };
};

var week = new weekTemps();

var Grades = function () {
    this.tests = [];
};

Grades.prototype = {
    add: function (test) {
        this.tests.push(test);
        return 'test added!';
    },
    average: function () {
        var total = this.tests.reduce(sum);
        return (total / this.tests.length).toFixed(2);
    }
};

var student1 = new Grades();

