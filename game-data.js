export const GAME_DATA = {
  "pets": {
    "Jinx": {
      "levels": {
        "1": {
          "luck_pct": 20.0,
          "enemy_buff_pct": 30.0
        },
        "2": {
          "luck_pct": 25.0,
          "enemy_buff_pct": 30.0
        },
        "3": {
          "luck_pct": 30.0,
          "enemy_buff_pct": 30.0
        },
        "4": {
          "luck_pct": 35.0,
          "enemy_buff_pct": 30.0
        },
        "5": {
          "luck_pct": 40.0,
          "enemy_buff_pct": 30.0
        }
      },
      "stacking": "additive",
      "condition": null
    },
    "Lion": {
      "levels": {
        "1": {
          "attack_speed_pct": 100.0,
          "money_speed_pct": 60.0,
          "orange_plots": 4.0
        },
        "2": {
          "attack_speed_pct": 125.0,
          "money_speed_pct": 70.0,
          "orange_plots": 5.0
        },
        "3": {
          "attack_speed_pct": 150.0,
          "money_speed_pct": 80.0,
          "orange_plots": 6.0
        },
        "4": {
          "attack_speed_pct": 175.0,
          "money_speed_pct": 90.0,
          "orange_plots": 7.0
        },
        "5": {
          "attack_speed_pct": 200.0,
          "money_speed_pct": 100.0,
          "orange_plots": 8.0
        }
      },
      "stacking": "independent",
      "condition": null
    },
    "Unicorn": {
      "levels": {
        "1": {
          "cooldown_s": 60.0
        },
        "2": {
          "cooldown_s": 52.5
        },
        "3": {
          "cooldown_s": 45.0
        },
        "4": {
          "cooldown_s": 37.5
        },
        "5": {
          "cooldown_s": 30.0
        }
      },
      "stacking": "independent",
      "condition": null
    },
    "Dino": {
      "levels": {
        "1": {
          "coins_pct": 20.0
        },
        "2": {
          "coins_pct": 25.0
        },
        "3": {
          "coins_pct": 30.0
        },
        "4": {
          "coins_pct": 35.0
        },
        "5": {
          "coins_pct": 40.0
        }
      },
      "stacking": "diminishing",
      "condition": null
    },
    "Dragon": {
      "levels": {
        "1": {
          "lifesteal_pct": 30.0
        },
        "2": {
          "lifesteal_pct": 32.5
        },
        "3": {
          "lifesteal_pct": 35.0
        },
        "4": {
          "lifesteal_pct": 37.5
        },
        "5": {
          "lifesteal_pct": 40.0
        }
      },
      "stacking": "diminishing",
      "condition": null
    },
    "Elephant": {
      "levels": {
        "1": {
          "stun_s": 5.0,
          "cooldown_s": 70.0
        },
        "2": {
          "stun_s": 5.75,
          "cooldown_s": 62.5
        },
        "3": {
          "stun_s": 6.5,
          "cooldown_s": 55.0
        },
        "4": {
          "stun_s": 7.25,
          "cooldown_s": 47.5
        },
        "5": {
          "stun_s": 8.0,
          "cooldown_s": 40.0
        }
      },
      "stacking": "diminishing",
      "condition": "Activates on its cooldown."
    },
    "Polar Bear": {
      "levels": {
        "1": {
          "thorn_pct": 15.0
        },
        "2": {
          "thorn_pct": 17.5
        },
        "3": {
          "thorn_pct": 20.0
        },
        "4": {
          "thorn_pct": 22.5
        },
        "5": {
          "thorn_pct": 25.0
        }
      },
      "stacking": "diminishing",
      "condition": null
    },
    "Tiger": {
      "levels": {
        "1": {
          "attack_damage_pct": 20.0,
          "attack_speed_pct": 20.0
        },
        "2": {
          "attack_damage_pct": 25.0,
          "attack_speed_pct": 22.5
        },
        "3": {
          "attack_damage_pct": 30.0,
          "attack_speed_pct": 25.0
        },
        "4": {
          "attack_damage_pct": 35.0,
          "attack_speed_pct": 27.5
        },
        "5": {
          "attack_damage_pct": 40.0,
          "attack_speed_pct": 30.0
        }
      },
      "stacking": "diminishing",
      "condition": null
    },
    "Turtle": {
      "levels": {
        "1": {
          "invincible_s": 5.0,
          "attack_speed_pct": 100.0
        },
        "2": {
          "invincible_s": 8.75,
          "attack_speed_pct": 125.0
        },
        "3": {
          "invincible_s": 12.5,
          "attack_speed_pct": 150.0
        },
        "4": {
          "invincible_s": 16.25,
          "attack_speed_pct": 175.0
        },
        "5": {
          "invincible_s": 20.0,
          "attack_speed_pct": 200.0
        }
      },
      "stacking": "diminishing",
      "condition": "One-time rescue when the door is about to be destroyed; grants door invincibility and turret attack speed."
    },
    "Arctic Fox": {
      "levels": {
        "1": {
          "attack_speed_pct": 10.0,
          "enemy_slow_pct": 10.0
        },
        "2": {
          "attack_speed_pct": 12.5,
          "enemy_slow_pct": 11.0
        },
        "3": {
          "attack_speed_pct": 15.0,
          "enemy_slow_pct": 12.0
        },
        "4": {
          "attack_speed_pct": 17.5,
          "enemy_slow_pct": 13.0
        },
        "5": {
          "attack_speed_pct": 20.0,
          "enemy_slow_pct": 14.0
        }
      },
      "stacking": "diminishing",
      "condition": null
    },
    "Bunny": {
      "levels": {
        "1": {
          "repair_pct_s": 0.5
        },
        "2": {
          "repair_pct_s": 0.75
        },
        "3": {
          "repair_pct_s": 1.0
        },
        "4": {
          "repair_pct_s": 1.25
        },
        "5": {
          "repair_pct_s": 1.5
        }
      },
      "stacking": "diminishing",
      "condition": null
    },
    "Monkey": {
      "levels": {
        "1": {
          "exp_pct": 20.0,
          "attack_damage_pct": -20.0,
          "supplies_pct": 5.0
        },
        "2": {
          "exp_pct": 25.0,
          "attack_damage_pct": -15.0,
          "supplies_pct": 10.0
        },
        "3": {
          "exp_pct": 30.0,
          "attack_damage_pct": -10.0,
          "supplies_pct": 15.0
        },
        "4": {
          "exp_pct": 35.0,
          "attack_damage_pct": -5.0,
          "supplies_pct": 20.0
        },
        "5": {
          "exp_pct": 40.0,
          "attack_damage_pct": 0.0,
          "supplies_pct": 25.0
        }
      },
      "stacking": "diminishing",
      "condition": null
    },
    "Raccoon": {
      "levels": {
        "1": {
          "money_flat": 100.0,
          "money_speed_pct": 15.0
        },
        "2": {
          "money_flat": 200.0,
          "money_speed_pct": 17.5
        },
        "3": {
          "money_flat": 300.0,
          "money_speed_pct": 20.0
        },
        "4": {
          "money_flat": 400.0,
          "money_speed_pct": 22.5
        },
        "5": {
          "money_flat": 500.0,
          "money_speed_pct": 25.0
        }
      },
      "stacking": "per_effect",
      "condition": null
    },
    "Rhino": {
      "levels": {
        "1": {
          "knockback_pct": 20.0,
          "cooldown_s": 18.0
        },
        "2": {
          "knockback_pct": 25.0,
          "cooldown_s": 16.0
        },
        "3": {
          "knockback_pct": 30.0,
          "cooldown_s": 14.0
        },
        "4": {
          "knockback_pct": 35.0,
          "cooldown_s": 12.0
        },
        "5": {
          "knockback_pct": 40.0,
          "cooldown_s": 10.0
        }
      },
      "stacking": "diminishing",
      "condition": "Activates on its cooldown."
    },
    "Beaver": {
      "levels": {
        "1": {
          "door_levels": 3.0
        },
        "2": {
          "door_levels": 4.0
        },
        "3": {
          "door_levels": 6.0
        },
        "4": {
          "door_levels": 7.0
        },
        "5": {
          "door_levels": 8.0
        }
      },
      "stacking": "diminishing",
      "condition": null
    },
    "Deer": {
      "levels": {
        "1": {
          "attack_speed_pct": 60.0,
          "attack_damage_pct": 60.0
        },
        "2": {
          "attack_speed_pct": 70.0,
          "attack_damage_pct": 70.0
        },
        "3": {
          "attack_speed_pct": 80.0,
          "attack_damage_pct": 80.0
        },
        "4": {
          "attack_speed_pct": 90.0,
          "attack_damage_pct": 90.0
        },
        "5": {
          "attack_speed_pct": 100.0,
          "attack_damage_pct": 100.0
        }
      },
      "stacking": "diminishing",
      "condition": "Triggers only when the door is below half health."
    },
    "Hippo": {
      "levels": {
        "1": {
          "health_pct": 20.0
        },
        "2": {
          "health_pct": 25.0
        },
        "3": {
          "health_pct": 30.0
        },
        "4": {
          "health_pct": 35.0
        },
        "5": {
          "health_pct": 40.0
        }
      },
      "stacking": "diminishing",
      "condition": null
    },
    "Penguin": {
      "levels": {
        "1": {
          "attack_damage_pct": 30.0,
          "attack_speed_pct": 30.0,
          "range_pct": 50.0
        },
        "2": {
          "attack_damage_pct": 35.0,
          "attack_speed_pct": 35.0,
          "range_pct": 50.0
        },
        "3": {
          "attack_damage_pct": 40.0,
          "attack_speed_pct": 40.0,
          "range_pct": 50.0
        },
        "4": {
          "attack_damage_pct": 45.0,
          "attack_speed_pct": 45.0,
          "range_pct": 50.0
        },
        "5": {
          "attack_damage_pct": 50.0,
          "attack_speed_pct": 50.0,
          "range_pct": 50.0
        }
      },
      "stacking": "diminishing",
      "condition": "Affects only the single most valuable turret."
    },
    "Bear": {
      "levels": {
        "1": {
          "range_pct": 10.0
        },
        "2": {
          "range_pct": 12.5
        },
        "3": {
          "range_pct": 15.0
        },
        "4": {
          "range_pct": 17.5
        },
        "5": {
          "range_pct": 20.0
        }
      },
      "stacking": "diminishing",
      "condition": null
    },
    "Cat": {
      "levels": {
        "1": {
          "cash_pct": 10.0
        },
        "2": {
          "cash_pct": 12.5
        },
        "3": {
          "cash_pct": 15.0
        },
        "4": {
          "cash_pct": 17.5
        },
        "5": {
          "cash_pct": 20.0
        }
      },
      "stacking": "diminishing",
      "condition": null
    },
    "Dog": {
      "levels": {
        "1": {
          "attack_damage_pct": 10.0
        },
        "2": {
          "attack_damage_pct": 12.5
        },
        "3": {
          "attack_damage_pct": 15.0
        },
        "4": {
          "attack_damage_pct": 17.5
        },
        "5": {
          "attack_damage_pct": 20.0
        }
      },
      "stacking": "diminishing",
      "condition": null
    },
    "Squirrel": {
      "levels": {
        "1": {
          "attack_speed_pct": 10.0
        },
        "2": {
          "attack_speed_pct": 12.5
        },
        "3": {
          "attack_speed_pct": 15.0
        },
        "4": {
          "attack_speed_pct": 17.5
        },
        "5": {
          "attack_speed_pct": 20.0
        }
      },
      "stacking": "diminishing",
      "condition": null
    },
    "Ghostie": {
      "levels": {
        "1": {
          "range_pct": 100.0,
          "cooldown_s": 15.0
        },
        "2": {
          "range_pct": 110.0,
          "cooldown_s": 19.0
        },
        "3": {
          "range_pct": 125.0,
          "cooldown_s": 22.0
        },
        "4": {
          "range_pct": 140.0,
          "cooldown_s": 26.0
        },
        "5": {
          "range_pct": 150.0,
          "cooldown_s": 30.0
        }
      },
      "stacking": "diminishing",
      "condition": "Only a single turret is affected."
    }
  },
  "units": {
    "The Bank": {
      "name": "The Bank",
      "source_name": "Bank",
      "category": "FARM",
      "max_level": 9,
      "levels": [
        {
          "level": 1,
          "money_given": 4000
        },
        {
          "level": 2,
          "money_given": 11000
        },
        {
          "level": 3,
          "money_given": 23000
        },
        {
          "level": 4,
          "money_given": 45000
        },
        {
          "level": 5,
          "money_given": 85000
        },
        {
          "level": 6,
          "money_given": 175000
        },
        {
          "level": 7,
          "money_given": 350000
        },
        {
          "level": 8,
          "money_given": 700000
        },
        {
          "level": 9,
          "money_given": 1400000
        }
      ],
      "production_interval_seconds": 270,
      "production_interval_status": "approximate_user_supplied",
      "catalog_status": "existing_entry",
      "auto_collect_interval_seconds": 60,
      "auto_collect_note": "Recorded as a separate timer; relationship to production timing has not been specified."
    },
    "Void Farm": {
      "name": "Void Farm",
      "source_name": "Void Farm",
      "category": "FARM",
      "max_level": 8,
      "levels": [
        {
          "level": 1,
          "money_given": 55
        },
        {
          "level": 2,
          "money_given": 265
        },
        {
          "level": 3,
          "money_given": 605
        },
        {
          "level": 4,
          "money_given": 1040
        },
        {
          "level": 5,
          "money_given": 1650
        },
        {
          "level": 6,
          "money_given": 2320
        },
        {
          "level": 7,
          "money_given": 3150
        },
        {
          "level": 8,
          "money_given": 4000
        }
      ],
      "production_interval_seconds": 5,
      "production_interval_status": "user_supplied",
      "catalog_status": "existing_entry"
    },
    "Money Printer": {
      "name": "Money Printer",
      "source_name": "Money Printer",
      "category": "FARM",
      "max_level": 8,
      "levels": [
        {
          "level": 1,
          "money_given": 30
        },
        {
          "level": 2,
          "money_given": 65
        },
        {
          "level": 3,
          "money_given": 125
        },
        {
          "level": 4,
          "money_given": 190
        },
        {
          "level": 5,
          "money_given": 300
        },
        {
          "level": 6,
          "money_given": 500
        },
        {
          "level": 7,
          "money_given": 2000
        },
        {
          "level": 8,
          "money_given": 5000
        }
      ],
      "production_interval_seconds": 5,
      "production_interval_status": "user_supplied",
      "catalog_status": "new_entry"
    },
    "Vault": {
      "name": "Vault",
      "source_name": "Vault",
      "category": "FARM",
      "max_level": 8,
      "levels": [
        {
          "level": 1,
          "money_given": 190,
          "production_interval_seconds": 15
        },
        {
          "level": 2,
          "money_given": 430,
          "production_interval_seconds": 14
        },
        {
          "level": 3,
          "money_given": 690,
          "production_interval_seconds": 13
        },
        {
          "level": 4,
          "money_given": 940,
          "production_interval_seconds": 12
        },
        {
          "level": 5,
          "money_given": 1160,
          "production_interval_seconds": 11
        },
        {
          "level": 6,
          "money_given": 1435,
          "production_interval_seconds": 10
        },
        {
          "level": 7,
          "money_given": 1840,
          "production_interval_seconds": 9
        },
        {
          "level": 8,
          "money_given": 2580,
          "production_interval_seconds": 8
        }
      ],
      "production_interval_seconds": null,
      "production_interval_status": "user_confirmed_all_levels",
      "catalog_status": "existing_entry",
      "production_interval_by_level_seconds": {
        "1": 15,
        "2": 14,
        "3": 13,
        "4": 12,
        "5": 11,
        "6": 10,
        "7": 9,
        "8": 8
      }
    },
    "Mining Cave": {
      "name": "Mining Cave",
      "source_name": "Mining Cave",
      "category": "FARM",
      "max_level": 8,
      "levels": [
        {
          "level": 1,
          "money_given": 30
        },
        {
          "level": 2,
          "money_given": 64
        },
        {
          "level": 3,
          "money_given": 116
        },
        {
          "level": 4,
          "money_given": 180
        },
        {
          "level": 5,
          "money_given": 272
        },
        {
          "level": 6,
          "money_given": 406
        },
        {
          "level": 7,
          "money_given": 612
        },
        {
          "level": 8,
          "money_given": 1050
        }
      ],
      "production_interval_seconds": 5,
      "production_interval_status": "user_supplied",
      "catalog_status": "existing_entry"
    },
    "Farm": {
      "name": "Farm",
      "source_name": "Farm",
      "category": "FARM",
      "max_level": 8,
      "levels": [
        {
          "level": 1,
          "money_given": 6
        },
        {
          "level": 2,
          "money_given": 14
        },
        {
          "level": 3,
          "money_given": 24
        },
        {
          "level": 4,
          "money_given": 37
        },
        {
          "level": 5,
          "money_given": 63
        },
        {
          "level": 6,
          "money_given": 114
        },
        {
          "level": 7,
          "money_given": 208
        },
        {
          "level": 8,
          "money_given": 380
        }
      ],
      "production_interval_seconds": 5,
      "production_interval_status": "user_supplied",
      "catalog_status": "new_entry"
    },
    "Military Base": {
      "name": "Military Base",
      "levels": [
        {
          "level": 1,
          "attack_damage_percent": 15,
          "range_percent": 0
        },
        {
          "level": 2,
          "attack_damage_percent": 20,
          "range_percent": 0
        },
        {
          "level": 3,
          "attack_damage_percent": 25,
          "range_percent": 0
        },
        {
          "level": 4,
          "attack_damage_percent": 30,
          "range_percent": 17
        },
        {
          "level": 5,
          "attack_damage_percent": 35,
          "range_percent": 33
        },
        {
          "level": 6,
          "attack_damage_percent": 40,
          "range_percent": 50
        }
      ],
      "category": "SUPPORT",
      "max_level": 6,
      "stacking": "non_stacking_damage_and_range",
      "catalog_status": "existing_entry",
      "eligible_buff_targets": "all_units",
      "can_buff_other_military_bases": true,
      "known_interaction": "Nearby Military Bases can buff each other with range; damage and range do not stack.",
      "duplicate_buff_formula": "do_not_add_damage_or_range"
    },
    "Protector Base": {
      "name": "Protector Base",
      "levels": [
        {
          "level": 1,
          "attack_speed_percent": 15,
          "shield_cooldown_seconds": null,
          "shield_status": "not_listed"
        },
        {
          "level": 2,
          "attack_speed_percent": 25,
          "shield_cooldown_seconds": null,
          "shield_status": "not_listed"
        },
        {
          "level": 3,
          "attack_speed_percent": 35,
          "shield_cooldown_seconds": null,
          "shield_status": "not_listed"
        },
        {
          "level": 4,
          "attack_speed_percent": 45,
          "shield_cooldown_seconds": 45,
          "shield_status": "listed"
        },
        {
          "level": 5,
          "attack_speed_percent": 50,
          "shield_cooldown_seconds": 35,
          "shield_status": "listed"
        },
        {
          "level": 6,
          "attack_speed_percent": 75,
          "shield_cooldown_seconds": 25,
          "shield_status": "listed"
        }
      ],
      "category": "SUPPORT",
      "max_level": 6,
      "stacking": "non_stacking_attack_speed",
      "catalog_status": "existing_entry",
      "eligible_buff_targets": "all_units",
      "eligible_shield_targets": "all_units",
      "duplicate_buff_formula": "do_not_add_attack_speed"
    },
    "Medical Base": {
      "name": "Medical Base",
      "levels": [
        {
          "level": 1,
          "repair_percent": 0.2,
          "repair_interval_seconds": 1
        },
        {
          "level": 2,
          "repair_percent": 0.35,
          "repair_interval_seconds": 1
        },
        {
          "level": 3,
          "repair_percent": 0.55,
          "repair_interval_seconds": 1
        },
        {
          "level": 4,
          "repair_percent": 0.85,
          "repair_interval_seconds": 1
        },
        {
          "level": 5,
          "repair_percent": 1.3,
          "repair_interval_seconds": 1
        },
        {
          "level": 6,
          "repair_percent": 2.0,
          "repair_interval_seconds": 1
        }
      ],
      "category": "SUPPORT",
      "max_level": 6,
      "stacking": "additive_multiple_near_same_door",
      "catalog_status": "existing_entry",
      "repair_target": "doors",
      "placement_condition": "Multiple Medical Bases must be near the door being repaired."
    },
    "Scarecrow": {
      "name": "Scarecrow",
      "category": "DAMAGE",
      "max_level": 8,
      "levels": [
        {
          "level": 1,
          "attack_damage": 100
        },
        {
          "level": 8,
          "attack_damage": 1750
        }
      ],
      "intermediate_level_values": "not_provided_do_not_interpolate",
      "attack_interval_seconds": null,
      "damage_per_second_status": "not_calculable_without_attack_interval",
      "catalog_status": "existing_entry"
    },
    "Juggernaut": {
      "name": "Juggernaut",
      "category": "DAMAGE",
      "max_level": 9,
      "levels": [
        {
          "level": 1,
          "attack_damage": 250
        },
        {
          "level": 9,
          "attack_damage": 10000
        }
      ],
      "intermediate_level_values": "not_provided_do_not_interpolate",
      "attack_interval_seconds": null,
      "damage_per_second_status": "not_calculable_without_attack_interval",
      "catalog_status": "existing_entry"
    },
    "Machine Mortar": {
      "name": "Machine Mortar",
      "category": "DAMAGE",
      "max_level": 9,
      "levels": [
        {
          "level": 1,
          "attack_damage": 1000
        },
        {
          "level": 9,
          "attack_damage": 16000
        }
      ],
      "intermediate_level_values": "not_provided_do_not_interpolate",
      "attack_interval_seconds": null,
      "damage_per_second_status": "not_calculable_without_attack_interval",
      "catalog_status": "existing_entry"
    },
    "World Ender": {
      "name": "World Ender",
      "category": "DAMAGE",
      "max_level": 8,
      "levels": [
        {
          "level": 1,
          "attack_damage": 120
        },
        {
          "level": 8,
          "attack_damage": 750
        }
      ],
      "intermediate_level_values": "not_provided_do_not_interpolate",
      "attack_interval_seconds": null,
      "damage_per_second_status": "not_calculable_without_attack_interval",
      "catalog_status": "existing_entry"
    },
    "Ice Turret": {
      "name": "Ice Turret",
      "category": "DAMAGE",
      "max_level": 8,
      "levels": [
        {
          "level": 1,
          "enemy_slow_percent": 20
        },
        {
          "level": 8,
          "enemy_slow_percent": 55
        }
      ],
      "intermediate_level_values": "not_provided_do_not_interpolate",
      "attack_interval_seconds": null,
      "damage_per_second_status": "not_applicable",
      "catalog_status": "existing_entry"
    }
  }
};
