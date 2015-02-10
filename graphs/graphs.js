var Vertex = function (name) {
    this.name = name;
    this.visited = false;
    this.parent = null;
}

var Graph = function (v) {
    this.vertices = v || [];
    this.edges = 0;
    this.adj = [];
    this.hash = [];
    for (var i = 0; i < this.vertices.length; i++) {
        this.hash.push(v[i].name);
        this.adj[this.hash.indexOf(v[i].name)] = [];
    }
}

Graph.prototype = {
    addVertex: function (v) {
        var name = v.name;
        this.hash.push(name);
        this.vertices.push(v);
        this.adj[this.hash.indexOf(name)] = [];
    },
    createEdge: function (s, d) {
        if (typeof s === 'object') {
            s = this.hash.indexOf(s.name);
            d = this.hash.indexOf(d.name);
        } else {
            s = this.hash.indexOf(s);
            d = this.hash.indexOf(d);
        }
        if (s !== -1 && d !== -1) {
            this.edges++;
            this.adj[s].push(d);
            this.adj[d].push(s);
        } else {
            return false;
        }
    },
    remove: function (v) {
        if (typeof v === 'object') {
            v = v.name
        }
        var num = this.hash.indexOf(v),
            edges = 0;
        this.adj.forEach(function (arr) { //remove connections to v from all vertices
            var start = arr.indexOf(num);
            if (start !== -1) {
                edges++;
                arr.splice(start, 1);
            }
        });
        this.adj.splice(num, 1);
        this.adj = this.adj.map(function (con) { //adjusts connections to hash positions
            return con.map(function (dest) {
                return (num < dest) ? dest - 1 : dest;
            });
        });
        this.edges -= edges;
        this.vertices = this.vertices.filter(function (el) {return el.name !== v});
        this.hash.splice(num, 1);
    },
    display: function () {
        for (var i = 0; i < this.adj.length; i++) {
            var hash = this.hash;
            if (this.adj[i].length) {
                var connections = this.adj[i].map(function (n) {
                        return hash[n];
                    });
                console.log(this.hash[i] + ' is connected to: ' + connections.join(' '));
            }
        }
    },
    dfs: function (v) {
        var v = v || 0,
            i = 0,
            conn = this.adj[v];
        console.log(this.vertices[v].name + ' has been visited!');
        this.vertices[v].visited = true;
        for (; i < conn.length; i++) {
            if (!this.vertices[conn[i]].visited) {
                this.dfs(conn[i]);
            }
        }
    },
    bfs: function (v) {
        var v = v || 0, queue = [v];
        while (queue.length > 0) {
            var n = queue.shift(),
                conn = this.adj[n];
            this.vertices[n].visited = true;
            for (var i = 0; i < conn.length; i++) {
                if (!this.vertices[conn[i]].visited) {
                    queue.push(conn[i]);
                }
            }
        }
    },
    resetSearch: function () {
        this.vertices.forEach(function (v) {
            v.visited = false;
            v.parent = null;
        })
    },
    shortestPath: function (s, d) {
        var s = typeof s === 'string' ? this.hash.indexOf(s) : s, //adjust arguments
            d = typeof d === 'string' ? this.hash.indexOf(d) : d,
            stop = false,
            connections,
            self = this,
            queue = [s],
            path = [],
            vertex,
            v,
            i;

        this.vertices[s].visited = true;

        while (!stop) { //search graph until destination is found
            v = queue.shift();
            connections = this.adj[v];
            for (i = 0; i < connections.length; i++) { 
                vertex = this.vertices[connections[i]];
                if (!vertex.visited) { //adds vertices to queue
                    vertex.visited = true;
                    vertex.parent = v;
                    if (connections[i] === d) {
                        stop = true;
                        v = d;
                        break;
                    }
                    queue.push(connections[i]);
                }
            }
        }

        while (s !== v) { 
            path.unshift(v);
            v = this.vertices[v].parent;
        }

        path.unshift(s);

        return path.map(function(v) {return self.hash[v]}).join('-');
    },
    topSort: function (v, stack) {
        var v = v || 0,
            stack = stack || [],
            i = 0;

    }
}

var V0 = new Vertex('Berk'),
    V1 = new Vertex('Derp'),
    V2 = new Vertex('Trerp'),
    V3 = new Vertex('Querp'),
    V4 = new Vertex('Larp'),
    V5 = new Vertex('Drape'),
    V6 = new Vertex('Mape'),
    V7 = new Vertex('Tape'),
    arr = [V0,V1,V2,V3,V4,V5,V6,V7];

var graph = new Graph(arr);


//case 1 
/*
graph.createEdge('Berk', 'Derp');
graph.createEdge('Derp', 'Trerp');
graph.createEdge('Trerp', 'Querp');
graph.createEdge('Berk', 'Larp');
graph.createEdge('Larp', 'Drape');
*/

graph.createEdge('Berk', 'Trerp');
graph.createEdge('Derp', 'Trerp');
graph.createEdge('Derp', 'Querp');
graph.createEdge('Larp', 'Querp');
graph.createEdge('Querp', 'Mape');
graph.createEdge('Larp', 'Drape');
graph.createEdge('Drape', 'Tape');
graph.createEdge('Mape', 'Tape');


/*
//case 2
graph.createEdge(0,1);
graph.createEdge(0,2);
graph.createEdge(0,3);
graph.createEdge(1,2);
graph.createEdge(1,3);

*/