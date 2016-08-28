var app = angular.module("FreeIcon", ['angularUtils.directives.dirPagination']);
app.controller("IconsController", function($scope, $http) {


    $scope.Topics = [];
    $scope.datas = [];
    $scope.adding = [];
    $scope.icoLink = [];
    var checkNum = null;
    var storeNum = [];
    var calculateTotalrang = 1;
    var numberIcon = 1;
    var countShow = 0;
    var checkText = "";
    var countPage = 5;
    var countDatas = null;
    var linkDownloadPng = [];
    $(".stloader").hide();
    $scope.listIcon = function(searchText) {
        calculateTotalrang = 1;
        $scope.datas = [];
        countShow = 0;
        $scope.imgUrl = [];
        checkText = searchText;
        numberIcon = 1;
        if (checkText == null || checkText == undefined) {
            checkText = iconValname;
            queryData(checkText);
        }

        function queryData(checkText) {
            showUi();
            var url = "https://api.iconfinder.com/v2/icons/search?query=" + checkText + "&count=100&premium=0";
            $http.get(url).success(function(data) {
                $scope.datas = [];
                placeData(data);
                calculateCount();
                getDataAgain();
            }).error(function(data) {
                location.reload();
            });

        }

        function getDataAgain() {
            //$scope.datas = [];
            //showUi();
            var	count = 100;
            //console.log(countShow);
            for(var i = 1;i<calculateTotalrang;i++){
            	count = count + 100;
            	var url = "https://api.iconfinder.com/v2/icons/search?query=" + checkText + "&count=100&premium=0&offset=";
	            url += "" + count;
	            $http.get(url).success(function(data) {
	                placeData(data);
	            }).error(function(error, status) {
	                console.log("Error" + error);
	                console.log("Error" + status);
	                location.reload();
	            });
            }          
        }
        
        function calculateCount() {
            var totalCount = $scope.Topics.total_count;
            calculateTotalrang = Math.floor(totalCount / 35);
        }

        function showUi() {
            $(".stloader").show();
        }
    }

    function placeData(data) {
        $scope.Topics = data;
        for (var i = 0; i < $scope.Topics.icons.length; i++) {
            var downloadIcoUrl = "https://api.iconfinder.com/v2";
            if ($scope.Topics.icons[i].containers[0] === undefined) {

            } else {
                var downloadUrlIco = $scope.Topics.icons[i].containers[0].download_url;
                downloadIcoUrl += downloadUrlIco;

                for (var j = 0; j < $scope.Topics.icons[i].raster_sizes.length; j++) {
                    var rasterSize = $scope.Topics.icons[i].raster_sizes[j].size_width;
                    var previewuUrl = $scope.Topics.icons[i].raster_sizes[j].formats[0].preview_url;
                    //var iconName = $scope.Topics.icons[i].categories[0].name;
                    //console.log($scope.Topics.icons[i]);
                    var downloadUrlName = "https://api.iconfinder.com/v2";
                    var iconId = $scope.Topics.icons[i].icon_id
                    downloadUrlName += $scope.Topics.icons[i].raster_sizes[j].formats[0].download_url;
                    linkDownloadPng.push(downloadUrlName);
                    //console.log(linkDownloadPng);
                    //console.log(downloadIcoUrl);
                    if (previewuUrl) {                
                        if (rasterSize === 512) {
                            getData(previewuUrl, "", linkDownloadPng, downloadIcoUrl,iconId);
                            checkNum++;
                            //console.log(linkDownloadPng);
                            break;
                        }
                        if (rasterSize === 256) {
                            getData(previewuUrl, "", linkDownloadPng, downloadIcoUrl,iconId);
                            checkNum++;
                            //console.log(linkDownloadPng);
                            break;
                        }
                        if (rasterSize === 128) {
                            getData(previewuUrl, "", linkDownloadPng, downloadIcoUrl,iconId);
                            checkNum++;
                            //console.log(linkDownloadPng);
                            break;
                        }                 
                    }
                }
            }
            $('.item-list').show();
            //console.log("cut");
            linkDownloadPng = [];
            downloadIcoUrl = "";
        }
        
        storeNum.push(Math.floor(checkNum/35));

        //$scope.datas.Name.push($scope.Name);

        $(".stloader").hide();
    }

    function getData(previewuUrl, iconName, linkDownloadPng, downloadUrlIco,iconId) {
        $scope.datas.push({
            imgUrl: previewuUrl,
            name: iconName,
            linkDownloadPngFile: linkDownloadPng,
            icoLink: downloadUrlIco,
            saveIconId: iconId
        })
    }


    $('#search').keypress(function(e) {
        var key = e.which;
        if (key == 13) // the enter key code
        {
            var getSearchtxt = $("#search").val();
            $scope.listIcon(getSearchtxt);
        }
    });
})

function imgError(image) {
    // image.parent().remove();
    event.stopPropagation();
    $(image).parent().parent().hide();
}

function showImageInModal(imageLink) {
    var getImg = $(imageLink).children().attr("ng-src");
    //var getName = $(imageLink).children().text();
    var getLink = $(imageLink).find(".dataLink").data('locations');
    var getIconLink = $(imageLink).find(".icoLink").text();
    var getIconId = $(imageLink).find(".icoID").text();
    getLicense(getIconId);
    var changToInt = [];
    var getSize = [];
    var joining;
    for (var i = 0; i < getLink.length; i++) {
        getSize = getLink[i].split("/");
        changToInt.push(parseInt(getSize[8]));
        //console.log(getSize[8]);
    }
    var sorting = changToInt.sort(function(a, b) {
        return a - b
    });

    for (var j = 0; j < sorting.length; j++) {
        getSize[8] = "" + sorting[j];
        joining = getSize.join("/");

        $(".PNG").append("<a class=link href=" + joining + "><button class='btn btn-primary'>" + sorting[j] + "px</button></a>");
    }

    $(".mdImg").attr("src", "" + getImg + "");
    //$("#myModalLabel").text(""+getName+"");
    $('.linktoIcon').attr('href', '' + getIconLink);
}

function getLicense(getIconId){
    var url = "https://api.iconfinder.com/v2/icons/"+getIconId;
    $.ajax({
      method: "GET",
      url: url,
    })
    .done(function( data ) {
        var iconLicense = data.iconset.license.name;
        var getIconWeb = data.iconset.website_url;
        console.log(getIconWeb);
        if(getIconWeb != undefined){
            $('.visit').show();
            $('.webSiteName').unbind('click');
            $('.webSiteName').text(getIconWeb).click(function(){
                    window.open(getIconWeb);
            });;
        }else if(getIconWeb == undefined){
             $('.webSiteName').text("");
             $('.visit').hide();
        }



        if(iconLicense == "Creative Commons (Attribution 3.0 Unported)"){
             $(".licenseName").unbind('click');
             $(".licenseName").text(iconLicense);
             $(".licenseName").css('color','#00B7FF').click(function(){
                window.open("https://creativecommons.org/licenses/by/3.0/");
             });
             return false;
        }if(iconLicense == "Free for commercial use"){
            $(".licenseName").unbind('click');
            $(".licenseName").text("สามารถใช้ในเชิงพาณิชย์");
            $(".licenseName").attr('href','javascript:void(0)').css('color','black');
            return false;
        }if(iconLicense == "Creative Commons (Attribution-Share Alike 3.0 Unported)"){
             $(".licenseName").unbind('click');
             $(".licenseName").text(iconLicense);
             $(".licenseName").css('color','#00B7FF').click(function(){
                window.open("https://creativecommons.org/licenses/by-sa/3.0/");
             });
             return false;
        }if(iconLicense == "Creative Commons (Attribution-Share Alike 3.0 Unported)"){
             $(".licenseName").unbind('click');
             $(".licenseName").text("สามารถใช้ในเชิงพาณิชย์(ห้ามนำไปขายหรือแจกจ่าย)");
             $(".licenseName").attr('href','javascript:void(0)').css('color','black');
             return false;
        }if(iconLicense == "Free for personal use only"){
             $(".licenseName").unbind('click');
             $(".licenseName").text("ใช้ได้โดยไม่เกี่ยวข้องกับการค้า");
             $(".licenseName").attr('href','javascript:void(0)').css('color','black');
             return false;
        }if(iconLicense == "Creative Commons (Attribution 2.5 Generic)"){
             $(".licenseName").unbind('click');
             $(".licenseName").text(iconLicense);
             $(".licenseName").css('color','#00B7FF').click(function(){
                window.open("https://creativecommons.org/licenses/by-sa/3.0/");
             });
             return false;
        }if(iconLicense == "Free for commercial use (Include link to authors website)"){
             $(".licenseName").unbind('click');
             $(".licenseName").text(iconLicense);
             $(".licenseName").attr('href','javascript:void(0)').css('color','black');
             return false;
        }if(iconLicense == "Free for commercial use (Include link to package)"){
             $(".licenseName").unbind('click');
             $(".licenseName").text(iconLicense);
             $(".licenseName").attr('href','javascript:void(0)').css('color','black');
             return false;
        }if(iconLicense == "Creative Commons Attribution-No Derivative Works 3.0 Unported"){
             $(".licenseName").unbind('click');
             $(".licenseName").text(iconLicense);
             $(".licenseName").css('color','#00B7FF').click(function(){
                window.open("https://creativecommons.org/licenses/by-nd/3.0/");
             });
             return false;
        }if(iconLicense == "GPL"){
             $(".licenseName").unbind('click');
             $(".licenseName").text(iconLicense);
             $(".licenseName").css('color','#00B7FF').click(function(){
                window.open("http://www.gnu.org/copyleft/gpl.html");
             });
             return false;
        }if(iconLicense == "Creative Commons Attribution 2.5 Denmark"){
             $(".licenseName").unbind('click');
             $(".licenseName").text(iconLicense);
             $(".licenseName").css('color','#00B7FF').click(function(){
                window.open("https://creativecommons.org/licenses/by/2.5/dk/deed.en");
             });
             return false;
        }if(iconLicense == "Free for commercial use (Email author for permission: buz@icondrawer.com)"){
            $(".licenseName").unbind('click');
            $(".licenseName").text(iconLicense);
            $(".licenseName").css('color','#00B7FF');
        }if(iconLicense == "Public Domain"){
            $(".licenseName").unbind('click');
            $(".licenseName").text(iconLicense);
            $(".licenseName").attr('href','javascript:void(0)').css('color','black');
        }if(iconLicense == "Creative Commons (Attribution 3.0 United States)"){
            $(".licenseName").unbind('click');
            $(".licenseName").text(iconLicense);
            $(".licenseName").css('color','#00B7FF').click(function(){
                window.open("http://creativecommons.org/licenses/by/3.0/us/");
            });
            return false;
        }if(iconLicense == "Creative Commons Attribution 3.0 Unported (CC BY 3.0)"){
            $(".licenseName").unbind('click');
            $(".licenseName").text(iconLicense);
            $(".licenseName").css('color','#00B7FF').click(function(){
                window.open("https://creativecommons.org/licenses/by/3.0/");
            });
            return false;
        }if(iconLicense == "Free for commercial use (Do not resell)"){
            $(".licenseName").unbind('click');
            $(".licenseName").text(iconLicense);
            $(".licenseName").attr('href','javascript:void(0)').css('color','black');
            return false;
        }if(iconLicense == "Free for commercial use (Restrictions apply - read license)"){
            $(".licenseName").unbind('click');
            $(".licenseName").text(iconLicense);
            $(".licenseName").attr('href','javascript:void(0)').css('color','black');
            return false;
        }if(iconLicense == "Free for commercial use (Redistribute with this license)"){
            $(".licenseName").unbind('click');
            $(".licenseName").text(iconLicense);
            $(".licenseName").attr('href','javascript:void(0)').css('color','black');
            return false;
        }if (iconLicense == "Free for commercial use (Email author for permission)") {
            $(".licenseName").unbind('click');
            $(".licenseName").text(iconLicense);
            $(".licenseName").css('color','#00B7FF');
            return false;
        }if(iconLicense == "Free for commercial use (Click here to read license)"){
            $(".licenseName").unbind('click');
            $(".licenseName").text("Free for commercial use");
            $(".licenseName").css('color','#black');
            return false;
        }if(iconLicense == "Free for commercial use (Attribute author as specified in license)"){
            $(".licenseName").unbind('click');
            $(".licenseName").text(iconLicense);
            $(".licenseName").css('color','black');
            return false;
        }if(iconLicense =="Free for commercial use (Contact author for permission)"){
            $(".licenseName").unbind('click');
            $(".licenseName").text(iconLicense);
            $(".licenseName").css('color','black');
            return false;
        }if(iconLicense == "MIT License"){
            $(".licenseName").unbind('click');
            $(".licenseName").text(iconLicense);
            $(".licenseName").css('color','#00B7FF').click(function(){
                window.open("http://opensource.org/licenses/MIT");
            });
            return false;
        }if(iconLicense == "LGPL"){
            $(".licenseName").unbind('click');
            $(".licenseName").text(iconLicense);
            $(".licenseName").css('color','#00B7FF').click(function(){
                window.open("http://www.gnu.org/licenses/lgpl.html");
            });
            return false;
        }if(iconLicense == "Creative Commons Attribution-Share Alike 3.0 Unported License"){
            $(".licenseName").unbind('click');
            $(".licenseName").text(iconLicense);
            $(".licenseName").css('color','#00B7FF').click(function(){
                window.open("https://creativecommons.org/licenses/by-sa/3.0/");
            });
            return false; 
        }if(iconLicense == "Free Art License"){
            $(".licenseName").unbind('click');
            $(".licenseName").text(iconLicense);
            $(".licenseName").css('color','#00B7FF').click(function(){
                window.open("http://artlibre.org/licence/lal/en/");
            });
            return false; 
        }
        
    });
}
$('#myModal').on('hidden.bs.modal', function(e) {
    $(".link").remove(".link");
})
