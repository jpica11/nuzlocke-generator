export interface Route {
    key: string;
    name: string;
    encounters: Pokemon[];
}

export interface Pokemon {
    name: string;
    isScarletExclusive: boolean;
    isVioletExclusive: boolean;
    probability: number;
    isWaterEncounter: boolean;
}

export enum Game {
    SCARLET,
    VIOLET
}