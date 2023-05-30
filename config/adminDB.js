const Datastore = require('nedb');
exports.admins = new Datastore('./database/admins.db');