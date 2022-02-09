const router = require('express').Router();
const verify = require('./verifyToken');
const Post = require('../models/Post');

router.post('/', verify , async (req,res)=> {
    

    // to create a new Post

    const post = new Post({
        createdby: req.user._id,
        message: "This is my new Post"

    });

    try {
        const createdpost = await post.save();
        res.send(createdpost);

    }
    catch(err){
        res.status(400).send(err);

    }

});

// To get all posts

router.get('/', verify,async (req,res)=> {
    try {
        const getposts = await Post.find();
        res.send(getposts);

    }
    catch(err) {

        res.status(400).send(err);
    }

});

// to give a comment in some posts while we know that id
router.put('/comments/:comUpdate',verify,async(req,res)=>{
    try {
        const updatecomments = await Post.findByIdAndUpdate({_id:req.params.comUpdate},{$push:{comments:{sentBy:req.user._id}}});
        res.send(updatecomments);

    }
    catch(err){

        res.status(400).send(err);

    }

});
// to give a like in some posts while we know that id
router.put('/likes/:comUpdate',verify,async(req,res)=>{
    try {
        const updatelikes = await Post.findByIdAndUpdate({_id:req.params.comUpdate},{$push:{comments:[{liked:req.user._id}]}});
        res.send(updatelikes);

    }
    catch(err){

        res.status(400).send(err);

    }

});
// How to delete a specific post

router.delete('/',verify,async(req,res)=> {

    try {

        

        const deletedpost = await Post.remove({createdby:req.user._id});
        res.send(deletedpost);

    }
    catch(err){
        res.status(400).send(err);

    }



});

// to update a post created by specific user
router.put('/update',verify,async(req,res)=>{

    try {
        const updatemessage = await Post.updateOne({createdby:req.user._id},{$set:{message:"message changed"}});
        res.send(updatemessage);

    }
    catch(err){

        res.status(400).send(err);

    }

});

module.exports = router;