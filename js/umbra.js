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
                "<br>Rating: " +
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
                "<br>Rating: " +
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
}
