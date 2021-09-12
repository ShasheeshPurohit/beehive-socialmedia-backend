const mongoose = require('mongoose')
async function initializeDBConnection() {

// mongoose.connect('mongodb+srv://edwinDB:edwindulu1520@cluster0.jbuvk.mongodb.net/inventory?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("connected !!")).catch(error=>console.error("mongoose connection failed...", error))

try{
 await mongoose.connect('mongodb+srv://edwinDB:pmUtCcKnxTvbFcGM@cluster0.jbuvk.mongodb.net/beehive?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("connected !"))
}
catch(err){
  res.status(500).json({success: false, message: "Error has ocurred, for more information please see errMessage key", errMessage:err.message});
}

}

module.exports = {initializeDBConnection}