var textBoxValue = document.querySelector(".myText");

var greetAddBtn = document.querySelector(".btnDisplayValue");

var greetResetBtn = document.querySelector(".btnResetValue");

var displayNameValue = document.querySelector(".displayTheName");

var displayTheCount = document.querySelector(".displayTheCount");

var users = localStorage.getItem('users');
var storedUsers = users ? JSON.parse(localStorage.getItem('users')) : {};
var theGreetingsVar = GreetingsFactory(storedUsers);
displayTheCount.innerHTML = theGreetingsVar.TheGreetCounter();

function GreetingElement() {
  var checkedRadioBtn = document.querySelector("input[name='lang']:checked");
  if (checkedRadioBtn){
      var langChosen = checkedRadioBtn.value;
  }
  
    var name = textBoxValue.value;
  
   
  
    displayNameValue.innerHTML = theGreetingsVar.GreetingTheLogic(name, langChosen);
    localStorage.setItem('users', JSON.stringify(theGreetingsVar.ReturnMap()));
    displayTheCount.innerHTML = theGreetingsVar.TheGreetCounter();
    
}

greetAddBtn.addEventListener('click',function(){
   GreetingElement();
 });
 greetResetBtn.addEventListener('click', function(){
  
  theGreetingsVar.Clear();
  window.location.reload();
});
