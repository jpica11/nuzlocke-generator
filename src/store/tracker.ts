import { writable } from 'svelte/store'
import type { TrackerStoreModel } from '../model/model'

const ENCOUNTER_DATA = 'ENCOUNTER_DATA'

export const encounters:any = writable(JSON.parse(localStorage.getItem(ENCOUNTER_DATA)) || {encounters: []})

encounters.subscribe((value: TrackerStoreModel) => {
    localStorage.setItem(ENCOUNTER_DATA, JSON.stringify(value));
})
