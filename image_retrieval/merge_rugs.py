import os
import json

def merge_assets():
    assets_path = 'assets.json'
    rugs_dir = '../public/assets/rugs'
    pets_dir = '../public/assets/pets'

    # Load existing assets
    with open(assets_path, 'r') as f:
        assets = json.load(f)

    # Initialize categories if they don't exist
    for category in ['RUG', 'PETS']:
        if category not in assets:
            assets[category] = {}

    # Function to process files in a directory
    def process_files(directory, category):
        for i, filename in enumerate(os.listdir(directory), start=1):
            if filename.endswith(('.jpg', '.png', '.webp')):  # Add more extensions if needed
                # Get description from filename (without extension)
                description = os.path.splitext(filename)[0].replace('_', ' ').lower()

                # Create asset entry
                asset_key = f"ASSET_{i}"
                assets[category][asset_key] = [
                    description.replace(' ', '_'),
                    f"/public/assets/{category.lower()}s/{filename}"
                ]

    # Process rugs and pets
    process_files(rugs_dir, 'RUG')
    process_files(pets_dir, 'PETS')

    # Save updated assets back to file
    with open(assets_path, 'w') as f:
        json.dump(assets, f, indent=4)

    print("Rugs and pets merged successfully into assets.json")

if __name__ == "__main__":
    merge_assets()
