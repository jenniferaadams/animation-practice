const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = []; //list of all sprites to be drawn on our canvas
const maxSize = 200;

const circleImage = new Image();

let circleArray = [];

class SpinningCircle{
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.xMomentum = Math.random() * 15 - 7.5;
        this.yMomentum = Math.random() * 15 - 7.5;
        this.rotation = 0; //rotating around a circle
        this.opacity = 1;
        this.size = Math.random() * 3;
        this.image = "images/1.png";
    }
    update(){
        this.rotation += 1;
        this.size -= 0.01;
        this.opacity -= 0.01;
        this.x += this.xMomentum;
        this.y += this.yMomentum;
    }

    draw(){
       context.save();
       context.globalAlpha = this.opacity;
       context.translate(this.x,this.y);
       context.rotate(Math.PI / 180 * this.rotation);
       circleImage.src = this.image;
       context.drawImage(circleImage,(-circleImage.width / 4) * this.size, (-circleImage.height / 4) * this.size, (circleImage.width / 2) * this.size, (circleImage.height / 2) * this.size);
       context.restore(); 
    }
}
function spawnSpinningCircle(){
        if(particleArray.length < maxSize){
        particleArray.push(new SpinningCircle());
        console.log(particleArray);
        }
  
}
const clickMeBtn = document.querySelector(".clickMeBtn");
clickMeBtn.addEventListener("click", () => {
   spawnSpinningCircle();
})

// Start of the animation
function init(){
    particleArray = [];
}
// what is handled in our animation
function animate(){
    requestAnimationFrame(animate);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particleArray.forEach(function(particle){
        //update - function that updates our logic
        particle.update();
        //draw - function that draws our information
        particle.draw();
    });
    particleArray = particleArray.filter(function(particle){ //removes all elements the function returns false for
        return particle.opacity >= 0.08 && particle.size >= .1;
    });



}

init();
animate();