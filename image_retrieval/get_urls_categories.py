import json
import random

def get_urls_from_categories(categories):
    # Load the assets.json file
    with open('image_retrieval/assets.json', 'r') as file:
        assets = json.load(file)

    urls = []
    for category in categories:
        if category in assets:
            # Get all assets for the category
            category_assets = assets[category]
            
            # Randomly select an asset
            asset_key = random.choice(list(category_assets.keys()))
            
            # Get the URL or file location (second item in the list)
            url = category_assets[asset_key][1]
            
            urls.append(url)
        else:
            # If category not found, append None or some placeholder
            urls.append(None)

    return urls

# Example usage:
categories = ["PETS", "FOOD", "CHAIR", "RUG", "DECOR", "DECOR", "DECOR", "DECOR", "DECOR", "DECOR", "DECOR", "DECOR", "DECOR", "DECOR", "GIF"]
urls = get_urls_from_categories(categories)
print(urls)
