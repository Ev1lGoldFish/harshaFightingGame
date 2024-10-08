const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./assets/stage.png",
  scale: 1,
});

const dog1 = new Sprite({
  position: {
    x: 300,
    y: 240,
  },
  imageSrc: "./assets/dog2.png",
  scale: 1.75,
  framesMax: 4,
});

const cat1 = new Sprite({
  position: {
    x: 880,
    y: 240,
  },
  imageSrc: "./assets/cat1.png",
  scale: 1.75,
  framesMax: 4,
});

const bird2 = new Sprite({
  position: {
    x: 440,
    y: 145,
  },
  imageSrc: "./assets/bird2.png",
  scale: 1.75,
  framesMax: 4,
});

const player = new Fighter({
  position: {
    x: 300,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: "./assets/fighter/Idle.png",
  framesMax: 10,
  scale: 3.25,
  offset: { x: 215, y: 160 },
  sprites: {
    idle: { imageSrc: "./assets/fighter/Idle.png", framesMax: 10 },
    run: { imageSrc: "./assets/fighter/Run.png", framesMax: 6 },
    jump: { imageSrc: "./assets/fighter/Jump.png", framesMax: 2 },
    fall: { imageSrc: "./assets/fighter/Fall.png", framesMax: 2 },
    attack1: { imageSrc: "./assets/fighter/Attack1.png", framesMax: 4 },
    damage: { imageSrc: "./assets/fighter/Damage.png", framesMax: 3 },
    death: { imageSrc: "./assets/fighter/Death.png", framesMax: 9 },
  },
  attackBox: {
    offset: { x: 40, y: 25 },
    width: 150,
    height: 50,
  },
});

const enemy = new Fighter({
  position: {
    x: 600,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: -50,
    y: 0,
  },

  imageSrc: "./assets/huntress/Idle.png",
  framesMax: 8,
  scale: 3.3,
  offset: { x: 215, y: 200 },
  sprites: {
    idle: { imageSrc: "./assets/huntress/Idle.png", framesMax: 8 },
    run: { imageSrc: "./assets/huntress/Run.png", framesMax: 8 },
    jump: { imageSrc: "./assets/huntress/Jump.png", framesMax: 2 },
    fall: { imageSrc: "./assets/huntress/Fall.png", framesMax: 2 },
    attack1: { imageSrc: "./assets/huntress/Attack2.png", framesMax: 5 },
    damage: { imageSrc: "./assets/huntress/Damage.png", framesMax: 3 },
    death: { imageSrc: "./assets/huntress/Death.png", framesMax: 8 },
  },
  attackBox: {
    offset: { x: -130, y: 25 },
    width: 140,
    height: 50,
  },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

decreaseTimer();

const animate = () => {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  dog1.update();
  bird2.update();
  cat1.update();
  c.fillStyle = "rgba(255, 255, 255, 0.2)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //player movement

  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
    player.switchSprite("run");
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
    player.switchSprite("run");
  } else {
    player.switchSprite("idle");
  }
  // player jumping
  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  }

  //enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
    enemy.switchSprite("run");
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
    enemy.switchSprite("run");
  } else {
    enemy.switchSprite("idle");
  }

  //enemy jumping
  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall");
  }

  //detect for collision for player and enemy gets hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.isAttacking &&
    player.framesCurrent === 2
  ) {
    enemy.damage();
    player.isAttacking = false;

    //document.querySelector("#enemyHealth").style.width = enemy.health + "%";
    gsap.to("#enemyHealth", {
      width: enemy.health + "%",
    });
  }

  //if player attack misses
  if (player.isAttacking && player.framesCurrent === 2) {
    player.isAttacking = false;
  }

  //detect for collision for enemy and player gets hit
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    player.damage();
    enemy.isAttacking = false;
    player.health -= 5;
    //document.querySelector("#playerHealth").style.width = player.health + "%";
    gsap.to("#playerHealth", {
      width: player.health + "%",
    });
  }

  //if enemy attack misses
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false;
  }

  //ending game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    matchResult({ player, enemy, timerId });
  }
};

animate();

window.addEventListener("keydown", (event) => {
  if (!player.dead) {
    switch (event.key) {
      case "d":
        keys.d.pressed = true;
        player.lastKey = "d";
        break;

      case "a":
        keys.a.pressed = true;
        player.lastKey = "a";
        break;
      case "w":
        player.velocity.y = -20;
        break;

      case " ":
        player.attack();
        break;
    }
  }

  if (!enemy.dead) {
    switch (event.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        enemy.lastKey = "ArrowRight";
        break;

      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = "ArrowLeft";
        break;
      case "ArrowUp":
        enemy.velocity.y = -20;
        break;

      case "ArrowDown":
        enemy.attack();
        break;
    }
  }
});

window.addEventListener("keyup", (event) => {
  //player keys
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }

  //enemy keys
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});
