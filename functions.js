function drawGrid(r,s) {
	ctx.save();

	ctx.beginPath();
	ctx.moveTo(width/2-r/2,height/2-r/2);
	ctx.lineTo(width/2+r/2,height/2-r/2);
	ctx.lineTo(width/2+r/2,height/2+r/2);
	ctx.lineTo(width/2-r/2,height/2+r/2);
	ctx.lineTo(width/2-r/2,height/2-r/2);
	ctx.fillStyle = "rgb(240,240,240)";
	ctx.fill();

	ctx.lineWidth = 5;
	ctx.lineCap = "square";

	ctx.strokeStyle = "rgb(190,190,190)";
	ctx.beginPath();
	ctx.arc(width/2,height/2,8,0,2*Math.PI);
	ctx.fillStyle = "rgb(150,150,150)";
	ctx.fill();
	ctx.beginPath();
	for (var i = 1; i < s; i++) {
		ctx.moveTo(width/2-r/2+i*r/s,height/2-r/2+r/s);
		ctx.lineTo(width/2-r/2+i*r/s,height/2+r/2-r/s);
		ctx.stroke();
	};
	for (var i = 1; i < s; i++) {
		ctx.moveTo(width/2-r/2,height/2-r/2+i*r/s);
		ctx.lineTo(width/2+r/2,height/2-r/2+i*r/s);
		ctx.stroke();
	};
	ctx.beginPath();
	ctx.moveTo(width/2-r/2,height/2-r/2);
	ctx.lineTo(width/2+r/2,height/2-r/2);
	ctx.lineTo(width/2+r/2,height/2+r/2);
	ctx.lineTo(width/2-r/2,height/2+r/2);
	ctx.closePath();
	ctx.stroke();

	ctx.lineWidth = 6;
	ctx.shadowColor = "rgb(180,180,180)";
	ctx.shadowBlur = 2;
	ctx.shadowOffsetY = 2;
	ctx.beginPath();
	ctx.strokeStyle = "rgb(150,150,150)";
	ctx.moveTo(width/2-r/2-5,height/2-r/2-5);
	ctx.lineTo(width/2+r/2+5,height/2-r/2-5);
	ctx.lineTo(width/2+r/2+5,height/2+r/2+5);
	ctx.lineTo(width/2-r/2-5,height/2+r/2+5);
	ctx.closePath();
	ctx.stroke();
	ctx.restore();
}

function drawText() {
	ctx.save();
	ctx.font="15px Courier";
	ctx.fillStyle = "rgb(180,180,180)";
	ctx.textAlign = "center";
	for (var i = -Math.floor(sub/2); i <= Math.floor(sub/2); i++) {
		ctx.fillText(-i, width/2+rad/2+25,height/2+i*rad/sub+5)
		ctx.fillText(i, width/2+i*rad/sub,height/2+rad/2+30)
	};
	ctx.font="20px Courier";
	ctx.fillStyle = "rgb(120,120,120)";
	ctx.fillText("Y", width/2+rad/2+50,height/2+5)
	ctx.fillText("X", width/2,height/2+rad/2+60)
	ctx.restore();
}

function drawPoint(x, y) {
	ctx.save();
	ctx.fillStyle = "rgb(10,90,250)";
	ctx.shadowBlur = 0;
	ctx.shadowOffsetY = (pos.y+150)/50;
	ctx.shadowOffsetX = -pos.x/7*(pos.y+10)/10;
	ctx.shadowColor = "rgb(0,40,200)";
	ctx.beginPath();
	ctx.arc(width/2+x*rad/sub+x/7*(y+10)/10,height/2-y*rad/sub-(y+150)/50,14,0,2*Math.PI);
	ctx.fill();
	ctx.restore();
}

function redraw() {
	canvas.width = canvas.width;
	drawGrid(rad, sub);
	drawPoint(pos.x, pos.y);
	drawText();
}

function robar(carddb, mano) {
	if (manohtml.childNodes.length < 6) {
		id = Math.round((carddb.cards.length-1)*Math.random());
		mano.push(id);
		refreshHand(mano);
	};
}

function refreshHand(mano) {
	manohtml.innerHTML = "";
	mano.forEach(function (element, index) {
		var texto = carddb.cards[element].action;
		texto = texto.replace(/pos.x/g, "X");
		texto = texto.replace(/pos.y/g, "Y");
		texto = texto.replace(/;/g, ";<br>")
		texto = texto.replace(/{/g, "{<br>");
		manohtml.innerHTML += "<div id='" + element + "' class='carta "+index+"' onclick='playCard(this.id, this.className)'>"+texto+"</div>";
	})
}

function playCard(id, classname) {
	number = classname.split(" ")[1];
	action = carddb.cards[id].action;
	var prevpos = { x: pos.x, y: pos.y };
	var hand;
	eval(action);
	if (turn === 0) {
		hand = mano;
		console.log(hand);
	} else if(turn === 1) {
		hand = mano2;
		pos = { x: 2*prevpos.x-pos.x, y:  2*prevpos.y-pos.y};
	};
	if (!(prevpos.x === pos.x && prevpos.y === pos.y)) {
		hand.splice(number, 1);
		refreshHand(hand);
	};
	if (pos.x > 8) { pos.x = 8 };
	if (pos.x < -8) { pos.x = -8 };
	if (pos.y > 7) { pos.y = 7 };
	if (pos.y < -7) { pos.y = -7 };
	redraw();
	robar(carddb, hand);
	changeTurn();
}

function changeTurn() {
	if (turn === 0) {
		turn = 1;
		refreshHand(mano2)
	} else if (turn === 1) {
		turn = 0;
		refreshHand(mano);
	}
}