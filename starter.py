#!/usr/bin/env python3
import random
from pick import pick

import routes

starters = [
    'sprigatito',
    'fuecoco',
    'quaxly'
]

game_versions = [
    'Scarlet',
    'Violet'
]
game, index = pick(
    game_versions, 'Which game are you playing?')
print(game)

areas = []

for item in routes.__dict__.keys():
    # Add regex check below to match key names for lowercase
    if not item.startswith("__"):
        areas.append(item)

areas.sort()

option, index = pick(
    areas, 'Which area do you need to choose an encounter for?')
print(option)

if game == 'Scarlet':
    possible_encounters = [
        encounter for encounter in routes.__dict__.get(option).get('encounters') if not encounter.violet_exclusive]
if game == 'Violet':
    possible_encounters = [
        encounter for encounter in routes.__dict__.get(option).get('encounters') if not encounter.scarlet_exclusive]

print(random.choice(possible_encounters).name)
