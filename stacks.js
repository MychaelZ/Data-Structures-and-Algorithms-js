var Stack = function () {
    this.dataStore = [];
    this.top = 0;
};

Stack.prototype = {
    push: function (val) {
      	this.top++;
      	return this.dataStore.push(val);
    },

    pop: function () {
      	this.top--;
      	return this.dataStore.pop();
    },

    peek: function () {
        return (this.dataStore.length > -1) ? this.dataStore[this.dataStore.length - 1] : false;
    },

    clear: function () {
      	this.dataStore = [];
      	this.top = 0;
      	return 'Data store cleared.'
    },

    length: function () {
      	return this.dataStore.length;
    }
};

//Examples of uses

function filterStack(stack, val) {
    var holder = new Stack();
    while (stack.length() > 0) {
        (stack.peek() !== val) ? holder.push(stack.pop()) : stack.pop();
    }
    while(holder.length() > 0) {
        stack.push(holder.pop());
    }
    return stack;
}


function baseChange(n,b) {
    var stk = new Stack(), converted = '';
    while(n > 0) {
      	stk.push(n % b);
      	n = Math.floor(n / b);
    }
    while (stk.length() > 0) {
        converted += stk.pop();
    }
    return converted;
}

function isPalindrome(str) {
    var stk = new Stack(),
        i = 0, isPalin = true, str = str.split(' ').join('');
    str.split('').forEach(function (let) {
        stk.push(let);
    });
    while(stk.length() > 0) {
      	if (str[i] !== stk.pop()) isPalin = false;
      	i++;
    }
    return isPalin;
}

