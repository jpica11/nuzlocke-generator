import type { Pokemon, Route } from "../model/model";
import { Game } from "../model/model";

export function getRandomEncounter(selectedRoute: Route, game: Game, includeWater: boolean): string {
    if (!selectedRoute) {
        return '';
    }

    const possibleEncounters: Pokemon [] = selectedRoute.encounters.filter((possibleEncounter) => {
        if (game === Game.SCARLET) {
            return !possibleEncounter.isVioletExclusive;
        } else if(game === Game.VIOLET) {
            return !possibleEncounter.isScarletExclusive;
        }

        return [];
    });

    return possibleEncounters[Math.floor(Math.random()) * possibleEncounters.length].name;
  }