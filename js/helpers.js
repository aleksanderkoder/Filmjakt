class Helpers {
  // Returns the url of compressed image for faster loading
  static GetCompressedMovieImageUrl(baseUrl, size) {
    let trimmed = baseUrl.replace("https://imdb-api.com/images/original", "");
    let url = "https://imdb-api.com/Images/" + size + trimmed;
    let res;
    fetch(url, { method: "GET" })
      .then((response) => response.blob())
      .then((blob) => {
        return URL.createObjectURL(blob);
      })
      .catch((error) => console.log("error", error));
    // return res;
  }
}

// console.log(
//   Helpers.GetCompressedMovieImageUrl(
//     "https://imdb-api.com/images/original/MV5BYzVjYThmNDAtOTE1NC00YjQ2LTk4NWYtNTc4Yzc4OTRhYjllXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_Ratio0.6716_AL_.jpg",
//     "384x528"
//   )
// );
