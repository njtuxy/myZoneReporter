/**
 * Created by yxia on 6/25/15.
 */
var zone_report = angular.module('zone_report', ['angularSpinner', 'ngDialog']);

var zoneReportAddress = 'http://10.151.0.186:8080/zoneReport/';

zone_report.filter('num', function () {
    return function (input) {
        var result = parseInt(input, 10);
        return result;
    }
});

zone_report.filter('pn_number', function () {
    return function (input) {
        var result = parseInt(input, 10);
        if (result > 0) {
            return "+" + result
        }
        else {
            return result
        }
    }
});


zone_report.filter('getDate', function () {
    return function (input) {
        return input.substring(0, 10);
    }
});
function getChangePercentage(new_number, old_number) {
    var n = (new_number - old_number) / old_number;
    return Number((n.toFixed(2) * 100).toFixed(0));
}

zone_report.controller('mongoHttpController', function ($scope, zoneReportMongoService) {
    $scope.service = zoneReportMongoService;
    zoneReportMongoService.initMongo(zoneReportAddress);
    $scope.$watch('service.getMongoData()', function (newVal) {
        $scope.mongoData = newVal["_embedded"]["rh:coll"][10]['_id']

    });
});


zone_report.controller('dataCollectionController_1', function ($scope, zoneReportMongoService) {
    $scope.service = zoneReportMongoService;
    zoneReportMongoService.initMongo(zoneReportAddress);
    $scope.$watch('service.getMongoData()', function (response) {
        var response = response["_embedded"]["rh:coll"]
        var length = response.length;
        var collection1 = response[length - 1]["_id"];
        var collection2 = response[length - 2]["_id"];
        var collection3 = response[length - 3]["_id"];
        var collection4 = response[length - 4]["_id"];
        var collection5 = response[length - 5]["_id"];
        zoneReportMongoService.initMongo(zoneReportAddress + collection1);
        $scope.$watch('service.getMongoData()', function (response) {
            $scope.dataCollection1 = response["_embedded"]["rh:doc"][0]['_links']['self']['href'] + " xxx2 " + collection1;
        })
    })
});

zone_report.controller('dataCollectionController_2', function ($scope, zoneReportMongoService) {
    $scope.service1 = zoneReportMongoService;
    zoneReportMongoService.initMongo(zoneReportAddress);
    $scope.$watch('service1.getMongoData()', function (response) {
        var response = response["_embedded"]["rh:coll"]
        var length = response.length;
        var collection1 = response[length - 1]["_id"];
        var collection2 = response[length - 2]["_id"];
        var collection3 = response[length - 3]["_id"];
        var collection4 = response[length - 4]["_id"];
        var collection5 = response[length - 5]["_id"];
        zoneReportMongoService.initMongo(zoneReportAddress + collection2);
        $scope.$watch('service1.getMongoData()', function (response) {
            $scope.dataCollection2 = response["_embedded"]["rh:doc"][0]['_links']['self']['href'] + " xxx1 " + collection2;
        })
    })
});

zone_report.service('zoneReportMongoService', function ($http) {
    var that = this;
    this.mongoData = [];

    this.initMongo = function (mongo_http_url) {
        $http.get(mongo_http_url).success(function (data) {
            that.mongoData = data;
        });
    };

    this.getMongoData = function () {
        return this.mongoData;
    };
});

zone_report.service('zoneReportMongoRootService', function ($http) {
    var that = this;
    this.mongoData = [];

    this.initMongo = function () {
        $http.get(zoneReportAddress).success(function (data) {
            that.mongoData = data;
        });
    };

    this.getMongoData = function () {
        return this.mongoData;
    };
});


zone_report.factory('my_service_factory', function ($http) {
    return {
        getMongoRecord: function (id) {
            return $http.get(zoneReportAddress + id);
        }
    }
});

zone_report.service('my_service', function ($http) {
    this.getRecord = function () {
        return $http.get(zoneReportAddress + 'zoneReport_2015_06_26_155348')
            .then(
            function (response) {
                return {
                    xyresponse: response['data']["_embedded"]["rh:doc"][0]['_links']['self']['href']
                }
            }
        )
    }
});

zone_report.controller('request_controller', function ($scope, $http, ngDialog) {
    
    $scope.clickToOpenMe = function (image_name) {
        $scope.zoneScreenShotLocation = './zone_pngs/'+image_name +'.png';
        $scope.image_name = image_name;
        console.log("Clicked!");
        ngDialog.open({
            template: './templates/zoneScreen.html',
            className: 'ngdialog-theme-plain',
            scope: $scope
        });
    };


    var collection1, collection2, collection3, collection4, collection5;
    var zoneReport1, zoneReport2, zoneReport3, zoneReport4, zoneReport5;
    var result_for_table = [];
    var zoneReports = [];

    var zone = {
        Name: null,
        TileCount: null,
        TotalGameObjects: null,
        SizeOnDisk: null,
        Verts: null,
        Components: null,
        PlaymakerObjects: null,
        PlaymakerEvents: null,
        EnemySpawners: null,
        Breakables: null,
        _created_on: null,

        P_TileCount: [],
        P_TotalGameObjects: [],
        P_SizeOnDisk: [],
        P_Verts: [],
        P_Components: [],
        P_PlaymakerObjects: [],
        P_PlaymakerEvents: [],
        P_EnemySpawners: [],
        P_Breakables: [],
        P__created_on: []
    }

    $http.get(zoneReportAddress)
        .then(function (result) {
            var response = result['data']["_embedded"]["rh:coll"]
            var length = response.length;
            collection1 = response[length - 1]["_id"];
            collection2 = response[length - 2]["_id"];
            collection3 = response[length - 3]["_id"];
            collection4 = response[length - 4]["_id"];
            collection5 = response[length - 5]["_id"];
        })
        .then(function () {
            return $http.get(zoneReportAddress + collection1 + "?pagesize=500");
        })
        .then(function (result) {
            //post-process results of the second call and return
            zoneReport1 = result['data']["_embedded"]["rh:doc"];
            //$scope.zoneReport1 = zoneReport1;
        })

        .then(function () {
            return $http.get(zoneReportAddress + collection2 + "?pagesize=500");
        })
        .then(function (result) {
            //post-process results of the second call and return
            zoneReport2 = result['data']["_embedded"]["rh:doc"];
            //$scope.zoneReport2 = zoneReport2;
        })
        .then(function () {
            return $http.get(zoneReportAddress + collection3 + "?pagesize=500");
        })
        .then(function (result) {
            zoneReport3 = result['data']["_embedded"]["rh:doc"];
            //$scope.zoneReport3 = zoneReport3;
            //['_links']['self']['href']
        })
        .then(function () {
            return $http.get(zoneReportAddress + collection4 + "?pagesize=500");
        })
        .then(function (result) {
            zoneReport4 = result['data']["_embedded"]["rh:doc"];
        })
        .then(function () {
            return $http.get(zoneReportAddress + collection5 + "?pagesize=500");
        })
        .then(function (result) {
            zoneReport5 = result['data']["_embedded"]["rh:doc"];
        })
        .then(function () {
            zoneReports.push(zoneReport1, zoneReport2, zoneReport3, zoneReport4, zoneReport5);

            var i, k, j;

            for (i = 0; i < zoneReport1.length; ++i) {
                var row = zoneReport1[i];
                var row_name = row['Zone'];

                var zones_collection = [];
                zones_collection.push(row);

                for (k = 1; k < zoneReports.length; ++k) {
                    var zoneData = zoneReports[k];

                    for (j = 0; j < zoneData.length; ++j) {
                        var row_t = zoneData[j];

                        if (row_t['Zone'] === row_name) {
                            zones_collection.push(row_t);
                            //remove the element from the array.
                            zoneData.splice(j, 1);
                            break;
                        }
                    }
                }

                result_for_table.push(zones_collection);
            }


            var v = [];
            var i, j;
            //var z = zone;

            for (i = 0; i < result_for_table.length; i++) {
                var t = result_for_table[i];
                var z = JSON.parse(JSON.stringify(zone));
                z.Name = t[0]['Zone'];
                z.TileCount = t[0].TileCount;
                z.SizeOnDisk = t[0].SizeOnDisk;
                z.TotalGameObjects = t[0].TotalGameObjects;
                z.TotalGameObjects = t[0].TotalGameObjects;
                z.Verts = t[0].Verts;
                z.Components = t[0].Components;
                z.PlaymakerObjects = t[0].PlaymakerObjects;
                z.PlaymakerEvents = t[0].PlaymakerEvents;
                z.EnemySpawners = t[0].EnemySpawners;
                z.Breakables = t[0].Breakables;
                z._created_on = t[0]._created_on;

                for (j = 0; j < t.length; ++j) {
                    z.P_TileCount.push(t[j].TileCount);
                    z.P_SizeOnDisk.push(t[j].SizeOnDisk);
                    z.P_TotalGameObjects.push(t[j].TotalGameObjects);
                    z.P_Verts.push(t[j].Verts);
                    z.P_Components.push(t[j].Components);
                    z.P_PlaymakerObjects.push(t[j].PlaymakerObjects);
                    z.P_PlaymakerEvents.push(t[j].PlaymakerEvents);
                    z.P_EnemySpawners.push(t[j].EnemySpawners);
                    z.P_Breakables.push(t[j].Breakables);
                    z.P__created_on.push(t[j]._created_on);
                }
                v.push(z)
            }

            $scope.zone_records = v;
            //$scope.zzz =
            $scope.zoneReport1 = zoneReport1;
            $scope.result_for_table = result_for_table;

            $scope.updateTime = result_for_table[0][0]["_created_on"].substring(0, 10);
            $scope.zone_properties = ['TileCount', 'TotalGameObjects', 'SizeOnDisk', 'Verts', 'Components', 'PlaymakerObjects', 'PlaymakerEvents', 'EnemySpawners', 'Breakables'];
            $scope.searchAZone = "";
            $scope.counter = 0;
            $scope.predicate = 'TileCount';

            $scope.reverse = true;
            $scope.order = function (predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };
        });
})


