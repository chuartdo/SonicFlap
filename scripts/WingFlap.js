/** Wing Flapper by @Chuartdo **/

const Animation = require('Animation');
const Scene = require('Scene');
//const Diagnostics = require('Diagnostics');
const R = require("Reactive");
const Time = require("Time");
const Materials = require('Materials');
const TouchGestures = require('TouchGestures');


//const material = Materials.get('defaultMaterial0');
var wingMaterials =[];
Materials.findUsingPattern("rainbowColor*").then(function(lists){
    //Diagnostics.log("found " + lists.length)
    wingMaterials = lists;
})

 
const sceneRoot = Scene.root;
var base = [];

const planeTracker = sceneRoot.findAll('planeTracker0');
const targetNull = planeTracker;
const MAX_OBJ = 16;

var returnList = sceneRoot.findByPath("**/Bug*")
 
// local updown animation
const baseDriverParameters = {
    durationMilliseconds: 3000,
    loopCount: Infinity,
    mirror: true
};
 
const baseDriver = Animation.timeDriver(baseDriverParameters);
baseDriver.start();


var wingDriverParameters = {
    durationMilliseconds: 200,
    loopCount: Infinity,
    mirror: true
};

// Random Wing Flap
var wingDrivers = [] 

for (let i = 0; i< MAX_OBJ /2 ; i++) {
   wingDriverParameters.durationMilliseconds = 100+ Math.random() * 700;
   wingDrivers [i] = Animation.timeDriver(wingDriverParameters);
   wingDrivers[i].start();
}

const minDist =1.5;

returnList 
    .then(function(objs) { 
        base = objs;

  const lookAtPt = R.point(R.val(0), R.val(0),R.val(0) );
        for (let i=0; i< objs.length; i++) {
            var baseSampler = Animation.samplers.linear(0.4,Math.random() *2);
            const baseAnimation = Animation.animate(baseDriver,baseSampler);
            
            const rndX = Math.random() * minDist *2  - minDist + 0.3;
            const rndZ = Math.random() * minDist *2  - minDist + 0.3;
            const degree =  Math.atan2( rndX, rndZ) * 57.2958;
            base[i].transform.rotationY =  degree;
            
            base[i].transform.x = rndX
            base[i].transform.y  = baseAnimation;
            base[i].transform.z =rndZ;


        var rotationAngle = Math.random()  + 0.5;

        let dx=  i %   wingDrivers.length;
        var matColor;
        base[i].findFirst("Lwing").then(function(wingLeft) { 
            wingLeft.transform.rotationZ  = Animation.animate(wingDrivers[dx], Animation.samplers.easeInCirc(-rotationAngle,rotationAngle));
            wingLeft.findFirst("Plane").then ( function(mat) {
                 matColor = wingMaterials[i%wingMaterials.length];
                mat.material = matColor;
            });
        });

        base[i].findFirst("Rwing").then(function(wingRight) { 
            wingRight.transform.rotationZ  = Animation.animate(wingDrivers[dx], Animation.samplers.easeInCirc(rotationAngle,-rotationAngle));
            wingRight.findFirst("Plane").then ( function(mat) {
                mat.material = matColor;
            });
  
        });

 
        }
    }, function(errorMessage) { 
       //error handler function is invoked 
       //  Diagnostics.log(errorMessage); 
    })  .catch(function(errorMessage) { 
        //error handler function is invoked 
        //  Diagnostics.log(errorMessage); 
     }); 


function randomize() {
   for (let i= 0; i< base.length; i++) {
    base[i].transform.x = Math.random() * 1;
    base[i].transform.z = Math.random() * 0.5   ;
    //base[i].material = wingMaterials[i%wingMaterials.length];
   }
}

