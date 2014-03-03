
/* 定义全局变量
   高度
   宽度

   二维数组，
   baseblocks
   每个块的颜色，是否已有块占据

 */
/* 全局变量 */

var y = 0;

var bg_height = 0;
var bg_width = 0;
var bg_color = "white";

var block_size = 0;

var bg_blocks = new Array(10);

var movingBlocks = new Array(5);

var SPACE = 32;
var LEFT = 37;
var RIGHT =  39;
var DOWN = 40;

var BLANK = 0;
var BLOCKED = 1;

var I_BLOCK = 0;
var O_BLOCK = 1;
var J_BLOCK = 2;
var L_BLOCK = 3;
var S_BLOCK = 4;
var T_BLOCK = 5;
var Z_BLOCK = 6;

var INTERVAL = 500;

var score = 0;

var blocks_StartX = 0;
var blocks_StartY = 0;

/* =============== 判断逻辑 ==================== */

/* 是否overlap 

 */




/* =============== 基本逻辑 ==================== */ 
/* 函数 移动块初始化
   给出一个随机数，根据随机数选择产生哪一种移动块
   
 */

/* timer函数
 */

/* =============== 对移动块的操作 =============== */

/* 块的旋转 */
function isRotateOK()
{
	var Shart_x = movingBlocks[1][0];
	var Shart_y = movingBlocks[1][1];
	
	var rotate_block_cor = new Array(3);
	for(var i = 0; i<3; i++)
	{
		rotate_block_cor[i] = new Array(2);
	}
	
	switch(movingBlocks[0][1])
	{
	case O_BLOCK:
		
		return true;
	
	case I_BLOCK:	
	case J_BLOCK:		
	case L_BLOCK:		
	case Z_BLOCK:
	case S_BLOCK:
	case T_BLOCK:
		for(var i = 0; i < 3; i++)
		{
			
			rotate_block_cor[i][0]= Shart_x
			- (movingBlocks[i+2][1] - Shart_y);
			
			rotate_block_cor[i][1] = Shart_y
			+ (movingBlocks[i+2][0] - Shart_x);
		}
		
		for(var i = 0; i < 3; i++)
		{
			var x = rotate_block_cor[i][0];
			var y = rotate_block_cor[i][1];
			
			if(x < 0 || x > bg_width/block_size - 1)  return false;
			if(y < 0 || y > bg_height/block_size - 1) return false;
			
			if(bg_blocks[x][y][1] == BLOCKED){
				return false;
			}
		}
		return true;
		
	}	
}

function rotateMovingBlocks()
{
	var Shart_x = movingBlocks[1][0];
	var Shart_y = movingBlocks[1][1];
	
	switch(movingBlocks[0][1])
	{
	case O_BLOCK:
		
		return;
				
	case I_BLOCK:	
	case J_BLOCK:		
	case L_BLOCK:		
	case Z_BLOCK:
	case S_BLOCK:
	case T_BLOCK:

		for(var i = 2; i < 5; i++)
		{
			var org_x = movingBlocks[i][0];
			var org_y = movingBlocks[i][1];
			
			movingBlocks[i][0] = Shart_x - (org_y - Shart_y);			
			movingBlocks[i][1] = Shart_y + (org_x - Shart_x);			
		}

		return;
	default:
		return;	
	}
}
 
/* 块的移动 */

function doKeyDown(e)
{
	var keyID = e.keyCode ? e.keyCode :e.which; 
	
	if(keyID === LEFT)
	{
		if(isMoveLeft())
		{
			clearMovingBlocks();
			moveLeft();
			drawMovingBlocks();	
		}
	}	

	if(keyID === RIGHT)
	{
		if(isMoveRight())
		{
			clearMovingBlocks();
			moveRight();
			drawMovingBlocks();			
		}
	}
	
	if(keyID === DOWN)
	{	
		var distance = isMoveToBottom();	
		if(distance > 0)
		{
			clearMovingBlocks();			
			moveDown(distance);
			drawMovingBlocks();
		}		
	}
	
	if(keyID === SPACE)
	{
		if(isRotateOK())
		{
			clearMovingBlocks();
			rotateMovingBlocks();
			drawMovingBlocks();			
		}		
	}

}

function isMoveLeft()
{
	for(var i = 1; i < 5; i++)
	{
		var offset_x = movingBlocks[i][0] - 1;
		
		if(offset_x < 0){
			return false;
		}
		
		if(bg_blocks[offset_x][movingBlocks[i][1]][1] == BLOCKED){
			return false;
		}
	}
	
    return true;	
}

function moveLeft()
{
	for(var i = 1; i < 5; i++)
	{
		movingBlocks[i][0] = movingBlocks[i][0] - 1;
	}	
}

function isMoveRight()
{
	for(var i = 1; i < 5; i++)
	{
		var offset_x = movingBlocks[i][0] + 1;
		
		if(offset_x  > bg_width/block_size -1){
			return false;
		}
		
		if(bg_blocks[offset_x][movingBlocks[i][1]][1]== BLOCKED){
			return false;
		}
	}
	
	return true;
}

function moveRight()
{
	for(var i = 1; i < 5; i++)
	{
		movingBlocks[i][0] = movingBlocks[i][0] + 1;
	}	
}

function isMoveDown()
{	
	for(var i = 1; i < 5; i++)
	{
		
		var offset_y = movingBlocks[i][1] + 1;
		
		if(offset_y  > bg_height/block_size -1)
		{			
			return false;
		}
		
		if(bg_blocks[movingBlocks[i][0]][offset_y][1] == 1)
		{
			return false;
		}
	}	

	return true;
} 

function moveDown(distance)
{
	for(var i = 1; i < 5; i++)
	{
		movingBlocks[i][1] = movingBlocks[i][1] + distance;
	}
}


function isMoveToBottom()
{	
	var longest = bg_height/block_size - 1;
	
	for(var i = 1; i < 5; i++)
	{
		var x = movingBlocks[i][0];
		
		for(var y = movingBlocks[i][1]+1;
			y < bg_height/block_size; 
			y++)		
		{
			if(bg_blocks[x][y][1] === BLOCKED)
			{
				var diff = y - movingBlocks[i][1]-1;
				if(diff < longest)
				{
					longest = diff;
				}
				break;
			}
			if((y === bg_height/block_size - 1) &&(bg_blocks[x][y][1] === BLANK))
			{
				var diff = y - movingBlocks[i][1];
				if(diff < longest)
				{
					longest = diff;
				}
				break;				
			}
					
		}
	}

	return longest;	
}

/* ===================== 初始化函数 =========================*/

function initBG()
{
	/* init background blocks */
	
	for(var i = 0; i< bg_width/block_size; i++)
	{
		bg_blocks[i]= new Array(bg_height/block_size);
		for(var j = 0; j< bg_height/block_size; j++)
		{
			bg_blocks[i][j] =new Array(2) ;
			bg_blocks[i][j][0] = "white";
			bg_blocks[i][j][1] = BLANK;
		}
	}
}

function markBGwithStoppedMovingBlocks()
{
	for(var i = 1; i < 5; i++)
	{
		var x = movingBlocks[i][0];
		var y = movingBlocks[i][1];
		
		bg_blocks[x][y][0] = movingBlocks[0][0];
		bg_blocks[x][y][1] = BLOCKED;	
	}
}

function initMovingBlocks()
{
	var a = Math.floor(Math.random()*7);
	
	for(var i = 0; i<movingBlocks.length; i++)
		movingBlocks[i] = new Array(2);
	
	switch (a)
	{
	case I_BLOCK:
		
		//A A A A 

		movingBlocks[0] = ["#00FFFF",I_BLOCK];//cyan
		movingBlocks[1] = [bg_width/(2*block_size)-2,0];
		movingBlocks[2] = [bg_width/(2*block_size)-1,0];
		movingBlocks[3] = [bg_width/(2*block_size),0];
		movingBlocks[4] = [bg_width/(2*block_size)+1,0];
		break;	
		
	case T_BLOCK:
		
		//  A A A
		//	  A

		movingBlocks[0] = ["#8B008B",T_BLOCK];//dark magenta
		movingBlocks[1] = [bg_width/(2*block_size)-1,0];
		movingBlocks[2] = [bg_width/(2*block_size),0];
		movingBlocks[3] = [bg_width/(2*block_size),1];
		movingBlocks[4] = [bg_width/(2*block_size)+1,0];
		break;
		
	case J_BLOCK:
		
		// A A A 
		//	   A

		movingBlocks[0] = ["#0000FF",J_BLOCK];//blue
		movingBlocks[1] = [bg_width/(2*block_size)-1,0];
		movingBlocks[2] = [bg_width/(2*block_size),0];
		movingBlocks[3] = [bg_width/(2*block_size)+1,0];
		movingBlocks[4] = [bg_width/(2*block_size)+1,1];
		//break;		

	case L_BLOCK:		
		// A A A 
		// A

		movingBlocks[0] = ["#FF8000",L_BLOCK];//orange
		movingBlocks[1] = [bg_width/(2*block_size)-1,0];
		movingBlocks[2] = [bg_width/(2*block_size)-1,1];
		movingBlocks[3] = [bg_width/(2*block_size),0];
		movingBlocks[4] = [bg_width/(2*block_size)+1,0];		
		break;
		
	case O_BLOCK:

		//  A A
	    //  A A

		movingBlocks[0] = ["#EEEE00",O_BLOCK];//yellow
		movingBlocks[1] = [bg_width/(2*block_size) - 1,0];
		movingBlocks[2] = [bg_width/(2*block_size) - 1,1];
		movingBlocks[3] = [bg_width/(2*block_size),0];
		movingBlocks[4] = [bg_width/(2*block_size),1];			
		break;

	case Z_BLOCK:
		// A A
		//   A A

		movingBlocks[0] = ["#FF0000",Z_BLOCK];//red
		movingBlocks[1] = [bg_width/(2*block_size)-1,0];
		movingBlocks[2] = [bg_width/(2*block_size),0];
		movingBlocks[3] = [bg_width/(2*block_size),1];
		movingBlocks[4] = [bg_width/(2*block_size)+1,1];	
		break;
		
	case S_BLOCK:
		
		//      A A
		//    A A

		movingBlocks[0] = ["#00FF00",S_BLOCK];//lime
		movingBlocks[1] = [bg_width/(2*block_size)-1,1];		
		movingBlocks[2] = [bg_width/(2*block_size),0];
		movingBlocks[3] = [bg_width/(2*block_size),1];	
		movingBlocks[4] = [bg_width/(2*block_size)+1,0];
		break;
				
	default:			
		break;
	}
	
	for(var i = 1; i < 5; i++)
	{
		if(bg_blocks[movingBlocks[i][0]][movingBlocks[i][1]][1] == BLOCKED)
		{
			return false; // game over
		}
	}
	
	return true;
}

/* ================================== */

function updateScores(score)
{
	var c=document.getElementById("baseBlocks");
	var ctx=c.getContext("2d");
	
	ctx.clearRect(400,0,500,100);
	ctx.font="30px Arial";			
	ctx.fillStyle = '#000000'
	ctx.fillText("Score " + score,400,50);
}

function clearMovingBlocks()
{
	var c=document.getElementById("baseBlocks");
	var ctx=c.getContext("2d");
	
	for(var i = 1; i < 5; i++){
		ctx.clearRect(movingBlocks[i][0]*block_size  + blocks_StartX, 
							movingBlocks[i][1]*block_size + blocks_StartY,
							block_size, 
							block_size);				
	}
}

function drawMovingBlocks()
{
	
	var c=document.getElementById("baseBlocks");
	var ctx=c.getContext("2d");
	
	ctx.fillStyle = movingBlocks[0][0];
	
	for(var i = 1;i < 5; i++){
		
		ctx.strokeRect(movingBlocks[i][0] * block_size + blocks_StartX + 1,
				movingBlocks[i][1] * block_size + blocks_StartY + 1,
				block_size - 2,
				block_size - 2);
				
		ctx.fillRect(movingBlocks[i][0] * block_size + blocks_StartX + 2,
				movingBlocks[i][1] * block_size + blocks_StartY + 2,
				block_size - 4,
				block_size - 4);
	}	
}

function drawBGBlocks(a)
{
	var c = document.getElementById("baseBlocks");
	var ctx = c.getContext("2d");

	ctx.clearRect(blocks_StartX, blocks_StartY, bg_width,(a+1)*block_size);	
	
	for(var y = 0; y < bg_height/block_size; y++)
	{		
		for (var x = 0; x < bg_width/block_size; x++)
		{	
			if(bg_blocks[x][y][1] == BLOCKED)
			{
				ctx.strokeRect(x * block_size  + blocks_StartX +1, 
						y * block_size  + blocks_StartY +1,
						block_size - 2 ,
						block_size - 2)
			}							
			ctx.fillStyle = bg_blocks[x][y][0];
			ctx.fillRect(x * block_size + blocks_StartX + 2, 
						y * block_size + blocks_StartY + 2,
						block_size - 4,
						block_size - 4)
		}
	}	
}

function removeLine(lineNumber)
{
	for(var y = lineNumber; y > 0; --y)
	{
		for(var x = 0; x < bg_width/block_size; x++)
		{			
			bg_blocks[x][y][0] = bg_blocks[x][y-1][0];
			bg_blocks[x][y][1] = bg_blocks[x][y-1][1];
		}
	}
	
	/* reset the first line */
	for(var x = 0; x < bg_width/block_size; x++)
	{
		bg_blocks[x][0][0] = "white";
		bg_blocks[x][0][1] = BLANK;
	}
}

function timerEvent()
{
	var initOK = true;
	
	if(isMoveDown())
	{
		clearMovingBlocks();
		moveDown(1);
		drawMovingBlocks();
	}
	else
	{
		markBGwithStoppedMovingBlocks();
		
		var removedLinesNum = 0;
		var removedLines = new Array();
		/* check if a line is full */

		for(var i = 1; i < 5; i++)
		{			
			var y_cor = movingBlocks[i][1];
			
			var removable = true;
			
			for(var x = 0; x < bg_width/block_size; x++)
			{				
				if(bg_blocks[x][y_cor][1] == BLANK)
				{
					removable = false;
				}
			}
			
			if(removable == true && removedLines.indexOf(y_cor) == -1)
			{			
				removedLines.push(y_cor);
				removedLinesNum = removedLinesNum + 1;
			}						
		}
		
		
		if(removedLinesNum > 0)
		{
			/* from up to down to remove lines */
			removedLines.sort(function(a,b){return a-b;});
			
			for(var i = 0; i < removedLines.length; i++){
				removeLine(removedLines[i]);
			}
			if(removedLinesNum == 1)
			{
				score = score + 100;
			}
			else if(removedLinesNum == 2)
			{
				score = score + 200;
			}
			else if(removedLinesNum == 3)
			{
				score = score + 400;
			}
			else if(removedLinesNum == 4)
			{
				score = score + 800;
			}
			
			//updateScores(score);
			drawBGBlocks(removedLines[removedLines.length-1]);		
		}
		
		initOK = initMovingBlocks();
		drawMovingBlocks();		
	}

	if(initOK == false)
	{
		gameOver();
	}
	else
	{
		setTimeout(timerEvent,INTERVAL);		
	}			
}

function gameStart()
{
	initMovingBlocks();
	drawMovingBlocks();		
}

function gameOver()
{
	alert("Game Over!");
}

function initCanvas()
{
	
	var height = jQuery(window).height();
	var width =  jQuery(window).width();
	
	$("body").width(width).height(height);

	if(width < height)
	{
		block_size = parseInt(width/10);	
		bg_width = block_size*10;
		bg_height = parseInt(height/block_size)*block_size;
	}
	else
	{
		block_size = parseInt(height/20);
		bg_width = block_size*10;
		bg_height = block_size*20;
	}
	
	var c = document.getElementById("baseBlocks");
	c.setAttribute('width',bg_width);
	c.setAttribute('height',bg_height);
	
}

function initScoreBoard()
{
	updateScores('');
}

function init()
{	
	initCanvas();
	initBG();
	//initScoreBoard();
	
	/* add keyboard event listener fow whole window, 
	 * not just canvas, which is not a good solution.
	 * jQuery should be included to have a better one.
	 */
	
	window.addEventListener('keydown', doKeyDown,true); 
    gameStart();
	setTimeout(timerEvent,INTERVAL);
}


