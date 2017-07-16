let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleRepairer = require('role.structurerepair');

let harvesterCount = 7;

let upgraderCount = 5;

let builderCount = 8;

let repairerCount = 4;

let memoryCleanInterval = 10;

let sinceMemoryClean = 0;

let roomPower = Game.spawns['Spawn1'].room.energyCapacityAvailable;

let controllerLevel = Game.spawns['Spawn1'].room.controller.level;



module.exports.loop = function () {

    if(sinceMemoryClean++ % memoryCleanInterval === 0){
        cleanMemory();
    }

    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    let repairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer');

    //console.log(Game.getObjectById("TESEST"));

    // Wont activate if there isn not enough to spawn.
    let available = Game.spawns['Spawn1'].room.energyCapacityAvailable;

    if(harvesters.length < 2) {
        // Can be caused if something kills the creeps e.g. a nuke lands.
        console.log("SHORTAGE SPAWNING LOW CREEPS FOR REFUEL")
        available = 300;
    }

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
            let newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE, MOVE], undefined, {role: 'harvester'});
            console.log("Spawning new harvester", newName);
        }
        else if(upgraders.length < upgraderCount) {
            let newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, CARRY, CARRY, MOVE, MOVE], undefined, {role: 'upgrader'});
            console.log("Spawning new upgrader", newName);
        }
        else if(builders.length < builderCount) {
            let newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE, MOVE], undefined, {role: 'builder'});
            console.log("Spawning new builder", newName);
        }
        else if(repairers.length < repairerCount) {
            let newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, CARRY, MOVE, MOVE], undefined, {role: 'repairer'});
            console.log("Spawning new repairer", newName);
        }
    }
    else if(available >= 400) {
        console.log("TIER 3");
        if(harvesters.length < harvesterCount) {
            let newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'harvester'});
            console.log("Spawning new harvester", newName);
        }
        else if(upgraders.length < upgraderCount) {
            let newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'upgrader'});
            console.log("Spawning new upgrader", newName);
        }
        else if(builders.length < builderCount) {
            let newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'builder'});
            console.log("Spawning new builder", newName);
        }
        else if(repairers.length < repairerCount) {
            let newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, CARRY, MOVE, MOVE], undefined, {role: 'repairer'});
            console.log("Spawning new repairer", newName);
        }
    }
    else if(available >= 350) {
        console.log("TIER 2");
        if(harvesters.length < harvesterCount) {
            let newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, CARRY, MOVE], undefined, {role: 'harvester'});
            console.log("Spawning new harvester", newName);
        }
        else if(upgraders.length < upgraderCount) {
            let newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, CARRY, MOVE], undefined, {role: 'upgrader'});
            console.log("Spawning new upgrader", newName);
        }
        else if(builders.length < builderCount) {
            let newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, CARRY, MOVE], undefined, {role: 'builder'});
            console.log("Spawning new builder", newName);
        }
        else if(repairers.length < repairerCount) {
            let newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, CARRY, MOVE], undefined, {role: 'repairer'});
            console.log("Spawning new repairer", newName);
        }
    }
    else if(available >= 300) {
        console.log("TIER 1");
        if(harvesters.length < harvesterCount) {
            let newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'harvester'});
            console.log("Spawning new harvester", newName);
        }
        else if(upgraders.length < upgraderCount) {
            let newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'upgrader'});
            console.log("Spawning new upgrader", newName);
        }
        else if(builders.length < builderCount) {
            let newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'builder'});
            console.log("Spawning new builder", newName);
        }
        else if(repairers.length < repairerCount) {
            let newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'repairer'});
            console.log("Spawning new repairer", newName);
        }
    }


    /*for(let roomName in Game.rooms) {
        defendAndHealRoom(roomName);
    }*/

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
    Game.spawns['Spawn1'].room.visual.text(
        'Repairers: ️️' + repairers.length,
        Game.spawns['Spawn1'].pos.x + 1,
        Game.spawns['Spawn1'].pos.y + 4,
        {align: 'left', opacity: 0.5});

    if(Game.spawns['Spawn1'].spawning) {
        let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
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
            case "repairer": roleRepairer.run(creep); break;
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
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}