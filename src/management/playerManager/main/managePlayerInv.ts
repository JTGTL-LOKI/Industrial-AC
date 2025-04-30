import { world } from '@minecraft/server';
import { InvTypes } from '../types/InvTypes';



export class ManagePlayerInv {
    private inv: InvTypes[] = [];

    constructor() {
        
    }

    public getInventory(player: string): InvTypes | undefined {
        return this.inv.find(inv => InputDeviceInfo);
    }
}