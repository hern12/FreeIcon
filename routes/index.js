var express = require('express');
var router = express.Router();
var getThDic = require('../public/thaiToEng/thai2eng.json');
var getTxtData = require('../public/TxtData/data.json');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{title:"www.ไอคอน.com",des:"ศูนย์รวมไอคอนฟรี",first:getTxtData[""],second:getTxtData[""]});
});
// router.get('/getDic', function(req, res){
router.get('/search', function(req, res, next) {
  res.render('search',{title:getTxtData[2].title,des:getTxtData[2].description,
						first:getTxtData[2].first,second:getTxtData[2].second});
});
router.get('/facebook', function(req, res, next) {
  res.render('facebook',{title:getTxtData[0].title,des:getTxtData[0].description,
						first:getTxtData[0].first,second:getTxtData[0].second,category:"facebook"});
});
router.get('/twitter', function(req, res, next) {
  res.render('twitter',{title:getTxtData[1].title,des:getTxtData[1].description,
						first:getTxtData[1].first,second:getTxtData[1].second});
});
router.get('/instagram', function(req, res, next) {
  res.render('instagram',{title:getTxtData[3].title,des:getTxtData[3].description,
						first:getTxtData[3].first,second:getTxtData[3].second});
});
router.get('/google', function(req, res, next) {
  res.render('google',{title:getTxtData[4].title,des:getTxtData[4].description,
						first:getTxtData[4].first,second:getTxtData[4].second});
});
router.get('/in', function(req, res, next) {
  res.render('in',{title:getTxtData[5].title,des:getTxtData[5].description,
						first:getTxtData[5].first,second:getTxtData[5].second});
});
router.get('/blog', function(req, res, next) {
  res.render('blog',{title:getTxtData[6].title,des:getTxtData[6].description,
						first:getTxtData[6].first,second:getTxtData[6].second});
});

// });
router.post('/view1', function(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	var getSearchText = req.body.PostId;
	checkChar(getSearchText);
	// res.send({kuy:getThDic[0].search,fuck:getSearchText});
	
	for(var i = 0;i<getThDic.length;i++){
		if(getSearchText == getThDic[i].search){
			res.end(getThDic[i].result);
		}
    }

    function checkChar(getSearchText){
    	var str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var val=getSearchText;
		var valOK = true;
		for (i=0; i<val.length & valOK; i++){
			valOK = (str.indexOf(val.charAt(i))!= -1); 
		}
		if (!valOK) {
				for(var i = 0;i<getThDic.length;i++){
					if(getSearchText == getThDic[i].search){
					   res.end(getThDic[i].result);
					}
				}	
			}else{
				res.end(getSearchText);
			}
		} 
});
module.exports = router;