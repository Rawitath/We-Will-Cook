def get_noodle_recipe(flavor, level, cup_size, noodle_type, soup_type, health_conditions, sweet_offset, salty_offset, sour_offset, spicy_offset):
    levels = {
        0: 0,
        25: 0.75,
        50: 1.5,
        75: 2.25,
        100: 3
    }
    intensity = levels[level] * cup_size
    
    if soup_type == "น้ำใส" and intensity > 1.5:
        intensity = 1.5
    if soup_type == "น้ำข้น" and intensity > 2:
        intensity = 2
    if soup_type == "น้ำตก" and intensity > 2:
        intensity = 2
    if soup_type == "ต้มยำ" and intensity > 2:
        intensity = 2
    if soup_type == "แห้ง" and intensity > 2:
        intensity = 2

    noodle_clear_broth = {
        "เส้นเล็ก": {"Sweetness Level": 1, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.25},
        "เส้นใหญ่": {"Sweetness Level": 0.25, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.25},
        "เส้นหมี่": {"Sweetness Level": 0.25, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.25},
        "บะหมี่": {"Sweetness Level": 1, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.25},
        "บะหมี่หยก": {"Sweetness Level": 0.25, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.25},
        "วุ้นเส้น": {"Sweetness Level": 1, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.25}
    }
    noodle_guay_teow_nam_khon = {
        "เส้นเล็ก": {"Sweetness Level": 1, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "เส้นใหญ่": {"Sweetness Level": 0.25, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "เส้นหมี่": {"Sweetness Level": 0.5, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "บะหมี่": {"Sweetness Level": 1, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "บะหมี่หยก": {"Sweetness Level": 1.25, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "วุ้นเส้น": {"Sweetness Level": 1.5, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.75}
    }
    noodle_guay_teow_nam_tok = {
        "เส้นเล็ก": {"Sweetness Level": 0.5, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.25},
        "เส้นใหญ่": {"Sweetness Level": 0.5, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.25},
        "เส้นหมี่": {"Sweetness Level": 0.75, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.25},
        "บะหมี่": {"Sweetness Level": 1, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "บะหมี่หยก": {"Sweetness Level": 1, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.25},
        "วุ้นเส้น": {"Sweetness Level": 1, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.25}
    }
    noodle_tom_yum = {
        "เส้นเล็ก": {"Sweetness Level": 1, "Sourness Level": 1.5, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "เส้นใหญ่": {"Sweetness Level": 0.5, "Sourness Level": 1.5, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "บะหมี่": {"Sweetness Level": 1, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "เส้นหมี่": {"Sweetness Level": 0.25, "Sourness Level": 1.5, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "บะหมี่หยก": {"Sweetness Level": 0.5, "Sourness Level": 1.5, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "วุ้นเส้น": {"Sweetness Level": 0.5, "Sourness Level": 1.5, "Saltiness Level": 1.5, "Spiciness Level": 0.75}
    }
    noodle_dry = {
        "เส้นเล็ก": {"Sweetness Level": 0.5, "Sourness Level": 0.5, "Saltiness Level": 2, "Spiciness Level": 1},
        "เส้นใหญ่": {"Sweetness Level": 0.25, "Sourness Level": 0.5, "Saltiness Level": 2, "Spiciness Level": 1},
        "เส้นหมี่": {"Sweetness Level": 0.25, "Sourness Level": 0.5, "Saltiness Level": 2, "Spiciness Level": 1},
        "บะหมี่": {"Sweetness Level": 0.5, "Sourness Level": 0.5, "Saltiness Level": 2, "Spiciness Level": 1},
        "บะหมี่หยก": {"Sweetness Level": 0.5, "Sourness Level": 0.5, "Saltiness Level": 2, "Spiciness Level": 1},
        "วุ้นเส้น": {"Sweetness Level": 0.5, "Sourness Level": 0.5, "Saltiness Level": 2, "Spiciness Level": 1}
    }

    noodle_flavors = {}
   
    if soup_type == "แห้ง":
        noodle_flavors = noodle_dry.get(noodle_type)
    if soup_type == "น้ำใส":
        noodle_flavors = noodle_clear_broth.get(noodle_type)
    elif soup_type == "น้ำข้น":
        noodle_flavors = noodle_guay_teow_nam_khon.get(noodle_type)
    elif soup_type == "น้ำตก":
        noodle_flavors = noodle_guay_teow_nam_tok.get(noodle_type)
    elif soup_type == "ต้มยำ":
        noodle_flavors = noodle_tom_yum.get(noodle_type)

    recipe = {
         "Sweetness Level": {'Sugar': noodle_flavors.get("Sweetness Level", 0) * intensity * sweet_offset},
        "Sourness Level": {'Vinegar': noodle_flavors.get("Sourness Level", 0) * intensity * sour_offset},
        "Saltiness Level": {'Fish sauce': noodle_flavors.get("Saltiness Level", 0) * intensity * salty_offset},
        "Spiciness Level": {'Chili flakes': noodle_flavors.get("Spiciness Level", 0) * intensity * spicy_offset}
    }
    
    for health_condition in health_conditions:
        if "โรคเบาหวาน" in health_condition or "โรคอ้วน" in health_condition:
            recipe["Sweetness Level"][list(recipe["Sweetness Level"].keys())[0]] = min(recipe["Sweetness Level"][list(recipe["Sweetness Level"].keys())[0]], 1)
        if "โรคความดันโลหิตสูง" in health_condition or "โรคไต" in health_condition:
            recipe["Saltiness Level"][list(recipe["Saltiness Level"].keys())[0]] = min(recipe["Saltiness Level"][list(recipe["Saltiness Level"].keys())[0]], 1)
        if "โรคกรดไหลย้อน" in health_condition: #ห้ามกินเปริ้ยวและเผ็ด
            recipe["Sourness Level"][list(recipe["Sourness Level"].keys())[0]] = min(recipe["Sourness Level"][list(recipe["Sourness Level"].keys())[0]], 1)
            recipe["Spiciness Level"][list(recipe["Spiciness Level"].keys())[0]] = min(recipe["Spiciness Level"][list(recipe["Spiciness Level"].keys())[0]], 1)
        if "โรคกระเพาะอาหาร" in health_condition:
            recipe["Spiciness Level"][list(recipe["Spiciness Level"].keys())[0]] = min(recipe["Spiciness Level"][list(recipe["Spiciness Level"].keys())[0]], 1)
    return recipe[flavor]

def display_recipe(flavordict, cup_size, noodle_type, soup_type, taste_pref):
    response = {}
    for flavor, level in flavordict.items():
        ingredients = get_noodle_recipe(flavor, level, cup_size, noodle_type, soup_type
        , taste_pref.health_conditions, taste_pref.sweet_offset, taste_pref.salty_offset, taste_pref.sour_offset, taste_pref.spicy_offset)
        for ingredient, amount in ingredients.items():
            if ingredient in response:
                response[ingredient] += amount
            else:
                response[ingredient] = amount
    return response
