
//on click:
document.querySelector('#submit').addEventListener('click', promptMe);

function promptMe(){
   
var venue = prompt("What's the venue name and address?");
var time = prompt("What time is the event? Ongoing? and how's the line?");
var draw = prompt("Free drinks? Free Food? Free Swag?");
var band = prompt("What Band?");
var theReview = prompt("Quick Review:");

var byline = prompt("put your name/link in here!")

var image1 = prompt("Would you like to include a photo url?");
document.getElementById("venue").innerHTML = venue;
document.getElementById("time").innerHTML = time;
document.getElementById("draw").innerHTML = draw;
document.getElementById("band").innerHTML = band;
document.getElementById("theReview").innerHTML = theReview;

document.getElementById("recImg1").src = image1;

}

document.getElementById("venue").innerHTML = venue;
document.getElementById("time").innerHTML = time;
document.getElementById("draw").innerHTML = draw;
document.getElementById("band").innerHTML = band;
document.getElementById("theReview").innerHTML = theReview;

document.getElementById("recImg1").src = image1;





