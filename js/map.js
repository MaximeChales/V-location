var map = {
    map: null,
    green: null,
    red: null,
    orange: null,
    selected_station: null,
    init: function () {

        //initialisation de la map et des marqueurs        

        this.map = L.map('map').setView([49.0477806094296, 2.10303772616957], 13);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        this.green_icon()
        this.orange_icon()
        this.red_icon()
    },

    //marqueurs et réglages des couleurs en fonction du nombre de vélos dispos / status de la station / 
    addmarker: function (station) {
        if (this.selected_station == station.address){
            station.available = station.available - 1
        }
    /**
     * texte de la popup
     */
        var textpopup = "<strong>STATION :</strong>" + "<br>" + station.address +
         "<br>" + "<br>" + "<strong>Vélos disponibles :</strong> " +
         "<span class='nbvelos'>" + station.available + "</span>"

        var status = this.green
        if (station.available == 0 || station.status == "CLOSE") {
            status = this.red
        }
        if (station.available <= 5) {
            status = this.orange
        }
        /**
         * Permet de faire apparaitre le submit du formulaire seulement si la station à été choisie.
         */
        var that = this
        L.marker([station.latitude, station.longitude], { icon: status }).addTo(this.map).on('click', function () {
            $('#submit').show()
            $('#infosstation').html(textpopup)

            that.selected_station = station.address
        }).bindPopup(textpopup).openPopup();

    },
/**
 * Icone Verte
 */
    green_icon: function () {
        this.green = L.icon({
            iconUrl: 'images/statusok.png',
            iconSize: [55, 40],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
        });
    },
/**
 * Les logo des stations n'ayant pas de vélos disponibles sont rouges.
 */
    red_icon: function () {
        this.red = L.icon({
            iconUrl: 'images/statusbad.png',
            iconSize: [55, 40],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
        });

    },
/**
 * icone orange
 */
    orange_icon: function () {
        this.orange = L.icon({
            iconUrl: 'images/statusmiddle.png',
            iconSize: [55, 40],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
        });
    },


}

