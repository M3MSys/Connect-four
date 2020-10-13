function checkCellBottom(cellNumber, colorSet){
  var i = 5;
  while (i >= 0){
    if (
      $('table tr').eq(i).find('td').eq(cellNumber).find('button').css('background-color') === 'rgb(255, 0, 0)' ||
      $('table tr').eq(i).find('td').eq(cellNumber).find('button').css('background-color') === 'rgb(0, 0, 255)'
    ){
      console.log("Cell allready filled");
    }
    else if ($('table tr').eq(i).find('td').eq(cellNumber).find('button').css('background-color') === 'rgb(128, 128, 128)'){
      console.log("Cell can be filled");

      $('table tr').eq(i).find('td').eq(cellNumber).find('button').css('background-color', colorSet);
      break;
    }
    --i;
  }
}

function checkWinner(cellNumber, rowNumber, color){
  //check Horizontal
  var colorToCheck = color;
  var noSameChipsH = 0;
  var noSameChipsV = 0;
  var sameColor = true;
  var winner = 0;
  console.log("I will check for color "+color+" colorToCheck "+colorToCheck);
  //check Horizontal
  for (var i = 0; i <= 5; i++){
    for (var j = 0; j <= 6; j++){
      if ($('table tr').eq(i).find('td').eq(j).find('button').css('background-color') === colorToCheck){
        noSameChipsH++;
        console.log("Horizontal check - no of chips color "+colorToCheck+" is "+noSameChipsH);
        if (noSameChipsH === 4) {
          return "YES";
          break;
        }
      }
    }
    if (noSameChipsH === 4) {
      return "YES";
      break;
    }
  }

  //check vertical
  if (noSameChipsH < 4) {
    //go trhough all columns starting with first
    for (var i = 0; i <= 6; i++){
      //go trough all cells from a column, j - rows, i - columns
      for (var j = 0; j <= 5; j++){
        if ($('table tr').eq(j).find('td').eq(i).find('button').css('background-color') === colorToCheck){
          noSameChipsV++;
          console.log("Vertical check - no of chips color "+colorToCheck+" is "+noSameChipsV);
          if (noSameChipsV === 4) {
            return "YES";
            break;
          }
        }
      }
      if (noSameChipsV === 4) {
        return "YES";
        break;
      }
    }
  }
  return "NO";
}

window.onload = function(){
  var playerOneName  = prompt("Player one will be red. Please enter your name...");
  var playerTwoName = prompt("Player one will be red. Please enter your name...");
  document.getElementById('users').innerHTML =  playerOneName+" it is your turn";
  // Track onclicks on all td elements
  var table = document.getElementsByTagName("table")[0];

  var currentRow = 0;
  var currentCell = 0;
  var currentUser = playerOneName;
  var nextUser = playerTwoName;
  var currentColor = "red";
  var winner = "";

  document.getElementById('users').innerHTML = playerOneName+" it is your turn";

  $(document).ready(function(){
    console.log("Red player is "+playerOneName);
    console.log("Blue player is "+playerTwoName);

    $("button").click(function () {
      console.log("^^^^^My cell color is "+$(this).css('background-color'));

      if ($(this).css('background-color') !== 'rgb(128, 128, 128)'){
        alert("Sorry "+currentUser+" but this cell is allready choosen!");
      }
      else{
        console.log("Current user is "+currentUser+" and will paint with "+currentColor);

        currentCell = $(this).closest("td").index();
        //call the function to fill with color
        checkCellBottom(currentCell, currentColor);

        //check for a winner
        if (currentColor === "red"){
            winner = checkWinner(currentCell, $(this).closest("tr").index(), "rgb(255, 0, 0)");
        }
        else if (currentColor === "blue") {
            winner = checkWinner(currentCell, $(this).closest("tr").index(), "rgb(0, 0, 255)");
        }


        if (winner === "YES"){
          alert("Game is over. We have a winner - "+currentUser);
          return;
        }

        console.log("Now the color is "+ $(this).css('background-color'));
        console.log("Painted "+currentColor);

        // switch players and colors
        if(currentUser === playerOneName){
          currentUser = playerTwoName;
          currentColor = "blue";
          console.log("Now current user is "+currentUser+ " and current color is "+currentColor);
        }
        else {
          currentUser = playerOneName;
          currentColor = "red";
          console.log("Now current user is "+currentUser+ " and current color is "+currentColor);
        }

        document.getElementById('users').innerHTML = currentUser+" it is your turn";
      }
    }) //end click button
  }) //end ready
};
