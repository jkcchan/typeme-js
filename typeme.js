// var a = new Typeme("%%f%%Jacob Chan%%t%%Systems Design Engineering%%n%%Software Developer Intern at SMART Technologies",100);

var Typeme = function(string, speed){
	this.speed = typeof speed == "number"? speed: 100
	this.string = string;
	this.chars = this.string.split("");
	this.currentChar = 0;
	this.flags = [];
	this.delay=0;
	this.finalString = "";
	var that = this;
	this.determineNextChar = function(){
		this.currentChar++;
		if (this.currentChar>=this.finalString.length){
			clearInterval(interval);
		}
	}
	this.printNextChar = function(){
		$("#body").html($("#body").html()+this.finalString[this.currentChar]);
		// if(this.delay>0){
		// 	this.currentChar--;
		// 	this.delay--;
		// 	return;
		// }
		// if(this.chars[this.currentChar]=="%"&&this.chars[this.currentChar+1]=="%"){
		// 	var deCoded = this.deCode();
		// 	$("#body").html($("#body").html()+deCoded.text);
		// 	this.currentChar+=deCoded.jumpAheadBy;
		// }else{
		// 	$("#body").html($("#body").html()+this.chars[this.currentChar]);
		// }
	}
	this.deCodeAll = function(){
		for (var j =0; j<this.chars.length; j++){
			if(this.chars[j]=="%"&&this.chars[j+1]=="%"){
				var deCoded = this.deCode(j);
				this.finalString+=deCoded.text;
				j+=deCoded.jumpAheadBy;
			}else{
				this.finalString+=this.chars[j];
			}
		}
	}
	this.deCode = function(j){
		var objReturn={};
		if(this.chars[j+3]=="%"&&this.chars[j+4]=="%"){
			if(parseInt(this.chars[j+2])>0){
				this.delay = parseInt(this.chars[j+2]);
				objReturn.text = "";
				objReturn.jumpAheadBy = 4;
				return objReturn;
			}else {
				switch(this.chars[j+2]){
					case 'n':
						this.chars[j]="<br/>"+this.chars[j+5];
						break;
					case 't':
						this.chars[j]="&emsp;"+this.chars[j+5];
						break;
					case 'f':
						this.createFlag(j);
						this.chars[j]=this.chars[j+5];
						break;
					default:
						break;
				}
				// $("#body").html($("#body").html()+this.chars[j]+this.chars[j+5]);
				objReturn.text = this.chars[j];
				objReturn.jumpAheadBy = 5;
				return objReturn;
				// j+=5;
			}
		} else {
			var lengthOfArg = undefined;
			var totalArg = "";
			console.log(totalArg);
			for(var i =2; i<this.chars.length-j; i++){
				if(this.chars[j+i]=="%"&&this.chars[j+i+1]=="%"){
					lengthOfArg = i-2;
					break;
				} else {
					totalArg+=this.chars[j+i];
					continue;
				}
			}
			console.log(lengthOfArg);
			if(parseInt(totalArg)>0){
				this.delay = parseInt(totalArg);
				objReturn.jumpAheadBy = 3+lengthOfArg;
				objReturn.text = "";
				return objReturn;
			} else{
				switch(this.chars[j+2]){
					case 'b':
						this.chars[j+2]="<strong>";
						break;
					case 'i':
						this.chars[j+2]="<em>";
						break;
					case 'u':
						this.chars[j+2]="<u>";
						break;
					default:
						break;
				}
				for(var k=2; k<lengthOfArg+2; k++){
					// if(this.chars[j+k]=="%"&&this.chars[j+k+1]=="%"){
					// 	var deCoded = this.deCode(k+j);
					// 	this.chars[j+k] = deCoded.text;
					// 	k+=deCoded.jumpAheadBy;
					// }
					console.log('a');
					this.chars[j+2]+=(this.chars[j+k]);

				}
				// $("#body").html($("#body").html()+this.chars[j+2])
				// j+=4+lengthOfArg;
				objReturn.text = this.chars[j+2];
				objReturn.jumpAheadBy = 4+lengthOfArg;
				return objReturn;
			}
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

	this.deCodeAll();
	this.finalString.split("");
	var interval = setInterval(function(){
		that.printNextChar();
		that.determineNextChar();
	},this.speed);
}