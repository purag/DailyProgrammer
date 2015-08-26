/* Challenge #229 | Easy
 * Dottie Number
 * redd.it/3h0pde
 *
 * Author:  Purag Moumdjian
 * Date:    24 Aug 2015
 * License: GNU General Public License 3.0
 *
 * Evaluates a recurrence relation for the given start value until the value
 * converges. Initially built for evaluating x_n = cos(x_(n-1)), but now accepts
 * any function to test for the right-hand-side of the recurrence.
 *
 * FUTURE TODOS: Infinite loops on divergent fxns...maybe drop off after 200
 * iterations or so.
 *
 * x_0 = arbitrary starting point
 * x_n = f(x_(n-1))
 */

function converge (x, f) {
    while (x !== (x = f(x)));
    return x;
}

/* Test Cases
 *
 *   console.log(converge(3, Math.cos));
 *
 * Try it yourself with any function, i.e.
 *   (x) => 1 - 1/x
 *   (x) => x - Math.tan(x)
 */