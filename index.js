/*
todo
extract function that takes MongoClient.connect and url and returns a task
use the same function for db.collection('sandwiches').insertMany
chain these two operations

chain the whole sequence for the "Now I'm going to insert a collection (initialized with an array), print out its contents, remove an item from that collection, and then print out the new contents" example 

if this works all you need to do is make a post about Task, it's just a promise that you can map!
*/
const  
    {MongoClient} = require('mongodb'),
    Task = require('data.task'),
    mongoConnect = url => new Task((rej, res) => {
        MongoClient.connect(url, (err, db) => {  
            if(err === null) {
                res(db)
            } else {
                rej(err)
            }
            db.close()
        })
    }),
    listCollections = db => new Task((rej, res) => {
        db.listCollections().toArray((err, db) => {  
            if(err === null) {
                res(db)
            } else {
                rej(err)
            }
        })
    }),
    url = 'mongodb://localhost:27017/potato'

mongoConnect(url).chain(listCollections).fork(console.error, items => {
    console.log('****listing collections****')
    console.log(items)
    console.log('***************************')
})
