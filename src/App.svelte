<script lang="ts">
  import { Game, type Route } from "./model/model";
  import { getRoutes } from "./service/routeGenerator";
  import { getRandomEncounter } from "./service/service";

  let selectedRouteKey: string;
  let routes: Route[] = [];
  let encounter: string = "";
  let game: Game;
  let showRerollButton: boolean = false;

  routes = getRoutes();

  function updateEncounter(selectedRouteKey) {
    const selectedRoute: Route = routes.find(
      (route) => route.key === selectedRouteKey
    );

    encounter = getRandomEncounter(selectedRoute, game);
    showRerollButton = true;
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
    <option>Select Route</option>
    {#each routes as route}
      <option value={route.key}>{route.name}</option>
    {/each}
  </select>

  <div class="encounter-row">
    <h4>Route encounter: {encounter}</h4>
    {#if showRerollButton}
      <button
        class="reroll-button"
        on:click={() => updateEncounter(selectedRouteKey)}
        >Re-roll encounter</button
      >
    {/if}
  </div>
</main>

<style>
  .encounter-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 1%;
    gap: 3rem;
  }

  .reroll-button {
    background-color: white;
    color: #242424;
    height: 3rem;
    align-self: center;
    font-weight: bold;
  }
</style>
