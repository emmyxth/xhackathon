import { https } from "follow-redirects";
import { NextResponse } from "next/server";
const convertTweetsToString = (tweets: string[]) => {
  return tweets.join('\n');
}

export async function POST(request: Request) {
  try {
    const res = await request.json()


    const tweets = convertTweetsToString(res.tweets.justText)
    const liked_tweets = convertTweetsToString(res.liked_tweets.justText)


    const thePrompt = `
      You are a world class tweet analyst. You have user X who has tweeted n tweets in the last k months. Your task is to match the user’s personality and profile to a list of accessories that are most likely to be in their room, with a heavy bias for idiosyncracy and individuality. 
      Tweets: 
      """
      ${tweets}

      """

      Liked Tweets:
      """
      ${liked_tweets}
      """

      Objects: 

      1. PETS
        - Albino Burmese python
        - Bearded dragon lizard
        - Beagle
        - Brown dachshund
        - Black and white cow
        - Boxer dog with backpack
        - Brown dachshund with floppy ear
        - Gray hamster
        - Green lizard with spiked collar
        - Llama
        - Corgi
        - Hooded cobra
        - White and gray rabbit
        - Black pet rat
        - Striped kitten
        - Fluffy bunny
        - Gray tabby kitten
        - Goldfish in fishbowl
        - Striped cat with tongue out
        - White pomeranian puppy
        - Persian cat
        - Coiled snake

      2. FOOD
        - French fries
        - Hamburger
        - Watermelon slice
        - Jar of kimchi
        - Katsu with cabbage
        - Grilled fish
        - Chocolate heart
        - S'more
        - Coffee cup
        - Iced coffee
        - Iced matcha latte
        - Sushi rolls
        - Green tea latte
        - Red tea
        - Bubble tea
        - Dumplings
        - Bowl of ramen
        - Spaghetti
        - Toasted sandwich
        - Avocado toast
        - Beef rice bowl
        - Chocolate chip cookies
        - Steamed buns
        - Strawberry swiss roll
        - Strawberry cake slice
        - Stack of pancakes
        - Bowl of soup

      3. DECOR
        - Potted plant with large leaves
        - Potted plant illustration
        - Geometric potted plant
        - Brown vase with greenery
        - Pink succulent
        - Potted monstera plant
        - Potted fern
        - Monstera plant
        - Terrarium
        - Purple tablet
        - Open laptop
        - Potted sansevieria
        - Rose gold laptop
        - Flat screen monitor
        - Black headphones
        - Vintage camera
        - Black sunglasses
        - Heart shaped sunglasses
        - Pixelated sunglasses
        - Star shaped sunglasses
        - Brown cowboy hat
        - Potted plant with vines
        - Monstera plant
        - Variegated plant
        - Succulent
        - Red mushrooms
        - Sansevieria plant
        - Green potted plant
        - Green gummy bear jar
        - Orange mushroom lamp
        - Blue lava lamp
        - Potted succulents
        - Cartoon white wrench
        - Pink tulips in vase
        - Blue table lamp
        - Sunglasses with blue lenses
        - Pink classic car
        - ZYN nicotine pouches
        - Lava lamp
        - Leica camera
        - Chimamanda Ngozi Adichie book
        - Ceramic cactus pot
        - Red woven scarf
        - Red lipstick

      4. CHAIR
        - Red modern chair
        - Wooden modern chair
        - Flower shaped chair
        - Orange translucent chair
        - Office chair
        - Gaming chair
        - Cream sherpa armchair
        - Fluffy round bean bag
        - Pink modern chair
        - Egg shaped chair
        - Green modern chair
        - Green leather modular sofa
        - Wood and cane chair
        - Wooden chair

      5. CHAIRS (Additional category)
        - Cream round chair
        - Rocking chair with blanket
        - Wicker chair with wooden legs
        - Emerald green armchair
        - Brown leather chair
        - Red tufted accent chair
        - Pink modern armchair
        - Yellow modern chair
        - Orange mesh office chair
        - Green upholstered armchair
        - Brown leather recliner
        - Pink office chair
        - Purple modern egg chair
        - Wicker chair with cushion
        - Yellow modern chair
        - Leaf pattern chair
        - Orange office chair on wheels
        - Blue foldable camping chair
        - Red director chair
        - Pink modern chair

      6. RUG/RUGS
        - Beige checkered rug
        - Orange white checkered oval
        - Brown blanket with fringe
        - White blanket with grey fringe
        - Wavy wooden plank
        - Round woven rug
        - Rectangular striped area rug
        - Striped white rug
        - Smiling flower cookie
        - Brown blanket with fringes
        - Pink rectangular rug
        - Blue illustrated rug
        - Abstract colorful oval
        - Ornamental yellow rug
        - Cloud shape
        - Bavarian flag oval
        - Geometric pattern pyramid
        - Woven black fabric

      7. POSTER
        - Zugspitze mountain art
        - Rock hand gesture
        - NBA logo
        - Basketball player
        - Baseball player silhouette
        - Soccer ball on field
        - Soccer ball center circle
        - Football player
        - Football with text
        - Abstract hair art
        - Brain anatomy
        - Wanted poster template
        - Muscular cartoon character
        - Express with music
        - Abstract mountain landscape
        - Person in snowy mountains
        - Tennis racket and ball
        - Various country flags (Andorra, UAE, Afghanistan, Antigua and Barbuda, Anguilla)

      8. GIF
        - Abstract 3D structure
        - Cluster of moving eyeballs
        - Wireframe head model
        - Swimming character animation
        - Abstract colored figure
        - Isometric building animation
        - Animated bear playing piano
        - 3D wireframe shape
        - Framed head bust rendering
        - Multicolored acrobatic figures
        - Geometric bear neon logo
        - Ocean waves under cloudy sky
        - Bouncing pool balls
        - Abstract geometric pattern
        - Rotating red heart animation
        - Pyramid with eye on dollar bill
        - Disco ball spinning

      """

    To match them, think about the following questions - do not necessarily answer them. 
    - **Politics & Activism:**  
     - Do you think billionaires should exist?  
     - What's your stance on cancel culture?  
     - Should voting be mandatory?
    - **Social & Cultural Issues:**  
     - Should celebrities be held accountable for old tweets?  
     - What's your opinion on gender-neutral pronouns?  
     - Do you think influencer culture is toxic or empowering?  
    - **Trending Ethical Dilemmas:**  
      - Is it okay to pirate movies or music?  
      - Should AI-generated art be considered “real” art?  
      - Would you give up privacy for better security?  
    - **Personal Boundaries & Relationships:**  
      - Would you ever ghost someone?  
      - Can long-distance relationships work long-term?  
      - Should couples have access to each other's phones?  
    - **Lifestyle Preferences:**  
      - Should tipping be abolished?  
      - Do you believe in astrology or personality tests like the MBTI?  
      - Do you think hustle culture is motivating or toxic? 
     
    - **Philosophy in Tweets:**  
     - Do you think free will exists?  
     - Is it better to be kind or honest?  
     - Does everything happen for a reason?  
    - **Pop Culture & Memes:**  
      - What’s the most overrated TV show or movie?  
      - Should classic cartoons or movies be remade?  
      - What’s the weirdest or funniest meme you’ve seen lately?  

    Specifically, explain your reasoning under a title called REASONING but ensure the output in your final line is a list of 1 PET, 1 FOOD, 1 CHAIR, 1 RUG, 10 DECOR, 1 GIF. Format it like this: 
      ["PETS", "FOOD", "CHAIR”, “RUG”, “DECOR”, “DECOR”, “DECOR”, “DECOR”, “DECOR”, “DECOR”, “DECOR”, “DECOR”, “DECOR”, “DECOR”, “GIF”]

    `

    const options = {
      'method': 'POST',
      'hostname': 'api.openai.com',
      'path': '/v1/chat/completions',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      'maxRedirects': 20
    };

    var postData = JSON.stringify({
      "messages": [
        {
          "role": "system",
          "content": thePrompt,
        }
      ],
      "model": "gpt-4o", // or "gpt-3.5-turbo" depending on your needs
      "stream": false,
      "temperature": 0
    })

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let chunks: Buffer[] = [];

        res.on('data', (chunk: Buffer) => {
          chunks.push(chunk);
        });

        res.on('end', () => {
          const body = Buffer.concat(chunks);
          console.log(body.toString());
          resolve(NextResponse.json({ data: JSON.parse(body.toString()) }));
        });

        res.on('error', (error) => {
          console.error(error);
          reject(NextResponse.json({ error: error.message }, { status: 500 }));
        });
      });

      req.on('error', (error) => {
        console.error(error);
        reject(NextResponse.json({ error: error.message }, { status: 500 }));
      });

      req.write(postData);
      req.end();
    });
  } catch (error) {
    // Error handling
    return Response.json({ error: 'An error occurred' }, { status: 500 });
  }
}
