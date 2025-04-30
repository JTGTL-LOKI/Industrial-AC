import { system, world } from "@minecraft/server";
import { ManagePlayerInv } from "../management/playerManager/main/managePlayerInv";

world.afterEvents.worldLoad.subscribe(({}) => {
    system.run(() => {
        let player = world.getPlayers()[0]; // Get the first player in the world
        let invMgr = new ManagePlayerInv(player)
        world.sendMessage(`Player's inventory: ${invMgr.addItemToSlot({id: "minecraft:stone",  name: "dasd", count: 1 })}`);
        
    })
})