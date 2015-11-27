module.exports = function(str) {
  var args = Array.prototype.slice.call(arguments, 1);
  var s = '';
  var len = str.length;
  var idx = 0;
  for (var i = 0; i < len; i++) {
    var c1 = str[i], c2 = str[i + 1];
    if (c1 == '?') {
      if (c2 == '?') {
        ++i;
        s += '?';
      } else {
        if (args[idx] === undefined) {
          s += "";
        } else {
          s += args[idx];
        }
        idx++;
      }
    } else {
      s += c1;
    }
  }
  return s;
}
