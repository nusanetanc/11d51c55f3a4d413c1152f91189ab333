function myFunction(idads) {
    $.getJSON("http://103.253.115.140:3000/ads/viewcount/"+idads, function(json){
        document.getElementById("count").innerHTML = json.total
      });
    document.getElementById("ads").innerHTML = idads
}
