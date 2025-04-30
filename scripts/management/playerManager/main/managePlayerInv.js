import { ItemComponentTypes, ItemStack, system } from '@minecraft/server';
export class ManagePlayerInv {
    constructor(player) {
        this.inv = [];
        this.player = player;
        this.playerInv = this.player.getComponent('minecraft:inventory')?.container;
    }
    getItemInfo(item) {
        let damage = item.getComponent(ItemComponentTypes.Durability);
        const enchants = item.getComponent(ItemComponentTypes.Enchantable);
        return {
            id: item.typeId,
            name: item.nameTag ?? item.typeId.split(":").join(":"),
            count: item.amount,
            damage: damage?.damage ?? 0,
            maxDamage: damage?.maxDurability ?? 0,
            enchants: enchants?.getEnchantments().map(enchant => {
                return {
                    type: enchant.type,
                    level: enchant.level
                };
            }) ?? [],
        };
    }
    getInventory() {
        this.inv = [];
        if (!this.playerInv) {
            console.error('Player inventory not found');
            return [];
        }
        for (let i = 0; i < this.playerInv.size; i++) {
            const item = this.playerInv.getItem(i);
            if (item) {
                this.inv.push({
                    id: item.typeId,
                    count: item.amount,
                    slot: i
                });
            }
        }
        return this.inv.map(item => {
            return JSON.stringify({
                id: item.id,
                count: item.count,
                slot: item.slot
            });
        });
    }
    getItemsInSlots(slot) {
        if (!this.playerInv) {
            console.error('Player inventory not found');
            return null;
        }
        let items = [];
        slot.forEach((s) => {
            const item = this.playerInv?.getItem(s);
            if (item) {
                items.push(this.getItemInfo(item));
            }
            else {
                items.push({
                    id: 'none',
                    name: 'none',
                    count: 0,
                    damage: 0,
                    maxDamage: 0,
                    enchants: [],
                });
            }
        });
        return JSON.stringify(items, null, 2);
    }
    addItemToSlot(item) {
        if (!this.playerInv) {
            console.error('Player inventory not found');
            return;
        }
        system.run(() => {
            const newItem = new ItemStack(item.id, item.count);
            newItem.nameTag = item.name;
            this.playerInv?.addItem(newItem);
        });
    }
    removeItemsFromSlots(slot) {
        if (!this.playerInv) {
            console.error('Player inventory not found');
            return;
        }
        slot.forEach((s) => {
            const item = this.playerInv?.getItem(s);
            if (item) {
                this.playerInv?.setItem(s, undefined);
            }
        });
    }
}
