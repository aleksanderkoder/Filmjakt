class Navigator {
    static DisplayDashboard() {
        // Hide the landing section
        document.getElementById("landing").style.display = "none"; 
        // Display the dashboard section
        document.getElementById("dashboard").style.display = "grid"; 
        // Fetch information from IMDb API to display on Dashboard
        // Get and display mvies currently in theaters
        Umbra.GetMoviesInTheaters(); 
        // Get the currently most popular movies
        Umbra.GetMostPopularMovies(); 
        // Get the most popular TV Series
        Umbra.GetMostPopularSeries(); 
    }
}