

 // Initialize Firebase
 var config = {
   apiKey: "AIzaSyBbZIcp91U7UHvvwij48wnch7jEdpgu1m0",
   authDomain: "employee-tracer-c7cc7.firebaseapp.com",
   databaseURL: "https://employee-tracer-c7cc7.firebaseio.com",
   projectId: "employee-tracer-c7cc7",
   storageBucket: "employee-tracer-c7cc7.appspot.com",
   messagingSenderId: "21616866990"
 };
 firebase.initializeApp(config);


var database = firebase.database()
$(document).ready(function(){
$("#submit").on("click",function(event){
    event.preventDefault();
    console.log("Hola")
    var employee = {
        name: $("#name").val().trim() ,
        role: $("#role").val().trim(),
        start: $("#start").val().trim(),
        monthly: $("#monthly").val().trim()
    };
    console.log(employee);
    database.ref().push(employee);
});

database.ref().on("child_added",function(snapshot){
    var sv = snapshot.val();
    convertedDate = moment.unix(sv.start).format("MM/DD/YYYY");
    var monthsWorked = moment().diff(moment(convertedDate, "X"), "months");
    var totalBilled = (monthsWorked*sv.monthly);
    var newRow = "<tr><td>"+sv.name+"</td><td>"+sv.role+"</td><td>"+sv.start+"</td><td>"+monthsWorked+"</td><td>"+sv.monthly+"</td><td>"+totalBilled+"</td></tr>"
    $("#myTable").append(newRow);
});

});