
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
var ticketLink;
var link;




// var tourArray = [];

var seeFlights;

$(document).ready(function() {


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////                                                               //////////////////////
    ///////////////////////////                   Search Band Function                        //////////////////////
    ///////////////////////////                                                               //////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
            noShowsPara.attr("id", "no-shows");
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

                ticketLink = response[i].offers[0].url;
                console.log("Ticket" + ticketLink);

                link = $('<a>').attr('href', ticketLink).attr('target', '_blank').text('Tickets');

                console.log(link);

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
                seeFlights.addClass("see-flights btn btn-primary btn-md");

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
                flightInfoDiv.addClass("text-center");
                flightInfoDiv.addClass("flightstyle");
                flightInfoDiv.attr("id", "tourDiv-" + response[i].artist_event_id);
                flightInfoDiv.attr("id", );
                newDiv.append(flightInfoDiv);

        		// append the new divs to the #results-div
        		$("#results-div").append(newDiv);

             
    		}
    	}
    });
};

// function to dynamically add user searched artist image
function grabArtistPoster(artist) {
    // querying the bandsintown api upcoming artist events for the selected artist
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=havetosee";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

        // test functionality
        // console.log(response.image_url);

        // variable for artistPoster img source
        var artistPoster = $("<img>").attr("src", response.image_url);
        artistPoster.addClass("artist-poster");
        artistPoster.addClass("img-thumbnail");

        // insert it at the FRONT/TOP of the #results-div
        $("#results-div").prepend(artistPoster);
    });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////                                                               //////////////////////
///////////////////////////                   Search Fligths                              //////////////////////
///////////////////////////                                                               //////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////



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

            var queryURL = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyDfaUhACZQENh5FejRFNBxjGt40gQYmqB0";

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

                $(".see-flights").siblings("#tourDiv-" + tourID).html("Flights from: " + flightPrice + "<br>" + "Airline: " + flightCarrier + "<br>");
                $("#tourDiv-" + tourID).append(link);


            });
        })
    });




    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////                                                               //////////////////////
    ///////////////////////////                   Initial Load Process                        //////////////////////
    ///////////////////////////                                                               //////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////



        var featuredDiv1 = $("<div>");
        featuredDiv1.addClass("row");

        function artistFun (arr) {
        var queryURL1 = "https://rest.bandsintown.com/artists/" + arr + "?app_id=havetosee";

        $.ajax({
          url: queryURL1,
          method: "GET"
        }).done(function(artistData) {




            var queryURL2 = "https://rest.bandsintown.com/artists/"+ arr +"/events?app_id=havetosee";

            $.ajax({
              url: queryURL2,
              method: "GET"
            }).done(function(eventsData) {

    ///////////////////// THIS WILL CREATE ARTIST LEVEL INFORMATION FOR  BAND /////////////////////

                var featuredDiv2 = $("<div>");
                featuredDiv2.addClass("col-lg-4").addClass("col-md-6").addClass("col-sm-6");


                var ticketCardDiv = $("<div>");
                ticketCardDiv.addClass("ticket-card");

          var trainTime = eventsData[0].datetime;

                var dateDivValue = eventsData[0].datetime;
                var venueDate = moment(dateDivValue).format("MMM DD YYYY")
                var concertHumanized

                if (moment().diff(venueDate,"days") *(-1) <1) {
                    concertHumanized = "Tonight"
                } else {
                    concertHumanized = "In " + moment.duration(moment().diff(venueDate,"days") *(-1),"days").humanize()
                }

                ticketCardDiv.append( "<div class='cover'>" +
                                        "<img src='"+artistData.thumb_url+"'/> "+
                                        "<div class='info'>"+
                                            "<div class='going'>"+
                                                "<i class='fa fa-group'></i>" + eventsData[0].venue.city + ', ' + eventsData[0].venue.country +
                                            "</div>"+
                                            "<div class='tickets-left'> <i class='fa fa-ticket'></i> " + concertHumanized + "</div>"+
                                        "</div> </div>"
                                    )


                ticketCardDiv.append("<div class='body'>"+
                                        "<div class='artist'>"+
                                            // "<h6 class='info'>Global Tour 2016</h6>" +
                                            "<h4 class='name'>" +artistData.name+ "</h4>"+
                                        "</div>"+
                                        // "<div class='price'>" +
                                            // "<div class='from'>From</div>" +
                                            //     "<div class='value'>" +
                                                // "<b>$</b>599" +
                                            // "</div>" +
                                        // "</div>" +
                                        "<div class='clearfix'></div>" +
                                        "</div>"
    )



                var collapseDiv = $("<div>")
                collapseDiv.addClass("collapse")
                // collapseDiv.addClass("in")

                    var ulListDiv = $("<ul>")
                    ulListDiv.addClass("list-unstyled")


                for (var j = 0; j < eventsData.length && j<=5; j++) {

                var dateValue = eventsData[j].datetime;
                var venueDate1 = moment(dateValue).format("MMM DD YYYY")

    console.log(eventsData[j].venue)

                ulListDiv.append('<li>' +
                                    '<div class="ticket">'+
                                        ' <h5>' +eventsData[j].venue.name +
                                        '<br> <small>' + eventsData[j].venue.city + ', ' + eventsData[j].venue.country  + '</small> </h5>' +
                                    '</div>' +
                                    '<div class="price">'+
                                    // '<div class="value"><b>$</b>599</div>'+
                                    '<div class="value"><small>' + venueDate1 + '</small></div>'+
                                '</div>'+
                                // '<a href="#" class="btn btn-info btn-sm btn-buy">Search Flights!</a>'+
                                '</li>')
                }


                collapseDiv.append(ulListDiv)
                ticketCardDiv.append(collapseDiv)


    /////////////////////////////   foooter  ////////////////////////////////////////
                ticketCardDiv.append ('<div class="footer"> <button class="btn toggle-tickets">Show Tickets</button></div>')


                featuredDiv2.append(ticketCardDiv)
                featuredDiv1.append(featuredDiv2)

            });
        });
    }


    $("#featured-div").append(featuredDiv1);





$(document).ready(function(){
  var config = {
    apiKey: "AIzaSyDYYDjjvutEE5N9W7q1Xm7ATTukiEE_6s4",
    authDomain: "have-to-see.firebaseapp.com",
    databaseURL: "https://have-to-see.firebaseio.com",
    projectId: "have-to-see",
    storageBucket: "",
    messagingSenderId: "947657490005"
  };
  firebase.initializeApp(config);

      var database = firebase.database();

      database.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function(snapshot) {
        var mysnapshot = "Recent Searches :";
        // Print the initial data to the console.
        console.log(mysnapshot, snapshot.val());

        var array = []
        var target =snapshot.val()
        for (var k in target){
            if (typeof target[k] !== 'function') {
                 array.push(k)
            }
        }

            var featured = []
    for (var i = 0; i < 3; i++) {
        featured.push(array[i]); 
    }
    console.log("featured: " + featured);
    console.log("array " + array);


    /////////////////////// THIS WILL LOOP THROUGH ALL THE ARTISTS FEATURED ON OUR WEBSITE /////////////////////////
    for (var i = 0; i < featured.length; i++) {
    artistFun(featured[i])
    }
});
            // console.log(array)

        var userArtist = "";

      $("#search-btn").on("click", function(event) {
        event.preventDefault();
        userArtist = $("#searchBand").val().trim();

        var gsw = {
          userArtist: userArtist,
        }

        database.ref('searchTerms').once('value').then(function(snapshot) {
            console.log(snapshot.val());
            console.log("artist: " + userArtist);

            if(snapshot.child(userArtist).val()){
                console.log(snapshot.child(userArtist).val());
                var searchValue = snapshot.child(userArtist).val();
                searchValue++;
                database.ref('searchTerms/' + userArtist).set(searchValue);
            }
            else {
                database.ref('searchTerms/' + userArtist).set(1);
            }
        //});

     },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
  });
}) 








	// when user clicks #search-btn...
	$("#search-btn").on("click", function() {

    	// empty the #results-div
    	$("#results-div").empty();

    	// place the search term user input into a variable
    	var userArtist = $("#searchBand").val().trim();


	    // console log the userArtist variable as a test
    	console.log("User Search Input: " + userArtist);

            // call grabArtistPoster
        grabArtistPoster(userArtist);

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

$(document).ready(function(){
    console.log('ready');
    $(document).on("click",'.toggle-tickets', function() {
  $tickets = $(this).parent().siblings('.collapse');
 
  if ($tickets.hasClass('in')) {
    $tickets.collapse('hide');
    $(this).html('Show Tickets');
    $(this).closest('.ticket-card').removeClass('active');
  } else {
    $tickets.collapse('show');
    $(this).html('Hide Tickets');
    $(this).closest('.ticket-card').addClass('active');
  }
});
});

});
