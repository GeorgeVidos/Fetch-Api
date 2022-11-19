const express= require('express');
const { reset } = require('nodemon');
const router=express.Router();
const Post = require('../models/Post');


//gets eveyrthing back
router.get('/',async(req,res) =>{
 
    try {
        const posts = await Post.find();//method on mognoose
        res.json(posts);
        console.log(req.body);
    } catch (error) {
        res.json({message:error});
    }
});



//submit a post
router.post('/',async (req,res)=>{
    console.log(req.body)
    const post = new Post({
        titleshort:req.body.titleshort,
        authorweb:req.body.authorweb,
        workid:req.body.workid
    });


    try {
        const savedPosted = await post.save();
        res.json(savedPosted);
    }catch(err) {
        res.json({ message: err });
    }
});



//delete a post
router.delete('/:workid',async(req,res)=>{
    try {
        const removdPost=await Post.remove({workid: req.params.workid})
        res.json(removdPost);
    } catch (error) {
        res.json({message:error});
    }
});


//update a post
router.patch('/:workId',async(req,res)=>{
    try {
        const updatedPost=await Post.updateOne(
            {workid: req.params.workid},
            {$set: {title: req.body.titleshort}});
        res.json(updatedPost);
    } catch (error) {
        res.json({message:error});
    }
});

module.exports = router;