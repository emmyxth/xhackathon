import os
from openai import OpenAI
import json

def classify_images():
    # Initialize OpenAI client
    client = OpenAI()
    
    # Dictionary to store classifications
    classifications = {}
    
    # Get list of URL files from urls directory
    url_files = [f for f in os.listdir('urls') if f.endswith('_urls.txt')]
    
    for url_file in url_files:
        category = url_file.replace('_urls.txt', '').upper()
        classifications[category] = {}
        
        # Read URLs from file
        with open(f'urls/{url_file}', 'r') as f:
            urls = f.readlines()
            
        # Process each URL
        for i, url in enumerate(urls, 1):
            url = url.strip()
            if url:
                # Create asset key
                asset_key = f"ASSET_{i}"
                
                try:
                    # Call OpenAI API to get description using new format
                    response = client.chat.completions.create(
                        model="gpt-4o",
                        messages=[
                            {
                                "role": "user", 
                                "content": [
                                    {
                                        "type": "text",
                                        "text": "Please provide a brief descriptive label for this image in snake_case format"
                                    },
                                    {
                                        "type": "image_url",
                                        "image_url": {
                                            "url": url,
                                            "detail": "low"
                                        }
                                    }
                                ]
                            }
                        ],
                        max_tokens=300
                    )
                    
                    # Extract description from response using new format
                    description = response.choices[0].message.content.strip()
                    
                    # Add to classifications
                    classifications[category][asset_key] = [description, url]
                    
                except Exception as e:
                    print(f"Error processing {url}: {str(e)}")
                    continue
    
    # Save classifications to JSON file
    with open('../aws_image_retrieval/assets.json', 'w') as f:
        json.dump(classifications, f, indent=2)
        
    return classifications

if __name__ == "__main__":
    classifications = classify_images()
    print("Classifications saved to assets.json")
