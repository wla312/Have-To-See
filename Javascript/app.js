// band search JS file
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

    	// for loop to dynamically create html elements with the AJAX response
    	for (var i = 0; i<response.length; i++) {

    		// create a new div for each response[i]
    		var newDiv = $("<div>");
    		// add bootstrap class to the div
    		newDiv.addClass("well");

    		// create a headline for the new div
    		var newDivHeadline = $("<h3>");
    		newDivHeadline.text(response[i].venue.name);
    		newDiv.append(newDivHeadline);

    		// create snippet text for the new div
    		var newDivSnippet = $("<p>");
    		newDivSnippet.text(response[i].venue.city + ", " + response[i].venue.country);
    		newDiv.append(newDivSnippet);

    		// append the new divs to the #results-div
    		$("#results-div").append(newDiv);
    	}
    });

};

	// when user clicks #search-btn...
	$("#search-btn").on("click", function() {

	// place the search term user input into a variable
	var userArtist = $("#searchBand").val().trim();

	// console log the userArtist variable as a test
	console.log("User Search Input: " + userArtist);

	// call searchBandsInTown function 
	searchBandsInTown(userArtist);

	})

	// when user clicks #clear-btn...
	$("#clear-btn").on("click", function() {

		// empty the #results-div
		$("#results-div").empty();

		// empty the #searchBand input
		$("#searchBand").val("");
	})
})