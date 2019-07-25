var map = {
    map: null,
    green: null,
    red: null,
    orange: null,
    selected_station: null,
    init: function () {

 //initialisation de la map et des marqueurs        

        this.map = L.map('map').setView([49.0477806094296, 2.10303772616957], 15);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(this.map);
    this.green_icon()
    this.orange_icon()
    this.red_icon()
},

//marqueurs et réglages des couleurs en fonction du nombre de vélos dispos / status de la station / 
    addmarker:function (station){
        var textpopup ="<strong>STATION :</strong>" + "<br>" + station.address + "<br>" + "<br>" + "<strong>Vélos disponibles :</strong> " + station.available 
        var status = this.green
        if (station.available == 0 || station.status == "CLOSE" ){
            status = this.red
        
 
        }

        if (station.available <= 5 ){
            status= this.orange
        }
       var  that = this
        L.marker([station.latitude, station.longitude], {icon: status}).addTo(this.map).on('click',function(){
            $('#submit').show()
            $('#infosstation').html (textpopup)

            that.selected_station = station.address
        }).bindPopup(textpopup).openPopup();

    },
    
    green_icon : function (){
        this.green  = L.icon({
            iconUrl: 'images/statusok.png',
            iconSize:     [55, 40], 
            iconAnchor:   [22, 94],
            popupAnchor:  [-3, -76] 
        });
    },

    red_icon : function (){
        this.red  = L.icon({
            iconUrl: 'images/statusbad.png',
            iconSize:     [55, 40], 
            iconAnchor:   [22, 94],
            popupAnchor:  [-3, -76] 
        });

    }, 

    orange_icon : function (){
        this.orange  = L.icon({
            iconUrl: 'images/statusmiddle.png',
            iconSize:     [55, 40], 
            iconAnchor:   [22, 94],
            popupAnchor:  [-3, -76] 
        });
    },


}   

