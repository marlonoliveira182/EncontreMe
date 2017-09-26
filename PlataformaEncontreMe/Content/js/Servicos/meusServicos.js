angular.module('meusServicos', ['ngResource'])

    // Reddit constructor function to encapsulate HTTP and pagination logic
    //.factory('Reddit', function ($http) {
    //    var Reddit = function () {
    //        this.items = [];
    //        this.busy = false;
    //        this.after = '';
    //    };

    //    Reddit.prototype.nextPage = function () {
    //        if (this.busy) return;
    //        this.busy = true;

    //        var url = "https://api.reddit.com/hot?after=" + this.after + "&jsonp=JSON_CALLBACK";
    //        $http.jsonp(url).success(function (data) {
    //            var items = data.data.children;
    //            for (var i = 0; i < items.length; i++) {
    //                this.items.push(items[i].data);
    //            }
    //            this.after = "t3_" + this.items[this.items.length - 1].id;
    //            this.busy = false;
    //        }.bind(this));
    //    };

    //    return Reddit;
    //})

    .service('Map', function ($q) {

    this.init = function () {
        var options = {
            center: new google.maps.LatLng(-23.223701,-45.900907),
            zoom: 10,
            disableDefaultUI: false
        }
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        this.places = new google.maps.places.PlacesService(this.map);
    }

    this.search = function (str) {
        var d = $q.defer();
        this.places.textSearch({ query: str }, function (results, status) {
            if (status == 'OK') {
                d.resolve(results[0]);
            }
            else d.reject(status);
        });
        return d.promise;
    }

    this.addMarker = function (res) {
        if (this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
            position: res.geometry.location,
            animation: google.maps.Animation.DROP
        });
        this.map.setCenter(res.geometry.location);
    }

});

