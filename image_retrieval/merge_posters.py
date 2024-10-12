import os
import json

def merge_posters():
    assets_path = 'assets.json'
    posters_dir = 'manual_images/posters'

    # Load existing assets
    with open(assets_path, 'r') as f:
        assets = json.load(f)

    # Initialize POSTER category if it doesn't exist
    if 'POSTER' not in assets:
        assets['POSTER'] = {}

    # Iterate through poster files
    for i, filename in enumerate(os.listdir(posters_dir), start=1):
        if filename.endswith(('.jpg', '.png', '.webp')):  # Add more extensions if needed
            # Get description from filename (without extension)
            description = os.path.splitext(filename)[0].replace('_', ' ').title()

            # Create asset entry
            asset_key = f"ASSET_{i}"
            assets['POSTER'][asset_key] = [
                description,
                f"/manual_images/posters/{filename}"
            ]

    # Save updated assets back to file
    with open(assets_path, 'w') as f:
        json.dump(assets, f, indent=4)

    print("Posters merged successfully into assets.json")

if __name__ == "__main__":
    merge_posters()
