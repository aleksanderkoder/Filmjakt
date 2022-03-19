// Main class
// Contains all main methods for fetching and displaying information from IMDb API
class Filmjakt {
  // API key needed to access the IMDb API
  static apiKey = "k_g0awz7ea";
  // Base URL for the IMDb API
  static imdbApiUrl = "https://imdb-api.com/en/API/";

  // Fetches and displays current movies in theaters
  static GetMoviesInTheaters() {
    // Sends HTTP GET request to the IMDb API
    fetch(this.imdbApiUrl + "InTheaters/" + this.apiKey, {
      method: "get",
    })
      .then((response) => {
        return response.text().then(function (text) {
          // Parse the JSON response to a JS object
          let data = JSON.parse(text);
          // Check for error message
          if(!Helpers.CheckForError(data)) {
            Navigator.ReturnToDashboard();
            return; 
          }
          for (let i = 0; i < 10; i++) {
            // Only render 10 items
              // Generate wrapper element to contain each item
              let itemWrapper = document.createElement("div");
              itemWrapper.className = "item-wrapper";
              // Generate movie image element
              let imgElement = document.createElement("img");
              imgElement.src = data.items[i].image;
              // Add onclick event listener to the movie image element
              imgElement.addEventListener("click", function () {
                // Showcase the clicked movie element 
                Filmjakt.DisplayMovieShowcase(data.items[i].id, false);
              });
              imgElement.className = "movie-image";
              itemWrapper.appendChild(imgElement);

              // Generate info box
              let infoElement = document.createElement("span");
              // Append response properties to info box element
              infoElement.innerHTML =
              data.items[i].title + "<br>" + data.items[i].year + "<br>" + data.items[i].releaseState;
              infoElement.className = "movie-info";
              // Append info element to item wrapper element
              itemWrapper.appendChild(infoElement);

              // Append wrapper element to document
              document.getElementById("in-theaters").appendChild(itemWrapper);
            }
        });
      })
      .catch((error) => {
        // If HTTP error
        console.log(error);
      });
  }
  // Fetches and displays the 10 most popular movies
  static GetMostPopularMovies() {
    // HTTP GET request to IMDb API
    fetch(this.imdbApiUrl + "MostPopularMovies/" + this.apiKey, {
      method: "get",
    })
      .then((response) => {
        return response.text().then(function (text) {
          // Parse the response JSON to JS object
          let data = JSON.parse(text);
          // Check for error message
          if(!Helpers.CheckForError(data)) {
            Navigator.ReturnToDashboard();
            return; 
          }
          for (let i = 0; i < 10; i++) {
              // Generate wrapper to contain each item
              let itemWrapper = document.createElement("div");
              itemWrapper.className = "item-wrapper";
              // Generate movie image element
              let imgElement = document.createElement("img");
              imgElement.src = data.items[i].image;
              // Add onclick event listener to image element
              imgElement.addEventListener("click", function () {
                // Showcase the clicked movie
                Filmjakt.DisplayMovieShowcase(data.items[i].id);
              });
              imgElement.className = "movie-image";
              // Append image element to item wrapper element
              itemWrapper.appendChild(imgElement);

              // Generate info box
              let infoElement = document.createElement("span");
              // Append response properties to info box element
              infoElement.innerHTML =
              data.items[i].rank +
                ".<br>" +
                data.items[i].title +
                "<br>" +
                data.items[i].year +
                "<br><i class='fas fa-star'></i> " +
                data.items[i].imDbRating;
              infoElement.className = "movie-info";
              // Append info element to item wrapper element
              itemWrapper.appendChild(infoElement);

              // Append wrapper element to document DOM
              document
                .getElementById("most-popular-movies")
                .appendChild(itemWrapper);          
          }
        });
      })
      .catch((error) => {
        // If HTTP error
        console.log(error);
      });
  }
  // Fetches and displays the 10 most popular TV series from the IMDb API
  static GetMostPopularSeries() {
    // HTTP GET request to IMDb API
    fetch(this.imdbApiUrl + "MostPopularTVs/" + this.apiKey, {
      method: "get",
    })
      .then((response) => {
        return response.text().then(function (text) {
          // Parse the response JSON to JS object
          let data = JSON.parse(text);
          // Check for error message
          if(!Helpers.CheckForError(data)) {
            // Return to dashboard if error message exists
            Navigator.ReturnToDashboard();
            return; 
          }
          for (let i = 0; i < 10; i++) {
            // Render only 10 elements
              // Generate wrapper to contain each item
              let itemWrapper = document.createElement("div");
              itemWrapper.className = "item-wrapper";
              // Generate series image element
              let imgElement = document.createElement("img");
              imgElement.src = data.items[i].image;
              // Add onclick event listener to image element
              imgElement.addEventListener("click", function () {
                Filmjakt.DisplayMovieShowcase(data.items[i].id);
              });
              imgElement.className = "movie-image";
              // Append image elemnt to item wrapper element
              itemWrapper.appendChild(imgElement);

              // Generate info box on hover element
              let infoElement = document.createElement("span");
              // Append response properties to info box element
              infoElement.innerHTML =
              data.items[i].rank +
                ".<br>" +
                data.items[i].title +
                "<br>" +
                data.items[i].year +
                "<br><i class='fas fa-star'></i> " +
                data.items[i].imDbRating;
              infoElement.className = "movie-info";
              // Append info element to item wrapper element
              itemWrapper.appendChild(infoElement);

              // Append wrapper element to document DOM
              document
                .getElementById("most-popular-series")
                .appendChild(itemWrapper);
            }
        });
      })
      .catch((error) => {
        // If HTTP error
        console.log(error);
      });
  }
  // Displays the showcase section and resets showcase and search sections
  static DisplayMovieShowcase(movieID, released = true) {
    // Reset relevant sections
    Filmjakt.ResetShowcase();
    Navigator.DisplayMovieShowcase();
    Filmjakt.ResetSearch();

    // Fetch movie information from IMDb api
    fetch(this.imdbApiUrl + "Title/" + this.apiKey + "/" + movieID, {
      method: "get",
    })
      .then((response) => {
        return response.text().then(function (text) {
          // Parse the response JSON to JS object
          let item = JSON.parse(text);
          // Check for error message
          if(!Helpers.CheckForError(item)) {
            Navigator.ReturnToDashboard();
            return; 
          }

          if (item.id == movieID) {
            document.getElementById("movie-showcase-header").innerHTML =
              item.title;
            document.getElementById("movie-showcase-image").src = item.image;
            let mInfo = "";
            if (item.type == "Movie") {
              mInfo += item.year;
              mInfo += " • " + item.runtimeStr;
              mInfo += "<br><br>" + item.plot;

              if (!released) {
                mInfo +=
                  "<br><br><i class='fas fa-calendar-day'></i> Coming " +
                  item.releaseDate;
              } else {
                mInfo +=
                  "<br><br><i class='fas fa-star'></i>" + item.imDbRating;
              }
            } else if (item.type == "TVSeries") {
              mInfo =
                item.year +
                " • TV Series<br><br>" +
                item.plot +
                "<br><br><i class='fas fa-star'></i> " +
                item.imDbRating;
            }
            document.getElementById("movie-showcase-info").innerHTML = mInfo;
          }

          let actorHeader = document.createElement("h1");
          actorHeader.innerHTML = "Actors";
          document
            .getElementById("movie-showcase-stars")
            .appendChild(actorHeader);
          item.actorList.forEach((item) => {
            // Generate wrapper to contain each item
            let itemWrapper = document.createElement("div");
            itemWrapper.className = "item-wrapper";
            // Generate actor image element
            let imgElement = document.createElement("img");
            imgElement.src = item.image;
            imgElement.className = "actor-image";
            itemWrapper.appendChild(imgElement);

            // Generate info box
            let infoElement = document.createElement("span");
            infoElement.innerHTML = item.name;
            infoElement.className = "actor-info";
            itemWrapper.appendChild(infoElement);

            // Append wrapper element to document
            document
              .getElementById("movie-showcase-stars")
              .appendChild(itemWrapper);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // Resets showcase element content
  static ResetShowcase() {
    document.getElementById("movie-showcase-stars").innerHTML = "";
    //document.getElementById("movie-showcase-image").src = "";
  }
  // Resets search element content
  static ResetSearch() {
    document.getElementById("search-content").innerHTML = "";
    document.getElementById("search-box").value = "";
  }
  // Creates a content slide from the search results from the IMDb API
  static CreateSlideFromSearch() {
    // Get search expression from seach input element
    let expression = document.getElementById("search-box").value;
    // If search expression is empty, then return early
    if (expression == "") return;
    // Reset search element content
    Filmjakt.ResetSearch();
    // Display relevant DOM elements
    Navigator.DisplaySearchResults();
    // Fetch search results from IMDb API
    fetch(this.imdbApiUrl + "SearchAll/" + this.apiKey + "/" + expression, {
      method: "get",
    })
      .then((response) => {
        return response.text().then(function (text) {
          // Parse the response JSON to JS object
          let data = JSON.parse(text);
          // Display back arrow button
          document.getElementById("arrow-back").style.display = "block";
          // Check for error message
          if(!Helpers.CheckForError(data)) {
            Navigator.ReturnToDashboard();
            return; 
          }
          // Generate relevant DOM elements
          let searchHeader = document.createElement("h1");
          searchHeader.innerHTML = "Search results";
          let contentElem = document.getElementById("search-content");
          contentElem.appendChild(searchHeader);
          // Loop through every search result item
          data.results.forEach((item) => {
            // Generate wrapper to contain each item
            let itemWrapper = document.createElement("div");
            itemWrapper.className = "item-wrapper search";
            // Generate image element
            let imgElement = document.createElement("img");
            imgElement.src = item.image;
            imgElement.className = "movie-image";
            itemWrapper.appendChild(imgElement);
            // Generate info box
            let infoElement = document.createElement("span");
            infoElement.className = "movie-info";
            // Generate relevant info based on result type
            if (item.resultType == "Name") {
              infoElement.innerHTML = item.title + "<br>Actor";
            } else if (item.resultType == "Title") {
              imgElement.addEventListener("click", function () {
                Filmjakt.DisplayMovieShowcase(item.id, true);
              });
              infoElement.innerHTML = item.title + "<br>Media";
            }
            itemWrapper.appendChild(infoElement);

            // Append wrapper element to document
            document.getElementById("search-content").appendChild(itemWrapper);
          });
        });
      })
      .catch((error) => {
        // If HTTP error
        console.log(error);
      });
  }
}
