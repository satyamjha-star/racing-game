class Game {
  constructor(){
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(c1);
    car2 = createSprite(300,200);
    car2.addImage(c2);
    car3 = createSprite(500,200);
    car3.addImage(c3);
    car4 = createSprite(700,200);
    car4.addImage(c4);
    cars = [car1, car2, car3, car4];
    obstacle=new Group();
    var x1=0;
    var y1=0;
    for(var i=0;i<=5;i=i+1){
      x1=random(200,950);
      y1=random(-displayWidth*4,displayHeight-300);
      obs=createSprite(x1,y1);
      obs.addImage(f1);
      obstacle.add(obs);
    }
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getFinishedPlayers();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
            background(ground);
            image(track,0,-displayHeight*4,displayWidth,displayHeight*5);

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = 200+(index*200)+allPlayers[plr].xPos;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    if(passedFinish===false){
    if(keyIsDown(UP_ARROW) && player.index !== null){
      if(cars[player.index-1].isTouching(obstacle)){
        player.distance=player.distance+2
        player.update();
        sound.play();
      }
      else{
        player.distance +=10
        player.update();
      }
      }
     
      if(keyIsDown(LEFT_ARROW) ){
       if(cars[player.index-1].isTouching(obstacle)){
        player.xPos=player.xPos-2;
        player.update();
      sound.play();}
        else{
          player.xPos=player.xPos-10;
          player.update();
        }
      }
      if(keyIsDown(RIGHT_ARROW)){
        if(cars[player.index-1].isTouching(obstacle)){
          player.xPos=player.xPos+2;
          player.update();sound.play();}
          else{
            player.xPos=player.xPos+10;
            player.update();
          }
      }}
    

    if(player.distance>displayHeight*5-80&&passedFinish===false){
      player.rank=finishedPlayers+1;
      Player.updateFinishedPlayers()
      player.update();passedFinish=true;
    }

    drawSprites();
  }
  displayRanks(){
    background('yellow');
    camera.position.x=0;
    camera.position.y=0;
    imageMode(CENTER);
    image(bronze,-displayWidth/4,-100+displayHeight/9,200,240);
    image(silver,displayWidth/4,-100+displayHeight/9,225,270);
    image(gold,0,-100,250,300);
    for(var i=1;i<5;i++){
      var playerIndex="player"+i;
      var place=allPlayers[playerIndex].rank;
      var name=allPlayers[playerIndex].name;
      textAlign(CENTER);
      textSize(50);
      if(place===1){
        text("first: "+name,0,85);
      }
      else if(place===2){
        text("Second: "+name,displayWidth/4,displayHeight/9+73);
      }
      else if (place===3){
        text("Third: "+name,-displayWidth/4,displayHeight/10+76);
      }
      else{
        textSize(30);
        text("Honorable Mention: "+name,0,225);
      }
    }
  }
  }
   


