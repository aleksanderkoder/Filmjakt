class Navigator {
    static DisplayDashboard() {
        // Hide the landing section
        document.getElementById("landing").style.display = "none"; 
        // Display the dashboard section
        document.getElementById("dashboard").style.display = "grid"; 
        // Fetch information from IMDb API to display on Dashboard
        // Get and display movies currently in theaters
        Umbra.GetMoviesInTheaters(); 
        // Get the currently most popular movies
        Umbra.GetMostPopularMovies(); 
        // Get the most popular TV Series
        Umbra.GetMostPopularSeries(); 
    }
    static DisplayMovieShowcase() {
        document.getElementById("movie-showcase").style.display = "flex"; 
        document.getElementById("in-theaters").style.display = "none";
        document.getElementById("most-popular-movies").style.display = "none"; 
        document.getElementById("most-popular-series").style.display = "none"; 
        document.getElementById("content").scrollTop = 0; 
    }
    static ReturnToDashboard() {
        document.getElementById("movie-showcase").style.display = "none"; 
        document.getElementById("in-theaters").style.display = "block";
        document.getElementById("most-popular-movies").style.display = "block"; 
        document.getElementById("most-popular-series").style.display = "block";
        Umbra.ResetShowcase();  
    }
}