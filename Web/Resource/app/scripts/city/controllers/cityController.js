var cityController = function ($scope, cityService) {
    $scope.keyword;     //查询关键字
    $scope.usekeyword;  //使用到的查询关键字
    $scope.city;        //选中城市
    $scope.cityList;    //城市列表
    $scope.pageArray;   //分页列表
    $scope.citySelectDisplay = false;//是否显示城市下拉列表
    $scope.searchCitysByCondition = function (pageindex, issearch) { //根据条件查询城市列表（当前页,是否为查询按钮）
        if ($scope.keyword.length == 0)         //判断是否输入查询关键字
            return;
        if (issearch) {
            $scope.usekeyword = $scope.keyword; //如为查询按钮点击，则使用输入框内的值进行查询
        }
        $scope.city = '';                       //点击查询时清空hidden值
        var condition = {
            reqtype: 'searchCitysByCondition',
            keyword: $scope.usekeyword,
            pageindex: pageindex,
            pagesize: 5 //默认分页大小为5
        };
        cityService.query(condition).then(function (data) {
            $scope.cityList = null;         //查询时重置城市下拉列表
            $scope.citySelectDisplay = false;   //查询时隐藏城市下拉列表
            if (data.Status == app.respstatus[0].status) {          //查询成功
                $scope.cityList = data.Content.CityList;
                $scope.citySelectDisplay = true;
                var num = parseInt(data.Content.RecordCount / condition.pagesize);  //计算分页大小
                var pageNum = data.Content.RecordCount % condition.pagesize == 0 ? num : num + 1;
                $scope.pageArray = new Array();                                     //添加分页数
                for (var i = 0; i < pageNum; i++) {
                    $scope.pageArray.push(i);
                }
            }
            else if (data.Status == app.respstatus[1].status) {     //未找到符合条件的结果
                alert('查询结果为空')     
            }
            else if (data.Status == app.respstatus[2].status) {     //查询异常
                alert(data.Exception);
            }
        });
    }
    $scope.setCityValue = function (cityname) {    //赋值到hidden控件
        $scope.keyword = cityname;
        $scope.city = cityname;
        $scope.citySelectDisplay = false;
    }
}

cityController.$inject = ['$scope', 'cityService']; //注入服务到controller

app.controller('cityController', cityController);   //把controller注册到app