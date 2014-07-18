(function () {
  var counter = 0;
  var l = "json-callback-results.xml";

  $.ajax({
    cache: false,
    url: l,
    dataType: "json",
    error: function(){
      console.log("Failed");
    },
    success: function (n) {
      var q = n, r = $.parseXML(q), m = $(r); m.find("item").each(function (s, t) {
        console.log(counter++);

        //if (b < 5) {
        //  var w = $(t).find("title").first().text();
        //  var u = $(t).find("link").text();
        //  var v = '<li><a href="' + u + '">' + w + "</li>";
        //  i = i + v;
        //  b = b + 1
        //}
      })
      }
    });


  //$.get("json-callback-results.xml", function (data) {

  //var oSerializer = new XMLSerializer();
  //var xmlString = oSerializer.serializeToString(data);
  //$(".originalTxt").html(xmlString);

  //var $parsedData = $.parseXML(data);
  //$(".result").html("Hello World");


  //var q = data, r = $.parseXML(q), m = $(r);
  //m.find("item").each(function (s, t) {
  //  console.log("hit");
  //});

  //console.log($parsedData);

  //$parsedData.find("item").each(function (k, v) {
  //  console.log(counter++);
  //});

  //result.text(parsedData);
    
  //});



})();