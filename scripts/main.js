jQuery(document).ready(function() {

/*----------  Main Setup  ----------*/

	var mainPers = $("#pers"),
		userName = "",
		text = $("#txt"),
		spritePos = 0,
		dialogCount = 0;

/*----------  Background Soundtrack  ----------*/
	var bg_audio = new Audio();
		bg_audio.autoplay = true;
		bg_audio.volume=0.2;
	var bgAudioFunc = function () {
		switch (Math.round(Math.random()*4)) {
			case 0:
				bg_audio.src = "../music/1.mp3";
				break;
			case 1:
				bg_audio.src = "../music/2.mp3";
				break;
			case 2:
				bg_audio.src = "../music/3.mp3";
				break;
			case 3:
				bg_audio.src = "../music/4.mp3";
				break;
			case 4:
				bg_audio.src = "../music/5.mp3";
				break;
		}
		setTimeout(function () {
			bgAudioFunc();
		}, 420000);
	}();

/*----------  Speacking function  ----------*/

	var Say = function (string, times) {
		setTimeout(function () {
			var stringPos = 0,
				stringPlace = $("#string");

			stringPlace.html("");
			string = string.replace("<pause>", "                                        ").split("");

			var inter = setInterval(function () {
				if(stringPos < string.length){
					stringPlace.html(stringPlace.html() + string[stringPos]);
					if(string[stringPos] !== string[stringPos+1] && string[stringPos] == "." || string[stringPos] == "!" || string[stringPos] == "?"){
						stringPlace.html(stringPlace.html() + "<br>");
					}
					stringPos++;
				}
				else{
					clearInterval(inter);
				}
			}, 50);
			dialogCount++;
		}, 5000 * times);
	}

/*----------  Moving function  ----------*/

	setInterval(function () {
		if(spritePos == 2240){
			spritePos = 0;
		}
		else{
			spritePos += 70;
		}
		mainPers.css('background-position', '-' + spritePos + 'px 0');
	}, 100);

/*----------  Sound function  ----------*/
	
	var sound = function (sound) {
		var audio = new Audio();
		switch (sound) {
			case "Cute Laugh":
				audio.src = '../music/Girl Cute Laugh.mp3';
				break;
		}
		audio.autoplay = true;
	}

/*----------  Slider  ----------*/

	var changeLocation = function (place) { changeLocation
		var slider = $("#slider"),
			w = window.innerWidth,
			block = $("#slider .bg_block:nth-child(1)");
			block.css('z-index', '-1');
		
		switch (place) {
			case "Night City":
				slider.append('<div class="bg_block"></div>');
				$("#slider .bg_block:nth-child(2)").css('background-image', 'url(../img/ac9718dd35e683664f4ef0f6f6b8e36f.gif)');
				break;
		}

		var slide = setInterval(function () {
			var mt = block.css('margin-top').replace("px", "");;
			block.css('margin-top', mt - 3 + 'px');
			if(mt == -w){
				clearInterval(slide);
				block.remove();
			}
		}, 1);
	}

/*----------  Story  ----------*/
	
	Say("Hi!<pause> My name is Ino.", 0);
	Say("I'm a cyborg...<pause> Was created in 2029 year.", 1);
	Say("So...<pause>What's your name?", 2);
	setTimeout(function () {
		text.attr('placeholder', 'Enter your name...');
	}, 13500);
	
	text.keypress(function(e) {
		if (e.keyCode == 13) {
			text.attr('placeholder', '');
			switch (dialogCount) {
				case 3:
					userName = this.value;
					this.value = "";

					sound("Cute Laugh");
					Say("Oh...<pause>I like it!", 0);
					Say(userName + ", do you know where we are?", 1);
					setTimeout(function () {
						text.attr('placeholder', 'Enter your answer...');
					}, 7000);
					break;
				case 5:
					var answer = this.value.toLowerCase();
					this.value = "";
					changeLocation("Night City");
					if (answer.indexOf("yes") !== -1 || answer.indexOf("sure") !== -1 || answer.indexOf("yeah") !== -1) {
						Say("Oh...<pause>You have been here before?", 0);
					}
					else{
						Say("Okey...<pause>Look! We are in the Necropolis", 0);
						Say("That's my city.", 1);
					}

					Say("I know, today is rainy...", 2);
					Say("But i like this weather", 3);
					setTimeout(function () {
						sound("Cute Laugh");
					}, 15000);
			}
		}
	});

/*----------  Other functions  ----------*/

});