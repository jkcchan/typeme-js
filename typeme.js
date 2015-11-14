// var a = new Typeme("%%f%%Jacob Chan%%t%%Systems Design Engineering%%n%%Software Developer Intern at SMART Technologies",100);

var Typeme = function(string, speed, target){
	this.speed = typeof speed == "number"? speed: 100
	this.string = string;
	this.chars = this.string.split("");
	this.currentChar = 0;
	this.flags = [];
	this.delay=0;
	var that = this;
	var interval = setInterval(function(){
		that.printNextChar();
		that.determineNextChar();
		that.showHide();
	},this.speed);
	this.determineNextChar = function(){
		this.currentChar++;
		if (this.currentChar>=this.chars.length){
			clearInterval(interval);
		}
	}
	this.initCursor function(){
		target.append("<span id='cursor'>_</span>");
	}
	this.showHide = function(){
		if($("#cursor").is(":visible")){
			$("#cursor").hide();
		} else $("#cursor").show();
	}
	this.printNextChar = function(){
		if(this.delay>0){
			this.currentChar--;
			this.delay--;
			return;
		}
		if(this.chars[this.currentChar]=="%"&&this.chars[this.currentChar+1]=="%"){
			if(this.chars[this.currentChar+3]=="%"&&this.chars[this.currentChar+4]=="%"){
				if(parseInt(this.chars[this.currentChar+2])>0){
					this.delay = parseInt(this.chars[this.currentChar+2]);
					console.log(this.delay);
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
				console.log(totalArg);
				for(var i =2; i<this.chars.length-this.currentChar; i++){
					if(this.chars[this.currentChar+i]=="%"&&this.chars[this.currentChar+i+1]=="%"){
						lengthOfArg = i-2;
						break;
					} else {
						totalArg+=this.chars[this.currentChar+i];
						continue;
					}
				}
				console.log(lengthOfArg);
				if(parseInt(totalArg)>0){
					this.delay = parseInt(totalArg);
					this.currentChar+=3+lengthOfArg;
					return;
				} else{
					switch(this.chars[this.currentChar+2]){
						case 'b':
							this.chars[this.currentChar+2]="<strong>";
							break;
						case 'i':
							this.chars[this.currentChar+2]="<em>";
							break;
						case 'u':
							this.chars[this.currentChar+2]="<u>";
							break;
						default:
							break;
					}
					for(var j=2; j<lengthOfArg+2; j++){
						this.chars[this.currentChar+2]+=(this.chars[this.currentChar+j]);
					}
					target.html(target.html()+this.chars[this.currentChar+2])
					this.currentChar+=4+lengthOfArg;
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
		console.log(this.flags);
	}
	this.findLatestFlag = function(){
		var latest=-1;
		for(flag in this.flags){
			latest = this.flags[flag].position>latest&&!this.flags[flag].triggered?flag:latest;
			
		}
		return latest;
	}
}