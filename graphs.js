var Vertex = function (name) {
    this.name = name;
    this.visited = false;
    this.parent = null;
};

var Graph = function (v) {
    this.vertices = v || [];
    this.edges = 0;
    this.adj = [];
    this.hash = [];
    for (var i = 0; i < this.vertices.length; i++) {
        this.hash.push(v[i].name);
        this.adj[i] = [];
    }
};

Graph.prototype = {
    addVertex: function (v) {
        if (typeof v !== 'object') {
            v = new Node(v);
        }
        var name = v.name;
        this.hash.push(name);
        this.vertices.push(v);
        this.adj[this.hash.length - 1] = [];
    },

    createEdge: function (s, d) {
        if (typeof s === 'object') { //adjust arguments to their index in hash table
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
        var num = this.hash.indexOf(v), edgesRemoved = 0;
        this.adj.forEach(function (arr) { //remove connections to v from all vertices
            var start = arr.indexOf(num);
            if (start !== -1) {
                edgesRemoved++;
                arr.splice(start, 1);
            }
        });
        this.adj.splice(num, 1);
        this.adj = this.adj.map(function (con) { //adjusts connections to new hash positions
            return con.map(function (dest) {
                return (num < dest) ? dest - 1 : dest;
            });
        });
        this.edges -= edgesRemoved;
        this.vertices.splice(num,1);
        this.hash.splice(num, 1);
    },

    display: function () {
        var i, hash, connections;
        for (i = 0; i < this.adj.length; i++) {
            hash = this.hash;
            if (this.adj[i].length) {
                connections = this.adj[i].map(function (n) {
                    return hash[n];
                });
                console.log(this.hash[i] + ' is connected to: ' + connections.join(' '));
            }
        }
    },

    dfs: function (v) { //Depth First Search
        var v = v || 0, i = 0,
            conn = this.adj[v];
        console.log(this.vertices[v].name + ' has been visited!');
        this.vertices[v].visited = true;
        for (; i < conn.length; i++) {
            if (!this.vertices[conn[i]].visited) {
                this.dfs(conn[i]);
            }
        }
        this.resetSearch()
    },

    bfs: function (v) { //Breadth First Search
        var v = v || 0, queue = [v],
            n, i, conn;
        while (queue.length > 0) {
            n = queue.shift();
            conn = this.adj[n];
            this.vertices[n].visited = true;
            for (i = 0; i < conn.length; i++) {
                if (!this.vertices[conn[i]].visited) {
                    queue.push(conn[i]);
                }
            }
        }
        this.resetSearch();
    },

    resetSearch: function () {
        this.vertices.forEach(function (v) {
            v.visited = false;
            v.parent = null;
        })
    },

    shortestPath: function (s, d) {
        var s = typeof s === 'string' ? this.hash.indexOf(s) : s, 
            d = typeof d === 'string' ? this.hash.indexOf(d) : d,
            stop = false,
            self = this,
            queue = [s], path = [],
            vertex, v, i, connections;

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
        this.resetSearch();
        return path.map(function(v) {return self.hash[v]}).join('-');
    }
};

var V0 = new Vertex('City0'),
    V1 = new Vertex('City1'),
    V2 = new Vertex('City2'),
    V3 = new Vertex('City3'),
    V4 = new Vertex('City4'),
    V5 = new Vertex('City5'),
    V6 = new Vertex('City6'),
    V7 = new Vertex('City7'),
    V8 = new Vertex('City8'),
    arr = [V0,V1,V2,V3,V4,V5,V6,V7];

var graph = new Graph(arr);

graph.createEdge(V0, V1);
graph.createEdge(V1, V2);
graph.createEdge(V2, V3);
graph.createEdge(V3, V4);
graph.createEdge(V4, V5);
graph.createEdge(V5, V6);
graph.createEdge(V6, V7);