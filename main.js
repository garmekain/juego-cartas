var canvas = document.getElementById("canvas"),
	canvasdiv = document.getElementById("canvasdiv"),
	ctx = canvas.getContext("2d"),
	manohtml = document.getElementById("mano");;

width = innerWidth;
height = innerHeight;

canvas.width = width;
canvas.height = height;
rad = 500;
sub = 15;

turn = 0;

var pos = { x: 0, y: 0},
	mano = [],
	mano2 = [];

for (var i = 0; i < 6; i++) {
	mano.push(Math.round((carddb.cards.length-1)*Math.random()));
	mano2.push(Math.round((carddb.cards.length-1)*Math.random()));
};

drawGrid(rad,sub);
drawText();
drawPoint(pos.x, pos.y);
refreshHand(mano);
