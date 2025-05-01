import { Player, world } from "@minecraft/server";




export class database {
    private database: string;
    private key!: string | number;
    private world!: import('@minecraft/server').World
    constructor(databaseName: string) {
        this.database = "DB:" + databaseName.toUpperCase();
    }

    private getData(key: string | number): string[] | null {
        const data = this.world.getDynamicProperty(key.toString()) as string | null;
        return data ? [data] : null;
    }

    public get(key: string | number): string | null {
        this.key = key;
        let data = this.getData(this.key);
        return data ? data[0] : null;
    }
}