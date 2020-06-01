function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max)
}

if (typeof module != 'undefined') {
  module.exports = {
    sleep, clamp
  }
}