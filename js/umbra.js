class Umbra {
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
                Umbra.DisplayMovieShowcase(item.id, false);
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
                Umbra.DisplayMovieShowcase(item.id);
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
                Umbra.DisplayMovieShowcase(item.id);
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
    console.log(movieID);
    Navigator.DisplayMovieShowcase();

    // Fetch movie information from IMDb api and
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
              
                  if(!released) {
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
  }
}
