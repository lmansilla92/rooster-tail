const youtubeApiKey = "AIzaSyBxsSu73r-9dtqHr1bE6gcuq88r5C9ZTDI";
const cocktailApiKey = "0e2b4249bemshfa8c68bfa635a86p1f35e8jsn8175510a48cc";
let drinkName = "";

var userFormEl = document.querySelector('#drink-form');
var submitButton = document.querySelector('button');
var nameInputEl = document.querySelector('#drink-name');
var dataContainer = document.querySelector(".data-container");
// Get the modal

var modalBody = document.querySelector(".modal-body"); // <--- Gets the modal body from html, make it global.
var modalMessage; //<--- Made a global var for the modal message.

var ingredients;
var apiDrinkName;
var drinkInstructions;

var ingredientsArr = [];
var drinkListArr = []; // <--- Empty array to store the list of drink names user searches.
const maxDrinksInList = 5; //<--- Number of drinks we want to display 

let videoPlayer = document.querySelector("#player");
let videoId = "";

// First function after user submits. 
var formSubmitHandler = function(event) {
  event.preventDefault();

  drinkName = nameInputEl.value.trim();
  console.log(drinkName);
  if(drinkName) {
    getDrinkApi();
  }else{
    modalMessage = "<p>No Drink Name was Entered </p>";
    presentModal();
    }
};

// Put all of the modal stuff inside of a new function.
function presentModal() {
  modalBody.innerHTML=modalMessage; //<---This sets the modal message into the HTML 

      // MODAL
            // Get the modal
           var modal = document.getElementById("myModal");
            
            // Get the button that opens the modal
            var btn = document.getElementById("myBtn");
            
            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
            
            // When the user clicks the button, open the modal 
             modal.style.display = "block";
            
            
            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
              modal.style.display = "none";
            }
            
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
              if (event.target == modal) {
                modal.style.display = "none";
              }
            }
    // MODAL
      // alert('Please enter a drink name'); //<--- This needs to be changed can't user alerts.
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

        ingredientsArr = [];
        // If user types invalid input, the modal will appear with a new message. 
        if (data.length == 0) {
          modalMessage= "<p> We couldn't find your drink...</p>"
          presentModal(); 
        } else {
        for (let index = 0; index < data[0].ingredients.length; index++) {
          // console.log(data[0].ingredients.length);
          console.log(data[0].ingredients[index]);
          ingredientsArr.push(data[0].ingredients[index]);
        }

        apiDrinkName = data[0].name.toUpperCase();
        drinkInstructions = data[0].instructions;

        console.log(data[0].instructions);
        console.log(data[0].name.toUpperCase());
        displayDrinkData();
        getYoutubeApi();
        manageDrinkList();
        displayDrinkBtns();
      };
      });
};

function displayDrinkData () {
    dataContainer.innerHTML = '';


  drinkh2 = document.createElement('h2');
  drinkh2.textContent = apiDrinkName;
  dataContainer.appendChild(drinkh2);

  ingredList = document.createElement ('ul');

  for (let index = 0; index < ingredientsArr.length; index++) {
      ingredLi = document.createElement('li');
      ingredLi.textContent = ingredientsArr[index];
      dataContainer.appendChild(ingredLi);
  };

  var instructionsLi = document.createElement('p');
  instructionsLi.textContent = 'Instructions: '+ drinkInstructions;
  dataContainer.appendChild(instructionsLi);
  console.log(dataContainer.innerHTML);
};

function getYoutubeApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${apiDrinkName}%20recipe&topicId=%2Fm%2F02wbm&key=${youtubeApiKey}`;

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        videoId = data.items[0].id.videoId;
        videoPlayer.src = `http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com`;

      });
}

// youtube embedded player example src
// http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com

function manageDrinkList (){
  drinkListArr.unshift(drinkName); //<--- Adds the drink name to the array. Unshift puts it in the top and shifts the list down.

  // This for loop deletes duplicate drink names
  for (i=1; i< drinkListArr.length; i++) {
    if (drinkName === drinkListArr[i]) {
      drinkListArr.splice(i,1);
    }
  }

  // Keep the drinkListArr length at 5 (we can change if we want more/less drink names in the list)
  while(drinkListArr.length>maxDrinksInList) {
    drinkListArr.pop(); //<--- pop will remove 1 name from the bottom of array.
  };

  // Set the array into local storage in 'drinks'
  localStorage.setItem("drinks", JSON.stringify(drinkListArr));
};

function buildDrinkList() {
  // Get the Item out of local storage
  let localReturn = localStorage.getItem("drinks");
  if (localReturn){
    drinkListArr = JSON.parse(localReturn);
  };
};

// This is where I started to work on displaying the drink list as buttons. 
// *** Not finished ***
function displayDrinkBtns() {
  for (i=0; i<drinkListArr.length; i++) {
    var btn1 = document.createElement('button');
  }
}




userFormEl.addEventListener('submit', formSubmitHandler);