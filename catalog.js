// Reference: STNShowcase catalog, extended with unit data supplied by Cy.
const CATALOG = [
  {
    "name": "Scarecrow",
    "role": "DAMAGE",
    "max": 8,
    "rarity": "exclusive",
    "hex": "#f97316",
    "img": "assets/Scarecrow.png"
  },
  {
    "name": "Juggernaut",
    "role": "DAMAGE",
    "max": 9,
    "rarity": "divine",
    "hex": "#ffffff",
    "img": "assets/Juggernaut.png"
  },
  {
    "name": "Machine Mortar",
    "role": "DAMAGE",
    "max": 9,
    "rarity": "divine",
    "hex": "#ffffff",
    "img": "assets/MortarMachine.png"
  },
  {
    "name": "World Ender",
    "role": "DAMAGE",
    "max": 8,
    "rarity": "legendary",
    "hex": "#f59e0b",
    "img": "assets/WorldEnder.png"
  },
  {
    "name": "Samurai",
    "role": "DAMAGE",
    "max": 8,
    "rarity": "legendary",
    "hex": "#f59e0b",
    "img": "assets/Samurai.png"
  },
  {
    "name": "Railgun",
    "role": "DAMAGE",
    "max": 8,
    "rarity": "legendary",
    "hex": "#f59e0b",
    "img": "assets/Railgun.png"
  },
  {
    "name": "Lava Launcher",
    "role": "DAMAGE",
    "max": 8,
    "rarity": "legendary",
    "hex": "#f59e0b",
    "img": "assets/LavaLauncher.png"
  },
  {
    "name": "Ice Turret",
    "role": "DAMAGE",
    "max": 8,
    "rarity": "legendary",
    "hex": "#f59e0b",
    "img": "assets/IceTurret.png"
  },
  {
    "name": "Rocketeer",
    "role": "DAMAGE",
    "max": 8,
    "rarity": "epic",
    "hex": "#a855f7",
    "img": "assets/Rocketeer.png"
  },
  {
    "name": "Tesla",
    "role": "DAMAGE",
    "max": 8,
    "rarity": "epic",
    "hex": "#a855f7",
    "img": "assets/Tesla.png"
  },
  {
    "name": "Toxic Turret",
    "role": "DAMAGE",
    "max": 8,
    "rarity": "mythic",
    "hex": "#ef4444",
    "img": "assets/ToxicTurret.png"
  },
  {
    "name": "Fire Spitter",
    "role": "DAMAGE",
    "max": 8,
    "rarity": "mythic",
    "hex": "#ef4444",
    "img": "assets/FireSpitter.png"
  },
  {
    "name": "Ballista",
    "role": "DAMAGE",
    "max": 8,
    "rarity": "mythic",
    "hex": "#ef4444",
    "img": "assets/Ballista.png"
  },
  {
    "name": "Mortar",
    "role": "DAMAGE",
    "max": 8,
    "rarity": "rare",
    "hex": "#38bdf8",
    "img": "assets/Mortar.png"
  },
  {
    "name": "Flamethrower",
    "role": "DAMAGE",
    "max": 8,
    "rarity": "rare",
    "hex": "#38bdf8",
    "img": "assets/Flamethrower.png"
  },
  {
    "name": "Cannon",
    "role": "DAMAGE",
    "max": 10,
    "rarity": "rare",
    "hex": "#38bdf8",
    "img": "assets/Cannon.png"
  },
  {
    "name": "Medical Base",
    "role": "SUPPORT",
    "max": 6,
    "rarity": "epic",
    "hex": "#a855f7",
    "img": "assets/MedicalBase.png"
  },
  {
    "name": "Military Base",
    "role": "SUPPORT",
    "max": 6,
    "rarity": "mythic",
    "hex": "#ef4444",
    "img": "assets/MilitaryBase.png"
  },
  {
    "name": "Protector Base",
    "role": "SUPPORT",
    "max": 6,
    "rarity": "epic",
    "hex": "#a855f7",
    "img": "assets/ProtectorBase.png"
  },
  {
    "name": "The Bank",
    "role": "FARM",
    "max": 9,
    "rarity": "divine",
    "hex": "#ffffff",
    "img": "assets/TheBank.png"
  },
  {
    "name": "Void Farm",
    "role": "FARM",
    "max": 8,
    "rarity": "legendary",
    "hex": "#f59e0b",
    "img": "assets/VoidFarm.png"
  },
  {
    "name": "Vault",
    "role": "FARM",
    "max": 8,
    "rarity": "epic",
    "hex": "#a855f7",
    "img": "assets/Vault.png"
  },
  {
    "name": "Mining Cave",
    "role": "FARM",
    "max": 8,
    "rarity": "rare",
    "hex": "#38bdf8",
    "img": "assets/MiningCave.png"
  },
  {
    "name": "Ghostie",
    "role": "PET",
    "max": 5,
    "rarity": "exclusive",
    "hex": "#f97316",
    "img": "assets/Ghostie.png"
  },
  {
    "name": "Jinx",
    "role": "PET",
    "max": 5,
    "rarity": "divine",
    "hex": "#ffffff",
    "img": "assets/Jinx.png"
  },
  {
    "name": "Unicorn",
    "role": "PET",
    "max": 5,
    "rarity": "divine",
    "hex": "#ffffff",
    "img": "assets/Unicorn.png"
  },
  {
    "name": "Lion",
    "role": "PET",
    "max": 5,
    "rarity": "divine",
    "hex": "#ffffff",
    "img": "assets/Lion.png"
  },
  {
    "name": "Dragon",
    "role": "PET",
    "max": 5,
    "rarity": "legendary",
    "hex": "#f59e0b",
    "img": "assets/Dragon.png"
  },
  {
    "name": "Turtle",
    "role": "PET",
    "max": 5,
    "rarity": "legendary",
    "hex": "#f59e0b",
    "img": "assets/Turtle.png"
  },
  {
    "name": "Elephant",
    "role": "PET",
    "max": 5,
    "rarity": "legendary",
    "hex": "#f59e0b",
    "img": "assets/Elephant.png"
  },
  {
    "name": "Polar Bear",
    "role": "PET",
    "max": 5,
    "rarity": "legendary",
    "hex": "#f59e0b",
    "img": "assets/PolarBear.png"
  },
  {
    "name": "Dino",
    "role": "PET",
    "max": 5,
    "rarity": "legendary",
    "hex": "#f59e0b",
    "img": "assets/Dino.png"
  },
  {
    "name": "Tiger",
    "role": "PET",
    "max": 5,
    "rarity": "legendary",
    "hex": "#f59e0b",
    "img": "assets/Tiger.png"
  },
  {
    "name": "Rhino",
    "role": "PET",
    "max": 5,
    "rarity": "mythic",
    "hex": "#ef4444",
    "img": "assets/Rhino.png"
  },
  {
    "name": "Monkey",
    "role": "PET",
    "max": 5,
    "rarity": "mythic",
    "hex": "#ef4444",
    "img": "assets/Monkey.png"
  },
  {
    "name": "Bunny",
    "role": "PET",
    "max": 5,
    "rarity": "mythic",
    "hex": "#ef4444",
    "img": "assets/Bunny.png"
  },
  {
    "name": "Arctic Fox",
    "role": "PET",
    "max": 5,
    "rarity": "mythic",
    "hex": "#ef4444",
    "img": "assets/ArcticFox.png"
  },
  {
    "name": "Deer",
    "role": "PET",
    "max": 5,
    "rarity": "epic",
    "hex": "#a855f7",
    "img": "assets/Deer.png"
  },
  {
    "name": "Beaver",
    "role": "PET",
    "max": 5,
    "rarity": "epic",
    "hex": "#a855f7",
    "img": "assets/Beaver.png"
  },
  {
    "name": "Penguin",
    "role": "PET",
    "max": 5,
    "rarity": "epic",
    "hex": "#a855f7",
    "img": "assets/Penguin.png"
  },
  {
    "name": "Hippo",
    "role": "PET",
    "max": 5,
    "rarity": "epic",
    "hex": "#a855f7",
    "img": "assets/Hippo.png"
  },
  {
    "name": "Raccoon",
    "role": "PET",
    "max": 5,
    "rarity": "mythic",
    "hex": "#ef4444",
    "img": "assets/Raccoon.png"
  },
  {
    "name": "Squirrel",
    "role": "PET",
    "max": 5,
    "rarity": "rare",
    "hex": "#38bdf8",
    "img": "assets/Squirrel.png"
  },
  {
    "name": "Dog",
    "role": "PET",
    "max": 5,
    "rarity": "rare",
    "hex": "#38bdf8",
    "img": "assets/Dog.png"
  },
  {
    "name": "Cat",
    "role": "PET",
    "max": 5,
    "rarity": "rare",
    "hex": "#38bdf8",
    "img": "assets/Cat.png"
  },
  {
    "name": "Bear",
    "role": "PET",
    "max": 5,
    "rarity": "rare",
    "hex": "#38bdf8",
    "img": "assets/Bear.png"
  },
  {
    "name": "Money Printer",
    "role": "FARM",
    "max": 8,
    "rarity": "unspecified",
    "hex": "#9aabbf",
    "img": "assets/MoneyPrinter.svg"
  },
  {
    "name": "Farm",
    "role": "FARM",
    "max": 8,
    "rarity": "unspecified",
    "hex": "#9aabbf",
    "img": "assets/Farm.svg"
  }
];
