import json

# Load the existing assets.json file
with open('assets.json', 'r') as assets_file:
    assets_data = json.load(assets_file)

# Load the gif_labels.json file
with open('gif_labels.json', 'r') as gif_labels_file:
    gif_labels_data = json.load(gif_labels_file)

# Ensure the "GIF" category exists in assets_data
if "GIF" not in assets_data:
    assets_data["GIF"] = {}

# Merge the gif labels into the "GIF" category of assets_data
for asset_key, asset_value in gif_labels_data.items():
    assets_data["GIF"][asset_key] = asset_value

# Write the updated data back to assets.json
with open('assets.json', 'w') as assets_file:
    json.dump(assets_data, assets_file, indent=4)

print("GIF labels have been merged into assets.json successfully.")
