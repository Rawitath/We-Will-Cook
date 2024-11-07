def get_noodle_recipe(flavor, level, cup_size, noodle_type, soup_type=None):
    levels = {
        "0": 0,
        "25": 0.75,
        "50": 1.5,
        "75": 2.25,
        "100": 3
    }
    
    # คำนวณ intensity ตามระดับและขนาดถ้วย
    intensity = levels[level] * cup_size
    
    if soup_type == "น้ำใส" and intensity > 1.5:
        intensity = 1.5
    if soup_type == "น้ำข้น" and intensity > 2:
        intensity = 2
    if soup_type == "น้ำตก" and intensity > 2:
        intensity = 2
    if soup_type == "น้ำต้มยำ" and intensity > 2:
        intensity = 2
    # ข้อมูลรสชาติของน้ำซุปแต่ละประเภท
    noodle_clear_broth = {
        "เส้นเล็ก": {"Sweetness Level": 1, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.25},
        "เส้นใหญ่": {"Sweetness Level": 0.25, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.25},
        "หมี่ขาว": {"Sweetness Level": 0.25, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.25},
        "หมี่เหลือง": {"Sweetness Level": 1, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.25},
        "หมี่หยก": {"Sweetness Level": 0.25, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.25},
        "วุ้นเส้น": {"Sweetness Level": 1, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 1}
    }
    noodle_guay_teow_nam_khon = {
        "เส้นเล็ก": {"Sweetness Level": 1, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "เส้นใหญ่": {"Sweetness Level": 0.25, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "หมี่ขาว": {"Sweetness Level": 0.5, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "หมี่เหลือง": {"Sweetness Level": 1, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "หมี่หยก": {"Sweetness Level": 1.25, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "วุ้นเส้น": {"Sweetness Level": 1.5, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.75}
    }
    noodle_guay_teow_nam_tok = {
        "เส้นเล็ก": {"Sweetness Level": 0.5, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.25},
        "เส้นใหญ่": {"Sweetness Level": 0.5, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.25},
        "หมี่ขาว": {"Sweetness Level": 0.75, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.25},
        "หมี่เหลือง": {"Sweetness Level": 1, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "หมี่หยก": {"Sweetness Level": 1, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.25},
        "วุ้นเส้น": {"Sweetness Level": 1, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.25}
    }
    noodle_tom_yum = {
        "เส้นเล็ก": {"Sweetness Level": 1, "Sourness Level": 1.5, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "เส้นใหญ่": {"Sweetness Level": 0.5, "Sourness Level": 1.5, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "หมี่เหลือง": {"Sweetness Level": 1, "Sourness Level": 0.75, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "หมี่ขาว": {"Sweetness Level": 0.25, "Sourness Level": 1.5, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "หมี่หยก": {"Sweetness Level": 0.5, "Sourness Level": 1.5, "Saltiness Level": 1.5, "Spiciness Level": 0.75},
        "วุ้นเส้น": {"Sweetness Level": 0.5, "Sourness Level": 1.5, "Saltiness Level": 1.5, "Spiciness Level": 0.75}
    }
    if soup_type == "น้ำใส":
        noodle_flavors = noodle_clear_broth.get(noodle_type, {})
    elif soup_type == "น้ำข้น":
        noodle_flavors = noodle_guay_teow_nam_khon.get(noodle_type, {})
    elif soup_type == "น้ำตก":
        noodle_flavors = noodle_guay_teow_nam_tok.get(noodle_type, {})
    elif soup_type == "น้ำต้มยำ":
        noodle_flavors = noodle_tom_yum.get(noodle_type, {})
    recipe = {
         "Sweetness Level": {'Sugar': noodle_flavors.get("Sweetness Level", 0) * intensity},
        "Sourness Level": {'Vinegar/Tamarind': noodle_flavors.get("Sourness Level", 0) * intensity},
        "Saltiness Level": {'Fish sauce': noodle_flavors.get("Saltiness Level", 0) * intensity},
        "Spiciness Level": {'Chili paste/Flakes': noodle_flavors.get("Spiciness Level", 0) * intensity}
    }
    return recipe[flavor]
def display_recipe(flavordict, cup_size, noodle_type, soup_type=None):
    cup_sizes = {
        'เล็ก': 1,
        'กลาง': 1.5,
        'ใหญ่': 2
    }
    cup_multiplier = cup_sizes.get(cup_size, 1)
    response = {}
    for flavor, level in flavordict.items():
        ingredients = get_noodle_recipe(flavor, level, cup_multiplier, noodle_type, soup_type)
        for ingredient, amount in ingredients.items():
            if ingredient in response:
                response[ingredient] += amount
            else:
                response[ingredient] = amount
    return response
