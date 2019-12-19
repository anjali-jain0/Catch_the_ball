let cond = 0;
let scr = 0;
let y = 0;
let array = [];
let dy1 = 2.8;

let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
c.height = window.innerHeight*0.87;
c.width = window.innerWidth*0.85;

let mouse = {x : 10, y : 10};

window.addEventListener("mousemove", function(event){
  mouse.x = event.x - 100;
  mouse.y = event.y - 30;
  });
    
let selectColor = ["red","pink","lightgrey","lightgreen","orange","green","lightblue","purple","cream"];

function Ball(x, y, r, color, dy)
  {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.dy = dy;

    this.draw = function(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.lineWidth = "1";
      ctx.stroke();
      }
    this.update = function(){
        this.draw();
        this.y += this.dy;
      }
  }

function Bucket(x, y, x1, y1, x2, y2, x3, y3, color){
  this.x = x;
  this.y = y;
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.x3 = x3;
  this.y3 = y3;
  this.color = color;

  this.draw = function(){
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.lineTo(this.x3, this.y3);
    ctx.lineWidth = "6";
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x + 2.9, this.y + 20, 54.2, 22);
  }
}
    
let bucket1=new Bucket(c.width/2 - 30, c.height - 50, c.width/2 - 30, c.height - 5, c.width/2 + 30,
                       c.height - 5, c.width/2 + 30, c.height - 50, "white");

for (let i = 0; i < 200; i++){
    y -= 300;
    var x = Math.random()*(c.width-10)+10;
    var r = Math.random()*5 + 10;
    var randColor = selectColor[Math.floor(Math.random()*(selectColor.length-1))];
    var dy = dy1;
    array.push(new Ball(x, y, r, randColor, dy));
    if (i%10 == 0 && i != 0){
      dy1 += 0.2;
    }
}

animate();

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  ctx.font = "19px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("SCORE:", 10, 22);
  ctx.font = "19px Arial";
  ctx.fillText(scr, 90, 22);
  ctx.font = "60px Arial";
  ctx.strokeStyle = 'lightgrey';
  ctx.strokeText('Catch The Ball', 360, 290);
  bucket1.draw();
  bucket1.x = mouse.x;
  bucket1.x1 = mouse.x;
  bucket1.x2 = mouse.x+60;
  bucket1.x3 = mouse.x+60;
  for (let k = 0; k < array.length; k++){
    array[k].update();
  }
  for (var j = 0; j < array.length; j++){
    cond = (bucket1.y + 20) - (array[j].y + array[j].r) <= 0 && (array[j].x - array[j].r + 2) >= (bucket1.x + 6) 
          && (array[j].x + array[j].r - 2) <= (bucket1.x3) 
    if(cond)
    {
      bucket1.color = array[j].color;
      array[j].y = -10000000;
      array[j].r = 0;
      scr++;
    }
    if(array[j].y >= c.height)
      gameOver();
  }

}

function gameOver(){
  document.getElementById('endBox').style.display = 'block';
  document.getElementById('gamePage').style.opacity = '0.2';
  document.getElementById('score').innerHTML = scr ; 
}
    