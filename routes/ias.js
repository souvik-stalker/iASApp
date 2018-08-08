const express = require('express');
//const multer = require('multer');
const UserAccess = require('../models/user_access');
const MasterOne = require('../models/master_one');
const MasterTwo = require('../models/master_two');
const MasterThree = require('../models/master_three');
const MasterFour = require('../models/master_four');
const LookUp = require('../models/lookup_table');
const MasterConfig = require('../models/master_config');

const router = express.Router();



router.get('',(req,res,next)=>{
  UserAccess.find()
  .populate('master_one_id')
  .populate('master_two_id')
  .populate('hierchey')
  .then((users)=> {
    res.status(200).json({
      users:users
    });
  }).catch((e) => {
    res.status(404).json({
      message:"Error Occured",
      error:e
    });
  });
  
});
router.get('/firstChildInfo',(req,res,next)=>{
  const level = req.query.level; //+ means conversion to number
  const parentunique = req.query.parentunique;
  const hierarchy = +req.query.hierarchy;
  const gparentunique = req.query.gparentunique;
  MasterConfig.findOne({appname:"iCABS"}).then((masterData)=>{
	  const config_entry = masterData.config_entry;
	  const id = masterData._id;
	  const entryArr = config_entry.split("-");
	  if(entryArr[hierarchy] === level){
		  if(entryArr[hierarchy+1]){
			 LookUp.findOne({ config_data:entryArr[hierarchy+1],app_id:id}).then((data)=>{
				if(data){
					if(hierarchy === 0){
						MasterTwo.find({parent:parentunique}).then((childData)=>{
						res.status(200).json({
						  child:childData,
						  masterData:data
						}); 
					});
					} else if (hierarchy === 1){
						MasterThree.find({parent:parentunique}).then((childData)=>{
						res.status(200).json({
						  child:childData,
						  masterData:data
						}); 
						});
					}
					else if (hierarchy === 2){
						MasterFour.find({parent:parentunique,gparent:gparentunique}).then((childData)=>{
						res.status(200).json({
						  child:childData,
						  masterData:data
						}); 
						});
					}
					
				}else {
					res.status(200).json({
				  message:"No lookup Data exists"
				}); 
				} 
			 });
		  } else {
			 res.status(200).json({
			  child:[]
			});   
		  }
		 
	  } else {
		 return res.status(500).json({
		  message:"Passed Level Doesn't Exists"
		}); 
	  }
	  
  }).catch((e) => {
    res.status(404).json({
      message:"Error Occured",
      error:e
    });
  });
  
  
  
});


module.exports = router;
