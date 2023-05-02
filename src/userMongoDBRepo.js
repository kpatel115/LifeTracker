const { MongoClient, ObjectId } = require('mongodb');
const User = require('./models/User'); 
const url = "mongodb+srv://kpatel115:f17ios89@cluster0.uemyhfp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

var date = new Date();
var newdate = date.toGMTString();

// Connecting to Database/
/*
async function run() {
  await client.connect();
  return 'Connected to the MongoDB server...';
}

run()
  .then(console.log)
  .catch(console.error);
// 
*/
const repo = {
  findAll: async () => {
    let cards = [];
    const cardCol = client.db('lifetrackerDB').collection('lifetrackerUsers');
    const cursor = cardCol.find({});
    await cursor.forEach(user => {
      const aCard = new User(user._id, user.displayName, user.image, user.createdAt);
      cards.push(aCard);
    });
    return cards;
    /*let cards = []; // list of cards
    const cardCol = client.db('lifetrackerDB').collection('lifetrackerCollection'); // cards collection in mongodb
    const cursor = cardCol.find({});
    const cardDocs = await cursor.toArray();

    if (cardDocs) {
      cardDocs.forEach((document, i) => {
        console.log(document);
        return document
      });
    } else {
      console.log('No cards found');
    }*/
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
  }

};

module.exports = repo;