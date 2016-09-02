var express = require('express');
var router = express.Router();
var getThDic = require('../public/thaiToEng/thai2eng.json');
var getTxtData = require('../public/TxtData/data.json');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{title:"www.ไอคอน.com",des:"ศูนย์รวมไอคอนฟรี",first:getTxtData[""],second:getTxtData[""],third:getTxtData[""]});
});
// router.get('/getDic', function(req, res){
router.get('/search', function(req, res, next) {
  res.render('search',{title:getTxtData[2].title,des:getTxtData[2].description,
						first:getTxtData[2].first,second:getTxtData[2].second,third:getTxtData[2].third,pageTitle:"Search icons"});
});
router.get('/facebook', function(req, res, next) {
  res.render('facebook',{title:getTxtData[0].title,des:getTxtData[0].description,
						first:getTxtData[0].first,second:getTxtData[0].second,third:getTxtData[0].third,category:"facebook",pageTitle:"[รวม] ไอคอนเฟส ไอคอน Facebook โหลดฟรี | www.ไอคอน.com"});
});
router.get('/twitter', function(req, res, next) {
  res.render('twitter',{title:getTxtData[1].title,des:getTxtData[1].description,
						first:getTxtData[1].first,second:getTxtData[1].second,third:getTxtData[1].third,pageTitle:"[รวม] ไอคอนทวิตเตอร์ ไอคอน Twitter โหลดฟรี | www.ไอคอน.com"});
});
router.get('/instagram', function(req, res, next) {
  res.render('instagram',{title:getTxtData[3].title,des:getTxtData[3].description,
						first:getTxtData[3].first,second:getTxtData[3].second,third:getTxtData[3].third,pageTitle:"[รวม] ไอคอนไอจี ไอคอน Instagram โหลดฟรี | www.ไอคอน.com"});
});
router.get('/google', function(req, res, next) {
  res.render('google',{title:getTxtData[4].title,des:getTxtData[4].description,
						first:getTxtData[4].first,second:getTxtData[4].second,third:getTxtData[4].third,pageTitle:"[รวม] ไอคอนกูเกิ้ล ไอคอน Google+ โหลดฟรี | www.ไอคอน.com"});
});
router.get('/in', function(req, res, next) {
  res.render('in',{title:getTxtData[5].title,des:getTxtData[5].description,
						first:getTxtData[5].first,second:getTxtData[5].second,third:getTxtData[5].third,pageTitle:"[รวม] ไอคอนอิน ไอคอน In โหลดฟรี | www.ไอคอน.com"});
});
router.get('/blog', function(req, res, next) {
  res.render('blog',{title:getTxtData[6].title,des:getTxtData[6].description,
						first:getTxtData[6].first,second:getTxtData[6].second,third:getTxtData[6].third,pageTitle:"[รวม] ไอคอนบล็อค ไอคอน Blogger โหลดฟรี | www.ไอคอน.com"});
});
router.get('/windows', function(req, res, next) {
  res.render('windows',{title:getTxtData[7].title,des:getTxtData[7].description,
						first:getTxtData[7].first,second:getTxtData[7].second,third:getTxtData[7].third,pageTitle:"[รวม] ไอคอนวินโดว์ ไอคอน Windows โหลดฟรี | www.ไอคอน.com"});
});
router.get('/ios', function(req, res, next) {
  res.render('ios',{title:getTxtData[8].title,des:getTxtData[8].description,
						first:getTxtData[8].first,second:getTxtData[8].second,third:getTxtData[8].third,pageTitle:"[รวม] ไอคอนios ไอคอน IOS โหลดฟรี | www.ไอคอน.com"});
});
router.get('/android', function(req, res, next) {
  res.render('android',{title:getTxtData[9].title,des:getTxtData[9].description,
						first:getTxtData[9].first,second:getTxtData[9].second,third:getTxtData[9].third,pageTitle:"[รวม] ไอคอนแอนดรอย ไอคอน Android โหลดฟรี | www.ไอคอน.com"});
});
router.get('/computer', function(req, res, next) {
  res.render('computer',{title:getTxtData[10].title,des:getTxtData[10].description,
						first:getTxtData[10].first,second:getTxtData[10].second,third:getTxtData[10].third,pageTitle:"[รวม] ไอคอนไอจี ไอคอน Instagram โหลดฟรี | www.ไอคอน.com"});
});
router.get('/iphone', function(req, res, next) {
  res.render('iphone',{title:getTxtData[11].title,des:getTxtData[11].description,
						first:getTxtData[11].first,second:getTxtData[11].second,third:getTxtData[11].third,pageTitle:"[รวม] ไอคอนไอโฟน ไอคอน Iphone โหลดฟรี | www.ไอคอน.com"});
});
router.get('/printer', function(req, res, next) {
  res.render('printer',{title:getTxtData[12].title,des:getTxtData[12].description,
						first:getTxtData[12].first,second:getTxtData[12].second,third:getTxtData[12].third,pageTitle:"[รวม] ไอคอนเครื่องปริ้น ไอคอน Printer โหลดฟรี | www.ไอคอน.com"});
});
router.get('/camera', function(req, res, next) {
  res.render('camera',{title:getTxtData[13].title,des:getTxtData[13].description,
						first:getTxtData[13].first,second:getTxtData[13].second,third:getTxtData[13].third,pageTitle:"[รวม] ไอคอนกล้องถ่ายรูป ไอคอน Camera Icons โหลดฟรี | www.ไอคอน.com"});
});
router.get('/fileType', function(req, res, next) {
  res.render('fileType',{pageTitle:"ชนิดไฟล์",title:"หน้าที่ของไฟล์",des:"",first:getTxtData["PNG"],second:getTxtData["ICO"],third:getTxtData["SVG"]});
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