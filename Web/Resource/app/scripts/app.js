var app = angular.module("ngMainApp", ['ngRoute', 'ngResource']);
app.config(['$routeProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider',
        function ($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider) {
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

            $httpProvider.defaults.transformRequest = function (data) {
                //return angular.isObject(data) && !(data instanceof FileList) && !(value instanceof File) ? param(data) : (data instanceof FileList || data instanceof File) ? paramFile(data) : data;

                if (angular.isObject(data)) {
                    if (data instanceof FileList || data instanceof File) {
                        return paramFile(data);
                    }
                    else {
                        return param(data);
                    }
                }
                else
                    return data;
            }

            app.config =
            {
                webapiUrl: '../Handler/Handler.ashx'
            };
            app.respstatus = [
                { status: 0, description: '成功' },
                { status: 1, description: '失败' },
                { status: -1, description: '异常' }
            ];
        }]);

var param = function (obj) {

    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for (name in obj) {
        value = obj[name];

        if (value instanceof Array) {
            for (i = 0; i < value.length; i++) {
                subValue = value[i];
                fullSubName = name + '[' + i + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
            }
        } else if (value instanceof Object) {
            for (subName in value) {
                subValue = value[subName];
                fullSubName = name + '[' + subName + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
            }
        }
        else if (value !== undefined && value !== null) {
            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

    }
    return query.length ? query.substr(0, query.length - 1) : query;
};

var paramFile = function (data) {
    var fd = new FormData();
    angular.forEach(data, function (value, key) {
        if (value instanceof FileList) {
            if (value.length == 1) {
                fd.append(key, value[0]);
            } else {
                angular.forEach(value, function (file, index) {
                    fd.append(key + '_' + index, file);
                });
            }
        } else {
            fd.append(key, value);
        }
    });

    return fd;
}