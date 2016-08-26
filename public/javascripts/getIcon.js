var app = angular.module("FreeIcon", []);
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
                console.log(checkText);
                placeData(data);
                calculateCount();
                getDataAgain();
                scrollingLoadData();
            }).error(function(data) {
                location.reload();
            });

        }

        function scrollingLoadData() {
            pagination(calculateTotalrang);
            // if(numberIcon < calculateTotalrang){
            // 		showUi();
            // 		countShow = countShow +35;
            // 		getDataAgain(countShow);
            // 		numberIcon++;
            // 		console.log(numberIcon)
            // 		console.log(calculateTotalrang)
            // }else{
            // 	calculateCount = 1;
            // }


        }

        function pagination(calculateTotalrang) {
            $("#demo1").paginate({
				count 		: calculateTotalrang,
				start 		: 1,
				display     : 7,
				border					: true,
				border_color			: '#fff',
				text_color  			: '#fff',
				background_color    	: 'black',	
				border_hover_color		: '#ccc',
				text_hover_color  		: '#000',
				background_hover_color	: '#fff', 
				images					: false,
				mouse					: 'press',
				onChange     			: function(page){
											$('._current').removeClass('_current').hide();
										  }
			});
			for(var i = 1 ; i<=calculateTotalrang;i++){
				$('.jPag-pages li.'+i).attr('id',""+countShow);
				countShow = countShow + 35;
			}

			$('.jPag-pages li').click(function(){
				showHidefunc(this.id);
			})

            //clickFunction();
        }
        function showHidefunc(id){
        	//console.log($scope.datas.length);
        	var idNum = parseInt(id);
        	
        	for(var i = idNum; i<=idNum + 35;i++){
        		$(function () {
        			console.log(i);
        			$('.item-list').find("li:eq("+i+")").addClass('_current').show();
        		});
        	}
        }

        function clickFunction() {
            var countNextandPrev = 0;
            var checkDataID = null;
            $(".page-item").click(function(event) {
                $(".page-item.active").removeClass("active");
                $("#" + this.id).addClass("active");
                checkDataID = parseInt(this.id)+35;
                var keepData =[]
                keepData.push(checkDataID);
                console.log(keepData);
            });
            $("#next").click(function() {

            });
            $("#prev").click(function() {

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
                //console.log(i);
                // break;
            } else {
                var downloadUrlIco = $scope.Topics.icons[i].containers[0].download_url;
                downloadIcoUrl += downloadUrlIco;
                for (var j = 0; j < $scope.Topics.icons[i].raster_sizes.length; j++) {
                    var rasterSize = $scope.Topics.icons[i].raster_sizes[j].size_width;
                    var previewuUrl = $scope.Topics.icons[i].raster_sizes[j].formats[0].preview_url;
                    //var iconName = $scope.Topics.icons[i].categories[0].name;
                    //console.log($scope.Topics.icons[i]);
                    var downloadUrlName = "https://api.iconfinder.com/v2";
                    downloadUrlName += $scope.Topics.icons[i].raster_sizes[j].formats[0].download_url;
                    linkDownloadPng.push(downloadUrlName);
                    //console.log(linkDownloadPng);
                    //console.log(downloadIcoUrl);
                    if (previewuUrl) {                
                        if (rasterSize === 512) {
                            getData(previewuUrl, "", linkDownloadPng, downloadIcoUrl);
                            checkNum++;
                            //console.log(linkDownloadPng);
                            break;
                        }
                        if (rasterSize === 256) {
                            getData(previewuUrl, "", linkDownloadPng, downloadIcoUrl);
                            checkNum++;
                            //console.log(linkDownloadPng);
                            break;
                        }
                        if (rasterSize === 128) {
                            getData(previewuUrl, "", linkDownloadPng, downloadIcoUrl);
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

    function getData(previewuUrl, iconName, linkDownloadPng, downloadUrlIco) {
        $scope.datas.push({
            imgUrl: previewuUrl,
            name: iconName,
            linkDownloadPngFile: linkDownloadPng,
            icoLink: downloadUrlIco
        })

    }


    $scope.rowClass = function(item, index){
         if(index >= 0 && index < 35){
             return '_current';
         }	
    };

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
    //console.log(getIconLink);
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

$('#myModal').on('hidden.bs.modal', function(e) {
    $(".link").remove(".link");
})
