def calculate_sugar_amount(sugar_level, total_volume):
    # Calculate the amount of sugar needed based on the level and total volume
    sugar_amount = 0
    if sugar_level == 0:
        sugar_amount = 0
    elif sugar_level == 25:
        sugar_amount = total_volume * 0.25 / 100  # 25% of total volume
    elif sugar_level == 50:
        sugar_amount = total_volume * 0.50 / 100  # 50% of total volume
    elif sugar_level == 75:
        sugar_amount = total_volume * 0.75 / 100  # 75% of total volume
    elif sugar_level == 100:
        sugar_amount = total_volume * 1.00 / 100  # 100% of total volume

    return sugar_amount

# Function to get user input
def get_user_input():
    total_volume = float(input("Enter the total volume of the dish in ml: "))
    sugar_level = int(input("Enter sugar level (0, 25, 50, 75, 100): "))
    return total_volume, sugar_level

# Main execution
total_volume, sugar_level = get_user_input()
sugar_amount = calculate_sugar_amount(sugar_level, total_volume)
print(f"To achieve {sugar_level}% sweetness, you need to add {sugar_amount:.2f} ml of sugar.")
