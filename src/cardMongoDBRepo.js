const { MongoClient, ObjectId } = require('mongodb');
const Card = require('./Card'); 

const url = "mongodb+srv://kpatel115:f17ios89@cluster0.uemyhfp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);


async function run() {
  await client.connect();
  return 'Connected to the MongoDB server...';
}

run()
  .then(console.log)
  .catch(console.error);

const repo = {
  findAll: async () => {
    let cards = []; // list of cards
    const cardCol = client.db('lifetrackerDB').collection('lifetrackerCollection'); // cards collection in mongodb
    const cardDocs = await cardCol.find({}).toArray();;
    

    if (cardDocs.length > 0) {
      //cardDocs.forEach((document, i) => {
        //console.log(document);
        return cardDocs
      
    } else {
      console.log('No cards found');
    }
  },
  findById: async (uuid) => {
    const cardCol = client.db('lifetrackerDB').collection('lifetrackerCollection');
    const filter = {
      '_id': uuid,

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

};

module.exports = repo;