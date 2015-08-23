/* Challenge #227 | Hard
 * Adjacency Matrix Generator
 * redd.it/3h0uki
 *
 * Author:  Purag Moumdjian
 * Date:    20 Aug 2015
 * License: GNU General Public License 3.0
 *
 * Generates an adjacency matrix given a visual representation of a graph in ASCII.
 * Edges must begin (at the vertex) or continue (at a bend) with at least one symbol
 * indicating the direction that edge goes in. No error checking in this implementation.
 */

function adjacencyMatrix(graph) {
    var lines = parseInt(graph[0], 10);

    graph = graph.split("\n").splice(1);

    var curVertex = null;
    var matrix = new Matrix();
    var regex = /[a-z]/g;
    var i = 0;

    // triples indicating directions and symbols that indicate an edge in that direction
    var edges = [
        [-1, -1, '\\'],
        [1, 1, '\\'],
        [1, -1, '/'],
        [-1, 1, '/'],
        [0, -1, '-'],
        [0, 1, '-'],
        [-1, 0, '|'],
        [1, 0, '|']
    ];

    // look for vertices line-by-line
    while (i < lines) {
        var match = regex.exec(graph[i]);

        if (match) {
            // get the index in the matrix for the vertex we found, and follow all its edges
            curVertex = vertex(match[0]);
            followEdge(i, match.index);
            regex.lastIndex = match.index + 1;
        } else {
            regex.lastIndex = 0;
            i++;
        }

        function followEdge(x, y, dir) {
            // either we've encountered a bend, or we've just found a vertex
            if (graph[x][y] === "#" || dir === undefined) {
                for (var j in edges) {
                    var edge = edges[j];

                    // make sure we don't check the direction we just came from
                    if (dir && edge[0] === -(dir[0]) && edge[1] === -(dir[1]))
                        continue;

                    // check if the edge can be followed
                    if (graph[x + edge[0]] && y + edge[1] >= 0 && y + edge[1] < graph[x + edge[0]].length) {
                        if (graph[x + edge[0]][y + edge[1]] === edge[2]) {
                            followEdge(x + edge[0], y + edge[1], [edge[0], edge[1]]);
                        }
                    }
                }

            // if we encounter another vertex, then we've finished an edge
            } else if (regex.test(graph[x][y])) {
                matrix.set(curVertex, vertex(graph[x][y]));

            // otherwise, just keep going in that direction
            // fortunately, this makes it simple to ignore bridges/gaps in the edge itself
            // the edge could be hidden under other edges entirely and we'd still make it
            } else {
                followEdge(x + dir[0], y + dir[1], dir);
            }
        }
    }

    return matrix.get();

    function vertex(letter) {
        // gets the 'index' for each letter in the adjacency matrix
        // by subtracting ASCII 'a'. So 'a' -> 0, 'b' -> 1, etc
        return letter.charCodeAt(0) - 'a'.charCodeAt(0);
    }

    // basic matrix implementation. grows dynamically as bits are set, but doesn't 0-fill
    // we just fill it in the get() call
    function Matrix() {
        var arr = [];
        var sizex = 0;
        var sizey = 0;

        this.set = function (x, y) {
            arr[x] = arr[x] || [];
            arr[x][y] = 1;

            if (x > sizex) sizex = x;
            if (y > sizey) sizey = y;
        };

        this.fill = function () {
            for (var i = 0; i <= sizex; i++) {
                for (var j = 0; j <= sizey; j++) {
                    arr[i][j] = arr[i][j] || 0;
                }
            }
        };

        this.get = function () {
            this.fill();
            var ret = arr;
            for (var i in ret) ret[i] = ret[i].join("");
            return ret.join("\n");
        };
    }
}