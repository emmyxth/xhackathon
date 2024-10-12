import requests
from openai import OpenAI
import os
import json

def find_existing_links():
    base_url = "https://discz-production-s3-bucket.s3.amazonaws.com/spotify-bedroom"
    categories = ["PETS", "FOOD", "DECOR_2", "DECOR_1", "CHAIRS"]
    assets = {}
    
    # Initialize OpenAI client
    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

    for category in categories:
        assets[category] = {}
        asset_num = 0
        while True:
            url = f"{base_url}/{category}/ASSET_{asset_num}.webp"
            response = requests.head(url)
            if response.status_code == 200:
                # Call OpenAI API to label the image
                label = get_image_label(client, url)
                assets[category][f"ASSET_{asset_num}"] = (label, url)
                asset_num += 1
            elif asset_num == 0:
                # If ASSET_0 fails, try ASSET_1 before giving up
                asset_num = 1
                continue
            else:
                # Stop trying for this category if we get a non-200 status code
                break

    return assets

def get_image_label(client, image_url):
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "What's in this image? Provide a short, underscore-spaced label."},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": image_url,
                            "detail": "low"
                        }
                    }
                ],
            }
        ],
        max_tokens=300,
    )
    return response.choices[0].message.content.strip().lower().replace(" ", "_")

# Example usage:
existing_assets = find_existing_links()
print(existing_assets)

# Save assets to a JSON file
with open('assets.json', 'w') as f:
    json.dump(existing_assets, f, indent=4)

print("Assets saved to assets.json")
