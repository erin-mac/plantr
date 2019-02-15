const { db } = require('./models');

db.authenticate()
    .then(() => db.sync({ force: true }))
    .then(() => { db.close() })