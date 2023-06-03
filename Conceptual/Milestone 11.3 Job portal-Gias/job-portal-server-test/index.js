const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.clwxeiy.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const toyCollection = client.db('toyManagement').collection('products');

  
    // add product into database
    app.post('/postToy', async(req, res)=>{
      const body = req.body;
      body.createdAt = new Date();
      const result = await toyCollection.insertOne(body);
      console.log(body);
      res.send(result)
    })

    // get all toy data
    app.get('/allToy', async(req, res) =>{
      const result = await toyCollection.find({}).toArray();
      res.send(result)
    })

    // view details by id 
    app.get('/toyDetails/:id', async(req, res)=>{
      const id = req.params.id;
      // console.log(id);
      const query = {_id: new ObjectId(id)};
      const options = {
        sort: { "imdb.rating": -1 },
        projection: {category:1,toyName:1, photoUrl:1, sellerName:1, userEmail:1, price:1, rating:1, availableQuantity:1, detailDescription:1, img:1, subCategory:1,stock:1, ratingCount:1}
      }; 
      const result = await toyCollection.findOne(query, options);
      // console.log(result);
      res.send(result)
    })

    // get all toy data  By Filter
    app.get('/allToy/:text', async(req, res)=>{
      console.log(req.params.text );
      if(req.params.text == "sportsCar" || req.params.text == "truck" || req.params.text == "regularCar"){

        const result = await toyCollection.find({subCategory: req.params.text})
        .sort({ createdAt: -1})
        .toArray();
        console.log(result)
        return res.send(result);
      }
      const result = await toyCollection.find({}).sort({ createdAt: -1}).toArray();
      res.send(result);

    })

    // get by email
    app.get('/myToys/:email', async(req, res)=>{
      console.log(req.params.email);
      const result = await toyCollection.find({ userEmail: req.params.email}).toArray();
      res.send(result)
    })
    
    // search field
    const indexKey = {toyName: 1, category: 1, };

    app.get('/toySearchByName/:text', async(req, res)=>{
      const searchText = req.params.text;
      const result = await toyCollection.find({
        $or:[
          {toyName: { $regex: searchText, $options: 'i'}}
        ],
      }).toArray();
      res.send(result);
    })

    // edit data  or update data
    app.patch('/update/:id', async(req, res)=>{
      const id = req.params.id;
      const body = req.body;
      const filter = {_id: new ObjectId(id)};
      const updateDoc = {
        $set:{
          toyName: body.toyName,
        }
      };
      const result = await toyCollection.updateOne(filter, updateDoc);
      res.send(result);
    })

    // delete my toys  data 
    app.delete('/deleteMyToys/:id', async(req, res)=>{
      const id = req.params.id;
      // console.log(id);
      const query = {_id: new ObjectId(id)}
      const result = await toyCollection.deleteOne(query);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res)=>{
    res.send('toy management is running')
})

app.listen(port,()=>{
    console.log(`toy management is running on port: ${port}`);
})