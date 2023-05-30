const Datastore = require('nedb');
exports.users = new Datastore('../database/users.db');