module.exports = function (env) {
  for (var key in env) {
    env[key] = JSON.stringify(env[key]);
  }

  return env;
}
