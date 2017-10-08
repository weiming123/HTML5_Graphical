;(function(global){
  "use strict";
  var canvas=_.byId('canvas'),
      ctx=canvas.getContext('2d');
  if(!ctx){
    console.warn('Your brower may not support canvas...');
    return;
  }
  var body,bodyWid,bodyHei,
      RADIUS=8,
      MARGIN_TOP=50,
      MARGIN_LEFT=30,
      curShowTimeSeconds = 0,
      balls = [],
      colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"],
      endTime=new Date(2017,9,9,10,10,10),
      drawInterval=null;
  var init=function(){
    body=document.body;
    window.addEventListener('resize',sizeSet);
    sizeSet();
  },
  sizeSet=function(){
    bodyWid=body.offsetWidth;
    bodyHei=body.offsetHeight;
    canvas.width=bodyWid;
    canvas.height=bodyHei;
    setMarginLeft();
    curShowTimeSeconds = getCurrentShowTimeSeconds();
    drawInterval=setInterval(draw,50);
    draw();
  },
  setMarginLeft=function(){
      MARGIN_LEFT=(bodyWid-107*(RADIUS+1))/2;
  },
  draw=function(){
    render();
    update();
  },
  getCurrentShowTimeSeconds=function(){
    var nowTime=new Date();
    var diffTime=endTime.getTime()-nowTime.getTime();
    var ret=Math.round(diffTime/1000);
    return ret>0?ret:0;
  },
  update=function(){

      var nextShowTimeSeconds = getCurrentShowTimeSeconds();

      var nextHours = parseInt( nextShowTimeSeconds / 3600);
      var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 )
      var nextSeconds = nextShowTimeSeconds % 60

      var curHours = parseInt( curShowTimeSeconds / 3600);
      var curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600)/60 )
      var curSeconds = curShowTimeSeconds % 60

      if( nextSeconds != curSeconds ){
          if( parseInt(curHours/10) != parseInt(nextHours/10) ){
              addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(curHours/10) );
          }
          if( parseInt(curHours%10) != parseInt(nextHours%10) ){
              addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(curHours/10) );
          }

          if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
              addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10) );
          }
          if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
              addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10) );
          }

          if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
              addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10) );
          }
          if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
              addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
          }

          curShowTimeSeconds = nextShowTimeSeconds;
      }

      updateBalls();
  },
  updateBalls=function(){

      for( var i = 0 ; i < balls.length ; i ++ ){

          balls[i].x += balls[i].vx;
          balls[i].y += balls[i].vy;
          balls[i].vy += balls[i].g;

          if( balls[i].y >= bodyHei-RADIUS ){
              balls[i].y = bodyHei-RADIUS;
              balls[i].vy = - balls[i].vy*0.75;
          }
      }
  },
  addBalls=function( x , y , num ){
      for( var i = 0  ; i < countDownTimePointsArr[num].length ; i ++ )
          for( var j = 0  ; j < countDownTimePointsArr[num][i].length ; j ++ )
              if( countDownTimePointsArr[num][i][j] == 1 ){
                  var aBall = {
                      x:x+j*2*(RADIUS+1)+(RADIUS+1),
                      y:y+i*2*(RADIUS+1)+(RADIUS+1),
                      g:1.5+Math.random(),
                      vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                      vy:-5,
                      color: colors[ Math.floor( Math.random()*colors.length ) ]
                  }

                  balls.push( aBall );
              }
  },
  render=function(){
    ctx.clearRect(0,0,bodyWid, bodyHei);

    var hours = parseInt( curShowTimeSeconds / 3600),
        minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 ),
        seconds = curShowTimeSeconds % 60;
    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx);
    renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),ctx);
    renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,ctx);
    renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),ctx);
    renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),ctx);
    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,ctx);
    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),ctx);
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),ctx);
    for(var i=0,blen=balls.length;i<blen;i++){
      ctx.fillStyle=balls[i].color;
      ctx.beginPath();
      ctx.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
      ctx.closePath();
      ctx.fill();
    }
  },
  renderDigit=function(x,y,num,ctx){
    ctx.fillStyle="rgb(0,102,153)";
    for(var i=0,length=countDownTimePointsArr[num].length;i<length;i++){
      for(var j=0,len=countDownTimePointsArr[num][i].length;j<len;j++){
        if(countDownTimePointsArr[num][i][j] == 1){
          ctx.beginPath();
          ctx.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
          ctx.closePath();
          ctx.fill();
        }
      }
    }
  };
  init();
})(this);
