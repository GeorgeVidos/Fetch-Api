const mongoose = require('mongoose');



const PostsSchema= mongoose.Schema({
    titleshort: {
        type:String,
        required:true
    },
    authorweb: {
        type:String,
        required:true
    },
    workid: {
        type:String,
        required:true
    }
});



module.exports = mongoose.model('Posts',PostsSchema);
