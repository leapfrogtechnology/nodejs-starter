/**
 * Clamps value between min and max.
 *
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
