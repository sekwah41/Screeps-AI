// Needs an idle point or some way to get out of the way.

let WALL_HEALTH_HEAL = 10000;

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep) {
        /*if(target == undefined) {
         target = creep.room.find(FIND_CONSTRUCTION_SITES)[0];
         }*/

        creep.say("HEALER");
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
            creep.say("Harvesting");
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
            creep.say("Healing");
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
            else if(repairRet === ERR_INVALID_TARGET || (repairRet === OK && target.hits === target.hitsMax)) {
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
    let site = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: function(object) {
            //console.log(object.structureType, object.ticksToDecay);
            if(object.structureType === STRUCTURE_WALL) {
                return object.hits < WALL_HEALTH_HEAL;
            }
            else if(!object.ticksToDecay) {
                return object.hits < object.hitsMax;
            }
            else {
                return object.hits < object.hitsMax / 2;
            }
        }
    });

    console.log("Going to heal ", site.structureType);

    // lowestHealth = _.min(site, s => s.hits);

    if(site !== null) {
        creep.memory.repairPoint = site.id;
    }
    else {
        creep.memory.repairPoint = null;
        console.log("No min found");
    }
}
