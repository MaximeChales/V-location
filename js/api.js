var api = {
    api: null,
    init: function () {

        jQuery.ajax({
            url: "https://api.jcdecaux.com/vls/v1/stations?apiKey=e758eaf6633bf6f772cbd5e50b54d8533dc0b95c&contract=cergy-pontoise",
            type: "GET",
            dataType: "json",
            success: function (data) {
                
                //   app.map.addmarker(station)

                for (var i = 0; i < data.length; i++) {
                    var station = Object.create(stations)
                    station.init(data[i])
                    app.map.addmarker(station)

                }
            }
        })


    }
}