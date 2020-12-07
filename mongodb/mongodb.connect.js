const mongoose = require('mongoose')

async function connect(){
    try{
        await mongoose.connect(
            'mongodb+srv://TEST:Tpassasus123@cluster0.vgfql.mongodb.net/todo?retryWrites=true&w=majority', 
            {useNewUrlParser: true }, 
            { useUnifiedTopology: true }
        );
    }
    catch(err){
        console.error('error connecting to mongodb')
        console.error(err)
    }
    
}

module.exports = { connect };