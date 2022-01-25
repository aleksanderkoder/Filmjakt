// Contains methods for hiding and showing DOM elements
// Seperates concerns better
class Navigator {
    // Displays "dashboard"
    static DisplayDashboard() {
        // Hide the landing section
        document.getElementById("landing").style.display = "none"; 
        // Display the dashboard section
        document.getElementById("dashboard").style.display = "grid"; 
        document.getElementById("arrow-back").style.display = "none";
        // Fetch information from IMDb API to display on Dashboard
        // Get and display movies currently in theaters
        Filmjakt.GetMoviesInTheaters(); 
        // Get the currently most popular movies
        Filmjakt.GetMostPopularMovies(); 
        // Get the most popular TV Series
        Filmjakt.GetMostPopularSeries(); 
    }
    // Displays the "showcase" section
    static DisplayMovieShowcase() {
        document.getElementById("movie-showcase").style.display = "flex"; 
        document.getElementById("in-theaters").style.display = "none";
        document.getElementById("most-popular-movies").style.display = "none"; 
        document.getElementById("most-popular-series").style.display = "none"; 
        document.getElementById("arrow-back").style.display = "block";
        document.getElementById("content").scrollTop = 0; 
    }
    // Displays dashboard sections and hides everything else
    static ReturnToDashboard() {
        // Hide or show relevant DOM elements
        document.getElementById("movie-showcase").style.display = "none"; 
        document.getElementById("in-theaters").style.display = "block";
        document.getElementById("most-popular-movies").style.display = "block"; 
        document.getElementById("most-popular-series").style.display = "block";
        document.getElementById("arrow-back").style.display = "none";
        // Reset DOM element content
        Filmjakt.ResetShowcase();  
        Filmjakt.ResetSearch(); 
    }
    // Hides dashboard sections
    static HideDashboardSections() {
        // Hide or show relevant DOM elements
        document.getElementById("in-theaters").style.display = "none";
        document.getElementById("most-popular-movies").style.display = "none"; 
        document.getElementById("most-popular-series").style.display = "none";
    }
    // Hides showcase section
    static HideShowcase() {
        document.getElementById("movie-showcase").style.display = "none"; 
    }
    // Shows search results DOM element
    static DisplaySearchResults() {
        document.getElementById("search-content").style.display = "block";
        // Hides showcase and dashboard
        Navigator.HideDashboardSections();
        Navigator.HideShowcase();
    }
}