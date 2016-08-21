	var app = angular.module("FreeIcon",[]);
	app.controller("IconsController",function($scope,$http){
		$scope.Topics = [];
		$scope.datas = [];
		$scope.adding = [];
		$scope.icoLink =[];
		var calculateTotalrang = 1;
		var numberIcon = 1;
		var countShow = 35;
		var checkText = "";
		var linkDownloadPng = [];
		$(".stloader").hide();
		$scope.listIcon = function(searchText){
			calculateTotalrang =1;
			$scope.datas = [];
			countShow = 0;
			$scope.imgUrl = [];
			checkText = searchText;
			numberIcon =1;
			if(checkText == null ||checkText == undefined){
				checkText = iconValname;
				queryData(checkText);
			}
	        function queryData(checkText){
	        	showUi();
	        	var url = "https://api.iconfinder.com/v2/icons/search?query="+checkText+"&count=35&premium=0";
	        	$http.get(url).success(function(data){
	        		$scope.datas = [];
	        		console.log(checkText);
	        		placeData(data);
	        		calculateCount();
	        		scrollingLoadData();
	        		if($scope.Topics.total_count == 0){
						alert("ไม่มี Icon ที่คุณตามหา");
					}
	        	}).error(function(data){
					location.reload();
				});

	        }

	        function scrollingLoadData(){
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
	        function pagination(calculateTotalrang){
	        	var storePage = []
	        	for(var i =1;i<=calculateTotalrang; i++){
	        		storePage.push(i);
	        	}
	        	console.log(storePage);
	        	for(var j =1;j<=5;j++){
		        	$("<li class=page-item id="+countShow+"><a class=page-link href=javascript:void(0)>"+j+"</a></li>").insertBefore(".addPage");
		        	countShow = countShow +35;
	        	}
	        	$("#0").addClass("active");
	        	clickFunction();
	        }
	        function clickFunction(){
	        	$(".page-item").click(function(event) {
	        		$(".page-item.active").removeClass("active");
	        		$("#"+this.id).addClass("active");
				    getDataAgain(this.id);
				 });
	        	$("#next").click(function(){
	        		$("li.active").next().addClass("active");
	        		$("li.active").prev().removeClass("active");
	        		var getID = $("li.active")[1].id;
	        		getDataAgain(getID);
	        	});
	        	$("#prev").click(function(){
	        		$("li.active").prev().addClass("active");
	        		$("li.active").next().removeClass("active");
	        		var getID = $("li.active")[1].id;
	        		getDataAgain(getID);
	        	});
	        }
	        function getDataAgain(countShow){
	        	$scope.datas = [];
	        	console.log(countShow);
	        	showUi();
	        	var url = "https://api.iconfinder.com/v2/icons/search?query="+checkText+"&count=50&premium=0&offset=";
	        	url += ""+countShow;
	        	$http.get(url).success(function(data){

	        		placeData(data);

	        	}).error(function(error, status){
					console.log("Error"+error);
					console.log("Error"+status);
					location.reload();
				});

	        }
	        function calculateCount() {
	        	var totalCount = $scope.Topics.total_count;
	        	calculateTotalrang = Math.floor(totalCount/35);
	        }
			function showUi() {
	        	$(".stloader").show();
	        }
		}
		function placeData(data){
			$scope.Topics = data;
			for(var i = 0;i<$scope.Topics.icons.length;i++){
				var downloadIcoUrl= "https://api.iconfinder.com/v2";
				if($scope.Topics.icons[i].containers[0] === undefined){
				   //console.log(i);
				   // break;
				}else{
					var downloadUrlIco = $scope.Topics.icons[i].containers[0].download_url;
						downloadIcoUrl += downloadUrlIco;
				for(var j = 0;j<$scope.Topics.icons[i].raster_sizes.length;j++){
					var rasterSize = $scope.Topics.icons[i].raster_sizes[j].size_width;
					var previewuUrl = $scope.Topics.icons[i].raster_sizes[j].formats[0].preview_url;
					//var iconName = $scope.Topics.icons[i].categories[0].name;
					//console.log($scope.Topics.icons[i]);
					var downloadUrlName = "https://api.iconfinder.com/v2";
					downloadUrlName += $scope.Topics.icons[i].raster_sizes[j].formats[0].download_url;
					linkDownloadPng.push(downloadUrlName);
					//console.log(linkDownloadPng);
					//console.log(downloadIcoUrl);
					if(previewuUrl){
						if(rasterSize === 512){
							getData(previewuUrl,"",linkDownloadPng,downloadIcoUrl);
							//console.log(linkDownloadPng);
							break;
						}
						if(rasterSize === 256){
							getData(previewuUrl,"",linkDownloadPng,downloadIcoUrl);
							//console.log(linkDownloadPng);
							break;
						}
						if(rasterSize === 128){
							getData(previewuUrl,"",linkDownloadPng,downloadIcoUrl);
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
			//$scope.datas.Name.push($scope.Name);
			//console.log($scope.datas);

			$(".stloader").hide();
		}
		function getData(previewuUrl,iconName,linkDownloadPng,downloadUrlIco){
			$scope.datas.push({
								imgUrl:previewuUrl,
								name:iconName,
								linkDownloadPngFile:linkDownloadPng,
								icoLink:downloadUrlIco
							})
			//console.log($scope.datas);
		}
		$('#search').keypress(function (e) {
		 var key = e.which;
		 if(key == 13)  // the enter key code
		  {
		    var getSearchtxt = $("#search").val();
		    $scope.listIcon(getSearchtxt);
		  }
		}); 
	})
	function imgError(image){
	 	// image.parent().remove();
	 	 event.stopPropagation();
    	 $(image).parent().parent().hide();
	}
	function showImageInModal(imageLink){
		var getImg = $(imageLink).children().attr("ng-src");
		//var getName = $(imageLink).children().text();
		var getLink = $(imageLink).find(".dataLink").data('locations');
		var getIconLink = $(imageLink).find(".icoLink").text();
		//console.log(getIconLink);
		var changToInt=[];
		var getSize = [];
		var joining;
		for(var i=0;i<getLink.length;i++){
			getSize = getLink[i].split("/");
			changToInt.push(parseInt(getSize[8]));
			//console.log(getSize[8]);
		}
		var sorting = changToInt.sort(function(a, b){return a-b});

		for(var j = 0;j<sorting.length;j++){
			getSize[8] = ""+sorting[j];
			joining = getSize.join("/");

			$(".PNG").append("<a class=link href="+joining+"><button class='btn btn-primary'>"+sorting[j]+"px</button></a>");
		}
		
		$(".mdImg").attr("src",""+getImg+"");
		//$("#myModalLabel").text(""+getName+"");
		$('.linktoIcon').attr('href',''+getIconLink);
	}

	$('#myModal').on('hidden.bs.modal', function (e) {
  		$(".link").remove(".link");
	 })
	