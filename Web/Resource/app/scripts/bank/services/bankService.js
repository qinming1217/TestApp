var bankService = function ($resouce, $q,$http) {
    var service = {
        importBanklist: function (content) {
            var api = $resouce(app.config.webapiUrl);
            var defer = $q.defer();

            api.save(content, function (data) {
                defer.resolve(data);
            }, function (data) {
                defer.reject(data);
            });

            return defer.promise;
        },
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
bankService.$inject = ['$resource', '$q', '$http']; //注入服务到service
app.factory('bankService', bankService);            //把service注册到app