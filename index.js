//fetches random quote, finds the longest word

function trump(){
	$.get("https://api.whatdoestrumpthink.com/api/v1/quotes/random", function(data, status){
		var words= data.message.split(' ')
		var longest = words.reduce(function (a, b) { return a.length > b.length ? a : b; });
		let promise = giphy('trump ' + longest);
		promise.done(function(d) {
			let gif_url = checkPastGifs(d.data)
			$('.donnyQuotes').html(`<h4>${data.message}</h4>`);
			let html = `<iframe src="${gif_url}" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`
		 	$('.don-gif').html(html);
		});
	});
}

function ronSwanson () {
	$.get("https://ron-swanson-quotes.herokuapp.com/v2/quotes", function(data, status){
		console.log(data);
 		var words= data[0].split(' ')
		var longest = words.reduce(function (a, b) { return a.length > b.length ? a : b; });
		let promise = giphy('parks and rec swanson ' + longest);
		promise.done(function(d) {
			let gif_url = checkPastGifs(d.data)
			$('.ronQuotes').html(`<h4>${data}</h4>`);
			let html = `<iframe src="${gif_url}" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`
			$('.ron-gif').html(html)
		});
	});
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var filterWords = ["fuck", "shit", "fucking", "cock", "asshole"];
        // "i" is to ignore case and "g" for global
        var rgx = new RegExp(filterWords.join(""), "gi");

        function wordFilter(str) {
                return str.replace(rgx, "****");
        }

function chuckNorris () {
	$.get("https://api.chucknorris.io/jokes/random", function(data, status){
		var words= data.value.split(' ');
		var longest = words.reduce(function (a, b) { return a.length > b.length ? a : b; });
		let promise = giphy('chuck norris ' + longest);
		promise.done(function(d) {
			let gif_url = checkPastGifs(d.data)
			$('.chuckQuotes').html(`<h4>${data.value}</h4>`);
			let html = `<iframe src="${gif_url}" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`
			$('.chuck-gif').html(html)
		});
	});
}

function daddy () {
	$.ajax({
		url: 'https://icanhazdadjoke.com/',
  	headers: {
    	"Accept": "text/plain;",
    	"Content-Type": "text/plain;"
  	},
  success : function(data) {
		console.log(data);
 		var words= data.split(' ')
		var longest = words.reduce(function (a, b) { return a.length > b.length ? a : b; });
		let promise = giphy('dad jokes' + longest);
		promise.done(function(d) {
			let gif_url = checkPastGifs(d.data)
			$('.dadQuotes').html(`<h4>${data}</h4>`);
			let html = `<iframe src="${gif_url}" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`
				$('.dad-gif').html(html)
			});
  	}
	});
}

function checkPastGifs(data) {
	console.log(data);
	for (let i = 0; i < data.length; i++){
		let url = data[i].embed_url;
		console.log(url);
		if (pastGifs.indexOf(url) > -1 ) {
			console.log(`${url} repeat`)
		}
		else {
			pastGifs.push(url);
			return url;
		}
	}
	return data[0].embed_url;
}

let pastGifs =[]

function giphy (keyword) {
	return $.get(`https://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=tQkrEE0TCEi8bePhpBak8YCoML9C7XX7`, function(data, status){
	});
}

function getQuotes () {
	trump();
	ronSwanson();
	chuckNorris();
	daddy();
};

let trumpTally = 0;
let swansonTally = 0;
let chuckTally = 0;
let dadTally = 0;

$('#trumpCard').click(function (e) {
	trumpTally++;
	getQuotes();
	$('.trumpScore p').html(`${trumpTally}`);
	let trumpWinner = `<img src='https://media.tenor.com/images/8cbb4d991cf9f7505b4396cc9455e1a4/tenor.gif'/>`
	if (trumpTally == 5) {
		finalPage();
		$('.js-results').removeClass('hidden');
		$('.js-results-gif').html(trumpWinner);
		$('.js-results-text').html(`<h3>You are a winner. The best winner. And I know winners. </h3>`);

	};
});

$('#chuckCard').click(function (e) {
	chuckTally++;
	getQuotes();
	$('.chuckScore p').html(`${chuckTally}`);
	let chuckWinner = `<img src='https://i2.wp.com/gifrific.com/wp-content/uploads/2012/04/nobody-crosses-chucknorris.gif?ssl=1'/>`
	if (chuckTally == 5) {
		finalPage();
		$('.js-results').removeClass('hidden');
		$('.js-results-gif').html(chuckWinner);
		$('.js-results-text').html(`<h3> You did it. Consider yourself lucky. You get to live another day </h3>`);

	};
});

$('#dadCard').click(function (e) {
	dadTally++;
	getQuotes();
	$('.dadScore p').html(`${dadTally}`);
	let dadWinner = `<img src='http://www.usc.co.uk/images/social/jimsdad1.gif'/>`
	if (dadTally == 5) {
		finalPage();
		$('.js-results').removeClass('hidden');
		$('.js-results-gif').html(dadWinner);
		$('.js-results-text').html(`<h3>You did great kiddo. Your father would be proud if only he weren't so disappointed in you </h3>`);

	};
});

$('#swansonCard').click(function (e) {
	swansonTally++;
	getQuotes();
	$('.swansonScore p').html(`${swansonTally}`);
	let swansonWinner = `<img src='https://www.reactiongifs.com/wp-content/uploads/2013/07/ron-moved.gif'/>`
	if (swansonTally == 5) {
		finalPage();
		$('.js-results').removeClass('hidden');
		$('.js-results-gif').html(swansonWinner);
		$('.js-results-text').html(`<h3>You have selected a true American Hero. Your nation is proud of you. </h3>`);
	};
});

function resetTally () {
	trumpTally = 0;
	swansonTally = 0;
	dadScore = 0;
	chuckScore = 0;
	$('.trumpScore p, .swansonScore p, .dadScore p, .chuckScore p').html(0);
}

function finalPage() {
	$('#quotesAndGifs').addClass('hidden');
	$('.instructions').addClass('hidden');
}

$('.restart-btn').on('click touchstart',function(e) {
	resetTally();
	$('.js-results').addClass('hidden');
	$('.instructions').removeClass('hidden');
	$('#quotesAndGifs').removeClass('hidden');
	pastGifs = [];
});

getQuotes();
