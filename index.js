// Select buttons
var xhr = $("#xhr");
var fetchBtn =  $("#fetch");
var jquery =  $("#jquery");
var axiosBtn =  $("#axios");

var quote = $("#quote");

var url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';


// XHR Method
xhr.click(function() {
    var xhrRequest = new XMLHttpRequest();

    // Success code
    xhrRequest.onreadystatechange = function() { 
        if(xhrRequest.readyState == 4 && xhrRequest.status != 200) {
            console.log("Message - " + xhrRequest.statusText);
        }
        if(xhrRequest.readyState == 4 && xhrRequest.status == 200) {
            var data = JSON.parse(xhrRequest.responseText);
            quote.html(data[0]);
        }
    }

    xhrRequest.open("GET", url);
    xhrRequest.send();
});


// Fetch Method
fetchBtn.click(function() { 
    fetch(url)
    .then(handleErrors)
    .then(getJSON)
    .then(updateQuote)
    .catch(printError)
});

function handleErrors(request) {
    if(!request.ok) {
        throw Error(request.status);
    }
    return request;
}
function getJSON(response) {
    return response.json();
}
function updateQuote(data) {
    quote.html(data[0]);
}
function printError(error){ 
    console.log("Message - " + error);
}

// jQuery Method
jquery.click(function() {
    $.getJSON(url)
    .done(function(data) {
        quote.html(data[0]);
    })
    .fail(function() {
        console.log("Error processing transaction.");
    });
});


// Axios Method
axiosBtn.click(function() {
    axios.get(url)
    .then(function(response) {
        quote.html(response.data[0]);
    })
    .catch(function(error) {
        console.log("Message - " + error);
    });
});
