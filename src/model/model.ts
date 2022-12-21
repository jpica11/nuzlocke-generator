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

export interface Encounter {
    route: string;
    encounter: string;
    encounterStatus: EncounterStatus;
    nickname: string;
}

export enum EncounterStatus {
    Captured,
    Missed,
    Killed
}

export interface EncounterStore {
    
}

export interface TrackerStoreModel {
    encounters: Encounter[];
}