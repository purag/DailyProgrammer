/* Challenge #228 | Easy
 * Letters in Alphabetical Order
 * redd.it/3h0pde
 *
 * Author:  Purag Moumdjian
 * Date:    21 Aug 2015
 * License: GNU General Public License 3.0
 *
 * Check the sorted word (+reversed) against the oiriginal word to determine the
 * order of the letters, if any. IN ORDER, REVERSE ORDER, or NOT IN ORDER.
 */

var order = s => s + (s.split("").sort().join("") === s ? " IN" : s.split("").sort().reverse().join("") === s ? " REVERSE" : " NOT IN") + " ORDER";