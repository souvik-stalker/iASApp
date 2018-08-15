const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require("../models/user");


exports.loginUser = (req,res,next) => {
  let fetchedUser;
 /*bcrypt.hash(req.body.password,10)
  .then((hash)=> {
   return res.status(200).json({
        password:hash
      });
  });*/
  User.findOne({email: req.body.email})
  .then((user) => {
	  
    if(!user){
      return res.status(401).json({
        message:'Invalid authentication credentials'
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password,user.password);
  }).then((result) => {
      if(!result){
        return res.status(401).json({
          message:'Invalid authentication credentials'
        });
      }

      const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id },'some-secure-code',
      {expiresIn:"5h"});

      res.status(200).json({
          token:token,
		  email:fetchedUser.email,
          expiresIn:18000,
          userId:fetchedUser._id
      });

  }).catch((e) => {
    return res.status(401).json({
      message:'Auth Failed'
    });
	
  });
}

