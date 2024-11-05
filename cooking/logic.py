def get_noodle_recipe():
    levels = {
        "0%": 0,
        "25%": 0.75,
        "75%": 2.25,
        "100%": 3
    }
    
    recipe = {
        "Sweetness Level": {level: f"Sugar: {amount} tablespoons" for level, amount in levels.items()},
        "Sourness Level": {level: f"Vinegar: {amount} tablespoons" for level, amount in levels.items()},
        "Saltiness Level": {level: f"Fish sauce: {amount} tablespoons" for level, amount in levels.items()},
        "Spiciness Level": {level: f"Chili: {amount} teaspoons" for level, amount in levels.items()}
    }
    
    return recipe

def display_recipe():
    noodle_recipe = get_noodle_recipe()
    response = ""
    for flavor, levels in noodle_recipe.items():
        response += f"{flavor}\n"
        for level, amount in levels.items():
            response += f"  {level}: {amount}\n"
    return response
