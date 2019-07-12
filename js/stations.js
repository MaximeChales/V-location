var stations = {
    latitude: null,
    longitude: null,
    status: null,
    address: null,
    available: null,
    init: function (station) {
//recupere les infos de l'api pour les utiliser ensuite sur le map.js
        this.latitude = station.position.lat
        this.longitude = station.position.lng
        this.address = station.address
        this.status = station.status
        this.available = station.available_bikes
    }
}