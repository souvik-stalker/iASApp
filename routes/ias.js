const express = require('express');
//const multer = require('multer');
const UserAccess = require('../models/user_access');
const MasterOne = require('../models/master_one');
const MasterTwo = require('../models/master_two');
const MasterThree = require('../models/master_three');
const MasterFour = require('../models/master_four');
const LookUp = require('../models/lookup_table');
const MasterConfig = require('../models/master_config');
const ReportType = require('../models/report_type');
const PdfData = require('../models/pdf_data');

const router = express.Router();



router.get('',(req,res,next)=>{
	var email = req.query.email;
  UserAccess.find({email:email})
  .populate('master_one_id')
  .populate('master_two_id')
  .populate('hierchey')
  .then((users)=> {
	   ReportType.find().then((reportsType)=>{
			res.status(200).json({
			  users:users,
			  reportType:reportsType
			});
	  });
  }).catch((e) => {
    res.status(404).json({
      message:"Error Occured",
      error:e
    });
  });
  
});
router.post('/searchAccount',(req,res,next)=>{
	const searchText = req.body.searchText;
	const date = req.body.date;
	const email = req.body.email;
	UserAccess.find({email:email})
	  .populate({
		path: 'master_one_id',
		match: { $or: [ { 'number': { $regex: '.*' + searchText + '.*' } }, { 'name':  { $regex: '.*' + searchText + '.*' } }]}
		})
	  .populate({
		path: 'master_two_id',
		match: { $or: [ { 'number': { $regex: '.*' + searchText + '.*' } }, { 'name':  { $regex: '.*' + searchText + '.*' } }]}
		})
	  .populate('hierchey')
	  .then((users)=> {
		   ReportType.find().then((reportsType)=>{
				res.status(200).json({
				  users:users,
				  reportType:reportsType
				});
		  });
	  }).catch((e) => {
		res.status(404).json({
		  message:"Error Occured",
		  error:e
		});
	  });
});
router.get('/reportList',(req,res,next)=>{
	const report_id = req.query.report_id; //+ means conversion to number
    const level = req.query.level;
    const valueOne = req.query.valueOne;
	const valueTwo = req.query.valueTwo;

	const valueThree = req.query.valueThree;
	var queryStr='';
	if(valueOne){
		queryStr = valueOne;
	}
	if(valueTwo){
		queryStr+='-'+valueTwo;
	}
	if(valueThree){
		queryStr+='-'+valueThree;
	}
	PdfData.find({ report_type_id:report_id, "name": { $regex: '.*' + queryStr + '.*' } }).then((pdfs)=>{
		res.status(200).json({
		  pdfs:pdfs
		});
	});
	 
});
router.get('/firstChildInfo',(req,res,next)=>{
  const level = req.query.level; //+ means conversion to number
  const parentunique = req.query.parentunique;
  const hierarchy = +req.query.hierarchy;
  const gparentunique = req.query.gparentunique;
  var searchText='';
  if(req.query.searchText)
    searchText = req.query.searchText;
  var reportType={};
  MasterConfig.findOne({appname:"iCABS"}).then((masterData)=>{
	  const config_entry = masterData.config_entry;
	  const id = masterData._id;
	  const entryArr = config_entry.split("-");
	  ReportType.find({app_id:id}).then((reportsType)=>{
						reportType = reportsType;
	  });
	  if(entryArr[hierarchy] === level){
		  if(entryArr[hierarchy+1]){
			 LookUp.findOne({ config_data:entryArr[hierarchy+1],app_id:id}).then((data)=>{
				if(data){
					
					if(hierarchy === 0){
					MasterTwo.find({parent: parentunique})
					.or([{ 'number': { $regex: '.*' + searchText + '.*' } }, { 'name':  { $regex: '.*' + searchText + '.*' } }])
					.then((childData)=>{
						res.status(200).json({
						  child:childData,
						  masterData:data,
						  reportType:reportType
						}); 
					});
					} else if (hierarchy === 1){
						MasterThree.find({parent:parentunique})
						.or([{ 'number': { $regex: '.*' + searchText + '.*' } }, { 'owner':  { $regex: '.*' + searchText + '.*' } }])
						.then((childData)=>{
						res.status(200).json({
						  child:childData,
						  masterData:data,
						  reportType:reportType
						}); 
						});
					}
					else if (hierarchy === 2){
						MasterFour.find({parent:parentunique,gparent:gparentunique})
						.or([{ 'name': { $regex: '.*' + searchText + '.*' } }])
						.then((childData)=>{
						res.status(200).json({
						  child:childData,
						  masterData:data,
						  reportType:reportType
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
