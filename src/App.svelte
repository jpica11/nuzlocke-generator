<script lang="ts">
  import { Game, type Route } from "./model/model";
  import { getRoutes } from "./service/routeGenerator";
  import { getRandomEncounter } from "./service/service";

  let selectedRouteKey: string;
  let routes: Route[] = [];
  let encounter: string = "";
  let includeWater: boolean = false;
  let game: Game;

  routes = getRoutes();

  function updateEncounter(selectedRouteKey) {
    const selectedRoute: Route = routes.find(
      (route) => route.key === selectedRouteKey
    );

    encounter = getRandomEncounter(selectedRoute, game, includeWater);
  }
</script>

<main>
  <h1>Pokemon Scarlet/Violet Nuzlocke Encounter Generator</h1>

  <label>
    Which game are you playing?
    <select bind:value={game} name="games">
      <option value={Game.SCARLET} selected>Scarlet</option>
      <option value={Game.VIOLET}>Violet</option>
    </select>
  </label>

  <h3>Select area to generate encounter:</h3>
  <select
    bind:value={selectedRouteKey}
    on:change={() => updateEncounter(selectedRouteKey)}
    name="routes"
  >
    {#each routes as route}
      <option value={route.key}>{route.name}</option>
    {/each}
  </select>

  <label>
    Include water Encounters?
    <input type="checkbox" bind:checked={includeWater} />
  </label>
  <h4>Route encounter: {encounter}</h4>
</main>

<style>
</style>
