var model = [{
        name: "City Palace",
        lat: 24.5764,
        lng: 73.6835,
        show: true,
        selected: false,
        venueid: '578b5272498ea6038d71d2ec'
    },
    {
        name: "Monsoon Palace",
        lat: 24.5933,
        lng: 73.6392,
        show: true,
        selected: false,
        venueid: '4ce602c09f776ea8109a4f22'
    },
    {
        name: "Fateh Sagar Lake",
        lat: 24.6014,
        lng: 73.6742,
        show: true,
        selected: false,
        venueid: '4f674ebbe4b0cded5f00f0b2'
    },
    {
        name: "Jagdish Temple",
        lat: 24.5797,
        lng: 73.6838,
        show: true,
        selected: false,
        venueid: '4d1ed2ba756e8cfa35415e54'
    },
    {
        name: "Lake Pichola",
        lat: 24.5720,
        lng: 73.6790,
        show: true,
        selected: false,
        venueid: '4e05f2ccd1640223a492f1a9'
    },
    {
        name: "Saheliyon Ki Bari",
        lat: 24.6301,
        lng: 73.6860,
        show: true,
        selected: false,
        venueid: '53152087e4b0e72a36f659fa'
    },
    {
        name: "Jag Mandir",
        lat: 24.5676,
        lng: 73.6778,
        show: true,
        selected: false,
        venueid: '4bdf2cc77ea362b51e6043c4'
    },
    {
        name: "Lake Palace",
        lat: 24.5754,
        lng: 73.6800,
        show: true,
        selected: false,
        venueid: '4bc200ac74a9a5935589d2f6'
    },
    {
        name: "Bagore-ki-Haveli",
        lat: 24.5798,
        lng: 73.6823,
        show: true,
        selected: false,
        venueid: '4b965989f964a52079c734e3'
    },
    {
        name: "Celebration Mall",
        lat: 24.6125,
        lng: 73.7027,
        show: true,
        selected: false,
        venueid: '4e15c233ae60a0ac06356f5a'
    }
];
// Google Maps API initialisation
var map, infoWindow;

function initMap() {
    map = new google.maps.Map(
        document.getElementById('map'), {
            center: {
                lat: 24.5854,
                lng: 73.7125
            },
            zoom: 13,
        }
    );
    infowindow = new google.maps.InfoWindow();
    //Activate Knockout through app.js
    ko.applyBindings(new viewModel());
}

function googleError(){
    document.getElementById('map-error').innerHTML = "Error in Map!";
}

var viewModel = function() {

    var vm = this;

    vm.errorDisplay = ko.observable('');

    // populate mapList with each Model
    vm.mapList = [];
    model.forEach(function(marker) {
        vm.mapList.push(new google.maps.Marker({
            position: {
                lat: marker.lat,
                lng: marker.lng
            },
            map: map,
            name: marker.name,
            show: ko.observable(marker.show),
            selected: ko.observable(marker.selected),
            venueid: marker.venueid,
            animation: google.maps.Animation.DROP
        }));
    });

    vm.mapListLength = vm.mapList.length;
    vm.currentMapItem = vm.mapList[0];

    // function to make marker bounce but stop after 700ms
    vm.makeBounce = function(marker){
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function(){ marker.setAnimation(null);}, 700);
    };

    // function to add API information to each marker
    vm.addApiInfo = function(passedMapMarker) {
        $.ajax({
            url: "https://api.foursquare.com/v2/venues/" + passedMapMarker.venueid + '?client_id=1BMCEUYX2B0QJGQ1GQEHB0QQFLPBGXE243MYSUOVJBQQ223F&client_secret=JJNMUVBWKEGH15FPMNDOOSA0AEUDWQSUUK2KHUYFPEIITCVJ&v=20170720',
            dataType: "json",
            success: function(data) {
                // stores results to display likes and ratings
                var result = data.response.venue;
                var photo = result.photos.groups[0].items[0];
                var image = photo.prefix + photo.width + "x" + photo.height + photo.suffix;
                passedMapMarker.likes = result.hasOwnProperty('likes') ? result.likes.summary : "";
                passedMapMarker.rating = result.hasOwnProperty('rating') ? result.rating : "";
                passedMapMarker.image = image;
            },
            error: function(e) {
              vm.errorDisplay("Foursquare data is unavailable. Please try again later.");
            }
        });
    };

    // iterate through mapList and add marker event listener and API information
    vm.mapList.forEach(function (passedMapMarker){
      //add API items to each mapMarker
      vm.addApiInfo(passedMapMarker);
      //add the click event listener to mapMarker
      passedMapMarker.addListener('click', function() {
        vm.setSelected(passedMapMarker);
      });
    });

    //filter observable for filter text
    vm.filterText = ko.observable('');

    // calls every model from input box
    vm.applyFilter = function() {

        var currentFilter = vm.filterText();
        infowindow.close();

        //filter the list as user seach
        if (currentFilter.length === 0) {
            vm.setAllShow(true);
        } else {
            vm.mapList.forEach(function(map) {
                if (map.name.toLowerCase().indexOf(currentFilter.toLowerCase()) > -1) {
                    map.show(true);
                    map.setVisible(true);
                } else {
                    map.show(false);
                    map.setVisible(false);
                }
            });
        }
        infowindow.close();
    };

    // to make all marker visible
    vm.setAllShow = function(showVar) {
        vm.mapList.forEach(function(map) {
            map.show(showVar);
            map.setVisible(showVar);
        });
    };

    vm.setAllUnselected = function() {
        vm.mapList.forEach(function(map) {
            map.selected(false);
        });
    };

    vm.setSelected = function(location) {
        vm.setAllUnselected();
        location.selected(true);

        vm.currentMapItem = location;

        likes = function() {
            if (vm.currentMapItem.likes === "" || vm.currentMapItem.likes === undefined) {
                return "No likes to display";
            } else {
                return "Location has " + vm.currentMapItem.likes;
            }
        };

        rating = function() {
            if (vm.currentMapItem.rating === "" || vm.currentMapItem.rating === undefined) {
                return "No rating to display";
            } else {
                return "Location is rated " + vm.currentMapItem.rating;
            }
        };


        image = function() {
            return vm.currentMapItem.image;
        };

        var formattedInfoWindow = "<h5>" + vm.currentMapItem.name + "</h5> <div> <img src='" + image() + "' height='auto' width='100%'> </div> <div>" + likes() + "</div>" + "<div>" + rating() + "</div>";

        infowindow.setContent(formattedInfoWindow);

        infowindow.open(map, location);
        vm.makeBounce(location);
    };
};
