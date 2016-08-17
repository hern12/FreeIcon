var express = require('express');
var router = express.Router();
var getThDic = require('../public/thaiToEng/thai2eng.json');
var getTxtData = require('../public/TxtData/data.json');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
// router.get('/getDic', function(req, res){
router.get('/search', function(req, res, next) {
  res.render('search');
});
router.get('/facebook', function(req, res, next) {
  res.render('facebook',{title:getTxtData["title"],des:getTxtData["description"],
						first:getTxtData["first"],second:getTxtData["second"]});
});
router.get('/twitter', function(req, res, next) {
  res.render('twitter');
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