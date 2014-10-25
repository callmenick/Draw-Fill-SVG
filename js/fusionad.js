var fusoionad_script = document.createElement('script');
fusoionad_script.type = 'text/javascript';
fusoionad_script.async = true;
fusoionad_script.id = "_fusionads_js";
fusoionad_script.src = 'http://cdn.fusionads.net/fusion.js?zoneid=1332&serve=C6SDP2Y&placement=callmenickcom';
document.getElementsByTagName('body')[0].appendChild(fusoionad_script);

var interval = setInterval(function(){
  
  // check for when fusionads shows up in DOM
  var fusionad = document.getElementById("fusionads");

  if (fusionad){

    // clear the interval so we stop looping
    clearInterval(interval);
    
    // add the close ad button
    var closead = document.createElement("a");
    closead.id = "close-fusionad";
    closead.innerHTML = "x";
    closead.href = "#";
    fusionads.appendChild(closead);

    // close the ad
    document.getElementById("close-fusionad").addEventListener("click", function(e) {
      e.preventDefault();
      this.remove();
      fusionad.remove();
    });

  }

},100); // check every 100ms
