

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyAdArk7M_CrPtDXSseLcX_eXoHJc3pU2Qw",
    authDomain: "train-schedule-8b726.firebaseapp.com",
    databaseURL: "https://train-schedule-8b726.firebaseio.com",
    projectId: "train-schedule-8b726",
    storageBucket: "train-schedule-8b726.appspot.com",
    messagingSenderId: "936787559580"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs train input
  var trainName = $("#train-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var time = moment($("#time-input").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequency-input").val().trim() ;

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    time: time,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);


  // Clears all of the text-boxes
  $("#train-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var time = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;


  console.log(trainName);
  console.log(destination);
  console.log(time);
  console.log(frequency);

  
  var trainStartConverted = moment(trainStart, "HH:mm");

  console.log("Train Start:" + trainStartConverted);

   // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"))
    console.log("CURRENT TIME IN CODE: "+ currentTime.format("X"));

    //difference b/w time
    var diffTime = moment().diff(moment(trainStartConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    //remainder
    var timeRemainder = diffTime % frequency;
    console.log("REMAINDER: "+time);

    //frequency minus remainder to give minutes till next train
    var minutesAway = frequency - time;
    console.log("MINUTES AWAY: " + minutesAway);


    if(time<0){
      var nextTrainMinutes = moment(trainStartConverted).diff(moment(), "minutes");
      var nextTrainArrival = trainStart;
    }else{

    //Next train arrival time
      var nextTrainMinutes = moment().add(minutesAway, "minutes");
      var nextTrainArrival = moment(nextTrainMinutes).format("HH:mm");
      console.log("NEXT TRAIN ARRIVAL TIME" + nextTrainArrival);
    }

    // Add each train's data into the table
    $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    trainFrequency + "</td><td>" + nextTrainArrival + "</td><td>" + minutesAway + "</td></tr>");
  });



