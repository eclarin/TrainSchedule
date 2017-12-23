var trainData = new Firebase("https://eclarin-homework7-firebase.firebaseio.com/");

$('#submitButton').on('click', function(){

	var trainName = $('#trainNameInput').val().trim();
	var destination = $('#destinationInput').val().trim();
	var firstTime = moment($('#timeInput').val().trim(), "HH:mm").format("");
	var frequency = $('#frequencyInput').val().trim();

	var newTrains = {
		name: trainName,
		tdestination: destination,
		tFirst: firstTime,
		tfreq: frequency,
	}

	//uploads data to the database
	trainData.push(newTrains);

	//logs everything to the console
	// console.log(newTrains.name);
	// console.log(newTrains.tdestination);
	// console.log(newTrains.tFirst);
	// console.log(newTrains.tfreq);

	//alert
	// alert("Train successfully added!");

	// //clears all of the text boxes
	// $('#trainNameInput').val("");
	// $('#destinationInput').val("");
	// $('#timeInput').val("");
	// $('#frequencyInput').val("");

	// return false;
});


trainData.on("child_added", function(childSnapshot, prevChildKey){

	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().tdestination;
	var firstTime = childSnapshot.val().tFirst;
	var frequency = childSnapshot.val().tfreq;

	//train info
	// console.log(trainName);
	// console.log(destination);
	// console.log(firstTime);
	// console.log(frequency);

	var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

	var currentTime = moment();
	
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	
	var tRemainder = diffTime % frequency;
	
	var tMinutesTillTrain = frequency - tRemainder;
	
	
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	var nextTrainConverted = moment(nextTrain).format("hh:mm a");
	
	
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + "Every " + frequency + " minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});
