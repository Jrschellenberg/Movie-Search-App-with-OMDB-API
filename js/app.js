jQuery(function($){
	$('form').submit(function(e){
		e.preventDefault(); // prevent the default behavior.

		var $searchField = $("#search");
		var $spinner = $('<div class="spinner centered">'+
			'<div class="rect1"></div>'+
			'<div class="rect2"></div>'+
			'<div class="rect3"></div>'+
			'<div class="rect4"></div>'+
			'<div class="rect5"></div>'+
			'</div>');

		var omdbMovieURL = "http://www.omdbapi.com/?s=";
		var movieSearch = $searchField.val();
		var yearSearch = $('#year').val();

		var omdbMovieRequest = omdbMovieURL + encodeURIComponent(movieSearch) +"&y="+ encodeURIComponent(yearSearch);


		var moviesHTML = "",
			img = "";

		$('#movies').html($spinner);

		console.log(omdbMovieRequest);
		//$spinner.removeClass("hide");

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
					moviesHTML = " <li class='no-movies centered'>" +
						"<i class='material-icons icon-help'>help_outline</i>"+
						"No movies found that match: "+ movieSearch +".</li>";
				}
				else if(data.Error === "Something went wrong."){
					//error code for something went wrong.
					moviesHTML = " <li class='no-movies centered'>" +
						"<i class='material-icons icon-help'>help_outline</i>"+
						"An error occured in processing your request, please try again.</li>";
				}
				else{
					//final statement for errors
					moviesHTML = " <li class='no-movies centered'>" +
						"<i class='material-icons icon-help'>help_outline</i>"+
						"Something unexpected occured, please try again.</li>";
				}

				console.log("did not find movies");
				//code the no movies found etc.

			}
			$('#movies').html(moviesHTML);
		}

		$.getJSON(omdbMovieRequest, displayMovies);

	}); // end submit function



}); //end jquery function