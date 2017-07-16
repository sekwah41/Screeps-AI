let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');

let harvesterCount = 9;

let upgraderCount = 4;

let builderCount = 8;

let memoryCleanInterval = 10;

let sinceMemoryClean = 0;

// They seem to use http://underscorejs.org/

// TODO make miner and transport combo (miners focus on mining, transport focuses on moving back
// Also work on making it so they store stuff in storages and there are a few power units going around powering structures.
// Add counts for each to vary how many are needed.
// E.g. atm all units can mine move and carry. miners dont need to move they just need to get into position so they should only have
// one or two move parts and the rest mine. Then the rest should be there to distribute the units. Expand on getting more energy mines.
// Then looking on how to move it back to the base.
//
// Also need to take a look at placing defences near locations automatically or manually.
// Due to cpu time you are probably best letting defences work on maintaining a base.
// Maybe record all your blocks and walls and replace them if they are destroyed
// Also make units store tasks and make it so they ask a logic thing something every update if they dont need one. that or make
// each task have a fail or cancel function e.g. the structure no longer needs power.

// Also look at how all of the structures work.

// USE THE MEMORY A LOT MORE
// Also get it to check for closes stuff and work based on it (also storing the ids)


// Make it cache the path too and redo it if it cant move rather than do the path every time

// Need to make creeps check to see if its target still exists sometimes. Also move out of the way maybe
// Also need to clean code up a bit for the harvesters and builders.
// Then work on specialised transport and mining creeps then make other creeps get stuff from the storages.
// If mining creeps dont need to stop you stop wasting ticks and dont need as expensive of a creep to fully use a resource

let roomPower = Game.spawns['Spawn1'].room.energyCapacityAvailable;

let controllerLevel = Game.spawns['Spawn1'].room.controller.level;



module.exports.loop = function () {

    if(sinceMemoryClean++ % memoryCleanInterval === 0){
        cleanMemory();
    }

    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');

    //console.log(Game.getObjectById("TESEST"));

    // Wont activate if there isn not enough to spawn.
    let available = Game.spawns['Spawn1'].room.energyCapacityAvailable;

    if(roomPower !== available) {
        Game.notify("EXPANSION CREATED " + available);
    }

    let newLevel = Game.spawns['Spawn1'].room.controller.level;
    if(controllerLevel !== newLevel) {
        Game.notify("CONTROLLER LEVEL UP " + newLevel);
        controllerLevel = Game.spawns['Spawn1'].room.controller.level;
    }

    //console.log(available);
    if(available >= 450) {
        console.log("TIER 4");
        if(harvesters.length < harvesterCount) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE, MOVE], undefined, {role: 'harvester'});
            console.log("Spawning new harvester", newName);
        }
        else if(upgraders.length < upgraderCount) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE, MOVE], undefined, {role: 'upgrader'});
            console.log("Spawning new upgrader", newName);
        }
        else if(builders.length < builderCount) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE, MOVE], undefined, {role: 'builder'});
            console.log("Spawning new builder", newName);
        }
    }
    else if(available >= 400) {
        console.log("TIER 3");
        if(harvesters.length < harvesterCount) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'harvester'});
            console.log("Spawning new harvester", newName);
        }
        else if(upgraders.length < upgraderCount) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'upgrader'});
            console.log("Spawning new upgrader", newName);
        }
        else if(builders.length < builderCount) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'builder'});
            console.log("Spawning new builder", newName);
        }
    }
    else if(available >= 350) {
        console.log("TIER 2");
        if(harvesters.length < harvesterCount) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, CARRY, MOVE], undefined, {role: 'harvester'});
            console.log("Spawning new harvester", newName);
        }
        else if(upgraders.length < upgraderCount) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, CARRY, MOVE], undefined, {role: 'upgrader'});
            console.log("Spawning new upgrader", newName);
        }
        else if(builders.length < builderCount) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, CARRY, MOVE], undefined, {role: 'builder'});
            console.log("Spawning new builder", newName);
        }
    }
    else if(available >= 300) {
        console.log("TIER 1");
        if(harvesters.length < harvesterCount) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'harvester'});
            console.log("Spawning new harvester", newName);
        }
        else if(upgraders.length < upgraderCount) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'upgrader'});
            console.log("Spawning new upgrader", newName);
        }
        else if(builders.length < builderCount) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'builder'});
            console.log("Spawning new builder", newName);
        }
    }


    for(let roomName in Game.rooms) {
        defendAndHealRoom(roomName);
    }
    Game.spawns['Spawn1'].room.visual.text(
        'Upgraders: ️' + upgraders.length,
        Game.spawns['Spawn1'].pos.x + 1,
        Game.spawns['Spawn1'].pos.y + 1,
        {align: 'left', opacity: 0.5});
    Game.spawns['Spawn1'].room.visual.text(
        'Harvesters: ️️' + harvesters.length,
        Game.spawns['Spawn1'].pos.x + 1,
        Game.spawns['Spawn1'].pos.y + 2,
        {align: 'left', opacity: 0.5});
    Game.spawns['Spawn1'].room.visual.text(
        'Builders: ️️' + builders.length,
        Game.spawns['Spawn1'].pos.x + 1,
        Game.spawns['Spawn1'].pos.y + 3,
        {align: 'left', opacity: 0.5});

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    else{
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️ None',
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.5});
    }

    for(let name in Game.creeps) {
        //const startCpu = Game.cpu.getUsed();
        let creep = Game.creeps[name];
        // creep.say(creep.memory.role);
        //console.log(creep.name, creep.memory.role);
        switch(creep.memory.role) {
            case "harvester": roleHarvester.run(creep); break;
            case "upgrader": roleUpgrader.run(creep); break;
            case "builder": roleBuilder.run(creep); break;
        }
        //const elapsed = Game.cpu.getUsed() - startCpu;
        //console.log('Creep '+name+' has used '+elapsed+' CPU time');
    }
};

function defendAndHealRoom(roomName) {

    let towers = Game.rooms[roomName].find(
        FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});

    for(let tower of towers) {
        if(tower.energy >= 10) {
            let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }

            let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
        }
    }
}

function cleanMemory(){
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}