// band search JS file

// global variables
var venueLat;
var venueLong;
var newDiv;
var dateDiv;
var datePara;
var timePara;
var dateDivValue;
var venueDate;
var doorsOpen;
var verticalLineDiv;
var venueDiv;
var newDivHeadline;
var newDivSnippet;
var flightPrice;
var flightCarrier;
var fDate;
var flightDate;
var flightInfoDiv;




// var tourArray = [];

var seeFlights;

$(document).ready(function() {

function searchBandsInTown(artist) {

		// querying the bandsintown api upcoming artist events for the selected artist
	var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=havetosee";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

    	// test functionality
    	// console.log(response);

        var artistDates = response;

    	// if/else to address instances where there's no upcoming tour dates 
    	if (response.length === 0) {
    		var noShowsDiv = $("<div>");
    		noShowsDiv.addClass("text-center");
    		var noShowsPara = $("<p>");
    		noShowsPara.text("Sorry, we don't know of any upcoming shows for " + artist + ".");
    		noShowsDiv.append(noShowsPara);
    		$("#results-div").append(noShowsDiv);
    	}
    	else {

    		// for loop to dynamically create html elements with the AJAX response
    		for (var i = 0; i<response.length; i++) {

        		// create a new div for each response[i]
        		newDiv = $("<div>");
        		// add bootstrap class to the div
        		newDiv.addClass("well");

                // create unique identifier for each well (dynamic flight info population attempt)
                // newDiv.attr("id", "tourDiv-" + response[i].artist_event_id);

        		// create a div within the newDiv for the date (for formatting purposes)
        		dateDiv = $("<div>");
        		// dateDiv.addClass("col-sm-4");
        		dateDiv.addClass("date-div");

        		datePara = $("<p>");
        		timePara = $("<p>");

        		// date formatting with moment.js
        		dateDivValue = response[i].datetime;

        		// test
        		// console.log(dateDivValue);
        		// console.log(moment(dateDivValue).format("MMM Do YYYY"));

        		venueDate = moment(dateDivValue).format("MMM Do YYYY")
        		doorsOpen = moment(dateDivValue).format("h:mm");

                // flight date variables
                var fDate = moment(dateDivValue).format("YYYY-MM-DD");
                var flightDate = moment(fDate).subtract(1, "day").format("YYYY-MM-DD");


        		datePara.text(venueDate);
        		timePara.text(doorsOpen);

        		dateDiv.append(datePara);
        		dateDiv.append(timePara);
        		newDiv.append(dateDiv);

                // create button to see flights
                seeFlights = $("<button>");
                seeFlights.addClass("see-flights btn btn-default btn-lg");

                // dynamic flight info population attempt
                seeFlights.attr("id", response[i].artist_event_id);

                seeFlights.attr("lat", response[i].venue.latitude);
                seeFlights.attr("long", response[i].venue.longitude);
                seeFlights.attr("flightdat",flightDate);
                seeFlights.text("See Flights");
                newDiv.append(seeFlights);

        		// vertical line <hr> attempt
    			verticalLineDiv = $("<div>");
    			verticalLineDiv.addClass("verticalLine");
    			newDiv.append(verticalLineDiv);

        		// create a new div for the venue details (name, location) for formatting purposes
        		venueDiv = $("<div>");
        		// venueDiv.addClass("col-sm-8");
        		venueDiv.addClass("venue-div");

        		// create a headline for the new div
        		newDivHeadline = $("<h3>");
        		newDivHeadline.text(response[i].venue.name);
        		venueDiv.append(newDivHeadline);

        		// create snippet text for the new div
        		newDivSnippet = $("<p>");
        		newDivSnippet.text(response[i].venue.city + ", " + response[i].venue.country);
        		venueDiv.append(newDivSnippet);

        		// append venueDiv to newDiv
        		newDiv.append(venueDiv);

                // dynamic flight info attempt
                flightInfoDiv = $("<div>");
                flightInfoDiv.attr("id", "tourDiv-" + response[i].artist_event_id);
                newDiv.append(flightInfoDiv);

        		// append the new divs to the #results-div
        		$("#results-div").append(newDiv);

                // test to see if I can log the lat/long values for each show
                // console.log("Venue: " + response[i].venue.name + " Lat: " + response[i].venue.latitude + " Long: " + response[i].venue.longitude);

                // assign values to global venueLat and venueLong variables for venue latitude and venue longitude
                // venueLat = response[i].venue.latitude;
                // venueLong = response[i].venue.longitude;

                // ajax call to airportsfinder API for each tour stop
                // $.ajax({
                // type: "GET",
                // url: "https://cometari-airportsfinder-v1.p.mashape.com/api/airports/nearest?lat=" + venueLat + "&lng=" + venueLong,
                // // url: "https://cometari-airportsfinder-v1.p.mashape.com/api/airports/by-text?berlin",
                // dataType: "json",
                // beforeSend: function (xhr) {
                //     xhr.setRequestHeader("X-Mashape-Key", "YKavuk3HBMmshdVc1YxGBc83cJy7p1r1GBejsn5eMZzj7eGeYz");
                //     xhr.setRequestHeader("Accept", "application/json");
                //     }
                // }).done(function(result){
                //     console.log(result);

                // artistDates[i].airportCode = result.code;

                // })
    		}
    	}
    });
};
    
    // on-click event for #flights button
    $(document).on("click",".see-flights",function(){
        // test it out!
        // console.log("flights button clicked!");
        // console.log($(this).attr("lat"));
        // console.log($(this).attr("long"));

        // assign values to global venueLat and venueLong variables for venue latitude and venue longitude
        venueLat = $(this).attr("lat");
        venueLong = $(this).attr("long");
        flightDate = $(this).attr("flightdat");

        // dynamic flight info population attempt
        console.log($(this).attr("id"));
        var tourID = $(this).attr("id");

        // ajax call to airportsfinder API for each tour stop
        $.ajax({
        type: "GET",
        url: "https://cometari-airportsfinder-v1.p.mashape.com/api/airports/nearest?lat=" + venueLat + "&lng=" + venueLong,
        // url: "https://cometari-airportsfinder-v1.p.mashape.com/api/airports/by-text?berlin",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-Mashape-Key", "YKavuk3HBMmshdVc1YxGBc83cJy7p1r1GBejsn5eMZzj7eGeYz");
            xhr.setRequestHeader("Accept", "application/json");
            }
        }).done(function(result){
            var venueAirportCode = result.code;
            var bestFlight = flightDate;
            // console.log(venueAirportCode);

            var body = {
                "request": {
                    "slice": [{
                        "origin": "CHI",
                        "destination": venueAirportCode,
                        "date": bestFlight
                    }],
                    "passengers": {
                        "adultCount": 1
                    },
                    "solutions": 1,
                    "prettyPrint": true
                }
            }

            var queryURL = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyABQYp0wRKZ16Gn2_nJ_cmMFx0V9fVEj9k";

            $.ajax({
                url: queryURL,
                data: JSON.stringify(body),
                method: "POST",
                contentType: "application/json; charset=utf-8",
            }).done(function(response) {
                // test
                console.log(response);
                
                // create variables for flight price and carrier
                flightPrice = response.trips.tripOption[0].saleTotal;
                flightCarrier = response.trips.data.carrier[0].name;

                // test
                console.log(flightPrice);
                console.log(flightCarrier);

                // create dynamic flight div for .see-flights click button
                // var flightsDiv = $("<div>");
                // flightsDiv.addClass("flights-div");

                // var flightPricePara = $("<p>");
                // flightPricePara.text("Flights from: " + flightPrice);
                // flightsDiv.append(flightPricePara);

                // var flightCarrierPara = $("<p>");
                // flightCarrierPara.text("Airline: " + flightCarrier);
                // flightsDiv.append(flightCarrierPara);

                $(".see-flights").siblings("#tourDiv-" + tourID).html("Flights from: " + flightPrice + "<br>" + "Airline: " + flightCarrier);


            });
        })
    });

	// when user clicks #search-btn...
	$("#search-btn").on("click", function() {

    	// empty the #results-div
    	$("#results-div").empty();

    	// place the search term user input into a variable
    	var userArtist = $("#searchBand").val().trim();


	    // console log the userArtist variable as a test
    	console.log("User Search Input: " + userArtist);

    	// call searchBandsInTown function 
    	searchBandsInTown(userArtist);

	});
    // when user clicks #clear-btn...
    $("#clear-btn").on("click", function() {

        // empty the #results-div
        $("#results-div").empty();

        // empty the #searchBand input
        $("#searchBand").val("");
    });
});