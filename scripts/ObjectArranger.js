/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

const Scene = require('Scene');
const Patches = require('Patches');
const R = require("Reactive");
//const TouchGestures = require('TouchGestures');
export const Diagnostics = require('Diagnostics');

var selectedIndex = 0;

var Branches = [];
Scene.root.findByPath('**/DrumFin*').then((objects) => {
    Branches = objects;
    Diagnostics.log('Objects count' + objects.length);
    ArrangeBranches(8);
});

/*
// Randomize number of branches
Scene.root.findByPath('Branches').then((object) => {
    TouchGestures.onLongPress(object).subscribe(function (gesture) {
        Diagnostics.log('Long Press');
        const radius = 0.6+ Math.random()*0.7;
        ArrangeBranches(getRandomIntInclusive(3, Branches.length) ,radius);
    });


});
    */

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
    
function ArrangeBranches(NumBranch, radius =1) {
    if (NumBranch > Branches.length)
        NumBranch = Branches.length;

    

    for (let i = 0; i < NumBranch; i++) {
        let branch = Branches[i];
         /*
        TouchGestures.onTap(branch).subscribe(() => {
            Diagnostics.log('Objects count' + i);
       //     branch.inputs.setBoolean("PositionToggle", true);
            selectedIndex = i;
      //      Patches.inputs.setScalar("branchIndex", R.val(selectedIndex));
        });
        */

     //   branch.inputs.setBoolean("PositionToggle", false); 
       branch.inputs.setScalar("StartIndex", R.val(i % 10));  

        let angle = (i * 360 / NumBranch * Math.PI) / 180;
        branch.transform.rotationY = angle;

        branch.transform.z = radius * Math.cos(angle);
        branch.transform.x = radius * Math.sin(angle);
    }


}