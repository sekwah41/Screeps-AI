module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) {

        let storage = Game.getObjectById(creep.memory.storagePoint);
        let harvest = Game.getObjectById(creep.memory.harvestPoint);
        if(harvest === null) {
            harvest = creep.pos.findClosestByPath(FIND_SOURCES);
            if(harvest !== null) {
                creep.memory.harvestPoint = harvest.id;
            }
            else {
                creep.memory.harvestPoint = null;
                console.log("Path blocked");
            }
        }
        if(storage === null) {
            storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_CONTAINER ||
                        structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN ||
                        structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if(storage !== null) {
                creep.memory.storagePoint = storage.id;
            }
            else {
                creep.memory.storagePoint = null;
                console.log("Paths blocked");
            }
        }

        if(creep.memory.harvesting && creep.carry.energy === creep.carryCapacity) {
            creep.memory.harvesting = false;
            storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_CONTAINER ||
                        structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                }
            });
            if(storage !== null) {
                creep.memory.storagePoint = storage.id;
            }
            else {
                creep.memory.storagePoint = null;
                console.log("Paths blocked");
                return;
            }
        }
        else if(!creep.memory.harvesting && creep.carry.energy === 0){
            creep.memory.harvesting = true;
            harvest = creep.pos.findClosestByPath(FIND_SOURCES);
            if(harvest !== null) {
                creep.memory.harvestPoint = harvest.id;
            }
            else {
                console.log("Paths blocked");
                creep.memory.harvestPoint = null;
                return;
            }
        }

        if(creep.memory.harvesting) {
            //creep.say("HARVESTING");
            harvest = Game.getObjectById(creep.memory.harvestPoint);
            if(creep.harvest(harvest) === ERR_NOT_IN_RANGE) {
                creep.moveTo(harvest, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else{
            //creep.say("STORING");
            storage = Game.getObjectById(creep.memory.storagePoint);
            if(creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#78ff79'}});
            }
        }


        /*var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_CONTAINER ||
                    structure.structureType == STRUCTURE_EXTENSION|| structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
            }
        });*/

        /*if(targets.length > 0) {
            if(creep.carry.energy < creep.carryCapacity) {
                var sources = creep.room.find(FIND_SOURCES);
                //var goid = id % sources.length;
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#78ff79'}});
                }
            }
        }*/

    }
};