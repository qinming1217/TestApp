var selectController = function ($scope) {
    alert('reload');
}
var citySelect = function () {
    return {
        restrict: "EA",        // 指令是一个元素 (并非属性) 
        scope: {
            "ng-model": "="
        },
        templateUrl: "../../../Views/CityFuzzySearchView.html",//指定模板页路径
        replace: true,        // 使用模板替换原始标记 
        transclude: false,    // 不复制原始HTML内容 
        controller: ["$scope", "cityService", function ($scope, cityService) {
            $scope.keyword;
            $scope.city;
            $scope.cityList;
            $scope.title = "城市";
            $scope.cityBtnShow = true;
            $scope.citySelected = {};
            $scope.searchCitys = function () {
                $scope.cityBtnShow = false;
                $scope.$apply();
                var condition = {
                    reqtype: 'searchCitysByCondition',
                    keyword: $scope.keyword
                };
                cityService.query(condition).then(function (data) {
                    if (data.Status == app.respstatus[0].status) {
                        $scope.cityList = data.Content.CityList;
                        $scope.citySelectShow = true;
                    }
                    else if (data.Status == app.respstatus[1].status) { //未查询到符合条件结果
                        alert('查询结果为空')
                    }
                    else if (data.Status == app.respstatus[2].status) { //查询异常
                        alert('查询异常');
                    }
                });

                $scope.cityBtnShow = true;
            }
            $scope.setCityValue = function () {
                $scope.keyword = $scope.citySelected[""].CityName;
                $scope.city = $scope.citySelected[""].CityName;
                $scope.citySelectShow = false;
            }
            $scope.clearValue = function () {
                $scope.city = "";
            }
        }],
        link: function (scope, element, attrs, controller) { }
    }
}
var bankSelect = function () {
    return {
        restrict: "EA",        // 指令是一个元素 (并非属性) 
        scope: {},
        templateUrl: "../../../Views/BankFuzzySearchView.html",//指定模板页路径
        replace: true,        // 使用模板替换原始标记 
        transclude: false,    // 不复制原始HTML内容 
        controller: ["$scope", "bankService", function ($scope, bankService) {
            $scope.title = "银行";
            $scope.subtitle = "支行";
            $scope.bank;                //选定银行
            $scope.bankList;            //银行列表
            $scope.keyword;             //查询银行关键字
            $scope.bankSelectShow;   //是否显示银行下拉列表
            $scope.bankSelected = {};
            $scope.searchBanks = function () {   //根据条件查询银行列表
                if ($scope.keyword.length == 0)             //查询条件为空
                    return;
                var condition = {
                    reqtype: 'searchBanksByCondition',
                    keyword: $scope.keyword
                };
                bankService.query(condition).then(function (data) {
                    $scope.bankList = null;             //点击查询时重置下拉银行列表
                    $scope.bankSelectShow = false;   //点击查询时隐藏下拉银行列表
                    if (data.Status == app.respstatus[0].status) {      //查询成功
                        $scope.bankList = data.Content.BankList;
                        $scope.bankSelectShow = true;
                    }
                    else if (data.Status == app.respstatus[1].status) { //未查询到符合条件结果
                        alert('查询结果为空')
                    }
                    else if (data.Status == app.respstatus[2].status) { //查询异常
                        alert(data.Exception);
                    }
                });
            }
            $scope.setBankValue = function () { //设置银行hidden值
                $scope.keyword = $scope.bankSelected[""].BankName;
                $scope.bank = $scope.bankSelected[""].BankName;
                $scope.bankSelectShow = false;       //赋值后隐藏下拉框
            }
            $scope.clearBank = function () {
                $scope.bank = "";
            }

            $scope.subbank;                 //选定分行
            $scope.subbankList;             //分行列表
            $scope.subkeyword;              //查询分行关键字
            $scope.subbankSelectShow;    //是否显示分行列表
            $scope.subbankSelected = {};
            $scope.searchSubbanks = function () {    //根据条件查询分行列表
                if ($scope.bank.length == 0 || $scope.keyword.length == 0 || $scope.subkeyword.length == 0)
                    return;                                     //如未选择银行或未输入查询分行关键字
                var condition = {
                    reqtype: 'searchSubBanksByCondition',
                    keyword: $scope.keyword,
                    subkeyword: $scope.subkeyword
                };
                bankService.query(condition).then(function (data) {
                    $scope.subbankList = null;              //点击查询时重置下拉支行列表
                    $scope.subbankSelectShow = false;    //点击查询时隐藏下拉支行列表
                    if (data.Status == app.respstatus[0].status) {      //查询成功
                        $scope.subbankList = data.Content.SubBankList;
                        $scope.subbankSelectShow = true;
                    }
                    else if (data.Status == app.respstatus[1].status) { //未查询到符合条件结果
                        alert('查询结果为空')
                    }
                    else if (data.Status == app.respstatus[2].status) { //查询异常
                        alert(data.Exception);
                    }
                });
            }
            $scope.setSubbankValue = function () {           //设置分行hidden值
                $scope.subkeyword = $scope.subbankSelected.undefined.SubBankName;
                $scope.subbank = $scope.subbankSelected.undefined.SubBankName;
                $scope.subbankSelectShow = false;                    //赋值后隐藏分行下拉列表
            }
        }],
        link: function (scope, element, attrs, controller) { }
    }
}

bankSelect.$inject = ['bankService'];
citySelect.$inject = ['cityService'];
selectController.$inject = ['$scope'];
app.directive('bankSelect', bankSelect);
app.directive('citySelect', citySelect);
app.controller('selectController', selectController);

//app.controller('selectController', ['$scope', function ($scope) {

//}]).directive('citySelect', function () {
//    return {
//        restrict: "E",        // 指令是一个元素 (并非属性) 
//        scope: {
//            city: '='
//        },
//        templateUrl: "CityFuzzySearchView.html", //指定模板页路径
//        replace: true,        // 使用模板替换原始标记 
//        transclude: false,    // 不复制原始HTML内容 
//        controller: ["$scope", "cityService", function ($scope, cityService) {
//            $scope.keyword;
//            $scope.city;
//            $scope.cityList;
//            $scope.title = "城市";
//            $scope.citySelected = {};
//            $scope.searchCitys = function () {
//                if ($scope.keyword == undefined || $scope.keyword.length == 0) {
//                    return;
//                }
//                var condition = {
//                    reqtype: 'searchCitysByCondition',
//                    keyword: $scope.keyword
//                };
//                cityService.query(condition).then(function (data) {
//                    if (data.Status == app.respstatus[0].status) {
//                        $scope.cityList = data.Content.CityList;
//                        $scope.citySelectShow = true;
//                    }
//                    else if (data.Status == app.respstatus[1].status) { //未查询到符合条件结果
//                        alert('查询结果为空')
//                    }
//                    else if (data.Status == app.respstatus[2].status) { //查询异常
//                        alert('查询异常');
//                    }
//                });
//            }
//            $scope.setCityValue = function () {
//                $scope.keyword = $scope.citySelected.undefined.CityName;
//                $scope.city = $scope.citySelected.undefined.CityName;
//                $scope.citySelectShow = false;
//            }
//            $scope.clearValue = function () {
//                $scope.city = "";
//            }
//        }],
//        link: function (scope, element, attrs, controller) {
//            $(element).click(function () {
//                var a = element;
//            });
//        }
//    }
//}).directive('bankSelect', function () {
//    return {
//        restrict: "EA",        // 指令是一个元素 (并非属性) 
//        scope: {
//            bank: '=',
//            subbank: '='
//        },
//        templateUrl: "BankFuzzySearchView.html", //指定模板页路径
//        replace: true,        // 使用模板替换原始标记 
//        transclude: false,    // 不复制原始HTML内容 
//        controller: ["$scope", "bankService", function ($scope, bankService) {
//            $scope.title = "银行";
//            $scope.subtitle = "支行";
//            $scope.bank;                //选定银行
//            $scope.bankList;            //银行列表
//            $scope.keyword;             //查询银行关键字
//            $scope.bankSelectShow;   //是否显示银行下拉列表
//            $scope.bankSelected = {};
//            $scope.searchBanks = function () {   //根据条件查询银行列表
//                if ($scope.keyword == undefined || $scope.keyword.length == 0)             //查询条件为空
//                    return;
//                var condition = {
//                    reqtype: 'searchBanksByCondition',
//                    keyword: $scope.keyword
//                };
//                bankService.query(condition).then(function (data) {
//                    $scope.bankList = null;             //点击查询时重置下拉银行列表
//                    $scope.bankSelectShow = false;   //点击查询时隐藏下拉银行列表
//                    if (data.Status == app.respstatus[0].status) {      //查询成功
//                        $scope.bankList = data.Content.BankList;
//                        $scope.bankSelectShow = true;
//                    }
//                    else if (data.Status == app.respstatus[1].status) { //未查询到符合条件结果
//                        alert('查询结果为空')
//                    }
//                    else if (data.Status == app.respstatus[2].status) { //查询异常
//                        alert(data.Exception);
//                    }
//                });
//            }
//            $scope.setBankValue = function () { //设置银行hidden值
//                $scope.keyword = $scope.bankSelected.undefined.BankName;
//                $scope.bank = $scope.bankSelected.undefined.BankName;
//                $scope.bankSelectShow = false;       //赋值后隐藏下拉框
//            }
//            $scope.clearBank = function () {
//                $scope.bank = "";
//            }

//            $scope.subbank;                 //选定分行
//            $scope.subbankList;             //分行列表
//            $scope.subkeyword;              //查询分行关键字
//            $scope.subbankSelectShow;    //是否显示分行列表
//            $scope.subbankSelected = {};
//            $scope.searchSubbanks = function () {    //根据条件查询分行列表
//                if ($scope.bank == undefined || $scope.keyword == undefined ||
//                    $scope.subkeyword == undefined || $scope.bank.length == 0 ||
//                    $scope.keyword.length == 0 || $scope.subkeyword.length == 0)
//                    return;                                     //如未选择银行或未输入查询分行关键字
//                var condition = {
//                    reqtype: 'searchSubBanksByCondition',
//                    keyword: $scope.keyword,
//                    subkeyword: $scope.subkeyword
//                };
//                bankService.query(condition).then(function (data) {
//                    $scope.subbankList = null;              //点击查询时重置下拉支行列表
//                    $scope.subbankSelectShow = false;    //点击查询时隐藏下拉支行列表
//                    if (data.Status == app.respstatus[0].status) {      //查询成功
//                        $scope.subbankList = data.Content.SubBankList;
//                        $scope.subbankSelectShow = true;
//                    }
//                    else if (data.Status == app.respstatus[1].status) { //未查询到符合条件结果
//                        alert('查询结果为空')
//                    }
//                    else if (data.Status == app.respstatus[2].status) { //查询异常
//                        alert(data.Exception);
//                    }
//                });
//            }
//            $scope.setSubbankValue = function () {           //设置分行hidden值
//                $scope.subkeyword = $scope.subbankSelected.undefined.SubBankName;
//                $scope.subbank = $scope.subbankSelected.undefined.SubBankName;
//                $scope.subbankSelectShow = false;                    //赋值后隐藏分行下拉列表
//            }
//        }],
//        link: function (scope, element, attrs, controller) { }
//    }
//})