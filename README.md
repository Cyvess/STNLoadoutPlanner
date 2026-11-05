# STNLoadoutPlanner

A ten-player Survive The Night clan loadout planner by Cyves.

## Publish with GitHub Pages

1. Create a public repository named STNLoadoutPlanner.
2. Upload the contents of this package to its main branch. index.html must be at the repository root, alongside assets/.
3. In Settings > Pages, select Deploy from a branch, main, and / (root), then Save.
4. GitHub will show the website address after deployment.

No build step, dependencies, server, or database is required. To preview locally, run python -m http.server 5173 and open http://localhost:5173.

## Saved loadouts

Loadouts save in localStorage for the current browser and website address. Each visitor has their own saved lineups.

Download backup saves only the selected mode's lineup. Select any destination mode, then use Import backup to copy the saved lineup into it (for example, Easy to Apocalypse). The run title, player names, order, slot counts, levels, and retained fifth-slot items are included. Only the destination lineup is replaced, after confirmation; other modes are preserved.

Older backups containing all four modes are also supported: import uses the mode that was selected when that backup was downloaded. To transfer every mode to a different website address, repeat the import for each desired destination.

Copy for Discord and Download Loadouts export the current lineup as a PNG. If image clipboard access is unavailable, the planner offers an image download.

Drag an equipped unit or pet onto another unlocked slot to move it or swap with the item already there. Levels travel with the items, within one player or between players in the selected mode. Drops that would create duplicate items in either player's loadout are blocked, including duplicates in a retained disabled fifth slot. Click or tap an item to change it through the picker. Use each player's grip handle to reorder the entire player card.

The last row under Units in Overall Stats shows Total units: the sum of placement quantities for equipped towers, farms, and support bases across the selected mode's team. For example, two Medical Base loadout entries allow 2 × 4 = 8 units. Pets, empty slots, and disabled fifth slots are excluded. Quantities from Cy's supplied list are preserved in unit-quantities.js, including Crossbow and Turret for future catalog additions. Units with missing damage data still contribute their known quantity. If an equipped unit's quantity is unknown, the total shows the known quantity plus ? and reports the affected slot count. The same total appears in PNG exports. This quantity total does not multiply the existing base-stat calculations or equipped-item counts.

## Reference data

Game catalog names and artwork originated from https://lordjunes.github.io/STNShowcase/ . Game stats and stacking rules were supplied by Cyves. This is an unofficial clan planning tool.
