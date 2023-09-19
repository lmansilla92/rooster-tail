const youtubeApiKey = "AIzaSyBxsSu73r-9dtqHr1bE6gcuq88r5C9ZTDI";
const cocktailApiKey = "0e2b4249bemshfa8c68bfa635a86p1f35e8jsn8175510a48cc";
let drinkName = "";

var userInputEl = document.querySelector('input');
var submitButton = document.querySelector('button');

var ingredients;
var apiDrinkName;

ingredientsArr = [];

var formSubmitHandler = function(event) {
  event.preventDefault();

  drinkName = userInputEl.value.trim();
  console.log(drinkName);
  if(drinkName) {
    getDrinkApi();
  }else{
      alert('Please enter a drink name'); //<--- This needs to be changed can't user alerts.
    }
};

function getDrinkApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = `https://cocktail-by-api-ninjas.p.rapidapi.com/v1/cocktail?name=${drinkName}&rapidapi-key=${cocktailApiKey}`;
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        // drinkName = userInputEl.value;
        // console.log(drinkName);

        // ingredients = data[0].ingredients[0];
        
        // ingredientsArr.push(data[0].)

        // console.log(ingredients);
        for (let index = 0; index < data[0].ingredients.length; index++) {
          // console.log(data[0].ingredients.length);
          console.log(data[0].ingredients[index]);
          ingredientsArr.push(data[0].ingredients[index]);
        }

        apiDrinkName = data[0].name.toUpperCase();

        console.log(data[0].instructions);
        console.log(data[0].name.toUpperCase());
        displayDrinkData();
      });
};

function displayDrinkData () {
  var drinkDataContainer = document.querySelector('.container');

  drinkh2 = document.createElement('h2');
  drinkh2.textContent = apiDrinkName;
  drinkDataContainer.appendChild(drinkh2);

  ingredList = document.createElement ('ul');

  for (let index = 0; index < ingredientsArr.length; index++) {
      ingredLi = document.createElement('li');
      ingredLi.textContent = ingredientsArr[index];
      drinkDataContainer.appendChild(ingredLi);
  }
}

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

submitButton.addEventListener('click', formSubmitHandler);