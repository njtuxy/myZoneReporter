/**
 * Created by yxia on 6/25/15.
 */
var zone_report = angular.module('zone_report',[]);

zone_report.controller('zone_reporter_table', function ($scope, $http) {


    $http.get("http://10.151.0.186:8080/zoneReport/zoneReportDaily2?pagesize=500")
        .success(function (data) {
            var db_items = data["_embedded"]["rh:doc"]
            //$scope.db_items = db_items;

            $http.get("http://10.151.0.186:8080/zoneReport/zoneReportDaily3?pagesize=500")
                .success(function (data) {
                    var previous_db_items = data["_embedded"]["rh:doc"]
                    //$scope.previous_db_items = db_items;

                    var i;
                    var j;
                    var abc = new Array();

                    for(i=0;i<db_items.length; ++i){
                        for(j=0; j<previous_db_items.length; ++j){
                            if(db_items[i]["Zone"] === previous_db_items[j]["Zone"]){
                                db_items[i]["p_TileCount"] = previous_db_items[j]["TileCount"];
                                db_items[i]["p_TileCountChange"] = previous_db_items[j]["TileCountChange"];
                            }
                        }
                    }
                    $scope.db_items = db_items;

                })




        })


    $scope.counter = 0;
    $scope.predicate = 'Zone';

    $scope.reverse = true;
    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
    };






})

