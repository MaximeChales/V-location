var canvas = {
  oCanvas: null,
  signature: false,
  storage: false,
  timer: null,
  reservationdate: null,
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
      var html = "Vélo réservé à la station " + stationname + "<br> Temps restant : "
      document.getElementById("countdown").innerHTML = html
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
    this.oCanvas.bDraw = true;
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

  // au clique sur le bouton "effacer" efface le contenu du canvas
  clear: function (oEvent) {
    this.oCanvas = document.getElementById("canvas")
    var oCtx = this.oCanvas.getContext('2d');
    oCtx.clearRect(0, 0, this.oCanvas.width, this.oCanvas.height);
    this.capturer(false);
  },

  launchtimer: function () {
     var that = this
      console.log('ce que je veux :p')
      this.timer = setInterval (function(){
    
        var remain = new Date()-that.reservationdate
        console.log(remain)
      },1000)
    
  },

  valider: function () {
    var that = this
    $('#form').submit(function (e) {
      if (!that.signature) {
        alert('Merci de signer dans l\'encadré prévu à cet effet.')

      }
      //sauvegarde des information entrées par l'utilisateur
      localStorage.setItem('nameinfo', document.getElementById("name").value)
      localStorage.setItem('firstnameinfo', document.getElementById("firstname").value)
      sessionStorage.setItem('stationname', app.map.selected_station)
      var html = "Vélo réservé à la station " + app.map.selected_station + "<br> Temps restant : "
      that.reservationdate = new Date()
      document.getElementById("countdown").innerHTML = html
      //timer
      that.launchtimer()
      return false
    }
    )
//voir pour ne pas depasser les 20 mins 200000


  }
}
