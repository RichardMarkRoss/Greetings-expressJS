module.exports = function (storedUsers){
  var namesStored = storedUsers||{};
  var GreeterCount = 0;
  var holdName = "";
  var greet = '';

  let holdBill = [];

  function GreetingTheLogic(name, langChosen){
    var newDates = Moment(new Date()).fromNow();
    let names = {
        'type': langChosen,
        'date': newDates
    };

        if(storedUsers){
          namesStored = storedUsers;
        }
        if (isNaN(name) && name != ""){
            
          holdName = name.toUpperCase();

        if (langChosen == 'english'){
          greet = 'HELLO '+ holdName;
          names.name = greet
          if (namesStored[holdName] === undefined){
            namesStored[holdName] = 0;
            }

        }else if(langChosen == 'afrikaans'){
          greet = 'GOEIE DAG ' + holdName;
          names.name = greet
          if (namesStored[holdName] === undefined){
            namesStored[holdName] = 0;
            }

        }else if (langChosen == 'isiXhosa'){
          greet = 'USUKU OLUMNWANDI ' + holdName;
          names.name = greet
          if (namesStored[holdName] === undefined){
            namesStored[holdName] = 0;
            }

        } else{
          alert('insert name and language');
        }
        holdBill.push(names)

    return greet;
  }else{
    alert('Please insert name and language');
  }
}
function returnName(){
  return holdName

}

  function TheGreetCounter(){
       GreeterCount = Object.keys(namesStored).length;
    return GreeterCount;
  }

  function ReturnMap(){
    return namesStored;
  }
  function Clear(){
    namesStored ={};
   localStorage.clear();
  }
  function returnValues () {
    return {
      namesStored,
      GreeterCount,
      holdName,
      greet
    };
}


  return{
    GreetingTheLogic,
    TheGreetCounter,
    ReturnMap,
    Clear,
    returnValues,
    returnName,
  };

}
