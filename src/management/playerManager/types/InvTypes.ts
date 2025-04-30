import { ItemStack } from "@minecraft/server";




export interface InvTypes<T extends ItemStack = ItemStack> {
    main: T[]; // Main inventory, 36 slots
    armor: T[]; // Armor inventory, 4 slots
    offhand: T[]; // Offhand inventory, 1 slot
    crafting: T[]; // Crafting grid, 4 slots (2x2 crafting)
    craftingGrid: T[]; // Crafting grid, 9 slots (3x3 crafting)
    hotbar: T[]; // Hotbar, 9 slots
    enderChest: T[]; // Ender chest, 27 slots
    playerInventory: T[]; // Player inventory, 36 slots + 4 armor + 1 offhand + 9 hotbar = 50 total
}
