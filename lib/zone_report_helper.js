/**
 * Created by yxia on 6/25/15.
 */
var zone_report = angular.module('zone_report',['angularSpinner']);

var zoneReportAddress = 'http://10.151.0.186:8080/zoneReport/';

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


zone_report.filter('getDate', function() {
    return function(input) {
        return input["_created_on"].substring(0,10);
    }
});
function getChangePercentage(new_number, old_number){
    var n = (new_number-old_number) / old_number;
    return  Number((n.toFixed(2)*100).toFixed(0));
}

zone_report.controller('mongoHttpController', function($scope,zoneReportMongoService) {
    $scope.service = zoneReportMongoService;
    zoneReportMongoService.initMongo(zoneReportAddress);
    $scope.$watch('service.getMongoData()', function(newVal) {
        $scope.mongoData = newVal["_embedded"]["rh:coll"][10]['_id']

    });
});

//zone_report.controller('mongoHttpController2', function($scope,zoneReportMongoService) {
//    $scope.service = zoneReportMongoService;
//    zoneReportMongoService.initMongo(zoneReportAddress);
//    $scope.$watch('service.getMongoData()', function(response) {
//        var response = response["_embedded"]["rh:coll"]
//        var length = response.length;
//        var collection1 = response[length-1]["_id"];
//        var collection2 = response[length-2]["_id"];
//        var collection3 = response[length-3]["_id"];
//        var collection4 = response[length-4]["_id"];
//        var collection5 = response[length-5]["_id"];
//        zoneReportMongoService.initMongo(zoneReportAddress+ collection1);
//        $scope.$watch('service.getMongoData()', function(response){
//            $scope.dataCollection1 = response["_embedded"]["rh:doc"][0]['_links']['self']['href'];
//            zoneReportMongoService.initMongo(zoneReportAddress+ collection2);
//            $scope.$watch('service.getMongoData()', function(response){
//                $scope.dataCollection2 = response["_embedded"]["rh:doc"][0]['_links']['self']['href']
//                zoneReportMongoService.initMongo(zoneReportAddress+ collection3);
//                $scope.$watch('service.getMongoData()', function(response) {
//                    $scope.dataCollection3 = response["_embedded"]["rh:doc"][0]['_links']['self']['href']
//                    zoneReportMongoService.initMongo(zoneReportAddress+ collection4);
//                    $scope.$watch('service.getMongoData()', function(response) {
//                        $scope.dataCollection4 = response["_embedded"]["rh:doc"][0]['_links']['self']['href']
//                        zoneReportMongoService.initMongo(zoneReportAddress+ collection5);
//                        $scope.$watch('service.getMongoData()', function(response) {
//                            $scope.dataCollection5 = response["_embedded"]["rh:doc"][0]['_links']['self']['href']
//                        })
//                    })
//
//                })
//            })
//        })
//    })
//
//});

zone_report.controller('dataCollectionController_1', function($scope,zoneReportMongoService) {
    $scope.service = zoneReportMongoService;
    zoneReportMongoService.initMongo(zoneReportAddress);
    $scope.$watch('service.getMongoData()', function(response) {
        var response = response["_embedded"]["rh:coll"]
        var length = response.length;
        var collection1 = response[length-1]["_id"];
        var collection2 = response[length-2]["_id"];
        var collection3 = response[length-3]["_id"];
        var collection4 = response[length-4]["_id"];
        var collection5 = response[length-5]["_id"];
        zoneReportMongoService.initMongo(zoneReportAddress+ collection1);
        $scope.$watch('service.getMongoData()', function(response){
            $scope.dataCollection1 = response["_embedded"]["rh:doc"][0]['_links']['self']['href'] + " xxx2 " + collection1;
        })
    })
});

zone_report.controller('dataCollectionController_2', function($scope,zoneReportMongoService) {
    $scope.service1 = zoneReportMongoService;
    zoneReportMongoService.initMongo(zoneReportAddress);
    $scope.$watch('service1.getMongoData()', function(response) {
        var response = response["_embedded"]["rh:coll"]
        var length = response.length;
        var collection1 = response[length-1]["_id"];
        var collection2 = response[length-2]["_id"];
        var collection3 = response[length-3]["_id"];
        var collection4 = response[length-4]["_id"];
        var collection5 = response[length-5]["_id"];
        zoneReportMongoService.initMongo(zoneReportAddress+ collection2);
        $scope.$watch('service1.getMongoData()', function(response){
            $scope.dataCollection2 = response["_embedded"]["rh:doc"][0]['_links']['self']['href'] + " xxx1 " + collection2;
        })
    })
});

zone_report.service('zoneReportMongoService', function($http) {
    var that = this;
    this.mongoData = [];

    this.initMongo = function(mongo_http_url) {
        $http.get(mongo_http_url).success(function(data) {
            that.mongoData = data;
        });
    };

    this.getMongoData = function() {
        return this.mongoData;
    };
});

zone_report.service('zoneReportMongoRootService', function($http) {
    var that = this;
    this.mongoData = [];

    this.initMongo = function() {
        $http.get(zoneReportAddress).success(function(data) {
            that.mongoData = data;
        });
    };

    this.getMongoData = function() {
        return this.mongoData;
    };
});


zone_report.factory('my_service_factory', function($http){
    return {
        getMongoRecord: function(id) {
            return $http.get(zoneReportAddress + id);
        }
    }
});

zone_report.service('my_service', function($http){
    this.getRecord = function(){
        return $http.get(zoneReportAddress + 'zoneReport_2015_06_26_155348')
            .then(
            function(response){
                return{
                    xyresponse: response['data']["_embedded"]["rh:doc"][0]['_links']['self']['href']
                }
            }
        )
    }
});

//zone_report.controller('test_controller', function($scope, my_service){
//    my_service.getRecord()
//        .then(function(response){
//            $scope.zoneReport1 = response;
//        })
//});


zone_report.controller('request_controller', function($scope, $http){
    var collection1, collection2, collection3, collection4, collection5;
    var zoneReport1, zoneReport2, zoneReport3, zoneReport4, zoneReport5;
    var result_for_table = [];
    var zoneReports = [];

    $http.get(zoneReportAddress)
        .then(function(result){
            var response = result['data']["_embedded"]["rh:coll"]
            var length = response.length;
            collection1 = response[length-1]["_id"];
            collection2 = response[length-2]["_id"];
            collection3 = response[length-3]["_id"];
            collection4 = response[length-4]["_id"];
            collection5 = response[length-5]["_id"];
        })
        .then(function(){
            return $http.get(zoneReportAddress + collection1 + "?pagesize=500");
        })
        .then(function(result){
            //post-process results of the second call and return
            zoneReport1 = result['data']["_embedded"]["rh:doc"];
            //$scope.zoneReport1 = zoneReport1;
        })

        .then(function(){
            return $http.get(zoneReportAddress + collection2 + "?pagesize=500");
        })
        .then(function(result){
            //post-process results of the second call and return
            zoneReport2 = result['data']["_embedded"]["rh:doc"];
            //$scope.zoneReport2 = zoneReport2;
        })
        .then(function(){
            return $http.get(zoneReportAddress + collection3 + "?pagesize=500");
        })
        .then(function(result){
            zoneReport3 = result['data']["_embedded"]["rh:doc"];
            //$scope.zoneReport3 = zoneReport3;
            //['_links']['self']['href']
        })
        .then(function(){
            return $http.get(zoneReportAddress + collection4 + "?pagesize=500");
        })
        .then(function(result){
            zoneReport4 = result['data']["_embedded"]["rh:doc"];
        })
        .then(function(){
            return $http.get(zoneReportAddress + collection5 + "?pagesize=500");
        })
        .then(function(result){
            zoneReport5 = result['data']["_embedded"]["rh:doc"];
        })
        .then(function(){
            zoneReports.push(zoneReport1, zoneReport2, zoneReport3, zoneReport4, zoneReport5);

            var i, k,j;

            for(i=0; i<zoneReport1.length; ++i){
                var row  = zoneReport1[i];
                var row_name = row['Zone'];

                var zones_collection = [];
                zones_collection.push(row);

                for(k=1; k< zoneReports.length; ++k){
                    var zoneData = zoneReports[k];

                    for(j=0; j<zoneData.length; ++j){
                        var row_t = zoneData[j];

                        if (row_t['Zone'] === row_name){
                            zones_collection.push(row_t);
                            //remove the element from the array.
                            zoneData.splice(j, 1);
                            break;
                        }
                    }
                }

                result_for_table.push(zones_collection);
            }

            $scope.result_for_table = result_for_table;
            $scope.updateTime = result_for_table[0][0]["_created_on"].substring(0,10);
            $scope.zone_properties = ['TileCount', 'TotalGameObjects', 'SizeOnDisk', 'Verts', 'Components', 'PlaymakerObjects', 'PlaymakerEvents', 'EnemySpawners', 'Breakables'];

        })
        .then(function(){
            //Analysis the result:
            var i;

            var final_r = [];

            for(i=0; i<result_for_table.length; ++i){
                var new_result={};
                new_result.Zone = result_for_table[i][0].Zone;
                new_result.TileCount = "";
                new_result.TotalGameObjects = "";
                new_result.SizeOnDisk = "";
                new_result.Verts = "";
                new_result.Components = "";
                new_result.PlaymakerObjects = "";
                new_result.PlaymakerEvents = "";
                new_result.EnemySpawners = "";
                new_result.Breakables = "";


                for(j=0; j<result_for_table[i].length; ++j){
                    new_result.TileCount = new_result.TileCount + " " + result_for_table[i][j].TileCount;
                    new_result.TotalGameObjects = new_result.TotalGameObjects + " " + result_for_table[i][j].TotalGameObjects;
                    new_result.SizeOnDisk = new_result.SizeOnDisk + " " + result_for_table[i][j].SizeOnDisk;
                    new_result.Verts = new_result.Verts + " " + result_for_table[i][j].Verts;
                    new_result.Components = new_result.Components + " " + result_for_table[i][j].Components;
                    new_result.PlaymakerObjects = new_result.PlaymakerObjects + " " + result_for_table[i][j].PlaymakerObjects;
                    new_result.PlaymakerEvents = new_result.PlaymakerEvents + " " + result_for_table[i][j].PlaymakerEvents;
                    new_result.EnemySpawners = new_result.EnemySpawners + " " + result_for_table[i][j].EnemySpawners;
                    new_result.Breakables = new_result.Breakables + " " + result_for_table[i][j].Breakables;
                }

                final_r.push(new_result);
            }

            //$scope.result_for_table = final_r;


        });

});


//http://stackoverflow.com/questions/19387552/angular-cant-make-ng-repeat-orderby-work
zone_report.filter('orderObjectBy', function() {
    return function(items, field, reverse) {
        var filtered = [];
        angular.forEach(items, function(item) {
            filtered.push(item);
        });
        filtered.sort(function (a, b) {
            return (a[field] > b[field] ? 1 : -1);
        });
        if(reverse) filtered.reverse();
        return filtered;
    };
});

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


                    //$scope.p_db_items = previous_db_items;



                    //do value comparison here:
                })
        });
    //});



    $scope.searchAZone="";
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

    $scope.showPreviousPlaymakerObjects = false;


    $scope.showPlaymakerEventsChangePencentage = false;
    $scope.showPreviousPlaymakerEvents = false;

    $scope.showEnemySpawnersChangePencentage = false;
    $scope.showPreviousEnemySpawners = false;

    $scope.showBreakablesChangePencentage = false;
    $scope.showPreviousBreakables = false;



})

