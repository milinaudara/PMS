var fs, configurationFile;

configurationFile = 'configuration.json';
fs = require('fs');

var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
);