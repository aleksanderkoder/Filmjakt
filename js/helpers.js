// Contains all "helper" methods
// Helpers are small utility methods made for practical use in other classes
class Helpers {
  // Checks if there has been given an error message from the API response
  static CheckForError(response) {
    if (response.errorMessage != "" && response.errorMessage != null) {
      // Response has given an error
      alert("Error: " + response.errorMessage);
      return false;
    }
      // There is no error
      return true;
  }
}
