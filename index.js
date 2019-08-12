global.config = require('./utils/config');

var myModule = require('./utils/vimeworld');
global.vime = new myModule(config.tokens.vime);

global.moment = require('moment');
require('moment-duration-format');

global.Discord = require('discore.js');
new Discord.Core({
  typing: true,
  eventsFolder: 'events',
  commandsFolder: 'commands',
  token: config.tokens.discord,
  prefix: config.prefix,
  splitArgs: ' ',
  cmdsIn: ['text'],
  ignoreCase: true,
  cmdLowerCase: true,
  ignoreSelf: true,
  ignoreBots: true
});