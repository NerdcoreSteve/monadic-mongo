/*
todo
chain the whole sequence for the "Now I'm going to insert a collection (initialized with an array), print out its contents, remove an item from that collection, and then print out the new contents" example 
    May have to hand the db down the chain in a data structure that holds both result and db
        That way I can db.close in fork
    It bothers me that I'm calling fold from inside a new task, shouldn't I be doing a traverse?
*/
const  
    {MongoClient} = require('mongodb'),
    Task = require('data.task'),
    {Success, Failure} = require('data.validation'),
    fromNullableError = (err, succ) => err === null ? Success(succ) : Failure(err),
    rejResFromNullableError = (rej, res) => (err, db) => fromNullableError(err, db).fold(rej, res),
    mongoTask = (db, dbMethodCall) => new Task((rej, res) => {
        dbMethodCall(db, rejResFromNullableError(rej, res))
    }),
    mongoConnect = url => new Task((rej, res) => {
        MongoClient.connect(url, (err, db) => {  
            fromNullableError(err, db).fold(rej, res)
            db.close()
        })
    }),
    listCollections = db => mongoTask(db, (db, cb) => db.listCollections().toArray(cb)),
    url = 'mongodb://localhost:27017/potato'

mongoConnect(url)
    .chain(listCollections)
    .fork(console.error, items => {
        console.log('****listing collections****')
        console.log(items)
        console.log('***************************')
    })
