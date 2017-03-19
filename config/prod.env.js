
module.exports = {
  NODE_ENV: '"production"',
  ASSETS_URL: '"."',
  LEVEL_CAP: 'LEVEL_CAP',
  BUILD_VERSION: 'BUILD_VERSION',
  REGION: '"' + process.env.REGION + '"',
  REGIONS_URL: '"http://dnmaze.com/regions.json"', // this I will hard code
  VERSION: 'VERSION',
  VERSION_URL: '"/version.json"',
  LOCALE: require('./locale')(process.env.REGION),
}
