// class Typeme{
// 	constructor(string){
// 		this.string = string;
// 	}
// 	this.animate(){
// 		this.words = this.string.split(" ");
// 		for(var x=0; x<words.length; x++){
// 			$("#body").text($("#body").text()+words[x]);
// 		}
// 	}
// }

var Typeme = function(string, speed){
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
	},this.speed);
	this.determineNextChar = function(){
		this.currentChar++;
		if (this.currentChar>=this.chars.length){
			clearInterval(interval);
		}
	}
	this.printNextChar = function(){
		if(this.delay>0){
			console.log(this.delay);
			this.currentChar--;
			this.delay--;
			return;
		}
		if(this.chars[this.currentChar]=="%"&&this.chars[this.currentChar+1]=="%"){
			if(parseInt(this.chars[this.currentChar+2])>0){
				this.delay = parseInt(this.chars[this.currentChar+2]);
				console.log(this.delay);
				this.currentChar+=2;
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
				}
				$("#body").html($("#body").html()+this.chars[this.currentChar]+this.chars[this.currentChar+3]);

				this.currentChar+=3;
			}
		}else{
			$("#body").html($("#body").html()+this.chars[this.currentChar]);
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