/**
 * Created by yxia on 6/25/15.
 */
var zone_report = angular.module('zone_report',[]);

zone_report.filter('num', function() {
    return function(input) {
        var result = parseInt(input, 10);
        return result;
    }
});

zone_report.filter('pn_number', function() {
    return function(input) {
        var result = parseInt(input, 10);
        if(result>0){
            return "+" + result
        }
        else{
            return result
        }
    }
});

function getChangePercentage(new_number, old_number){
    var n = (new_number-old_number) / old_number;
    return  (n.toFixed(2)*100).toFixed(0);
}


//zone_report.directive('myRow', function () {
//    return {
//        restrict : 'A',
//        replace : true,
//        scope : { mytitle : '@mytitle'},
//        template : '<span ng-hide="showPreviousTileCount">{{x.TileCount}} </span> <span ng_show = "showPreviousTileCount"> {{x.TileCount}}   &#8592 {{x.P_TileCount}} </span> <span ng-show="showTileCountChangePencentage" ng-style="{'background-color' : (x.TileCountChange | num) > 0 ? 'pink' : '#99CC00', 'width':'20px'}">{{" " +  x.TileCountChange}}% </span>'
//    }});

zone_report.controller('zone_reporter_table', function ($scope, $http) {

    //get the name of 2 latest collections
    $http.get("http://10.151.0.186:8080/zoneReport/")
        .success(function (data) {

            var db_collections = data["_embedded"]["rh:coll"];
            var name_of_lastest_collection = db_collections[db_collections.length-1]["_id"];
            var name_of_second_lastest_collection = db_collections[db_collections.length-2]["_id"];

            $http.get("http://10.151.0.186:8080/zoneReport/"+name_of_lastest_collection +"?pagesize=500")
                .success(function (data) {
                    var db_items = data["_embedded"]["rh:doc"];
                    //$scope.db_items = db_items;
                    $http.get("http://10.151.0.186:8080/zoneReport/"+name_of_second_lastest_collection+"?pagesize=500")
                        .success(function (data) {
                            var previous_db_items = data["_embedded"]["rh:doc"];
                            var i;
                            var j;
                            $scope.p_db_items = previous_db_items;
                            for (i = 0; i < db_items.length; ++i) {
                                for (j = 0; j < previous_db_items.length; ++j) {

                                    if (db_items[i]["Zone"] === previous_db_items[j]["Zone"]) {
                                        db_items[i]["P_TileCount"] = previous_db_items[j]["TileCount"];
                                        db_items[i]["P_TotalGameObjects"] = previous_db_items[j]["TotalGameObjects"];
                                        db_items[i]["P_SizeOnDisk"] = previous_db_items[j]["SizeOnDisk"];
                                        db_items[i]["P_Verts"] = previous_db_items[j]["Verts"];
                                        db_items[i]["P_Components"] = previous_db_items[j]["Components"];
                                        db_items[i]["P_PlaymakerEvents"] = previous_db_items[j]["PlaymakerEvents"];
                                        db_items[i]["P_EnemySpawners"] = previous_db_items[j]["EnemySpawners"];
                                        db_items[i]["P_Breakables"] = previous_db_items[j]["Breakables"];

                                        db_items[i]["TileCountChange"] = getChangePercentage(db_items[i]["TileCount"],previous_db_items[j]["TileCount"]);                                       ;
                                        db_items[i]["TotalGameObjectsChange"] = getChangePercentage(db_items[i]["TotalGameObjects"],previous_db_items[j]["TotalGameObjects"]);
                                        db_items[i]["SizeOnDiskChange"] = getChangePercentage(db_items[i]["SizeOnDisk"], previous_db_items[j]["SizeOnDisk"]);
                                        db_items[i]["VertsChange"] = getChangePercentage(db_items[i]["Verts"], previous_db_items[j]["Verts"]);
                                        db_items[i]["ComponentsChange"] = getChangePercentage(db_items[i]["Components"], previous_db_items[j]["Components"]);
                                        db_items[i]["PlaymakerEventsChange"] = getChangePercentage(db_items[i]["PlaymakerEvents"],previous_db_items[j]["PlaymakerEvents"]);
                                        db_items[i]["EnemySpawnersChange"] = getChangePercentage(db_items[i]["EnemySpawners"],previous_db_items[j]["EnemySpawners"]);
                                        db_items[i]["BreakablesChange"] = getChangePercentage(db_items[i]["Breakables"], previous_db_items[j]["Breakables"]);
                                    }
                                }
                            }
                        });
                    $scope.db_items = db_items;
                    $scope.updateTime = db_items[0]["_created_on"].substring(0,10);

                    //$scope.p_db_items = previous_db_items;



                    //do value comparison here:
                })
        });
    //});



    $scope.counter = 0;
    $scope.predicate = 'Zone';

    $scope.reverse = true;
    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
    };

    $scope.showTileCountChangePencentage = false;
    $scope.showPreviousTileCount = false;

    $scope.showTotalGameObjectsChangePencentage = false;
    $scope.showPreviousTotalGameObjects = false;

    $scope.showSizeOnDiskChangePencentage = false;
    $scope.showPreviousSizeOnDisk = false;

    $scope.showVertsChangePencentage = false;
    $scope.showPreviousVerts = false;

    $scope.showComponentsChangePencentage = false;
    $scope.showPreviousComponents = false;

    $scope.showPlaymakerEventsChangePencentage = false;
    $scope.showPreviousPlaymakerEvents = false;

    $scope.showEnemySpawnersChangePencentage = false;
    $scope.showPreviousEnemySpawners = false;

    $scope.showBreakablesChangePencentage = false;
    $scope.showPreviousBreakables = false;

})

