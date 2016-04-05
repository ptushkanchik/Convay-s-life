var collTD = document.body.querySelectorAll("td");//коллекция клеток таблицы
var lengthTD = $("td").length;//длина массива ячеек
var collTR  = $("tr").length;//количество строк
var lengthTR = lengthTD/collTR;//длина строки
var countAlive = 0;//счетчик живых соседних клеток
var tl, t, tr, r, br, b, bl, l;
var field = document.body.querySelector("#field");

var timeId;//идентификатор цикла setInterval

$("td").addClass("dead");

field.onclick = function(event){
	if(event.target.tagName=="TD"){
		event.target.classList.add("alive");
		}
}

function start(){
	var cell, x;
	for(var i=0;i<collTR;i++){
		for(var j=0;j<lengthTR;j++){
			cell = field.rows[i].cells[j];
			x = checkTD(i, j);
			if(cell.classList.contains("alive")){
				if(x<2 || x>3){
					cell.classList.add("change");
					
				}
			}else{
				if(x==3){
					cell.classList.add("change");
					
				}
			}
		}
	}
	if($(".change").length==0){
		clearInterval(timeId);
		end();
		return;
	}
	$(".change").toggleClass("alive").removeClass("change");
	$("#tablo").text($(".alive").length);
}


function checkTD(i, j){
	tl = (i - 1)*lengthTR + j - 1;
	t = (i - 1)*lengthTR + j;
	tr = (i - 1)*lengthTR + j + 1;
	r = i*lengthTR + j + 1;
	br = (i + 1)*lengthTR + j + 1;
	b = (i + 1)*lengthTR + j;
	bl = (i + 1)*lengthTR + j - 1;
	l = i*lengthTR + j - 1;
	
	if(i==0){
		tl = (collTR - 1)*lengthTR + j - 1;
		t = (collTR - 1)*lengthTR + j;
		tr = (collTR - 1)*lengthTR + j + 1;
		
			if(j==0){
				tl = lengthTD - 1;
				l = lengthTR - 1;
				bl = lengthTR*2 - 1;
			}
			if(j==(lengthTR - 1)){
				tr = lengthTD - lengthTR;
				r = 0;
				br = lengthTR;
			}
	}else if(i==(collTR-1)){
		bl = j - 1;
		b = j;
		br = j + 1;
		
			if(j==0){
				tl = lengthTD - lengthTR - 1;
				l = lengthTD - 1;
				bl = lengthTR - 1;
			}
			if(j==(lengthTR - 1)){
				tr = lengthTD - lengthTR*2;
				r = lengthTD - lengthTR;
				br = 0;
			}
	}else{
		if(j==0){
			tl = (i - 1)*lengthTR + lengthTR - 1;
			l = i*lengthTR + lengthTR - 1;
			bl = (i + 1)*lengthTR + lengthTR - 1;
		}
		if(j==(lengthTR - 1)){
			tr = (i - 1)*lengthTR;
			r = i*lengthTR;
			br = (i + 1)*lengthTR;
		}
	}
	
	return findAlive([tl, t, tr, r, br, b, bl, l]);
}

function findAlive(arr){
	countAlive = 0;
	for(var i=0;i<8;i++){
		if(collTD[arr[i]].classList.contains("alive")){
			countAlive++;
		}
	}
	return countAlive;
	
}

function end(){
	clearInterval(timeId);
	$("#end").css("display", "block");
	
}

function restart(){
	clearInterval(timeId);
	$("td").removeClass("alive");
	countAlive = 0;
	$("#tablo").empty();
	$("#end").css("display", "");
}