/* Challenge #228 | Hard
 * Golomb Rulers
 * redd.it/3hsgr0
 *
 * Author:  Purag Moumdjian
 * Date:    25 Aug 2015
 * License: GNU General Public License 3.0
 *
 * Generate optimal Golomb ruler(s) of a given order.
 */

function golomb (input) {
    var orders = input.split("\n");
    var golombs = [];

    for (var i in orders) {
        var n = parseInt(orders[i], 10);

        // minimum length of a ruler is given by the sum from 1 -> n - 1, or n(n-1)/2
        var l = n * (n-1) / 2;
        var optimal = false;

        // keep trying with a larger length until we find rulers
        while (!optimal) {
            var perms = [], rulers = [];

            // generate all the valid rulers as permutations of an n-bit binary string with k ones
            // where n is the length of the ruler and k is the order.
            // there must be a 1 at the first and last position in the ruler, so we can reduce the
            // work we do by finding (n-2) bit binary strings with (k-2) ones.
            (function helper (n, k, head) {
                if (n === k || n === 0) return;

                if (k === 0) {
                    var perm = [1].concat(head, new Array(n).fill(0), [1]);

                    var measures = [], ruler = [];
                    // construct the ruler, but quit if we have a ruler with more than one
                    // way to measure a specific length
                    for (var j = 0; j < perm.length; j++) {
                        if (perm[j]) {
                            ruler.push(j);
                            for (var l = j + 1; l < perm.length; l++) {
                                if (perm[l]) {
                                    if (measures[l - j]) return;
                                    measures[l - j] = 1;
                                }
                            }
                        }
                    }

                    // quit if we have a permutation that mirrors another (180deg rotations)
                    for (var j = 0; j < perms.length; j++) {
                        if (perms[j].every( function (el, k) {
                            if (el === perm[perm.length - 1 - k]) return true;
                        })) return;
                    }

                    rulers.push(ruler);
                    return perms.push(perm);
                }

                helper(--x, --y, head ? head.push(1) : [1]);
                helper(++x, y, head ? head.push(0) : [0]);
            })(l - 2, n - 2);

            // push the optimal rulers, if found, to the set of golomb rulers
            if (rulers.length) {
                golombs.push({
                    order: n,
                    rulers: rulers
                });
                optimal = true;
            }

            // prepare to find permutations for the next highest length
            l++;
        }
    }

    return golombs;
}