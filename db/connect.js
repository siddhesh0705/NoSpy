const mongoose = require('mongoose');
const Message = require('../model/message'); 
const User = require('../model/User');

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(()=> console.log('connected to MongoDB'))
  .catch(()=>console.error('error connecting MongoDB'));
}

// Register models with Mongoose
//  mongoose.model('Message', Message); 
//mongoose.model('User', User); 

module.exports = connectDB;
