//my stack constructor
var stack = {
  dataStore: [],
  top: 0,
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

//pez dispenser example
var pez1 = Object.create(stack);
pez1.dataStore = [];

pez1.push('yellow')
pez1.push('red')
pez1.push('blue')
pez1.push('red')
pez1.push('yellow')
pez1.push('blue')
pez1.push('blue')
pez1.push('yellow')
pez1.push('red')
pez1.push('yellow')
pez1.push('red')

function cleanYellows(pez) {
  var holder = Object.create(stack);
  holder.dataStore = [];
  while (pez.length() > 0) {
  	(pez.peek() !== 'yellow') ? holder.push(pez.pop()) : pez.pop();
  }
  while(holder.length() > 0) {
  	pez.push(holder.pop());
  }
  return pez;
}

//book example
var s = Object.create(stack);
s.dataStore = [];

s.push('Mike');
s.push('John');
s.push('Ryan');
console.log('Length: ' + s.length());
console.log(s.peek());
var popped = s.pop();
console.log('element that was popped ' + popped);
console.log(s.peek());
s.push('Cynthia');
console.log(s.peek());
s.clear();
console.log(s.peek());
console.log('length: ' + s.length());
s.push('Bill');
console.log(s.peek())

function multiBase(n,b) {
  var stk = Object.create(stack),
  converted = '';
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
  var stk = Object.create(stack),
  i = 0,
  isPalin = true;
  str.split('').forEach(
    function (let) {
      stk.push(let);
  });
  while(stk.length() > 0) {
  	if (str[i] !== stk.pop()) {
  	  isPalin = false;
  	}
  	i++;
  }
  return isPalin;
}

