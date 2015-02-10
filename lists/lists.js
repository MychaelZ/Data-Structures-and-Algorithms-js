//object where all my lists come from (AKA constructor)
var list = {
	pos: 0,
	dataStorage: [],
	clear: function () {
	  this.dataStorage = [];
	  return "data storage cleared.";
	},
	find: function (el) {
	  return this.dataStorage.indexOf(el);
	},
	toString: function () {
	  return this.dataStorage.join(', ');
	},
	insert: function (el) {
	  this.dataStorage.splice((this.pos + 1), 0, el);
	  return 'added ' + el + ' at ' + (this.pos + 1) + ' index.';
	},
	append: function (el) {
	  this.dataStorage.push(el);
	},
	remove: function (el) {
	  var pos = this.find(el);
	  pos > -1 ? this.dataStorage.splice(pos, 1) : el = false;
	  return el;
	},
	front: function () {
	  this.pos = 0;
	  return this.pos;
	},
	end: function () {
	  this.pos = this.dataStorage.length - 1;
	  return this.pos;
	},
	prev: function () {
	  this.pos > -1 ? this.pos-- : false;
	  return this.pos;
	},
	next: function () {
	  this.pos < (this.dataStorage.length) ? this.pos++ : false;
	  return this.pos;
	},
	currPos: function () {
	  return this.pos;
	},
	moveTo: function (ind) {
	  this.pos = ind;
	  return this.pos;
	},
	length: function () {
	  return this.dataStorage.length - 1;
	},
	getElement: function () {
	  return this.dataStorage[this.pos];
	},
	contains: function (el) {
	  return (this.find(el) > -1) ? true : false;
	}
};

//function that creates new Lists
var newList = function () {
  obj = Object.create(list);
  obj.dataStorage = [];
  return obj;
}

//new list item
var list1 = newList();

for (var i = 0; i < 10; i++) {
  list1.append(i);
}

// exercise1 :
/* 
var list = {
	pos: 0,
	dataStorage: [],
	clear: function () {
	  this.dataStorage = [];
	  return "data storage cleared.";
	},
	find: function (el) {
	  return this.dataStorage.indexOf(el);
	},
	toString: function () {
	  return this.dataStorage.join(', ');
	},
	insert: function (el) {
	  var greater;
	  if (typeof el === 'string') {
	  	greater = 
	  	this.dataStorage.every(
	  	  function (li) {
	  	  	return el.charCodeAt() > li.charCodeAt();
	  	});
	  } else if (typeof el === 'number') {
	  	greater = 
	  	this.dataStorage.every(
	  	  function (li) {
	  	    return el > li;
	  	})
	  }
	  if (greater) {
	    this.dataStorage.splice((this.pos + 1), 0, el);
	    return 'added ' + el + ' at ' + (this.pos + 1) + ' index.';
	  } else {
	  	return 'Not added.'
	  }
	},
	append: function (el) {
	  this.dataStorage.push(el);
	},
	remove: function (el) {
	  var pos = this.find(el);
	  pos > -1 ? this.dataStorage.splice(pos, 1) : el = 'nothing';
	  return el + ' was removed.';
	},
	front: function () {
	  this.pos = 0;
	  return this.pos;
	},
	end: function () {
	  this.pos = this.dataStorage.length - 1;
	  return this.pos;
	},
	prev: function () {
	  this.pos > -1 ? this.pos-- : false;
	  return this.pos;
	},
	next: function () {
	  this.pos < (this.dataStorage.length) ? this.pos++ : false;
	  return this.pos;
	},
	currPos: function () {
	  return this.pos;
	},
	moveTo: function (ind) {
	  this.pos = ind;
	  return this.pos;
	},
	length: function () {
	  return this.dataStorage.length - 1;
	},
	getElement: function () {
	  return this.dataStorage[this.pos];
	},
	contains: function (el) {
	  return (this.find(el) > -1) ? true : false;
	}
};

var newList = function () {
  obj = Object.create(list);
  obj.dataStorage = [];
  return obj;
}
var list1 = newList();

for (var i = 0; i < 10; i++) {
  list1.insert(i);
}
*/

// exercise3:

var Person = {
  dataStorage: [],
  add: function (per) {
  	this.dataStorage.push(per);
  	return per + ' added';
  },
  viewByGender: function(gen) {
  	return this.dataStorage.filter(function (per) {
  	  return per.gen === gen;
  	})
  }
};

var newPersonList = function () {
  var obj = Object.create(Person);
  obj.dataStorage = [];
  return obj;
}

var pList = newPersonList();

// exercise4
var redBox = newList();
redBox.displayList = function () {
  for (var i = 0; i < this.dataStorage.length; i++) {
  	console.log(this.dataStorage[i]);
  }
};

redBox.customers = [];
redBox.customers.remove = function (movie) {
  var pos = false;
  for (var i = 0; i < this.length; i++) {
    if (this[i]['movie'] === movie) {
      pos = i;
    }
  }
  if ((pos + 1) !== false) {
    this.splice(pos,1);
  }
  return pos;
}
redBox.rent = function (name, movie) {
  if (this.remove(movie)) {
  	this.customers.push({name: name, movie: movie});
  	this.displayList();
  } else {
  	return 'movie not found';
  }
}

redBox.return = function (movie) {
  this.customers.remove(movie);
  this.append(movie);
  return movie;
}

var listOfMovies = 
['Barry Lyndon (1975)',
'Barsaat: (1995)',
'Barsaat Ki Ek Raat (1981)',
'Bart Got a Room (2009)',
'Bartok the Magnificent (1999)',
'Barton Fink (1991)',
'Bas Itna Sa Khwaab Hai (2001)',
'Baseball Bugs (1946)',
'BASEketball (1998)',
'Bashing (2005)',
'Basic (2003)',
'Basic Instinct (1992)',
'Basic Instinct 2 (2006)']

listOfMovies = listOfMovies.map(
  function (movie) {
  	movie = movie.split(' ');
  	movie.pop();
  	return movie.join(' ');
  });

for (var i = 0; i < listOfMovies.length; i++) {
  redBox.append(listOfMovies[i]);
}


