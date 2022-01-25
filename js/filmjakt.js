class Filmjakt {
  static apiKey = "k_g0awz7ea";
  static imdbApiUrl = "https://imdb-api.com/en/API/";

  static GetMoviesInTheaters() {
    fetch(this.imdbApiUrl + "InTheaters/" + this.apiKey, {
      method: "get",
    })
      .then((response) => {
        return response.text().then(function (text) {
          let data = JSON.parse(text);
          let count = 0;
          data.items.forEach((item) => {
            if (count < 10) {
              // Generate wrapper to contain each item
              let itemWrapper = document.createElement("div");
              itemWrapper.className = "item-wrapper";
              // Generate movie image element
              let imgElement = document.createElement("img");
              imgElement.src = item.image;
              imgElement.addEventListener("click", function () {
                Filmjakt.DisplayMovieShowcase(item.id, false);
              });
              imgElement.className = "movie-image";
              itemWrapper.appendChild(imgElement);

              // Generate info box on hover element
              let infoElement = document.createElement("span");
              infoElement.innerHTML =
                item.title + "<br>" + item.year + "<br>" + item.releaseState;
              infoElement.className = "movie-info";
              itemWrapper.appendChild(infoElement);

              // Append wrapper element to document
              document.getElementById("in-theaters").appendChild(itemWrapper);
              count++;
            }
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static GetMostPopularMovies() {
    fetch(this.imdbApiUrl + "MostPopularMovies/" + this.apiKey, {
      method: "get",
    })
      .then((response) => {
        return response.text().then(function (text) {
          let data = JSON.parse(text);
          let count = 0;
          data.items.forEach((item) => {
            if (count < 10) {
              // Generate wrapper to contain each item
              let itemWrapper = document.createElement("div");
              itemWrapper.className = "item-wrapper";
              // Generate movie image element
              let imgElement = document.createElement("img");
              imgElement.src = item.image;
              imgElement.addEventListener("click", function () {
                Filmjakt.DisplayMovieShowcase(item.id);
              });
              imgElement.className = "movie-image";
              itemWrapper.appendChild(imgElement);

              // Generate info box on hover element
              let infoElement = document.createElement("span");
              infoElement.innerHTML =
                item.rank +
                ".<br>" +
                item.title +
                "<br>" +
                item.year +
                "<br><i class='fas fa-star'></i> " +
                item.imDbRating;
              infoElement.className = "movie-info";
              itemWrapper.appendChild(infoElement);

              // Append wrapper element to document
              document
                .getElementById("most-popular-movies")
                .appendChild(itemWrapper);
              count++;
            }
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static GetMostPopularSeries() {
    fetch(this.imdbApiUrl + "MostPopularTVs/" + this.apiKey, {
      method: "get",
    })
      .then((response) => {
        return response.text().then(function (text) {
          let data = JSON.parse(text);
          let count = 0;
          data.items.forEach((item) => {
            if (count < 10) {
              // Generate wrapper to contain each item
              let itemWrapper = document.createElement("div");
              itemWrapper.className = "item-wrapper";
              // Generate movie image element
              let imgElement = document.createElement("img");
              imgElement.src = item.image;
              imgElement.addEventListener("click", function () {
                Filmjakt.DisplayMovieShowcase(item.id);
              });
              imgElement.className = "movie-image";
              itemWrapper.appendChild(imgElement);

              // Generate info box on hover element
              let infoElement = document.createElement("span");
              infoElement.innerHTML =
                item.rank +
                ".<br>" +
                item.title +
                "<br>" +
                item.year +
                "<br><i class='fas fa-star'></i> " +
                item.imDbRating;
              infoElement.className = "movie-info";
              itemWrapper.appendChild(infoElement);

              // Append wrapper element to document
              document
                .getElementById("most-popular-series")
                .appendChild(itemWrapper);
              count++;
            }
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static DisplayMovieShowcase(movieID, released = true) {
    Filmjakt.ResetShowcase()
    Navigator.DisplayMovieShowcase();
    Filmjakt.ResetSearch(); 

    // Fetch movie information from IMDb api 
    fetch(this.imdbApiUrl + "Title/" + this.apiKey + "/" + movieID, {
      method: "get",
    })
      .then((response) => {
        return response.text().then(function (text) {
          let item = JSON.parse(text);

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
                "<br><br><i class='fas fa-star'></i>Rating: " +
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

            // Generate info box on hover element
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
  static ResetShowcase() {
    document.getElementById("movie-showcase-stars").innerHTML = "";
    document.getElementById("movie-showcase-image").src = "";
  }
  static ResetSearch() {
    document.getElementById("search-content").innerHTML = "";
    document.getElementById("search-box").value = "";  
  }
  static CreateSlideFromSearch() {
    let expression = document.getElementById("search-box").value;
    if (expression == "") return;
    Filmjakt.ResetSearch();
    Navigator.DisplaySearchResults();
    fetch(this.imdbApiUrl + "SearchAll/" + this.apiKey + "/" + expression, {
      method: "get",
    })
      .then((response) => {
        return response.text().then(function (text) {
          let data = JSON.parse(text);
          let searchHeader = document.createElement("h1");
          searchHeader.innerHTML = "Search results";
          let contentElem = document.getElementById("search-content");
          contentElem.appendChild(searchHeader);
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
        console.log(error);
      });
  }
}
