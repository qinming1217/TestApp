var bankController = function ($scope, $http, bankService) {
    $scope.file;        //文件
    $scope.filesName;   //文件名
    $scope.init = function () {
        var url = "http://10.138.60.16:10000/kkd//gjj/init/shanghai/Json";
        $http.get(url).success(function (data) {
            alert(data);
        }).error(function (error) { alert(error) });
    }
    $scope.getfile = function (files) { //获取文件
        $scope.$apply(function () {
            $scope.filesName = files[0].name;
            var suffix = $scope.filesName.substr($scope.filesName.lastIndexOf('.'));//文件后缀名
            if (suffix != '.xlsx' && suffix != '.xls') {//判断后缀名格式
                $scope.file = null;
                alert('只能上传xlsx和xls文件！');
                return;
            }
            $scope.file = files[0];
        })
    }
    $scope.importBanklist = function () {   //导入文件
        if ($scope.file == null || $scope.file.length == 0) {
            alert('请先选择文件！');
            return;
        }

        document.bankimport.action = app.config.webapiUrl + '?reqtype=importBanklist';  //使用form表单提交
        document.bankimport.submit();
    }

    $scope.bank;                //选定银行
    $scope.bankList;            //银行列表
    $scope.keyword;             //查询银行关键字
    $scope.bankSelectDisplay;   //是否显示银行下拉列表
    $scope.searchBanksByCondition = function () {   //根据条件查询银行列表
        if ($scope.keyword.length == 0)             //查询条件为空
            return;
        var condition = {
            reqtype: 'searchBanksByCondition',
            keyword: $scope.keyword
        };
        bankService.query(condition).then(function (data) {
            $scope.bankList = null;             //点击查询时重置下拉银行列表
            $scope.bankSelectDisplay = false;   //点击查询时隐藏下拉银行列表
            if (data.Status == app.respstatus[0].status) {      //查询成功
                $scope.bankList = data.Content.BankList;
                $scope.bankSelectDisplay = true;
            }
            else if (data.Status == app.respstatus[1].status) { //未查询到符合条件结果
                alert('查询结果为空')
            }
            else if (data.Status == app.respstatus[2].status) { //查询异常
                alert(data.Exception);
            }
        });
    }
    $scope.setBankValue = function (bankname) { //设置银行hidden值
        $scope.keyword = bankname;
        $scope.bank = bankname;
        $scope.bankSelectDisplay = false;       //赋值后隐藏下拉框
    }

    $scope.subbank;                 //选定分行
    $scope.subbankList;             //分行列表
    $scope.subkeyword;              //查询分行关键字
    $scope.subbankSelectDisplay;    //是否显示分行列表
    $scope.searchSubBanksByCondition = function () {    //根据条件查询分行列表
        if ($scope.bank.length == 0 || $scope.keyword.length == 0 || $scope.subkeyword.length == 0)
            return;                                     //如未选择银行或未输入查询分行关键字
        var condition = {
            reqtype: 'searchSubBanksByCondition',
            keyword: $scope.keyword,
            subkeyword: $scope.subkeyword
        };
        bankService.query(condition).then(function (data) {
            $scope.subbankList = null;              //点击查询时重置下拉支行列表
            $scope.subbankSelectDisplay = false;    //点击查询时隐藏下拉支行列表
            if (data.Status == app.respstatus[0].status) {      //查询成功
                $scope.subbankList = data.Content.SubBankList;
                $scope.subbankSelectDisplay = true;
            }
            else if (data.Status == app.respstatus[1].status) { //未查询到符合条件结果
                alert('查询结果为空')
            }
            else if (data.Status == app.respstatus[2].status) { //查询异常
                alert(data.Exception);
            }
        });
    }
    $scope.setSubBankValue = function (subbankname) {           //设置分行hidden值
        $scope.subkeyword = subbankname;
        $scope.subbank = subbankname;
        $scope.subbankSelectDisplay = false;                    //赋值后隐藏分行下拉列表
    }
}

bankController.$inject = ['$scope', '$http', 'bankService']; //注入服务到controller

app.controller('bankController', bankController);   //把controller注册到app