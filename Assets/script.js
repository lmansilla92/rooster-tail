const youtubeApiKey = "AIzaSyBxsSu73r-9dtqHr1bE6gcuq88r5C9ZTDI";
const cocktailApiKey = "0e2b4249bemshfa8c68bfa635a86p1f35e8jsn8175510a48cc";
let drinkName = "Margarita";

function getDrinkApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = `https://cocktail-by-api-ninjas.p.rapidapi.com/v1/cocktail?name=${drinkName}&rapidapi-key=${cocktailApiKey}`;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)

      });
};

function getYoutubeApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${drinkName}%20recipe&topicId=%2Fm%2F02wbm&key=${youtubeApiKey}`;

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)

      });
}