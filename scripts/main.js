jQuery(document).ready(function() {

/*----------  Different functions  ----------*/
	var darkOp = 1;
	var darkInter = setInterval(function () {
		if(darkOp <= 0){
			clearInterval(darkInter);
			$("#dark").remove();
		}
		else{
			$("#dark").css('background-color', 'rgba(0,0,0,' + darkOp +')');
			darkOp -= 0.1;
		}
	}, 100);

/*----------  Main Setup  ----------*/

	var mainPers = $("#pers"),
		textBlock = $("#txt"),
		userName = "";

/*----------  Background Soundtrack  ----------*/
	var bg_audio = new Audio();
		bg_audio.autoplay = true;
		bg_audio.volume=0.1;
	var bgAudioFunc = function () {
		switch (Math.round(Math.random()*3)) {
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
		}
		setTimeout(function () {
			bgAudioFunc();
		}, 450000);
	};
	bgAudioFunc();

/*----------  Speacking function  ----------*/
	
	var Say = function (string, times, callback, mustAnswer) {
		setTimeout(function () {
			var stringPos = 0,
				stringPlace = $("#string");

			stringPlace.html("");
			string = string.replace("<pause>", "                                        ").split("");

			var inter = setInterval(function () {
				if(stringPos < string.length){
					stringPlace.html(stringPlace.html() + string[stringPos]);
					if(string[stringPos] !== string[stringPos+1] && 
					string[stringPos] == "." || 
					string[stringPos] == "!" || 
					string[stringPos] == "?"){
						stringPlace.html(stringPlace.html() + "<br>");
					}
					stringPos++;
				}
				else{
					clearInterval(inter);
				}
			}, 50);
			if (mustAnswer) dialogCount++;
			if(callback) callback();
		}, 5000 * times);
	}

/*----------  Moving function  ----------*/
	var spritePos = 0;
	setInterval(function () {
		if(spritePos == 2240){
			spritePos = 0;
		}
		else{
			spritePos += 70;
		}
		mainPers.css('background-position', '-' + spritePos + 'px 0');
	}, 100);

/*----------  Sound/Emotion function  ----------*/
	
	var emotion = function (emotion) {
		var emotionAudio = new Audio();
		switch (emotion) {
			case "Cute Laugh":
				emotionAudio.src = '../music/emotions/Girl Cute Laugh.mp3';
				break;
		}
		emotionAudio.autoplay = true;
	}

	var sound = function (sound) {
		var soundAudio = new Audio();
		switch (sound) {
			case "Cute Laugh":
				soundAudio.src = '../music/emotions/Girl Cute Laugh.mp3';
				break;
		}
		soundAudio.autoplay = true;
	}

/*----------  yesOrNo Answer function  ----------*/

	var yesOrNo = function (answer, ifYes, ifNo) {
		if (answer.indexOf("yes") !== -1 ||
			answer.indexOf("sure") !== -1 || 
			answer.indexOf("yea") !== -1) {
			ifYes();
		}
		else{
			ifNo();
		}
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
				$("#slider .bg_block:nth-child(2)").css('background-image', 'url(../img/backgrounds/ac9718dd35e683664f4ef0f6f6b8e36f.gif)');
				break;
			case "Airport":
				slider.append('<div class="bg_block"></div>');
				$("#slider .bg_block:nth-child(2)").css('background-image', 'url(../img/backgrounds/tumblr_nxd0b1kGgr1tah9pwo1_1280.gif)');
				break;
			case "Dark Street":
				slider.append('<div class="bg_block"></div>');
				$("#slider .bg_block:nth-child(2)").css('background-image', 'url(../img/backgrounds/a9201068266093ffc045d28e4ed89b67.gif)');
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
	
	Say("Hi!<pause> My name is Ino", 0);
	Say("I'm a cyborg...<pause> Was created in 2029 year", 1);
	Say("So...<pause>What's your name?", 2, function () {
		setTimeout(function () {
			textBlock.attr('placeholder', 'Enter your name...');
		}, 3000);
	}, true);
	
	var dialogCount = 0;
	textBlock.keypress(function(e) {
		if (e.keyCode == 13) {
			var answer = this.value.toLowerCase();
			textBlock.attr('placeholder', '');
			switch (dialogCount) {
				case 1:
					userName = this.value;

					Say("Oh...<pause>I like it!", 0, function () {
						emotion("Cute Laugh");
					});
					Say(userName + ", do you know where we are?", 1, function () {
						setTimeout(function () {
							textBlock.attr('placeholder', 'Enter your answer...');
						}, 2000);
					}, true);
					break;
				case 2:
					changeLocation("Night City");

					yesOrNo(answer, function () {
						Say("Oh...<pause>You have been here before?", 0);
						Say("Anyway...Everything has changed", 1);
					}, function () {
						Say("Okey...<pause>Look! We are in the Necropolis", 0);
						Say("That's my city", 1);
					});

					Say("I know, today is rainy...", 2);
					Say("But i like this weather", 3, function () {
						emotion("Cute Laugh");
					});
					Say("...", 4);
					Say("Do you want to know something about this city?", 5, function () {
						textBlock.attr('placeholder', 'Enter your answer...');
					}, true);
					break;
				case 3:
					yesOrNo(answer, function () {
						Say("Yey! Listen to me", 0);
						Say("Necropolis is one of the last survived city at war between United Community and Cult Of Cicada", 1);
						Say("This city live through Electrum, that we found in crater under city centre", 2);

					}, function () {
						Say("Sure? Okay... You know better", 0);
						Say("Maybe you know, that Necropolis is one of the last survived city at war between United Community and Cult Of Cicada", 1);
					});
					Say("Anyway... I want to know something about you! Where are you from?", 3, function () {
						textBlock.attr('placeholder', 'Enter your answer...');
					}, true);
					break;
				case 4:
					var func = function () {
						this.value = "";
						if(answer !== ""){
							if(answer.indexOf("necropolis") !== -1 ||
							answer.indexOf("this") !== -1||
							answer.indexOf("there") !== -1||
							answer.indexOf("here") !== -1||
							answer.indexOf("too") !== -1){
								Say("Don't lie to me", 0);
								Say("Before I met you, I checked your pass, and I'm sure that you are not from here", 1);
								Say("So?Where are you from?", 2);
								answer = "";
								setTimeout(func(), 13000);
							}
							else{
								Say("Cool!It's so far from here!");
							}
						}
					};
					func();
			}
			this.value = "";
		}
	});

});