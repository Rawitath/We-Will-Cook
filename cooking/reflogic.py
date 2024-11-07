def get_noodle_recipe(flavor, level, cup_size):
    levels = {
        "0": 0,
        "25": 0.75,
        "50": 1.5,
        "75": 2.25,
        "100": 3
    }
    recipe = {
        "Sweetness Level": {'Sugar': levels[level] * cup_size},
        "Sourness Level": {'Vinegar': levels[level] * cup_size},
        "Saltiness Level": {'Fish sauce': levels[level] * cup_size},
        "Spiciness Level": {'Chili': levels[level] * cup_size}
    }
    return recipe[flavor]

def display_recipe(flavordict, cup_size):
    response = {}
    for i in flavordict.keys():
        response.update(get_noodle_recipe(i, flavordict[i], cup_size))
    return response

# Input Example
# {
#     "noodle_style":"น้ำใส",
#     "noodle_type":"หมี่เหลือง",
#     "noodle_size":1.5,
#     "health_conditions":"โรคกรดไหลย้อน",
#     "flavors":
#     {
#         "Sweetness Level": "75",
#         "Sourness Level": "25",
#         "Saltiness Level": "50",
#         "Spiciness Level": "0"    
#     }
# }