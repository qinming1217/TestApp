var cityService = function ($resouce, $q) {
    var service = {
        query: function (condition) {
            var api = $resouce(app.config.webapiUrl);
            var defer = $q.defer();

            api.save(condition, function (data) {
                defer.resolve(data);
            }, function (data) {
                defer.reject(data);
            });

            return defer.promise;
        }
    }

    return service;
}
cityService.$inject = ['$resource', '$q'];  //注入服务到service
app.factory('cityService', cityService);    //把service注册到app