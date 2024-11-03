import os

base_url = "https://myxbedroompics.s3.us-east-2.amazonaws.com/"

directories = ["CHAIRS", "DECOR", "FOOD", "PETS", "RUGS", "POSTER"]
files = ["chairs.txt", "decor.txt", "food.txt", "pets.txt", "rugs.txt", "poster.txt"]

for directory, file in zip(directories, files):
    with open(file, "r") as f:
        images = f.read().strip().split(", ")
        with open(f"{directory.lower()}_urls.txt", "w") as out_f:
            for image in images:
                out_f.write(f"{base_url}{directory}/{image}\n")
