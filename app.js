const express =require('express');
const app= express();
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');
const cors =require ('cors');
require('dotenv/config');
const path = require('path');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const postsRoute = require('./routes/posts')

app.use('/posts',postsRoute);

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.DB_CONNECTION,
{ useNewUrlParser: true,useUnifiedTopology:true},
()=>{console.log('connect to db')
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));