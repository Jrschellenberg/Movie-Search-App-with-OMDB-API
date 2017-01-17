jQuery(function($){
	//Initializing variables
	var $searchField = $("#search"),
		$spinner = $('<div class="spinner centered">'+
			'<div class="rect1"></div>'+
			'<div class="rect2"></div>'+
			'<div class="rect3"></div>'+
			'<div class="rect4"></div>'+
			'<div class="rect5"></div>'+
			'</div>'),
		omdbMovieURL = "http://www.omdbapi.com/?s=";
	$('form').submit(function(e){
		e.preventDefault(); // prevent the default behavior.

		var movieSearch = $searchField.val(),
		yearSearch = $('#year').val(),
		omdbMovieRequest = omdbMovieURL + encodeURIComponent(movieSearch) +"&y="+ encodeURIComponent(yearSearch),
		moviesHTML = "",
		img = "";

		$('#movies').html($spinner);

		/*
		The callback function to be called when ajax receives data
		 */
		function displayMovies(data) {
			if(data.Response === "True"){

				console.log("found movies!");
				$.each(data.Search, function(i, movies){
					img = '<a href="http://www.imdb.com/title/'+movies.imdbID+
						'/"><img class="movie-poster" src="'+ movies.Poster +'"></a>';
					if(movies.Poster === "N/A"){
						img = '<a href="http://www.imdb.com/title/'+movies.imdbID+
							'/"><i class="material-icons poster-placeholder">crop_original</i></a>';
					}

					moviesHTML += '<li><div class="poster-wrap">';
					moviesHTML += img +
						'</div><span class="movie-title">' + movies.Title +
						'</span><span class="movie-year">' + movies.Year +
						'</span></li>'

				}); // end of each

				//do this code if it found movies
			}
			//Error cases
			else{
				if(data.Error === "Movie not found!"){
					//put error code for no found movies here
					setMoviesOnError("No movies found that match: "+movieSearch+".");
				}
				else if(data.Error === "Something went wrong."){
					//error code for something went wrong.
					setMoviesOnError("An error occurred in processing your request, please try again.");
				}
				else{
					//final statement for errors
					setMoviesOnError("Something unexpected occurred, please try again.");
				}
			}
			$('#movies').html(moviesHTML);
		}

		//invoking the ajax call method to get the json data from the omdb.
		$.getJSON(omdbMovieRequest, displayMovies).fail(
			//This is the callback function to be called when the ajax request fails.
			function(jqXHR){
			setMoviesOnError("An error occurred while connecting with the movie Server, please try to search again.");
			$('#movies').html(moviesHTML);

		}); //end fail function

		function setMoviesOnError(str){
			moviesHTML = " <li class='no-movies centered'>" +
				"<i class='material-icons icon-help'>help_outline</i>"+ str +"</li>";
		}

	}); // end submit function


	/*
	code to detect global variables.
	 */

	//var differences = {},
	//	exceptions,
	//	globals = {},
	//	ignoreList = (prompt('Ignore filter (comma sep)?', '') || '').split(','),
	//	i = ignoreList.length,
	//	iframe = document.createElement('iframe');
	//while (i--) {
	//	globals[ignoreList[i]] = 1
	//}
	//for (i in window) {
	//	differences[i] = {
	//		'type': typeof window[i],
	//		'val': window[i]
	//	}
	//}
	//iframe.style.display = 'none';
	//document.body.appendChild(iframe);
	//iframe.src = 'about:blank';
	//iframe = iframe.contentWindow || iframe.contentDocument;
	//for (i in differences) {
	//	if (typeof iframe[i] != 'undefined') delete differences[i];
	//	else if (globals[differences[i].type]) delete differences[i]
	//}
	//exceptions = 'addEventListener,document,location,navigator,window'.split(',');
	//i = exceptions.length;
	//while (--i) {
	//	delete differences[exceptions[i]]
	//}
	//console.dir(differences);



}); //end jquery function