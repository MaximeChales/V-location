var slider = {
    animation_interval: null,
    content_slider: null,
    current_image: null,
    //sens du défilementS
    sens: 1,
    pause_on_off: "off",
    init: function () {

 //choix de l'emplacement du slider. on va alors associer les conteneurs d image et du slider à leurs équivalent  dans LHTML. 
        this.content_slider = $("#content-slider") 
        this.current_image = this.content_slider.find(".slide-active")
        this.nav_click()
        this.animation()
    },



// animation auto du slider 
    animation: function () {
        var that = this
        this.animation_interval = setInterval(function () {
            if (that.sens == 1) {
                that.next();
            } else {
                that.prev()
            }
        }, 5000)
    },

// Création de prev et association à l'image précédente avec une transition si on fait next sur la dernière image qui ramène à la première
    prev: function () {
        if (this.current_image.is(this.content_slider.find("img").first())) {
            prev_image = this.content_slider.find("img").last()
        } else {
            prev_image = this.current_image.prev("img")
        }
        this.arrow_on_off('#prev')
        this.transition(prev_image)
    },

// Création de next et association à l'image suivante avec une transition si on fait prev à la premiere image qui ramène à la dernière
    next: function () {

        if (this.current_image.is(this.content_slider.find("img").last())) {
            next_image = this.content_slider.find("img").first()
        } else {
            next_image = this.current_image.next("img")
        }
        this.arrow_on_off('#next')
        this.transition(next_image)
    },
//animation de changement d'image + ajout retrait de la classe slide active
    transition: function (image) {
        var that = this
        this.current_image.fadeOut(500, function () {
            $(this).removeClass("slide-active")
            image.addClass("slide-active")
            image.fadeIn(500)
            that.current_image = image
        })
    },

//Association des événements next prev et pause aux boutons.
    nav_click: function () {
        var that = this

        $('#prev').click(function () {
            that.prev()
        })

        $('#next').click(function () {
            that.next()

        })

        $('#stop').click(function () {

            that.animation_on_off(that)
        })

// Association de prev pause et next aux touches
        $('html').keydown(function (e) {
            if (event.which == 37) { that.prev() }
            if (event.which == 39) { that.next() }
            if (event.which == 32) { that.animation_on_off(that) }
        })
    },
    arrow_on_off: function (that) {

        $(that).addClass("arrow_active")

        
            setTimeout(function () { $(that).removeClass("arrow_active") }, 250)
    },
    animation_on_off: function (that) {
        if (that.pause_on_off === "off") {

// active la pause quand on clique sur le bouton ||

            clearInterval(that.animation_interval)
            $('#stop').addClass("pause-on")
            that.pause_on_off = "on"

        }

// annule la pause quand on clique sur le bouton ||

        else {

            $('#stop').removeClass("pause-on")
            that.sens = 1
            that.animation()
            that.pause_on_off = "off"
        }
    }
}
