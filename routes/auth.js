const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const jwt = require('jsonwebtoken');
const {registerValidation,loginValidation} = require('../Validation');


//REGISTER
router.post('/register',async (req,res)=>{

    // LETS VALIDATE USER BEFORE WE MAKE A USER

    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check if a user is  already in a database

    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email Already Exists');

    //Hash Password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);






    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {

        const savedUser = await user.save();
        res.send({user: user._id});

    }
    catch(err) {
        res.status(400).send(err);
    }


});

// to get all users

router.get('/register', async(req,res)=>{
    try {
        const users = await User.find();
        res.send(users);
    }
    catch(err) {
        res.status(400).send(err);
    }

});

// to update a specific user

router.patch('/register/:userId', async(req,res)=>{

    try {
        const updateduser = await User.updateOne({_id:req.params.userId},{$set:{name: req.body.name}});
        res.send(updateduser);
    }
    catch(err){
        res.status(400).send(err);
    }

});
// to delete a specific user

router.delete('/register/:userId', async (req,res)=> {
    try {
        const deleteduser = await User.remove({_id:req.params.userId});
        res.send(deleteduser);

    }
    catch(err){
        res.status(400).send(err);

    }

});

//LOGIN

router.post('/login',async (req,res) => {

    // LETS VALIDATE USER BEFORE WE MAKE A USER

    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check if the email exists

    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email or password is Wrong');

    // PASSWORD IS CORRECT

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid Password');

    


    // Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});


module.exports = router;
