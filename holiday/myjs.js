var imageArray = [
	"https://s-media-cache-ak0.pinimg.com/736x/1d/1b/a7/1d1ba7719a1fda331738b07ba273ed6f.jpg",
	"https://uoblogfest.files.wordpress.com/2013/12/nutcracker.jpg",
	"https://cdn.history.com/sites/2/2015/03/hungry-history-the-medieval-history-of-the-christmas-cookie_iStock_000017719452Large-1-E.jpeg",
	"https://static.kidspot.com.au/cm_assets/156591/christmas-homemade-gingerbread-couple-cookies-20161007124118.jpg~q75,dx330y198u1r1gg,c--.jpg",
	"https://static.kidspot.com.au/cm_assets/523/christmas-homemade-main-image_690-20150329235940.jpg~q75,dx720y432u1r1gg,c--.jpg",
	"https://www.planwallpaper.com/static/images/2.jpg",
	"https://0.fotos.web.sapo.io/i/of814bad2/17829747_PD3Wk.jpeg",
	"https://www.colonialconnections.com/file/christmas-traditions-adult-tour-thumb.jpg",
	"https://www.planwallpaper.com/static/images/maxresdefault_oSvEu4o.jpg",

];
var currentIndex = 0;


function renderImage(){
	if (currentIndex < 0){
		currentIndex =imageArray.length - 1;
	} else if (currentIndex >= imageArray.length){
		currentIndex = 0;
	}

	$('#thePhoto').attr('src', imageArray[currentIndex]);

}
renderImage();

function forwardImage(){
	currentIndex++;
	renderImage();
}
function backImage(){
	currentIndex--;
	renderImage();
}
$('#forwardButton').on('click', forwardImage);
$('#backButton').on('click', backImage);

var name = prompt("What's your name?")
var outputString = "Happy Holidays," + " " + name + "!";
$('h1').html(outputString);
google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Christmas Favorites', 'Heartability'],
          ['Making Christmas Cookies',     5],
          ['Decorating the Christmas Tree',      7],
          ['Filling Stockings',  5],
          ['Giving Presents',    10],
          ['Listening to Christmas Music', 15]
        ]);

        var options = {
          title: 'Favorite Christmas Activities Ranked',
          colors: ['#CC231E','#F5624D','#B6CDDB', '#0D3638', '#235E6F']

}
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }
