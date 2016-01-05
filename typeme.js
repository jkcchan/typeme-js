// var a = new Typeme("%%f%%Jacob Chan%%t%%Systems Design Engineering%%n%%Software Developer Intern at SMART Technologies",100);

var Typeme = function(string, speed, target){
	this.speed = typeof speed == "number"? speed: 100;
	this.string = string;
	this.chars = this.string.split("");
	this.currentChar = 0;
	target = target ? target : $("body");
	// console.log(target);
	this.flags = [];
	this.delay=0;
	var that = this;
	var interval;
	// target.after("<span id='cursor'>_</span>");
	this.startTyping = function(){
		interval = setInterval(function(){
			that.printNextChar();
			that.determineNextChar();
		},that.speed);
	}
	this.determineNextChar = function(){
		this.currentChar++;
		if (this.currentChar>=this.chars.length){
			clearInterval(interval);
			// $("#cursor").hide();
		}
		// console.log(this.currentChar);
	}
	this.remove = function(){
		clearInterval(interval);
		// $("#cursor").hide();
	}
	this.blinkingDelay = 0;
	this.printNextChar = function(){
		if(this.delay>0){
			this.currentChar--;
			this.delay--;
			this.blinkingDelay++;
			if(this.blinkingDelay>10){
				// if($("#cursor").is(':visible')){
					// $("#cursor").hide();
				// } else $("#cursor").show();
				this.blinkingDelay=0;
			}
			return;
		}
		// if(!$("#cursor").is(':visible')){
			// $("#cursor").show();
		// }
		if(this.chars[this.currentChar]=="%"&&this.chars[this.currentChar+1]=="%"){
			if(this.chars[this.currentChar+3]=="%"&&this.chars[this.currentChar+4]=="%"){
				if(parseInt(this.chars[this.currentChar+2])>0){
					this.delay = parseInt(this.chars[this.currentChar+2]);
					
					this.currentChar+=4;
					return;
				}else {
					switch(this.chars[this.currentChar+2]){
						case 'n':
							this.chars[this.currentChar]="<br/>";
							break;
						case 't':
							this.chars[this.currentChar]="&emsp;";
							break;
						case 'f':
							this.createFlag(this.currentChar);
							this.chars[this.currentChar]="";
							break;
						default:
							break;
					}
					target.html(target.html()+this.chars[this.currentChar]+this.chars[this.currentChar+5]);

					this.currentChar+=5;
				}
			} else {
				var lengthOfArg = undefined;
				var totalArg = "";
				for(var i =2; i<this.chars.length-this.currentChar; i++){
					if(this.chars[this.currentChar+i]=="%"&&this.chars[this.currentChar+i+1]=="%"){
						lengthOfArg = i-2;
						break;
					} else {
						totalArg+=this.chars[this.currentChar+i];
						continue;
					}
				}
				if(parseInt(totalArg)>0){
					this.delay = parseInt(totalArg);
					this.currentChar+=3+lengthOfArg;
					return;
				} else{
					switch(this.chars[this.currentChar+2]){
						case 'b':
							this.chars[this.currentChar+2]="<strong id='"+this.currentChar+"'></strong>";
							break;
						case 'i':
							this.chars[this.currentChar+2]="<em id='"+this.currentChar+"'></em>";
							break;
						case 'u':
							this.chars[this.currentChar+2]="<u id='"+this.currentChar+"'></u>";
							break;
						case 'a':
							var isLink = true;
							if(this.chars[this.currentChar+3]!="("){
								break;
							}
							else {
								var href="";
								for (var x =4; x < this.chars.length ; x++){
									if(this.chars[this.currentChar+x]==")"){
										var linkLength = x - 4;
										break;
									} else {
										href += this.chars[this.currentChar+x];
									}
								}
							}
							this.chars[this.currentChar+2]="<a href='"+href+"'id='"+this.currentChar+"'></a>";
							break;
						default:
							break;
					}
					if(!isLink){
						var wrappedString = ""
						for(var j=3; j<lengthOfArg+2; j++){
							wrappedString+=(this.chars[this.currentChar+j]);
						}
						this.delay = wrappedString.length;
					} else {
						var wrappedString = ""
						for(var j=3; j<lengthOfArg-linkLength+1; j++){
							wrappedString+=(this.chars[this.currentChar+j+linkLength+2]);
						}
						this.delay = wrappedString.length-1;
					}
					target.html(target.html()+this.chars[this.currentChar+2]);
					var wrappedTypeme = new Typeme(wrappedString, this.speed, $("#"+this.currentChar+""));
					
					wrappedTypeme.startTyping();
					this.currentChar+=3+lengthOfArg;
				}
			}
		}else{
			target.html(target.html()+this.chars[this.currentChar]);
		}
	}
	this.createFlag = function(n){
		this.flags.push({
			'position':n,
			'triggered':false
		});
	}
	this.findLatestFlag = function(){
		var latest=-1;
		for(flag in this.flags){
			latest = this.flags[flag].position>latest&&!this.flags[flag].triggered?flag:latest;
			
		}
		return latest;
	}
}
