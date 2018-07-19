var opts = {
    subdistrict: 1,
    showbiz:false
};
var district = new AMap.DistrictSearch(opts);


var app = angular.module('myApp', [])
.controller('myCtrl', ["$scope", "$http", function($scope, $http){
    district.search('中国', function(status, result) {
        $scope.provinceList = $scope.getData(result.districtList[0]);
        $scope.$apply();
    });

    $scope.demoList = function(){
        $http.get("http://localhost:8080/list")
        .then(function (result) {
            $scope.demos = result.data;
        });
    }
    $scope.demoList();

    $scope.$watch('province', function(){
        $scope.ifExit();
        if(undefined !== $scope.province){
            $scope.selectProvince($scope.province);
        }
    });
    $scope.selectProvince = function(obj){
        if(null !== obj) {
            district.setLevel(obj.level);
            district.search(obj.name, function (status, result) {
                $scope.cityList = $scope.getData(result.districtList[0]);
                $scope.districtList = '';
                $scope.$apply();
            });
        }
    }

    $scope.$watch('city', function() {
        $scope.ifExit();
        if (undefined !== $scope.province)
            $scope.selectCity($scope.city)
    });
    $scope.selectCity = function(obj){
        if(null !== obj){
            district.setLevel(obj.level);
            district.search(obj.name, function(status, result) {
                $scope.districtList = $scope.getData(result.districtList[0]);
                $scope.$apply();
            });
        }
    }

    /*$scope.$watch('district', function() {
        if (undefined !== $scope.province)
            $scope.selectDistrict($scope.district)
    });
    $scope.selectDistrict = function(obj){
        if(null !== obj) {
            district.setLevel(obj.level);
            district.search(obj.name, function (status, result) {
                $scope.streetList = $scope.getData(result.districtList[0], obj.level);
                $scope.$apply();
            });
        }
    }*/

    $scope.$watch('district', function() {
        $scope.ifExit();
    });

    $scope.exit = false;
    $scope.ifExit = function () {
        if($scope.province!==undefined && $scope.province!==null
            && $scope.city!==undefined && $scope.city!==null
            && $scope.district!==undefined && $scope.district!==null)
            $scope.exit = true;
        else
            $scope.exit = false;
    }

    $scope.saveDemo = function () {
        $http.post("http://localhost:8080/save",
            {'provinceCode':$scope.province.adcode,'provinceName':$scope.province.name,
                'cityCode':$scope.city.adcode, 'cityName':$scope.city.name,
                'districtCode':$scope.district.adcode, 'districtName':$scope.district.name})
            .then(function(){$scope.demoList()});
    }
    
    $scope.deleteDemo = function (demoId) {
        $http({
            method: 'DELETE',
            url: 'http://localhost:8080/delete',
            params: {id:demoId}
        }).then(function(){$scope.demoList()});
    }
    
    $scope.editDemo = function (demoId) {
        $http.get("http://localhost:8080/one/" + demoId)
            .then(function (result) {
                $scope.demo = result.data;
                $scope.province = {name:result.data.provinceName, adcode:result.data.provinceCode};
                $scope.provinceName = result.data.provinceName;
                district.search(result.data.provinceName, function (status, result) {
                    $scope.cityList = $scope.getData(result.districtList[0]);
                    $scope.districtList = '';
                    $scope.$apply();
                });
            });
    }
    

    $scope.getData = function(data){
        var subList = data.districtList;
        if (subList) {
            var curList = [];
            for (var i = 0; i < subList.length; i++) {
                var contentSub = {
                    name:subList[i].name,
                    level:subList[i].level,
                    adcode:subList[i].adcode,
                    citycode:subList[i].citycode
                }
                curList[i] = contentSub;
            }
        }
        return curList;
    }
}]);