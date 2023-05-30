const Datastore = require('nedb');
exports.votes = new Datastore('./database/votes.db');