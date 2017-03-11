// create an array for topics. This is also where user input will be pushed into
var topics = ["Trees", "Mountains", "Forest", "Ocean", "Honey Badger", "Giant Squid"];


// lets get our gifs

function getGifs(){
	// clear out last gifs
	$("#seeGifs").empty();

	// we are taking the attribute data name we created in renderButtons() to add to query URL
	var gifSubmit = $(this).attr("data-name");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+gifSubmit+"&api_key=dc6zaTOxFJmzC&limit=10";   

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){

		var gifDiv = $("#seeGifs");

		gifArray = response.data;

		gifRating = response.data.raiting;

		for(var i = 0; i<gifArray.length; i++){

			var gifDisplayMove = gifArray[i].images.original.url;
			var gifDisplayStill = gifArray[i].images.original_still.url;
			gifRating = gifArray[i].rating;

			$("#seeGifs").append("<div class='left'><p>Rated: "+gifRating+"</p><p><img class='moveMe' id='"+gifDisplayMove+"' src="+gifDisplayStill+"></p><div>");
		};

		console.log(response);

		});

};

//  this function will take our array topics and turn it into buttons
function renderButtons(){

	// empty the button div so we do not create the same button twice
	$("#showButtons").empty();

	// we loop through the topic array
	for (var i = 0; i< topics.length; i++){

		// creating buttons with jQuery
		var button = $("<button>");

		// adds class of nature
		button.addClass("nature btn");

		// this adds the data name so we can submit something for giphy to look up
		button.attr("data-name", topics[i]);

		// creates button text
		button.text(topics[i]);

		// adds buttons to div
		$("#showButtons").append(button);

	};


};

// when the addNature button is clicked
$("#addNature").on("click", function(event){

	event.preventDefault();

	// grab user input from textbox
	var nature = $("#nature-input").val().trim();

	 if(nature === ""){
	 	alert("Please Enter Some Nature")
	 }else{
	// push to array
	topics.push(nature);

	// re-render the buttons
	renderButtons();

	// this creates a storage for the array of buttons so we can render them on a second 
	localStorage.setItem("saveButtons", topics);

	$("#nature-input").val("");};

});

	
	

$("#seeGifs").on("click", ".moveMe", function(){

	var moveUrl = $(this).attr("data-still");
	var stillUrl = $(this).attr("src");

	$(this).attr("data-still", stillUrl);
	$(this).attr("src", moveUrl);
	$(this).attr("class", "makeStill");

});

$("#seeGifs").on("click", ".makeStill", function(){

	var moveUrl = $(this).attr("src");
	var stillUrl = $(this).attr("id");

	$(this).attr("id", moveUrl);
	$(this).attr("src", stillUrl);
	$(this).attr("class", "moveMe");

});

$("#showButtons").on("click", ".nature", getGifs);


$(document).ready(function(){
// this checks if they have created buttons - if buttons were created we overwrite topics to that storage
	if(localStorage.getItem("saveButtons") != null){
		topics = localStorage.getItem("saveButtons").split(",");
	};

renderButtons();
console.log(topics);

});


