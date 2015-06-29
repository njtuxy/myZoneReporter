/**
 * Created by yxia on 6/25/15.
 */
var zone_report = angular.module('zone_report',[]);

zone_report.filter('num', function() {
    return function(input) {
        return parseInt(input, 10);
    }
});

zone_report.controller('zone_reporter_table', function ($scope, $http) {
    function getChangePercentage(new_number, old_number){
        var n = (new_number-old_number) / old_number;
        //n = parseFloat(n.toString().match(/^\d+\.?\d{0,2}/));
        return  (n.toFixed(2)*100).toFixed(0);

            //return ((new_number-old_number) / old_number).toFixed(2) * 100
    }
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

                            for (i = 0; i < db_items.length; ++i) {
                                for (j = 0; j < previous_db_items.length; ++j) {

                                    if (db_items[i]["Zone"] === previous_db_items[j]["Zone"]) {

                                        db_items[i]["P_TileCountChange"] = previous_db_items[j]["TileCount"];
                                        db_items[i]["TileCountChange"] = getChangePercentage(db_items[i]["TileCount"],previous_db_items[j]["TileCount"]);                                       ;
                                        db_items["SizeOnDiskChange"] = getChangePercentage(db_items[i]["SizeOnDisk"], previous_db_items[j]["SizeOnDisk"]);
                                        db_items["VertsChange"] = getChangePercentage(db_items[i]["Verts"], previous_db_items[j]["Verts"]);
                                        db_items["ComponentsChange"] = getChangePercentage(db_items[i]["p_Components"], previous_db_items[j]["Components"]);
                                        db_items["PlaymakerEventsChange"] = getChangePercentage(db_items[i]["PlaymakerEvents"],previous_db_items[j]["PlaymakerEvents"]);
                                        db_items["EnemySpawnersChange"] = getChangePercentage(db_items[i]["EnemySpawners"],previous_db_items[j]["EnemySpawners"]);
                                        db_items["Breakables"] = getChangePercentage(db_items[i]["Breakables"], previous_db_items[j]["Breakables"]);
                                    }
                                }
                            }
                            });
                            $scope.db_items = db_items;

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
})

