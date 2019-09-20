var app = {
    slider: null,
    map: null,
    init: function () {
        console.log('Ce site à été crée dans le cadre de la formation Opendéclic.')
        //creation des objets (fichiers JS)
        this.slider = Object.create(slider)
        this.slider.init()
        this.map = Object.create(map)
        this.map.init()
        this.api = Object.create(api)
        this.api.init()
        this.canvas = Object.create(canvas)
        this.canvas.init()
    }

}

$(document).ready(function () {

    app = Object.create(app)
    app.init()
})






