jQuery(function($){
	$('form').submit(function(e){
		e.preventDefault(); // prevent the default behavior.
		var $searchField = $("#search");

		var omdbMovieURL = "http://www.omdbapi.com/?s=";
		var movieSearch = $searchField.val();

		var omdbMovieRequest = omdbMovieURL + movieSearch;

		var moviesHTML = "",
			img = "";

		console.log(omdbMovieRequest);

		function displayMovies(data) {
			if(data.Response === "True"){

				console.log("found movies!");
				$.each(data.Search, function(i, movies){
					img = '<img class="movie-poster" src="'+ movies.Poster +'">';
					if(movies.Poster === "N/A"){
						img = '<i class="material-icons poster-placeholder">crop_original</i>';
					}

					moviesHTML += '<li><div class="poster-wrap">';
					moviesHTML += img +
						'</div><span class="movie-title">' + movies.Title +
						'</span><span class="movie-year">' + movies.Year +
						'</span></li>'

				}); // end of each

				//do this code if it found movies
			}
			else{
				console.log("did not find movies");
				//code the no movies found etc.
				moviesHTML = " <li class='no-movies'>" +
						"<i class='material-icons icon-help'>help_outline</i>"+
					"No movies found that match: [search form value].</li>";
			}
			$('#movies').html(moviesHTML);
		}

		$.getJSON(omdbMovieRequest, displayMovies);

	}); // end submit function



}); //end jquery function