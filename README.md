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

## Reference data

Game catalog names and artwork originated from https://lordjunes.github.io/STNShowcase/ . Game stats and stacking rules were supplied by Cyves. This is an unofficial clan planning tool.
