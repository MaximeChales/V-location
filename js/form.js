var canvas = {
  oCanvas: null,
  signature: false,
  storage: false,
  timer: null,
  reservationdate: null,
  maxtime: 1200000,
  reserved: false,
  init: function () {
    var that = this
    this.valider()
    this.oCanvas = document.getElementById("canvas");
    this.oCanvas.bDraw = false;
    this.oCanvas.width = 200;
    this.oCanvas.height = 150;
    oCtx = this.oCanvas.getContext('2d');
    this.oCanvas.addEventListener("mousedown", function (e) { that.downDrawligne(e) });
    this.oCanvas.addEventListener("mouseup", function (e) { that.upDrawligne(e) });
    this.oCanvas.addEventListener("mousemove", function (e) { that.moveDrawligne(e) });
    this.oCanvas.addEventListener("touchstart", function (e) { that.downDrawligne(e) });
    this.oCanvas.addEventListener("touchend", function (e) { that.upDrawligne(e) });
    this.oCanvas.addEventListener("touchmove", function (e) { that.moveDrawligne(e) });


    document.getElementById("bt-clear").addEventListener("click", function (e) { that.clear() });
    this.loadinfo()
    $('#submit').hide()

  },

  loadinfo: function () {
    document.getElementById('name').value = localStorage.getItem('nameinfo');
    document.getElementById('firstname').value = localStorage.getItem('firstnameinfo');
    var stationname = sessionStorage.getItem('stationname')
    if (stationname) {
      app.map.selected_station = stationname
      this.setReservationText()
    }
    this.reservationdate = sessionStorage.getItem('reservationdate')

    if (this.reservationdate) {
      this.setReservationText()
      this.launchtimer()


    }
  },

  moveDrawligne: function (oEvent) {
    oCtx = null, oPos = null;
    if (this.oCanvas.bDraw == false) {
      return false;
    }//if
    oPos = this.getPosition(oEvent, this.oCanvas);
    oCtx = this.oCanvas.getContext('2d');

    //dessine
    oCtx.strokeStyle = '#000000';
    oCtx.lineWidth = 3;
    oCtx.beginPath();
    oCtx.moveTo((this.oCanvas.posX), this.oCanvas.posY);
    oCtx.lineTo(oPos.posX, oPos.posY);
    oCtx.stroke();

    this.oCanvas.posX = oPos.posX;
    this.oCanvas.posY = oPos.posY;
  }, //fct

  getPosition: function (oEvent) {
    var oRect = this.oCanvas.getBoundingClientRect(),
      oEventEle = oEvent.changedTouches ? oEvent.changedTouches[0] : oEvent;
    return {
      posX: (oEventEle.clientX - oRect.left) / (oRect.right - oRect.left) * this.oCanvas.width,
      posY: (oEventEle.clientY - oRect.top) / (oRect.bottom - oRect.top) * this.oCanvas.height
    };//
  },//fct

  downDrawligne: function (oEvent) {
    var that = this
    oEvent.preventDefault();
    var oPos = that.getPosition(oEvent);
    this.oCanvas.posX = oPos.posX;
    this.oCanvas.posY = oPos.posY;
    if (this.reserved == true) {
      this.oCanvas.bDraw = false;
    } else {
      this.oCanvas.bDraw = true;
    }

    this.capturer(false);
  },//fct

  upDrawligne: function (oEvent) {
    this.oCanvas = oEvent.currentTarget;
    this.oCanvas.bDraw = false;
    this.capturer(true);
  },//fct

  //fct

  // Enrengistre une copie de la signature 
  capturer: function (bAction) {
    var oCapture = document.getElementById("canvas"); oCapture.innerHTML = '';
    var oCapture = document.getElementById("canvas");
    this.signature = bAction
    oCapture.innerHTML = '';
    if (bAction == true) {
      var oImage = document.createElement('img')
      this.oCanvas = document.getElementById("canvas");
      oImage.src = this.oCanvas.toDataURL("image/png");
      oCapture.appendChild(oImage);
    }
  },
  clear: function (oEvent) {
    this.oCanvas = document.getElementById("canvas")
    var oCtx = this.oCanvas.getContext('2d');
    oCtx.clearRect(0, 0, this.oCanvas.width, this.oCanvas.height);
    this.capturer(false);
  },

  /**
   * INITIALISATION DU TIMER
   */
  launchtimer: function () {
    var that = this
    this.timer = setInterval(function () {

      var remain = new Date() - Date.parse(sessionStorage.getItem('reservationdate'))

      if (remain >= that.maxtime) {
        alert('Votre réservation à expiré !')
        /**
         * Une fois le timer terminé, réincrémente le nombre de vélos disponibles de 1 
         */
        var savedstation = sessionStorage.getItem('stationname')
        if (savedstation == app.map.selected_station) {
          var nbvelos = document.getElementsByClassName("nbvelos")
          for (var i = 0; i < nbvelos.length; i++) {
            var nb = parseInt(nbvelos[i].innerHTML) + 1
            document.getElementsByClassName("nbvelos")[i].innerHTML = nb
          }
        }
        that.stoptimer()
        that.reserved = false
      }


      var spent = that.maxtime - remain
      /**
       * Conversion en minutes et secondes des 1200000ms
       */
      var minutes = Math.floor(spent / 60000)
      var secondes = Math.floor((spent % 60000) / 1000)
      var tempsrestant = document.getElementById('tempsrestant')
      if (tempsrestant) {
        tempsrestant.innerHTML = ' ' + minutes + ' minutes et ' + secondes + ' secondes'
      }
    }, 1000)



  },
  /**
   * Arret du timmer pour le délais de reservation 
   */
  stoptimer: function () {

    sessionStorage.clear()
    clearInterval(this.timer)
    document.getElementById("countdown").innerHTML = ''
    var oCtx = this.oCanvas.getContext('2d');
    oCtx.clearRect(0, 0, this.oCanvas.width, this.oCanvas.height);
  },


  /**
   *verification de la signature
   */
  valider: function () {
    var that = this
    $('#form').submit(function (e) {
      if (!that.signature) {
        alert('Merci de signer dans l\'encadré prévu à cet effet.')
        return false
      }
/**
 * Soustrait un vélo aux nombre de vélos disponibles sur la carte et dans le formulaire
 */
      var nbvelos = document.getElementsByClassName("nbvelos")
      for (var i = 0; i < nbvelos.length; i++) {
        var nb = nbvelos[i].innerHTML - 1
        document.getElementsByClassName("nbvelos")[i].innerHTML = nb
      }

      //sauvegarde des information entrées par l'utilisateur
      localStorage.setItem('nameinfo', document.getElementById("name").value)
      localStorage.setItem('firstnameinfo', document.getElementById("firstname").value)
      sessionStorage.setItem('stationname', app.map.selected_station)
      that.reservationdate = new Date()
      sessionStorage.setItem('reservationdate', that.reservationdate)
      that.setReservationText()
      document.getElementById("name").readOnly = true
      document.getElementById("firstname").readOnly = true
      document.getElementById("canvas").readOnly = true
      document.getElementById('bt-clear').style.display="none" 
      //timer
      that.launchtimer()
      that.reserved = true
      return false

    })
  },
  /**
   * Mise en place du message du timer 
   */
  setReservationText: function () {
    var html = "Vélo réservé à la station " + app.map.selected_station + "<br> Temps restant : <span id='tempsrestant'> </span>"
    document.getElementById("countdown").innerHTML = html
  },
}
