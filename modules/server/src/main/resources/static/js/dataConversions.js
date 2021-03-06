var codeMirrorData ;
var codeMirrorTargetData ;

function changeMode(element,syntax) {
    var mode = "turtle";
    switch (syntax.toUpperCase()) {
        case "TURTLE": mode = "turtle" ;
            break ;
        case "N-TRIPLES": mode = "turtle" ;
            break ;
        case "RDF/XML": mode = "xml" ;
            break ;
        case "TRIX": mode = "xml" ;
            break ;
        case "SHEXJ" : mode = "javascript" ;
            break ;
        case "RDF/JSON" : mode = "javascript" ;
            break ;
        case "JSON-LD" : mode = "javascript" ;
            break ;
        case "SHEXC": mode = "shex" ;
            break ;
        case "HTML": mode = "htmlembedded" ;
            break ;
    }
    element.setOption("mode",mode);
}

function changeTheme(theme) {
    codeMirrorData.setOption("theme",theme);
    codeMirrorTargetData.setOption("theme",theme);
}

$(document).ready(function(){

function resetResult(result) {
    console.log("Reset result: " + JSON.stringify(result));
    $("#resultDiv").empty();
    $("#resultDiv").data("result", result);
}


function showResult(result) {
    result = $("#resultDiv").data("result");
    console.log("Show result: " + JSON.stringify(result));
    if(result) {
        console.log("Result.nodesPrefixMap: " + JSON.stringify(result.nodesPrefixMap));
        var pre = $("<pre/>").text(JSON.stringify(result,undefined,2));
        var details = $("<details/>").append(pre);
        $("#resultDiv").append(details);
    }
}

  var urlShaclex = getHost();
  console.log("urlShaclex: " + urlShaclex);

    // When loading document get result from data-result attribute and show it
    var result = $("#resultDiv").data("result");
    showResult(result);

  var rdfData = document.getElementById("rdfData");
  if (rdfData) {
    codeMirrorData = CodeMirror.fromTextArea(rdfData, {
       lineNumbers: true,
       mode: "turtle",
       viewportMargin: Infinity,
       matchBrackets: true,
    });
  }

  var targetDataArea = document.getElementById("targetDataArea");
  if (targetDataArea) {
    codeMirrorTargetData = CodeMirror.fromTextArea(targetDataArea, {
    lineNumbers: true,
    mode: "turtle",
    viewportMargin: Infinity,
    matchBrackets: true,
    readOnly: true
   });
 }

/* Associate event to changes in data panel tab */
$('.dataPanel a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
   var name = $(e.target).attr("href");
   console.log("New tab: " + name); // newly activated tab
   $('#rdfDataActiveTab').val(name);
 })


 $("#permalink").click(function(e) {
  e.preventDefault();
  console.log("click on permalink...");
  var data = codeMirrorData.getValue();
  var dataActiveTab = $("#rdfDataActiveTab").attr("value");
  var dataPart = "";
  var dataFormat = "";
     switch (dataActiveTab) {
         case "#dataTextArea":
             dataFormat = $("#dataFormatTextArea").find(":selected").text();
             dataPart = "data=" + encodeURIComponent(data) ;
             break;
         case "#dataFile":
             dataFormat = $("#dataFormatFile").find(":selected").text();
             dataPart = "data=" + encodeURIComponent(data) ;
             break;
         case "#dataUrl":
             dataFormat = $("#dataFormatUrl").find(":selected").text();
             var dataURL = $("#dataURL").val();
             dataPart = "dataURL=" + encodeURIComponent(dataURL) ;
             break;
         case "#dataEndpoint":
             var endpoint = $("#inputDataEndpoint").val();
             dataPart = "endpoint=" + encodeURIComponent(endpoint) ;
             break;
         default:
             console.log("Unknown value of dataActiveTab:" + dataActiveTab);
             dataFormat = $("#dataFormatTextArea").find(":selected").text();
             dataPart = "data=" + encodeURIComponent(data) ;
             break;
     }
  var inference = $("#inference").find(":selected").text();
  var targetDataFormat = $("#targetDataFormat").find(":selected").text();
  var location = "/dataConversions?" +
      dataPart + "&" +
      "dataFormat=" + encodeURIComponent(dataFormat) +
      "&targetDataFormat=" + encodeURIComponent(targetDataFormat) +
      "&inference=" + encodeURIComponent(inference) ;
    var href = urlShaclex + location
    console.log("NewHRef: " + href)
    window.location.assign(href) ;
  });

});
