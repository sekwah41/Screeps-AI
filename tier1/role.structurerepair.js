
module.exports = {
    /** @param {Creep} creep **/
    run: function(creep) {
        /*if(target == undefined) {
         target = creep.room.find(FIND_CONSTRUCTION_SITES)[0];
         }*/
        let repairing = Game.getObjectById(creep.memory.harvestPoint);
        let source = Game.getObjectById(creep.memory.repairPoint);
        if(repairing === null) {
            let source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(source !== null) {
                creep.memory.harvestPoint = source.id;
            }
            else {
                creep.memory.harvestPoint = null;
                console.log("Path blocked");
            }
        }
        if(source === null) {
            getHealTarget(creep);
        }

        if(creep.memory.repairing && creep.carry.energy === 0) {
            creep.memory.repairing = false;
            let source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(source !== null) {
                creep.memory.harvestPoint = source.id;
            }
            else {
                console.log("Path blocked");
            }
            creep.say('Empty', true);
        }
        if(!creep.memory.repairing && creep.carry.energy === creep.carryCapacity) {
            creep.memory.repairing = true;
            getHealTarget(creep);

            let source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(source !== null) {
                creep.memory.harvestPoint = source.id;
            }
            else {
                console.log("Path blocked");
            }
            creep.say('Full', true);
        }
        if(creep.memory.repairing) {
            let target = Game.getObjectById(creep.memory.repairPoint);
            let repairRet = creep.repair(target);
            if(repairRet === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ff00e3'}});
            }
            else if(repairRet === ERR_INVALID_TARGET) {
                getHealTarget(creep);
            }
        }
        else {
            source = Game.getObjectById(creep.memory.harvestPoint);
            if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};


function findSourceTarget(creep) {

}
// Get damaged structures and sort by health
function getHealTarget(creep) {
    let site = creep.room.find(FIND_MY_STRUCTURES, {
        filter: function(object) {
            return object.hits < object.hitsMax;
        }
    });

    let lowestHealth = _.min(site, s => s.hits);

    console.log(lowestHealth.structureType, lowestHealth.hits < lowestHealth.hitsMax, lowestHealth.hits, lowestHealth.hitsMax);

    if(lowestHealth !== null) {
        creep.memory.repairPoint = lowestHealth.id;
    }
    else {
        creep.memory.repairPoint = null;
        console.log("No min found");
    }
}
