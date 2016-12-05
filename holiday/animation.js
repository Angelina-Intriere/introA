window.onload = function(){
	//canvas init
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	//canvas dimensions
	var W = window.innerWidth;
	var H = window.innerHeight;
	
	//snowflake particles
	var mp = 800; //max particles
	var particles = [];
	for(var i = 0; i < mp; i++)
	{
		particles.push({
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: Math.random()*1+0.2, //radius
			d: Math.random()*mp //density
		})
	}
	
	//Lets draw the flakes
	function draw()
	{
		ctx.clearRect(0, 0, W, H);
		
		ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
		ctx.beginPath();
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		ctx.fill();
		update();
	}
	
	//Function to move the snowflakes
	//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
	var angle = 0;
	function update()
	{
		angle += 0.01;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += Math.cos(angle+p.d) + 1 + p.r/2;
			p.x += Math.sin(angle) * 2;
			
			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if(p.x > W+5 || p.x < -5 || p.y > H)
			{
				if(i%3 > 0) //66.67% of the flakes
				{
					particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
				}
				else
				{
					//If the flake is exitting from the right
					if(Math.sin(angle) > 0)
					{
						//Enter from the left
						particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
					}
					else
					{
						//Enter from the right
						particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
					}
				}
			}
		}
	}
	setInterval(draw,33);
  	CreateTimer("timer");

}

/* Timer Variables */
var Timer;

var dString = "December, 25, 2013";
var targetDate = new Date(dString);


function CreateTimer(TimerID) {
    Timer = document.getElementById(TimerID);

    UpdateTimer();
    window.setTimeout("Tick()", 1000);
}

function Tick() {
    UpdateTimer();
    window.setTimeout("Tick()", 1000);
}

function UpdateTimer() {
    var date = new Date();
    
    var Months = getMonthsLeft(date);
    var Days = getDaysLeft(date);
    var Hours = getHoursLeft(date);
    var Minutes = getMinutesLeft(date);
    var Seconds = getSecondsLeft(date);
  
  // Returns one of two expressions depending on a condition
  // test ? expression1 : expression2 
    var TimeStr = Months + Days + LeadingZero(Hours) + ":" + LeadingZero(Minutes) + ":" + LeadingZero(Seconds);

    Timer.innerHTML = TimeStr + " until Christmas!";
}

function LeadingZero(Time) {
    return (Time < 10) ? "0" + Time : +Time;
}

function getMonthsLeft(date) {
  // Get the current month from 0 to 11
  // ex. November is 10 (not 11)
  // Add 1 to make the month # correct
  // ex. November will actually be 11 now
    var currentMonth = date.getMonth() + 1;
    var monthsLeft = 12 - currentMonth;
    return ((monthsLeft > 0) ? monthsLeft + " month" : "");
}
function getDaysLeft(date) {
  var daysLeft = " ";
  var Month = date.getMonth();
  
  // If we just want the days left in the current month ((Month!=12) or (Month=12 && getDate() > 25))
  if ((Month!=12) || (Month==12 && getDate() > 25)) {
    // http://stackoverflow.com/a/1184359/2895248
    var daysinMonth = new Date(date.getYear(), date.getMonth(), 0).getDate();
    daysLeft += daysinMonth - date.getDate();
    return daysLeft + " days, ";
  }
  
  // If it's December and not yet Christmas
  // subtract the current day from 25
  return daysLeft += date.getDate() - 25 + " days, ";
}
function getHoursLeft(date) {
    var currentHour = date.getHours();
    return 24 - currentHour;
}
function getMinutesLeft(date) {
    var currentMinutes = date.getMinutes();
    return 60 - currentMinutes;
}
function getSecondsLeft(date) {
    var currentSeconds = date.getSeconds();
    return 60 - currentSeconds;
}
