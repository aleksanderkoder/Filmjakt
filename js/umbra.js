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
          data.items.forEach( item => {
            console.log(item.id)
            let element = document.createElement("img")
            element.src = item.image; 
            element.className = "movie-image"; 
            document.getElementById("in-theaters").appendChild(element);
          }); 
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static GetMostPopularMovies() {
    fetch(this.imdbApiUrl + "InTheaters/" + this.apiKey, {
      method: "get",
    })
      .then((response) => {
        return response.text().then(function (text) {
          let data = JSON.parse(text);
          data.items.forEach( item => {
            console.log(item.id)
            let element = document.createElement("img")
            element.src = item.image; 
            element.className = "movie-image"; 
            document.getElementById("in-theaters").appendChild(element);
          }); 
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
