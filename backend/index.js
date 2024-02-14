const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const DB = 'mongodb://mongo_user:mongo123456%2B@localhost:27017/'
const bodyParser = require('body-parser')

// ✅ Register the bodyParser middleware here
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

mongoose.connect(DB).then(() =>{
    console.log('Database connected..')
})
.catch((err) => console.log(err));


const Person = require('./model/Person')

app.post('/persons', async(req, res) => {
    const person = new Person(req.body)
    try{
        await person.save()
        res.status(201).json({
            status: 'Success',
            data : {
                person
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

app.get('/persons', async (req,res) => {
    const persons = await Person.find({})
    try{
        res.status(200).json({
            status : 'Success',
            data : {
                persons
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

app.use(express.json())
app.use(cors())
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`)
})