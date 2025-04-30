import { ItemComponent, ItemComponentTypes, ItemStack, Player, world, EnchantmentType, system } from '@minecraft/server';



export class ManagePlayerInv {
    private inv: { id: string; count: number; slot: number }[] = [];
    private player: Player;

    private playerInv: import('@minecraft/server').Container | undefined;

    constructor(player: Player) {
        this.player = player;
        this.playerInv = this.player.getComponent('minecraft:inventory')?.container;
    }
    private getItemInfo(item: ItemStack)  {
        let damage = item.getComponent(ItemComponentTypes.Durability)
        const enchants = item.getComponent(ItemComponentTypes.Enchantable)
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

    public getInventory(): string[] {
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

    public getItemsInSlots(slot: number[]): string | null {
       
        if (!this.playerInv) {
            console.error('Player inventory not found');
            return null;
        }
    
        let items: {
            id: string;
            name: string;
            count: number;
            damage: number;
            maxDamage: number;
            enchants: { type: EnchantmentType; level: number }[];
        }[] = [];
    
        slot.forEach((s) => {
            const item = this.playerInv?.getItem(s);
            if (item) {
                items.push(this.getItemInfo(item));
            } else {
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

    public addItemToSlot(item: {id: string, name: string, count: number}): void {
        if (!this.playerInv) {
            console.error('Player inventory not found'); 
            return;
        }
            system.run(() => {
                const newItem = new ItemStack(item.id, item.count);
                newItem.nameTag = item.name; // Set the name of the item
                this.playerInv?.addItem(newItem);
            })
    
    }

    public removeItemsFromSlots(slot: number[]): void {
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