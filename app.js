function initCanvas(){
    var ctx = document.getElementById('my_canvas').getContext('2d');
    var backgroundImage = new Image();
    var auto_player  = new Image(); 
    var auto_verde  = new Image(); 
    var auto_violeta  = new Image();
    var auto_fachero  = new Image();
    var auto_naranja  = new Image();
    var auto_camion = new Image();
    var auto_ambulancia = new Image();
    var perdiste= new Image();
    var jugar= new Image();
    var creditos= new Image();
    
    

    backgroundImage.src = "images/calle.png";
    auto_player.src       = "images/car_azul.png";
    
    auto_verde.src     = "images/car_verde.png";
    auto_violeta.src     = "images/car_violeta.png";
    auto_fachero.src     = "images/car_fachero.png";
    auto_naranja.src     = "images/car_naranja.png";
    auto_camion.src     = "images/car_camion.png";
    auto_ambulancia.src     = "images/car_ambulancia.png";
    perdiste.src= "images/perdiste.png";


    var enemies=[];
    
    var cW = ctx.canvas.width; 
    var cH = ctx.canvas.height;

    var enemyTemplate = function(options){
        return {
            id: options.id,
            x: options.x,
            y: options.y,
            w: options.w,
            h: options.h,
            image: options.image || auto_verde
        }
    }
  
    var numEnemigos=220;        
    
    for(var i=0; i<numEnemigos;i++){
        var tipoEnemigo= Math.floor(Math.random() * (100 - 1)+1);
        console.log(tipoEnemigo)
        var posicionX= Math.floor(Math.random() * (572-0));
        var posicionY= Math.floor(Math.random() * (-20000-500));
        
        if(tipoEnemigo<=25){
            enemyType=auto_verde;
    }
        else if(tipoEnemigo>=26 && tipoEnemigo<=36 ){
            enemyType=auto_camion;
    }
        else if(tipoEnemigo>=37 && tipoEnemigo<=50 ){
            enemyType=auto_ambulancia
    }    
    else if(tipoEnemigo>=51 && tipoEnemigo<=56 ){
        enemyType=auto_fachero
    }    
    else if(tipoEnemigo>=57 && tipoEnemigo<=87 ){
        enemyType=auto_violeta
    }    
    else if(tipoEnemigo>=88 && tipoEnemigo<=100 ){
        enemyType=auto_naranja
    }    


     enemies.push([
        new enemyTemplate({ id: "auto "+i, x: posicionX, y: posicionY, w: 60, h: 120, image: enemyType })
    ])
     
    }
   
    var renderEnemies = function (enemyList) {
        for (var i = 0; i < enemyList.length; i++) {
            
            ctx.drawImage(enemyList[i][0].image, enemyList[i][0].x, enemyList[i][0].y += 1.1, enemyList[i][0].w, enemyList[i][0].h);
            
            launcher.hitDetectLowerLevel(enemyList[i]);
            
        }
       
            }

    function Launcher(){
      
        this.y = 500, 
        this.x = cW*.5-25, 
        this.w = 100, 
        this.h = 100,   
        this.direccion, 
       
         this.gameStatus = {
            over: false, 
            message: "",
            fillStyle: 'red',
            font: 'italic bold 36px Arial, sans-serif',
        }

        this.render = function () {
            if(this.direccion === 'left'){
                this.x-=2;
            } else if(this.direccion === 'right'){
                this.x+=2;
            }
            
            else if(this.direccion === "downArrow"){
            this.y+=2;
            }
            else if(this.direccion === "upArrow"){
            this.y-=2;
        }

            ctx.drawImage(backgroundImage, 0, 0); 
            ctx.drawImage(auto_player,this.x,this.y, 57, 100);
            
            
        }
        
       //colisión
        this.hitDetectLowerLevel = function(enemy){
            if ((enemy[0].y < this.y + 100 && enemy[0].y > this.y - 120) &&
                (enemy[0].x < this.x + 56 && enemy[0].x > this.x - 56)) { 
                    this.gameStatus.over = true;
                    
                    document.getElementById("hide").classList.remove("invisible");

                }

            if(this.gameStatus.over === true){  
                clearInterval(animateInterval); // termina intervalo
                
            }
        }
    }
    
    var launcher = new Launcher();
    function animar(){
        ctx.clearRect(0, 0, cW, cH);
        launcher.render();
        renderEnemies(enemies);
    }
    var animateInterval = setInterval(animar, 5);
    
    var left_btn  = document.getElementById('left_btn');
    var right_btn = document.getElementById('right_btn');
    

   document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37) // flecha izquierda
        {
         launcher.direccion = 'left';  
            if(launcher.x < cW*.2-100){
                launcher.x+=0;
                launcher.direccion = '';
            }
       }    
    });

    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 37) //  izquierda
        {
         launcher.x+=0;
         launcher.direccion = '';
        }
    }); 

    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 39) // flecha derecha
        {
         launcher.direccion = 'right';
         if(launcher.x > cW-50){
            launcher.x-=0;
            launcher.direccion = '';
         }
        
        }
    });

    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 39) // flecha derecha
        {
         launcher.x-=0;   
         launcher.direccion = '';
        }
    }); 


    document.addEventListener('keydown', function(event){
        if(event.keyCode == 38) // up arrow
        {
          launcher.direccion = 'upArrow';  
          if(launcher.y < cH*.2-80){
             launcher.y += 0;
             launcher.direccion = '';
           }
        }
   });

   document.addEventListener('keyup', function(event){
        if(event.keyCode == 38) // up arrow
        {
          launcher.y -= 0;
          launcher.direccion = '';
        }
   });

   document.addEventListener('keydown', function(event){
        if(event.keyCode == 40) // down arrow
        {
          launcher.direccion = 'downArrow';  
         if(launcher.y > cH - 110){
           launcher.y -= 0;
           launcher.direccion = '';
          }
        }
   });
   document.addEventListener('keyup', function(event){
        if(event.keyCode == 40) // down arrow
        {
          launcher.y += 0;
          launcher.direccion = '';
        }
   });
    
}

window.addEventListener('load', function(event) {
    initCanvas();
});
