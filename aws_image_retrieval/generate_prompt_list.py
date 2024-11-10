import json

with open('aws_assets.json') as f:
    assets = json.load(f)

count = 1
for key in assets.keys():
  print(str(count) +": " + key)
  for item in assets[key]:
    print(f"- {assets[key][item][0]}")
  count += 1
