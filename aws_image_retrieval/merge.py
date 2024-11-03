import json
import os

# Read AWS assets file
aws_assets_path = '/Users/jinyoungkim/Desktop/xhackathon/aws_image_retrieval/aws_assets.json'
with open(aws_assets_path, 'r') as f:
    aws_assets = json.load(f)

# Read existing assets file
assets_path = '/Users/jinyoungkim/Desktop/xhackathon/src/app/assets.json'
if os.path.exists(assets_path):
    with open(assets_path, 'r') as f:
        assets = json.load(f)
else:
    assets = {}

# Merge AWS assets into existing assets
for category, items in aws_assets.items():
    if category not in assets:
        assets[category] = {}
    assets[category].update(items)

# Write merged assets back to file
with open(assets_path, 'w') as f:
    json.dump(assets, f, indent=2)

print(f"Successfully merged {aws_assets_path} into {assets_path}")
