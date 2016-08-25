favorite.getListAll = function () {

            var deferred = $q.defer();
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": config.stockradarsAPI + "/radars/v3.4/favorite/list_all",
                "method": "GET",
                "headers": {
                    "user-id": localStorage.getItem('user_id'),
                    "token": localStorage.getItem('token'),
                    "cache-control": "no-cache"
                }
            };

            $.ajax(settings).then(function successCallback(json) {

                if(json.status == 'no'){
                    modalAlert.sessionTimeOut();
                    return;
                };

                deferred.resolve(json);
            });

            return deferred.promise;
        };