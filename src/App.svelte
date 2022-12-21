<script lang="ts">
  import {
    EncounterStatus,
    Game,
    type Encounter,
    type Route,
  } from "./model/model";
  import { getRoutes } from "./service/routeGenerator";
  import { getRandomEncounter } from "./service/service";
  import { encounters } from "./store/tracker";

  let selectedRouteKey: string;
  let routes: Route[] = [];
  let encounter: string = "";
  let game: Game;
  let showEncounter: boolean = false;
  let trackEncounters: boolean =
    $encounters.encounters.length > 0 ? true : false;

  routes = getRoutes();

  /**
   * Get encounter and show on page
   * @param selectedRouteKey
   */
  function updateEncounter(selectedRouteKey) {
    const selectedRoute: Route = routes.find(
      (route) => route.key === selectedRouteKey
    );

    encounter = getRandomEncounter(selectedRoute, game);
    showEncounter = true;
  }

  /**
   * Save encounter to store
   * @param encounterStatus
   */
  function saveEncounter(encounterStatus: EncounterStatus) {
    const selectedRoute: Route = routes.find(
      (route) => route.key === selectedRouteKey
    );

    console.log(JSON.stringify($encounters));
    const encounterToSave: Encounter = {
      route: selectedRoute.name,
      encounter: encounter,
      encounterStatus: encounterStatus,
      nickname: "",
    };

    $encounters.encounters = [...$encounters.encounters, encounterToSave];
    console.log(JSON.stringify($encounters));
    trackEncounters = true;
  }

  /**
   * Change encounter status
   * @param encounterStatus
   */
  function changeEncounterStatus(
    encounterStatus: EncounterStatus,
    index: number
  ) {
    const allEncounters: Encounter[] = $encounters.encounters;
    allEncounters[index].encounterStatus = encounterStatus;
    $encounters.encounters = [...allEncounters];
  }

  /**
   * Delete encounter
   * @param encounterStatus
   */
  function deleteEncounter(index: number) {
    const allEncounters: Encounter[] = $encounters.encounters;
    allEncounters.splice(index, 1);
    $encounters.encounters = [...allEncounters];
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

  <div class="content-container">
    <div id="encounter-generator" class="content-left">
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
      {#if showEncounter}
        <div class="encounter-row">
          <h4>Route encounter: {encounter}</h4>

          <button
            class="reroll-button"
            on:click={() => updateEncounter(selectedRouteKey)}
            >Re-roll encounter</button
          >
        </div>
        <div>
          <h4>
            Want to track your encounters? Select captured or missed below!
          </h4>
          <button
            name="encounter-status"
            class="radio"
            on:click={() => saveEncounter(EncounterStatus.Captured)}
          >
            Captured</button
          >
          <button
            name="encounter-status"
            class="radio"
            on:click={() => saveEncounter(EncounterStatus.Missed)}
          >
            Missed</button
          >
        </div>
      {/if}
    </div>
    {#if trackEncounters}
      <div id="encounter-tracker" class="content-right">
        <h3>Encounters by route:</h3>
        {#each $encounters.encounters as encounter, index}
          <p>
            {encounter.route} - {encounter.encounter} -
            <input
              type="radio"
              name="encounter-status"
              class="radio"
              on:click={() =>
                changeEncounterStatus(EncounterStatus.Captured, index)}
            />
            Captured
            <input
              type="radio"
              name="encounter-status"
              class="radio"
              on:click={() =>
                changeEncounterStatus(EncounterStatus.Missed, index)}
            />
            Missed
            <input
              type="radio"
              name="encounter-status"
              class="radio"
              on:click={() =>
                changeEncounterStatus(EncounterStatus.Killed, index)}
            />
            Killed

            <button on:click={() => deleteEncounter(index)}>Delete</button>
          </p>
        {/each}
      </div>
    {/if}
  </div>
</main>

<style>
  .content-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

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

  input[type="radio"] {
    accent-color: white;
  }

  .content-left {
    width: 50%;
  }
  .content-right {
    width: 50%;
  }
</style>
