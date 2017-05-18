$(document).ready(function() {
	
/*----------  Main Setup  ----------*/

	var mainPers = $("#pers"),
		textBlock = $("#txt"),
		userName = "";

/*----------  Different functions  ----------*/

	/*----------  darkToLight/lightToDark functions  ----------*/

		var darkToLight = function () {
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
		};
		darkToLight();

		var lightToDark = function () {
			var darkOp = 0;
			var darkInter = setInterval(function () {
				if(darkOp >= 1){
					clearInterval(darkInter);
				}
				else{
					$("#dark").css('background-color', 'rgba(0,0,0,' + darkOp +')');
					darkOp += 0.1;
				}
			}, 50);	
		};

	/*----------  changeTime function  ----------*/
	
		var changeTime = function (time) {

			$("body").prepend('<div id="dark"></div>');
			$("#dark").css('background-color', 'rgba(0,0,0,0)');
			lightToDark();
			$("#string").css("display","none");
			var timer = time.split(":");
			var preTime = time.split(":");

			if(preTime[1] < 10 && preTime[1] !== "00"){
				preTime[1] -= 1;
				preTime[1] = "0" + preTime[1];
			}
			else if(preTime[1] == "00"){
				preTime[1] = 59;
				if(preTime[0] < 10 && preTime[0] !== "00"){
					preTime[0] -= 1;
					preTime[0] = "0" + preTime[0];
				}
				else if(preTime[0] == "00"){
					preTime[0] = 23;
				}
				else{
					preTime[0] -= 1;
				}
			}
			else{
				preTime[1] -= 1;
			}

			$("#dark").html("<span id='change_time'>" + preTime[0] + " <span id='points'>:</span> " + preTime[1] + "</span>");
			$("#dark #change_time").css('opacity', '1');
			var timeOp = false;

			var pointsInter = setInterval(function () {
				if(timeOp === true){
					$("#dark #points").css('opacity', '0');
					timeOp = false;
				}
				else{
					$("#dark #points").css('opacity', '1');
					timeOp = true;
				}
			}, 500);

			setTimeout(function () {
				$("#dark").html("<span id='change_time'>" + timer[0] + " <span id='points'>:</span> " + timer[1] + "</span>");
				$("#dark #change_time").css('opacity', '1');
				clearInterval(pointsInter);
				setTimeout(function () {
					$("#dark #change_time").remove();
					darkToLight();
				}, 3000);
			}, 5000);
		};

	/*----------  Fullscreen  ----------*/
		$("html").keypress(function(e) {
			if(e.keyCode == 61){
				var elem = document.getElementById("html");
				if (elem.requestFullscreen) {
				  elem.requestFullscreen();
				} else if (elem.mozRequestFullScreen) {
				  elem.mozRequestFullScreen();
				} else if (elem.webkitRequestFullscreen) {
				  elem.webkitRequestFullscreen();
				}
			}
		});

	/*----------  Quest block function  ----------*/

		var newQuest = function (questText) {
			if($("#questTextBox" && $("#quest_att"))){
				$("#questTextBox").remove();
				$("#quest_att").remove();
			}
			sound("New Quest");
			$("body").append('<div id="quest_att">!</div>');
			$("body").append('<div id="questTextBox"><i class="fa fa-times" aria-hidden="true"></i>' + questText + '</div>');
			var questAtt = $("#quest_att"),
				curVis = true,
				questTextBoxVis = false;

			var questAttInter = setInterval(function () {
				if (curVis == true) {
					questAtt.css('background-color', 'rgba(249,56,56,0.6)');
					curVis = false;
				}
				else{
					questAtt.css('background-color', 'rgba(249,56,56,1)');
					curVis = true;
				}			
			}, 300);
			questAtt.click(function(e) {
				clearInterval(questAttInter);
				questAtt.css('background-color', 'rgba(249,56,56,0.5)');
				questAtt.hover(function() {
					questAtt.css('background-color', 'rgba(249,56,56,1)');
				}, function() {
					questAtt.css('background-color', 'rgba(249,56,56,0.5)');
				});
				$("#questTextBox i").click(function(e) {
					questTextBoxVis = false;
					$("#questTextBox").css('background-color', 'rgba(33,39,51,0)').css('top', '0').css('color', 'rgba(255,255,255,0)');
				});
				if(questTextBoxVis == false){
					questTextBoxVis = true;
					$("#questTextBox").css('background-color', 'rgba(33,39,51,1)').css('top', '50px').css('color', 'rgba(255,255,255,1)');
				}
				else{
					questTextBoxVis = false;
					$("#questTextBox").css('background-color', 'rgba(33,39,51,0)').css('top', '0').css('color', 'rgba(255,255,255,0)');
				}
			});
		}	

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
		
		var dialogCountC = 0,
			dialogCount = 0;
		var Say = function (string, times, callback, mustAnswer) {
			setTimeout(function () {
				var stringPos = 0,
					stringPlace = $("#string");

				stringPlace.html("");
				string = string.replace(/<pause>/gi, "                                        ").split("");

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
				if (mustAnswer){
					dialogCountC++;
					dialogCount = dialogCountC;
				}
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
				case "Mobile ringing":
					soundAudio.src = '../music/effects/Cell phone ringing0.mp3';
					break;
				case "New Quest":
					soundAudio.src = '../music/effects/new quest.wav';
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

	/*----------  Items functions  ----------*/
		
		var Item = {
			constructor: function (name, img, description) {
				this.name = name;
				this.img = img;
				this.description = description;
				return this;
			},
			items: [],
			create: function (name, img, description) {
				var obj = Object.create(Item).constructor(name, img, description);
				Item.items[name] = obj;
				$("#sidebar").append('<div class="item" id="' + name + '"></div>');
				$("#sidebar #" + name).css('background-image', 'url("../img/textures/' + img + '")');

				$("body").append('<div id="item_added"><h3>'+ name.charAt(0).toUpperCase() + name.substr(1).toLowerCase() +'</h3><div id="img" style="background-image: url(\'../img/textures/'+ img +'\')"></div><span>'+ description +'</span><div class="clean"></div><div id="butt">OK</div></div>');
				$("#item_added #butt").click(function(e) {
					$("#item_added").css('opacity', '0');
					setTimeout(function () {
						$("#item_added").remove();
					}, 1000);
				});

				$("#sidebar #" + name).click(function(e) {
					Item.showInfo(name);
				});
			},
			delete: function (name) {
				$("#sidebar #" + name).remove();
				delete Item.items[name];
			},
			showInfo: function(name) {
				$("#item_info").remove();
				var curItem = Item.items[name];
				$("body").append('<div id="item_info">'+ curItem.description +'</div>');
				$("#item_info").css('top', '0');
				setTimeout(function () {
					$("#item_info").css('background-color', 'rgba(33,39,51,0)');
					$("#item_info").css('color', 'rgba(255,255,255,0)');
				}, 3000);
			},
			check: function(userAnswer, trueAnswer, ifFalseArr, ifElseArr, ifTrueFunc) {
				if(userAnswer[0] == "[" && userAnswer[userAnswer.length-1] == "]"){
					if(userAnswer == trueAnswer){
						if(!!Item.items[userAnswer.substr(1, userAnswer.length - 2).split(" ")[1]]){
							ifTrueFunc();
						}
						else{
							var noThingAnswerArr = ["Ам...<pause>Но у тебя же этого нету", 
													"Как я вижу ты ещё не заполучил то что мне нужно",
													"Боюсь без той вещи мы не сможем продолжить"];

							Say(noThingAnswerArr[Math.round(Math.random() * (noThingAnswerArr.length-1))], 0);
						}
					}
					else{
						Say(ifFalseArr[Math.round(Math.random() * (ifFalseArr.length-1))], 0);
					}
				}
				else{
					Say(ifElseArr[Math.round(Math.random() * (ifElseArr.length-1))], 0);
				}
			}
		};
		// Item.create("джойстик", "joystick.png", "Это просто джойстик");
		
		// Item.check("[дать ключ]",
		// 			"[дать ключ]",
		// 			["И что мне с этим делать?", "Нет-нет, это мне не нужно"],
		// 			["Я не болтать сюда пришла...", "Поторопись, у меня мало времени"],
		// 			function() {
		// 				Say("Да! Это то что мне нужно!", 0);
		// 			});

	/*----------  Locations  ----------*/

		var changeLocation = function (place) { changeLocation
			var slider = $("#slider"),
				w = window.innerWidth,
				block = $("#slider .bg_block:nth-child(1)");
				block.css('z-index', '-1');
			
			switch (place) {
				case "Cafe":
					slider.append('<div class="bg_block"></div>');
					$("#slider .bg_block:nth-child(2)").css('background-image', 'url(../img/backgrounds/coffee_in_rain_by_kirokaze-d98qb8z.gif)');
					break;
				case "Night City":
					slider.append('<div class="bg_block"></div>');
					$("#slider .bg_block:nth-child(2)").css('background-image', 'url(../img/backgrounds/ac9718dd35e683664f4ef0f6f6b8e36f.gif)');
					break;
				case "Airport":
					slider.append('<div class="bg_block"></div>');
					$("#slider .bg_block:nth-child(2)").css('background-image', 'url(../img/backgrounds/tumblr_nxd0b1kGgr1tah9pwo1_1280.gif)');
					break;
				case "Dark Roof":
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
	
	/*Say("Hi!<pause> My name is Ino", 0);
	Say("I'm a cyborg...<pause> Was created in 2029 year", 1);
	Say("So...<pause>What's your name?", 2, function () {
		setTimeout(function () {
			textBlock.attr('placeholder', 'Enter your name...');
			newQuest("Добро пожаловть в игру game_name! Игра ещё находится в стадии разработки, но уже кое-что можно потестить. Приятной игры!");
		}, 3000);
	}, true);*/

	textBlock.keypress(function(e) {
		if (e.keyCode == 13) {
			var answer = this.value.toLowerCase();
			textBlock.attr('placeholder', '');
			switch (dialogCount) {
				case 1:
					userName = this.value;
					dialogCount = 0;

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
					dialogCount = 0;

					yesOrNo(answer, function () {
						Say("Oh...<pause>You have been here before?", 0);
						Say("Anyway...Everything has changed", 1);
					}, function () {
						Say("Okey...<pause>Look! We are in the Necropolis", 0);
						Say("That's my city", 1);
					});

					Say("...", 2);
					Say("Do you want to know something about this city?", 3, function () {
						textBlock.attr('placeholder', 'Enter your answer...');
					}, true);
					break;
				case 3:
					dialogCount = 0;
					yesOrNo(answer, function () {
						Say("Yey!<pause> Listen to me", 0);
						Say("Necropolis is one of the last survived city at war between United Community and Cult Of Cicada", 1);
						Say("This city live through Electrum, that we found in crater under city centre", 3);

					}, function () {
						Say("Sure?<pause>Okay... You know better", 0);
						Say("Maybe you know, that Necropolis is one of the last survived city at war between United Community and Cult Of Cicada", 1);
						Say("I know, it's scary", 3);
					});
					Say("Anyway... I want to know something about you! Where are you from?", 4, function () {
						textBlock.attr('placeholder', 'Enter your answer...');
					}, true);
					break;
				case 4:
					dialogCount = 0;
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
								Say("So?Where are you from?", 2, function () {
									dialogCount = dialogCountC;
								});
							}
							else{
								Say("Cool!It's so far from here!", 0, function () {
									sound("Mobile ringing");
								});
								Say(userName + ", wait please", 0.7);
								Say("/ Hello?<pause>Uhmm...<pause>Okey /", 1.5);
								Say("/ Wait for me /", 3);
								Say(userName + ", I'm so sorry, but I must go now", 4);
								Say("I really want to meet you again", 5);
								Say("Tonight I'm going to be on the roof of this cafe. I'm waiting for you there. Bye", 6, function () {
									textBlock.attr('placeholder', "Say 'Bye'...");
								}, true);
							}
						}
					};
					func();
					break;
				case 5:
					dialogCount = 0;
					this.value = "";
					setTimeout(function () {
						if(answer.indexOf("bye") !== -1){
							changeTime("00:00");
							setTimeout(function () {
								changeLocation("Night City");
							}, 1500);
							Say("Oh, you really come... It's so cool!", 2, function () {
								$("#string").css("display","block");
								newQuest("К сожалению пока на этом игра заканчивается, но в скором времени история продолжится. Оставайтесь с нами!");
							});
						}
					}, 2000);
					break;
			}
			this.value = "";
		}
	});

});