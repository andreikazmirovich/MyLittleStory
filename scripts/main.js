var mainFunc = function() {

	/*----------  Satarter functions  ----------*/

		$("#menu_full_block").remove();
		$("#main_logo").remove();
		$("#menu_buttons").remove();
		$("#author").remove();

		$("body").append('<div id="dark"></div><div id="slider"><div class="bg_block"></div></div><div id="pers_block"><div id="string"></div><div id="pers"></div><input type="text" id="txt" autocomplete="off"></div><div id="sidebar"></div>');

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
				$("body").append('<div id="dark"></div>');
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
				if (answer.indexOf("да") !== -1 ||
					answer.indexOf("конечно") !== -1 || 
					answer.indexOf("абсолютно") !== -1 || 
					answer.indexOf("однозначно") !== -1) {
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
		
		Say("Привет!<pause> Меня зовут Ино-303", 0);
		Say("Я киборг...<pause> Была создана в 2029 году", 1);
		Say("Так что...<pause>Как тебя зовут?", 2, function () {
			setTimeout(function () {
				textBlock.attr('placeholder', 'Введите ваше имя...');
				newQuest("Добро пожаловть в игру game_name! Игра ещё находится в стадии разработки, но уже кое-что можно потестить. Приятной игры!");
			}, 3000);
		}, true);

		textBlock.keypress(function(e) {
			if (e.keyCode == 13) {
				var answer = this.value.toLowerCase();
				textBlock.attr('placeholder', '');
				switch (dialogCount) {
					case 1:
						userName = this.value;
						dialogCount = 0;

						Say("Мм...<pause>Красивое имя!", 0, function () {
							emotion("Cute Laugh");
						});
						Say(userName + ", вы знаете где мы сейчас?", 1, function () {
							setTimeout(function () {
								textBlock.attr('placeholder', 'Введите свой ответ...');
							}, 2000);
						}, true);
						break;
					case 2:
						dialogCount = 0;

						yesOrNo(answer, function () {
							Say("Оу...<pause>Вы уже были тут когда-то?", 0);
							Say("Но не суть...Всё давно изменилось", 1);
						}, function () {
							Say("Хорошо...<pause>Смотри! Мы в Никрополисе", 0);
							Say("Здесь меня создали", 1);
						});

						Say("...", 2);
						Say("Вы хотите кое-что узнать об этом городе?", 3, function () {
							textBlock.attr('placeholder', 'Введите свой ответ...');
						}, true);
						break;
					case 3:
						dialogCount = 0;
						yesOrNo(answer, function () {
							Say("Ура!<pause> Слушайте", 0);
							Say("Никрополис - один из последних выживших городов в войне между Объединенным Сообществом и Культом Цикады", 1);
							Say("Этот город выживает благодаря Электруму, который мы нашли в кратере под центром города", 3);

						}, function () {
							Say("Уверены?<pause>Хорошо...Вам лучше знать", 0);
							Say("Возможно, вы знаете, что Никрополис - один из последних переживших войну городов между Объединенным Сообществом и Культом Цикады", 1);
							Say("Я знаю, звучит страшновато", 3);
						});
						Say("В любом случае... Я хочу узнать что-то о вас! Откуда вы?", 4, function () {
							textBlock.attr('placeholder', 'Введите свой ответ...');
						}, true);
						break;
					case 4:
						dialogCount = 0;
						var func = function () {
							this.value = "";
							if(answer !== ""){
								if(answer.indexOf("Некрополис") !== -1 ||
								answer.indexOf("этот") !== -1||
								answer.indexOf("отсюда") !== -1||
								answer.indexOf("тут") !== -1||
								answer.indexOf("тоже") !== -1){
									Say("Не врите!", 0);
									Say("Прежде чем я встретила вас, я проверила ваш пропуск, и я уверена, что вы не отсюда", 1);
									Say("Ну так что?Откуда вы?", 2, function () {
										dialogCount = dialogCountC;
									});
								}
								else{
									Say("Круто!Никогда не слышала об этом месте!", 0, function () {
										sound("Mobile ringing");
									});
									Say(userName + ", подождите, пожалуйста", 0.7);
									Say("/ Я слушаю?<pause>Емм...<pause>Хорошо /", 1.5);
									Say("/ Жди меня /", 3);
									Say(userName + ", мне очень жаль, но я должна идти", 4);
									Say("Я действительно хочу встретиться с вами снова", 5);
									Say("Сегодня я буду на крыше этого кафе. Буду ждать вас там. Надеюсь вы придете. До свидания", 6, function () {
										textBlock.attr('placeholder', "Попрощайтесь...");
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
							if(answer.indexOf("пока") !== -1 ||
								answer.indexOf("до свидания") !== -1 ||
								answer.indexOf("удачи") !== -1 ||
								answer.indexOf("до встречи") !== -1 ||
								answer.indexOf("до завтра") !== -1 ||
								answer.indexOf("прощай") !== -1){
								changeTime("00:00");
								setTimeout(function () {
									changeLocation("Night City");
								}, 1500);
								Say("Ох, вы правда здесь... Это очень здорово!", 2, function () {
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

};

/*----------  Main menu  ----------*/

	$(document).ready(function() {
	/*----------  Menu functions  ----------*/
	
		var bg_audio = new Audio();
			bg_audio.autoplay = true;
			bg_audio.volume=0.1;
			bg_audio.src = "../music/menu_1.mp3";

		$("#menu_full_block .menu_bg_img:first-child").css('background-image', 'url("../img/backgrounds/menu/'+ 1 +'.jpg")');
		$("#menu_full_block").prepend('<div class="menu_bg_img"></div>');
		$("#menu_full_block .menu_bg_img:first-child").css('background-image', 'url("../img/backgrounds/menu/'+ 2 +'.jpg")');

		var i = 3;

		var menuBgInter = setInterval(function () {
			$("#menu_full_block .menu_bg_img:last-child").css('opacity', '0');
			setTimeout(function () {
				if(i < 13){
					$("#menu_full_block .menu_bg_img:last-child").remove();
					$("#menu_full_block").prepend('<div class="menu_bg_img"></div>');
					$("#menu_full_block .menu_bg_img:first-child").css('background-image', 'url("../img/backgrounds/menu/'+ i +'.jpg")');
					i++;
				}
				else{
					$("#menu_full_block .menu_bg_img:last-child").remove();
					$("#menu_full_block").prepend('<div class="menu_bg_img"></div>');
					$("#menu_full_block .menu_bg_img:first-child").css('background-image', 'url("../img/backgrounds/menu/'+ i +'.jpg")');
					i = 1;
				}
			}, 2000);
			$("#menu_buttons ul li#start_game").click(function() {
				clearInterval(menuBgInter);
			});
		}, 10000);

		$("#menu_buttons ul li").hover(function() {
			var soundAudio = new Audio();
				soundAudio.volume = 0.2;
				soundAudio.src = '../music/effects/sfx_menu_move4.wav';
				soundAudio.autoplay = true;	
		}, function() {});

		/*----------  start butt  ----------*/
		
			$("#menu_buttons ul li#start_game").click(function() {
				$("body").append('<div id="dark" style="background-color: rgba(0,0,0,0)"></div>');
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
				setTimeout(function () {
					textBetweenScenes("2059 год...");
					textBetweenScenes("Спустя 30 лет после техногенного катаклизма", 3, function () {
						setTimeout(function () {
							$("#dark").remove();
							mainFunc();
						}, 12000);
					});
				}, 2000);
				bg_audio.pause();
			});

		/*----------  options butt  ----------*/
		
			$("#menu_buttons ul #options").click(function() {
				if (!!$("#options_window") === true) $("#options_window").remove();
					$("body").append('<div id="options_window"><i id="options_window_exit" class="fa fa-times" aria-hidden="true"></i><ul><li><span>Volume:</span></li></ul><ul id="values"><li><i class="fa fa-minus" aria-hidden="true"></i><i class="fa fa-plus" aria-hidden="true"></i></li></ul></div>')
					$("#options_window #options_window_exit").click(function() {
						$("#options_window").remove();
					});
					$("#options_window ul#values li .fa-plus").click(function() {
						if(bg_audio.volume < 0.9) bg_audio.volume += 0.1;
					});
					$("#options_window ul#values li .fa-minus").click(function() {
						if(bg_audio.volume > 0.1) bg_audio.volume -= 0.1;
					});
			});

		/*----------  exit butt  ----------*/
		
			$("#menu_buttons ul li#exit").click(function() {
				window.close();
			});

	/*----------  Text between scenes function  ----------*/
		var textBetweenScenes = function (text, timeOut, callback) {
			setTimeout(function () {
				$("#dark #text").html("");
				$("#dark").remove();
				$("body").append('<div id="dark"><div id="text"></div></div>');
				var i = 0;
				setInterval(function () {
					if(i < text.length){
						$("#dark #text").html($("#dark #text").text() + text[i]);
						if(text[i] != " "){
							var soundAudio = new Audio();
							soundAudio.src = '../music/effects/typewriter.wav';
							soundAudio.autoplay = true;
						}
						i++;
					}
				}, 130);
				if(callback) callback();
			}, timeOut * 1000);
		}

	});