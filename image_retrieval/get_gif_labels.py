import json
import requests
from openai import OpenAI
import os
from PIL import Image
from io import BytesIO
import base64  # Add this import

def get_gif_labels():
    # Initialize OpenAI client
    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

    # Read GIF URLs from the file
    with open('gifs.txt', 'r') as file:
        gif_urls = [line.strip() for line in file if line.strip()]

    gif_labels = {}

    for index, url in enumerate(gif_urls, start=1):
        # Download the GIF
        response = requests.get(url)
        if response.status_code == 200:
            # Open the GIF and extract the first frame
            img = Image.open(BytesIO(response.content))
            first_frame = Image.new("RGBA", img.size)
            first_frame.paste(img)
            
            # Save the first frame as a temporary file
            temp_image_path = f"temp_image_{index}.png"
            first_frame.save(temp_image_path)

            # Get label using OpenAI
            with open(temp_image_path, "rb") as image_file:
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
                                        "url": f"data:image/png;base64,{base64.b64encode(image_file.read()).decode('utf-8')}",
                                        "detail": "low"
                                    }
                                }
                            ],
                        }
                    ],
                    max_tokens=300,
                )

            # Extract the label from the response
            label = response.choices[0].message.content.strip().lower().replace(" ", "_")

            # Add to gif_labels dictionary
            gif_labels[f"ASSET_{index}"] = [label, url]

            # Remove temporary image file
            os.remove(temp_image_path)

    # Save labels to a JSON file
    with open('gif_labels.json', 'w') as f:
        json.dump(gif_labels, f, indent=4)

    print("GIF labels saved to gif_labels.json")

if __name__ == "__main__":
    get_gif_labels()
