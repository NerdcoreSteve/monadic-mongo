const
    {MongoClient} = require('mongodb'),
    Task = require('data.task'),
    {Success, Failure} = require('data.validation'),
    listCollections = new Task(rej
    url = 'mongodb://localhost:27017/potato'

MongoClient.connect(url, (err, db) => {
    db.close()
})
