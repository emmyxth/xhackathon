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
        - Cockroach
        - Brown rat
        - Shiba Inu dog
        - Ginger cat
        - Capybara
        - Brown rabbit
        - Rottweiler dog
        - White cat
        - Baby hippo
        - Brown cocker spaniel dog
        - Spotted horse
        - Flamingo
        - Calico cat
        - Cat sitting upright

      2. FOOD
        - Cup noodles
        - Pocky chocolate sticks
        - Mean Girls Kalteen bar
        - Miralax laxative powder
        - Wing Stop feast
        - Box of cookies
        - Chamoy pickle kit
        - Whey protein powder
        - Haribo Goldbears
        - Red Bull can
        - Iced matcha pink drink
        - Iced coffee
        - Stanley travel tumbler
        - Takis Fuego snacks
        - Diet Coke can
        - Cigar
        - Bud Light can
        - Kombucha bottle
        - Celsius sparkling orange drink
        - Strawberry garnished cocktail
        - Strawberry smoothie
        - Bubble tea

      3. DECOR

        - Spiderman Funko Pop figure
        - Lip balm tube
        - Blue glass bong
        - Rose quartz obelisk with amethyst cluster
        - Film disposable camera
        - Green analog alarm clock
        - Plush mouse toy
        - KAWS Stormtrooper figure
        - Yellow smiley face plush toy
        - Hello Kitty figure
        - Teddy bear
        - Anime character figure
        - Stack of books
        - Cinnamoroll plush toy
        - Toy doll with strawberry helmet
        - Life-like action figure
        - Bottle with red and yellow label
        - Jade roller tool
        - Tarot cards
        - American Express Platinum card
        - Cowboy hat
        - Incense stick in holder
        - Album cover with newspaper collage
        - Gumball machine
        - Captain America shield makeup brush
        - Pilea plant in pot
        - Potted monstera plant
        - Croissant with candle
        - Green gummy bear jar
        - Orange mushroom lamp
        - Blue lava lamp
        - Potted succulent plants
        - Cartoon-style white wrench
        - Pink tulips in vase
        - Blue table lamp
        - Sunglasses with blue lenses
        - Pink classic car
        - ZYN nicotine pouches
        - Lava lamp
        - Leica compact camera
        - Chimamanda Ngozi Adichie book cover
        - Ceramic cactus plant pot
        - Red woven scarf
        - Red lipstick tube

      4. CHAIR
        - Red modern chair
        - Wooden modern chair
        - Flower-shaped chair
        - Orange translucent chair
        - Office chair
        - Gaming chair
        - Cream sherpa armchair
        - Fluffy round bean bag
        - Pink modern chair
        - Egg-shaped chair
        - Green modern chair
        - Green leather modular sofa
        - Wood and cane chair
        - Wooden chair

      5. RUG
        - Doge

      6. POSTER
        - Doge
        - Trump Bobblehead
        - Protestor Shit Hole Trump Street
        - Trump Cheato Dislike
        - MAGA Cap Trump
        - Trump Mask Pointing Costume
        - American Flag
        - Contemplative Sketch Art
        - Trump Tower Palm Beach

      7. GIF
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
