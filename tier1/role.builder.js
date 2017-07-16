
module.exports = {
    /** @param {Creep} creep **/
    run: function(creep) {
        /*if(target == undefined) {
         target = creep.room.find(FIND_CONSTRUCTION_SITES)[0];
         }*/
        let building = Game.getObjectById(creep.memory.harvestPoint);
        let source = Game.getObjectById(creep.memory.buildPoint);
        if(building === null) {
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
            let site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(site !== null) {
                creep.memory.buildPoint = site.id;
            }
            else {
                creep.memory.buildPoint = null;
                console.log("Path blocked");
            }
            /*let source = creep.pos.findClosestByRange(FIND_SOURCES);
            if(source != null) {
                creep.memory.harvestPoint = source.id;
            }
            else {
                console.log("Path blocked");
            }*/
        }

        if(creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
            let source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(source !== null) {
                creep.memory.harvestPoint = source.id;
            }
            else {
                console.log("Path blocked");
            }
            creep.say('Empty', true);
        }
        if(!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
            creep.memory.building = true;
            let site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(site !== null) {
                creep.memory.buildPoint = site.id;
            }
            else {
                console.log("Path blocked");
            }
            let source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(source !== null) {
                creep.memory.harvestPoint = source.id;
            }
            else {
                console.log("Path blocked");
            }
            creep.say('Full', true);
        }
        /*targets = creep.room.find(FIND_CONSTRUCTION_SITES);
         creep.say(targets[0].id);*/
        if(creep.memory.building) {
            //var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            let target = Game.getObjectById(creep.memory.buildPoint);
            //creep.say("IM MINING", true);
            let buildRet = creep.build(target);
            if(buildRet === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ff00e3'}});
            }
            else if(buildRet === ERR_INVALID_TARGET){
                creep.moveTo(Game.flags.IdlePointBuilder, {visualizePathStyle: {stroke: '#ff8200'}});
            }
        }
        else {
            source = Game.getObjectById(creep.memory.harvestPoint);
            //creep.say(source);
            //creep.say("IM MINING", true);
            if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};
