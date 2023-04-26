const { MongoClient, ObjectId } = require('mongodb');
const Card = require('./Card'); 
const databaseName = process.env.DB_NAME;
const databaseUser = process.env.DB_USER;
const databasePass = process.env.DB_PASS;


const client = new MongoClient(url);

var date = new Date(); 
var newdate = date.toGMTString();
/*
async function run() {
  await client.connect();
  return 'Connected to the MongoDB server...';
}

run()
  .then(console.log)
  .catch(console.error);
*/
const repo = {
  findAll: async () => {
    let cards = []; // list of cards
    const cardCol = client.db('lifetrackerDB').collection('lifetrackerCollection'); // cards collection in mongodb
    const cursor = cardCol.find({});
    await cursor.forEach(card => {
      const card = new Card(card._id, card.name, card.meals, card.macros, card.calories, card.water, card.workout, card.type, card.duration, card.notes, card.time);
      cards.push(aCard);
    });
    return contacts;
  },
  findById: async (uuid) => {
    const cardCol = client.db('lifetrackerDB').collection('lifetrackerCollection');
    const filter = {
      '_id': new ObjectId(uuid),

    };
    const card = await cardCol.findOne(filter);
    return new Card(uuid, card.name, card.meals, card.macros, card.calories, card.water, card.workout, card.type, card.duration, card.notes, card.time );
  },
  create: async (card) => {
    const doc = {name: card.name, meals: card.meals, macros: card.macros, calories: card.calories, water: card.water, workout: card.workout, type: card.type, duration: card.duration, notes: card.notes, time: card.time};
    const cardCol = client.db('lifetrackerDB').collection('lifetrackerCollection');
    const result = await cardCol.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  },
  deleteById: async (uuid) => {
    const cardCol = client.db('lifetrackerDB').collection('lifetrackerDB');
    const filter = {
      '_id': new ObjectId(uuid)
    };
    const result = await cardCol.deleteOne(filter);
    if (result.deletedCount === 1) {
      console.log("Successfully deleted a documents.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  },
  update: async (card) => { 
    const cardCol = client.db('lifetrackerDB').collection('lifetrackerCollection');
    const filter = {
      '_id': new ObjectId(card.id)
    };
    const updateDoc = {
      $set: {
      name: card.name,
      meals: card.meals, 
      macros: card.macros, 
      calories: card.calories, 
      water: card.water, 
      workout: card.workout, 
      type: card.type, 
      duration: card.duration, 
      notes: card.notes, 
      time: newdate
      }
    };
    const result = await cardCol.updateOne(filter, updateDoc);
    console.log(`${result.matchedCount} docs matched the filter, updated ${result.modifiedCount} document(s)`);
  },
};

module.exports = repo;