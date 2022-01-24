var row = 1;
var score=0;
var timer=30;
var divider=1;
var count=0;
var total=((row+1)*(row+1));
var selectBox=new Array();
var copySelectBox=selectBox.slice();
var colors=["#ACDDDE"];
var selectColor='';

window.onload= function () {
	create_table(row);
	reduceTimer();
}

function reduceTimer(){
	document.getElementById('timer').innerHTML=timer;
	timer--;
	if(timer==25){
		enableClick();
	}
	if(timer<0) {
		$('#myModal').modal('show');
		document.getElementById('score').innerHTML='Your Score Is '+score;
		return;
	};
	setTimeout(reduceTimer,1000);
}

function disableClick(){
	var tds=document.getElementsByTagName('td');
	for(var i=0;i<tds.length;i++){
		tds[i].style.pointerEvents='none';
	}
}

function enableClick(){
	var tds=document.getElementsByTagName('td');
	for(var i=0;i<tds.length;i++){
		tds[i].style.pointerEvents='';
	}
	for(var i=0;i<selectBox.length;i++){
		document.getElementById(selectBox[i]).style.backgroundColor="#FFFFFF";
	}
}

function create_table(row) {
	var id=1;
	var rows = [];
	var colStr = null;
	for(var j = 0; j <= row; j++) {
		colStr = "";
		for (var i = 0; i <= row; i++){
			var cell = '<td id='+id+' class="btnStyle" onclick="btnClick(this)"></td>';
			colStr += cell;
			id++;
		};
		rows.push('<tr>' + colStr + '</tr>');
	}
	document.getElementById('tbl').innerHTML += rows.join("");
	reduceButtonAndText();
	fillColor();
	disableClick();
}

function btnClick(x) {
	var flag=false;
	for(var i=0;i<selectBox.length;i++){
		if(x.id==selectBox[i]){
			flag=true;
			break;
		}
	}
	if(flag){
		document.getElementById(x.id).style.backgroundColor=selectColor;
		count++;
		if(selectBox.length==count){
			if(row<5){
				row++;
			}
			else{
				row=row;
			}
			document.getElementById('tbl').innerHTML="";
			selectBox=[];
			total=((row+1)*(row+1));
			create_table(row);
			count=0;
			timer=30;
			score++;
		}
	}
	else{
		for(var i=0;i<selectBox.length;i++){
			document.getElementById(selectBox[i]).style.backgroundColor="#FFFFFF";
			count=0;
		}
	}
}

function reduceButtonAndText(){
	if(row<5){
		divider=divider+0.2;
	}
	else{
		divider=divider;
	}
	var btnStyle = document.getElementsByTagName('td');
	for(var i=0 ; i<btnStyle.length; i++){
		var temp=(100/divider);
		btnStyle[i].style.width=temp+'px';
		btnStyle[i].style.height=temp+'px';
	}
}

function fillColor(){
	selectColor = colors[Math.floor(Math.random()*colors.length)];
	var btnStyle =document.getElementsByClassName('btnStyle');

	for(var i=0;i<(total/2)-1;i++){
		document.getElementById(getRandomNumber()).style.backgroundColor=selectColor;
	}
	copySelectBox=selectBox.slice();
}

function getRandomNumber() {
	var random= Math.floor(Math.random() * total)+1;
	var flag=true;
	for(var i=0;i<selectBox.length;i++){
		if(selectBox[i]==random){
			flag=false;
		}
	}
	if(flag){
		selectBox.push(random);
		return random;
	}
	else{
		return getRandomNumber();
	}
}

function restart(){
	window.location.reload();
}
