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
}

let trumpTally = 0;
let swansonTally = 0;

//on start debate button, hide opening page and reveal the
$('#start-debate').on('click touchstart', function(e) {
	alert('blah');
	$('#quotesAndGifs').removeClass('hidden');
	$(this).addClass('hidden');
	$('.start-gifs').addClass('hidden');
	getQuotes();
});

//$('.card').on('click touchstart',function(e) {
//	getQuotes();
//});

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


//$('a').on('click', 'a', false);

$('iframe').click(function(e){
     e.preventDefault();
     e.stopPropogation();
     return false;
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
	$('.trumpScore p, .swansonScore p').html(0);
}

function finalPage() {
	$('#quotesAndGifs').addClass('hidden');
	$('.start').addClass('hidden');
}

$('.restart-btn').on('click touchstart',function(e) {
	resetTally();
	$('#quotesAndGifs').removeClass('hidden');
	$('.js-results').addClass('hidden');
	$('.start').removeClass('hidden');
	pastGifs = [];
	console.log(pastGifs);
});
