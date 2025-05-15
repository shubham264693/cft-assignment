const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const activeSessions = require('../utils/activeSessions');


const addUser = async(req,res) => {
    try{
        let { first_name, last_name, mobile, email, password } = req.body;

        let getUser = await User.findOne({ where : {
            email
        }})

        if(getUser){
            return res.status(400).json({ success : false, message : 'User Already Exist!' })
        }else{
            let userData = await User.create({first_name, last_name, mobile, email, password});

            delete userData.dataValues.password;
            delete userData.dataValues.createdAt;
            delete userData.dataValues.updatedAt;
            delete userData.dataValues.isActive;

            return res.status(200).json({ success : true, message : 'User Registered Successfully!', Data : userData })
            
        }
        
    }catch(err){
        return res.status(500).json({ success: false, message : 'Something Went Wrong..!' })
    }
}


const login = async(req,res) => {
    try{
        let { email, password } = req.body;

        const user = await User.findOne({where : {email}});

        if(!user){
            return res.status(404).json({ success : false, message : 'User Not Found' })
        }

        let matchPassword = await bcrypt.compare(password,user.password);

        if(!matchPassword){
            return res.status(400).json({ success : false, message : 'Invalid Credentials' })
        }

        const token = jwt.sign({id: user.id, email: user.email}, 'TEST_SECRET', { expiresIn : '1h' });

        activeSessions.logoutOtherSessions(user.id);
        activeSessions.addSession(user.id, token);

        return res.status(200).json({ success : true, message : 'Login Successfully!', token })

    }catch(err){
        return res.status(500).json({ success : false, message : 'Something went wrong' })
    }
}


module.exports = {
    addUser,
    login
}