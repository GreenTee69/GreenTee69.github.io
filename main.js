var a;
audiojs.events.ready(function() {
	var player = audiojs.create( document.getElementById("player"), {
    play: function() {
		// do something
    },
	pause: function() {
		// do something else
	},
	myPlayPause: function() {
		// http://kolber.github.io/audiojs/docs/
		this.playPause.apply(this);
	}
});
	
var ele = document.getElementById("volume");
ele.value = "100";
var vol = ele.value;
player.setVolume(vol/100);
	
a = player;
});

function myPlayPause() {
	a.playPause.apply(a);
}
	
function myVolume() {
	var ele = document.getElementById("volume");
	var vol = ele.value;
	a.setVolume(vol/100);
}
function refreshSite() {
	location.reload();
}

$(function() {

function r() {
	var r1 = document.getElementById("radio1").checked;
	if (r1==true) {
		return "data-src-hi"
	} else {
		return "data-src-lo"
	}
}

// Load in the first track //view-source:http://kolber.github.io/audiojs/demos/test6.html
first = $('ol a').attr(r());
$('ol li').first().addClass('playing');
a.load(first);
a.play();

$('ol li').click(function(e) {
	e.preventDefault();
	$(this).addClass('playing').siblings().removeClass('playing');
	a.load($('a', this).attr(r()));
	var img = $('a', this).attr('img-src');
	document.getElementById('logo').setAttribute('src',img);
	a.play();
});

$('.radio').click(function(e) {
	a.load($('a','.playing').attr(r()));
	a.play();
}
);

});
