


export interface PlayerData {
    id: string; // Player's unique identifier
    name: string; // Player's name
    firstJoin: number; // Timestamp of the first join
    lastJoin: number; // Timestamp of the last join
    online: boolean; // Whether the player is currently online
    inventory: string[]; // Player's inventory items in JSON format
}
