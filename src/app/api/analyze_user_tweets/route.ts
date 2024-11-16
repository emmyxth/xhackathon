import OpenAI from "openai";


const convertTweetsToString = (tweets: string[]) => {
  return tweets.join('\n');
}

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

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

      1: PETS
      - bearded_dragon_lizard_on_black_background
      - beagle_standing_on_white_background
      - brown_dachshund_dog_sitting
      - black_and_white_cow
      - boxer_dog_wearing_backpack
      - brown_dachshund_with_floppy_ear
      - cute_gray_hamster
      - green_lizard_with_spiked_collar
      - llama_standing_side_view
      - adorable_corgi_sitting
      - hooded_cobra_on_white_background
      - cute_white_and_gray_rabbit
      - black_pet_rat
      - striped_kitten_sitting
      - cute_fluffy_bunny_illustration
      - gray_tabby_kitten_sitting
      - goldfish_in_fishbowl
      - striped_cat_sitting_with_tongue_out
      - fluffy_white_pomeranian_puppy_sitting
      - fluffy_persian_cat_sitting
      - coiled_snake_with_brown_and_white_scales
      2: FOOD
      - french_fries_in_red_container
      - hamburger_with_cheese_and_veggies
      - slice_of_watermelon_illustration
      - jar_of_kimchi_illustration
      - katsu_with_cabbage_on_plate
      - grilled_fish_on_serving_platter
      - chocolate_bar_in_heart_wrapped_package
      - watercolor_drawing_of_smore
      - coffee_cup_with_sleeve
      - iced_coffee_with_straw
      - iced_matcha_latte
      - sushi_rolls_on_plate_with_chopsticks
      - green_tea_latte_art
      - red_tea_cup_with_teabag_and_leaves
      - bubble_tea_with_straw
      - dumplings_in_bamboo_steamer
      - bowl_of_ramen_with_chopsticks
      - plate_of_spaghetti_with_tomato_sauce
      - toasted_sandwich_illustration
      - avocado_toast_with_egg_illustration
      - beef_rice_bowl_with_fried_egg_and_chopsticks
      - stack_of_chocolate_chip_cookies
      - steamed_buns_in_bamboo_basket
      - strawberry_swiss_roll_illustration
      - slice_of_strawberry_cake
      - stack_of_pancakes_with_syrup_and_butter
      - bowl_of_soup_with_herbs
      3: DECOR
      - potted_plant_with_large_leaves
      - potted_plant_illustration
      - geometric_potted_plant
      - brown_vase_with_greenery
      - pink_succulent_in_pot
      - potted_monstera_plant
      - potted_fern_illustration
      - monstera_plant_in_pot
      - terrarium_in_glass_jar
      - purple_tablet_on_stand
      - open_laptop_display
      - potted_sansevieria_illustration
      - rose_gold_laptop_macbook_open
      - flat_screen_monitor_illustration
      - black_over-ear_headphones
      - vintage_camera_illustration
      - sunglasses_icon_black
      - heart_shaped_sunglasses
      - black_pixelated_sunglasses
      - star_shaped_sunglasses
      - brown_cowboy_hat_illustration
      - potted_plant_with_vines
      - potted_monstera_plant
      - potted_variegated_plant
      - potted_succulent_illustration
      - red_mushrooms_illustration
      - potted_sansevieria_plant
      - green_potted_plant
      - green_gummy_bear_jar
      - orange_mushroom_lamp
      - blue_lava_lamp
      - potted_succulent_plants
      - cartoon-style_white_wrench
      - pink_tulips_in_vase
      - blue_table_lamp
      - sunglasses_with_blue_lenses
      - pink_classic_car
      - zyn_nicotine_pouches_open_tin
      - lava_lamp
      - leica_compact_camera
      - chimamanda_ngozi_adichie_book_cover
      - ceramic_cactus_plant_pot
      - red_woven_scarf
      - red_lipstick_tube
      4: CHAIR
      - red_modern_chair
      - wooden_modern_chair
      - flower_shaped_chair
      - orange_translucent_chair
      - office_chair
      - gaming_chair
      - cream_sherpa_armchair
      - fluffy_round_bean_bag
      - pink_modern_chair
      - egg_shaped_chair
      - green_modern_chair
      - green_leather_modular_sofa
      - wood_and_cane_chair
      - wooden_chair
      5: RUG
      - rugs11
      - pink_square_rug
      - rugs2
      - rugs4
      - rugs9
      - red_carpet_rug
      - rugs16
      - green_checkered_cherry_rug
      - regal_brown_persian_rug
      - persian_rug_brown
      - pink_rug
      - white_brown_rug
      6: POSTER
      - zugspitze_mountain_poster_art
      - rock_hand_gesture_with_stars_and_sunburst
      - nba_logo_silhouette
      - basketball_player_dribbling_ball
      - silhouette_of_baseball_player_with_bat
      - soccer_ball_on_field_background
      - soccer_ball_on_center_circle
      - american_football_player_throwing_ball
      - football_with_the_sport_text
      - abstract_art_with_hair_silhouettes_and_colorful_shapes
      - human_brain_anatomy_diagram
      - wanted_poster_template_with_blank_space
      - muscular_cartoon_character_flexing
      - express_with_music_posters
      - abstract_mountain_landscape_artwork
      - person_sitting_in_snowy_mountain_landscape_at_sunset
      - tennis_racket_and_ball_graphic_design
      - andorra_flag_with_coat_of_arms
      - flag_of_the_united_arab_emirates
      - afghanistan_flag_with_crest
      - antigua_and_barbuda_flag
      - flag_of_anguilla
      - albanian_flag_with_double_headed_eagle
      - armenian_flag
      - flag_of_angola
      - antarctica_map_outline
      - argentinian_flag_with_sun_design
      - american_samoa_flag
      - austrian_flag
      - australian_flag
      - aruba_flag_with_red_star_and_yellow_stripes
      - åland_islands_flag
      - azerbaijan_flag
      - bosnia_and_herzegovina_flag
      - barbados_flag
      - bangladesh_flag
      - belgium_flag
      - burkina_faso_flag
      - bulgaria_flag
      - bahrain_flag
      - burundi_flag
      - benin_flag
      - coat_of_arms_of_saint_barthelemy
      - flag_of_bermuda
      - flag_of_brunei
      - bolivian_flag_with_coat_of_arms
      - bonaire_flag
      - brazil_flag_on_green_background
      - flag_of_the_bahamas
      - bhutan_flag_with_dragon
      - norwegian_flag
      - botswana_flag
      - flag_of_belarus
      - flag_of_belize
      - canadian_flag_with_maple_leaf
      - flag_of_christmas_island
      - democratic_republic_of_the_congo_flag
      - central_african_republic_flag
      - flag_of_the_republic_of_the_congo
      - swiss_flag_on_red_background
      - ivory_coast_flag
      - flag_of_the_cook_islands
      - chile_flag
      - cameroon_flag
      - chinese_national_flag
      - colombian_flag
      - costa_rica_flag_with_coat_of_arms
      - cuban_flag_with_red_triangle_and_white_star
      - cape_verde_flag
      - curacao_flag
      - christmas_island_flag
      - cyprus_flag_map_design
      - czech_republic_flag
      - germany_flag
      - flag_of_djibouti
      - red_background_with_white_cross_flag
      - dominica_flag_with_sisserou_parrot
      - dominican_republic_flag
      - flag_of_algeria
      - ecuador_national_flag
      - estonian_flag_three_horizontal_stripes
      - egypt_flag
      - sahrawi_arab_democratic_republic_flag
      - flag_of_eritrea
      - spain_flag_with_coat_of_arms
      - ethiopia_flag_with_emblem
      - flag_of_finland
      - union_jack_and_fiji_coat_of_arms_on_light_blue_background
      - falkland_islands_flag
      - flag_of_micronesia
      - faroe_islands_flag
      - french_flag
      - gabon_flag
      - flag_of_england
      - northern_ireland_flag_ulster_banner
      - scotland_flag_design
      - welsh_flag_with_red_dragon
      - union_jack_flag
      - grenada_national_flag
      - georgia_flag
      - flag_of_french_guiana
      - guernsey_flag_with_cross_design
      - ghana_flag
      - gibraltar_flag_with_castle_and_key
      - greenland_flag
      - gambia_flag_with_horizontal_stripes
      - guinea_flag
      - guadeloupe_flag_with_fleur_de_lis_and_sun_design
      - flag_of_equatorial_guinea
      - greek_flag
      - south_georgia_and_south_sandwich_islands_flag
      - guatemala_flag_with_coat_of_arms
      - flag_of_guam
      - bissau_guinean_flag
      - green_triangle_yellow_arrow_red_triangle_flag
      - hong_kong_flag_with_bauhinia_flower
      - australian_flag_design
      - honduras_flag
      - croatian_flag_with_coat_of_arms
      - haiti_flag
      - hungary_flag
      - red_and_white_horizontal_stripes_flag
      - irish_flag
      - flag_of_israel
      - isle_of_man_flag
      - flag_of_india
      - british_indian_ocean_territory_flag
      - iraq_flag
      - iran_flag
      - iceland_flag
      - italian_flag
      - jersey_flag_with_coat_of_arms
      - jamaica_flag
      - flag_of_jordan
      - flag_of_japan
      - kenya_flag_with_shield_and_spears
      - kyrgyzstan_flag
      - cambodia_flag
      - kiribati_flag_with_bird_sun_and_waves
      - comoros_flag
      - st_kitts_and_nevis_flag
      - north_korea_flag
      - flag_of_south_korea
      - kuwait_flag
      - cayman_islands_flag
      - kazakhstan_flag_with_sun_and_eagle
      - flag_of_laos
      - lebanon_flag_with_cedar_tree
      - blue_background_triangle_design_with_black_white_yellow_shapes
      - flag_of_liechtenstein
      - sri_lanka_national_flag
      - flag_of_liberia
      - lesotho_national_flag
      - lithuania_flag
      - luxembourg_flag
      - latvia_flag
      - libya_flag
      - morocco_flag_with_green_pentagram_on_red_background
      - red_and_white_horizontal_bicolor_flag
      - moldova_flag_with_arms
      - montenegro_national_flag
      - french_flag
      - madagascar_flag
      - blue_flag_with_white_star_and_orange_white_diagonal_stripes
      - north_macedonia_flag
      - flag_of_mali
      - myanmar_flag_with_star
      - mongolia_national_flag
      - macau_flag_with_lotus_and_stars
      - northern_mariana_islands_flag
      - red_green_black_geometric_pattern
      - mauritania_flag
      - flag_of_montserrat
      - flag_of_malta
      - flag_of_mauritius
      - maldives_flag
      - flag_of_malawi
      - mexican_flag_with_eagle_and_serpent
      - malaysia_flag
      - mozambique_national_flag
      - namibia_flag
      - new_caledonia_flag
      - flag_of_niger
      - norfolk_island_flag
      - nigeria_flag
      - flag_of_nicaragua
      - netherlands_flag
      - norwegian_flag
      - flag_of_nepal
      - flag_of_nauru
      - flag_of_niue
      - new_zealand_flag
      - oman_flag
      - flag_of_panama
      - peru_flag
      - polynesia_flag_with_canoe_and_sun
      - papua_new_guinea_flag
      - philippines_flag
      - pakistan_flag_with_crescent_and_star
      - poland_flag
      - sailing_ship_on_saint_pierre_and_miquelon_flag
      - flag_of_the_pitcairn_islands
      - puerto_rico_flag
      - palestinian_flag
      - portugal_flag
      - flag_of_palau
      - flag_of_paraguay
      - qatar_flag_with_zigzag_pattern
      - blue_background_with_red_triangle_and_yellow_shapes
      - romanian_flag
      - serbia_flag_with_coat_of_arms
      - russian_flag
      - rwanda_flag
      - saudi_arabia_flag
      - solomon_islands_flag
      - seychelles_flag
      - flag_of_sudan
      - sweden_flag
      - singapore_flag
      - flag_of_saint_helena
      - slovenian_flag_with_coat_of_arms
      - norwegian_flag
      - slovakia_flag
      - horizontal_stripes_green_white_blue_flag
      - flag_of_san_marino
      - senegal_flag
      - somalia_flag
      - flag_of_suriname
      - blue_triangle_south_sudan_flag
      - flag_of_sao_tome_and_principe
      - flag_of_el_salvador
      - sint_maarten_flag
      - flag_of_syria
      - eswatini_flag_with_shield_and_spears
      - turks_and_caicos_islands_flag
      - romanian_flag
      - french_southern_and_antarctic_lands_flag
      - togo_flag
      - flag_of_thailand
      - flag_of_tajikistan
      - yellow_canoe_on_blue_background_with_stars
      - flag_of_timor_leste
      - turkmenistan_flag_with_carpet_pattern
      - tunisian_flag
      - tonga_flag
      - turkey_flag
      - trinidad_and_tobago_flag
      - union_jack_with_yellow_stars_on_blue_background
      - taiwan_flag_with_blue_sky_and_white_sun
      - tanzania_flag_with_diagonal_stripes
      - ukraine_flag
      - uganda_flag
      - united_states_flag
      - usa_flag
      - uruguay_flag_with_sun_design
      - uzbekistan_flag
      - vatican_city_flag
      - flag_of_saint_vincent_and_the_grenadines
      - venezuela_flag_with_stars
      - british_virgin_islands_flag
      - united_states_virgin_islands_flag
      - vietnam_flag
      - flag_of_vanuatu
      - french_polynesia_flag
      - flag_of_samoa
      - flag_of_kosovo
      - yemen_flag
      - mayotte_coat_of_arms_with_seahorses
      - south_african_flag
      - zambia_flag_with_eagle
      - zimbabwe_flag
      7: GIF
      - abstract_geometric_structure
      - animated_cluster_of_eyeballs
      - wireframe_head_model
      - creepy_animated_baby_in_pool
      - colorful_blob_creature
      - geometric_colorful_cuboid_structure
      - low_poly_bear_artwork
      - wireframe_wave_animation
      - frame_with_an_animated_face_image
      - colorful_acrobatic_figures
      - glowing_geometric_bear_head
      - open_ocean_with_clouds
      - bouncing_pool_balls
      - abstract_colorful_pattern
      - rotating_3d_heart
      - pyramid_eye_dollar_bill
      - disco_ball
      - starry_sky_background
      - green_heart_on_pink_background
      - peeled_banana_illustration
      - multicolored_star_scatter
      - pink_heart-shaped_gemstone
      - stars_and_star_outlines
      - red_starburst_shape
      - starry_night_sky
      - floating_colored_hearts
      - pink_and_blue_pixel_hearts
      - illustration_of_a_duckling
      - red_spinning_heart
      - flower_with_cloud_petals
      - animated_colorful_star
      - golden_heart_emoji
      - two_hand-drawn_yellow_stars
      - solid_light_blue_circle
      - candy_canes_with_green_bow
      - orange_slice
      - strawberry_illustration
      - green_star_shape
      - blue_flower_shape
      - purple_shiny_heart
      - pink_star_i'm_perfect_text
      8: CHAIRS
      - cream_round_chair_illustration
      - rocking_chair_with_blanket
      - wicker_chair_with_wooden_legs
      - emerald_green_armchair
      - brown_leather_chair
      - red_tufted_accent_chair
      - pink_modern_armchair
      - yellow_modern_chair
      - orange_mesh_office_chair
      - green_upholstered_armchair
      - brown_leather_recliner_chair
      - pink_office_chair
      - purple_modern_egg_chair
      - wicker_chair_with_cushion
      - yellow_modern_chair
      - leaf_pattern_chair_illustration
      - orange_office_chair_on_wheels
      - blue_foldable_camping_chair
      - red_director_chair
      - pink_modern_chair
      9: RUGS
      - beige_checkered_rug_with_tasseled_edges
      - orange_white_checkered_oval_pattern
      - brown_blanket_with_fringe_edges
      - a_white_blanket_with_grey_fringe
      - wavy_wooden_plank_silhouette
      - round_woven_rug
      - rectangular_area_rug_with_striped_pattern
      - striped_white_rug_with_fringe
      - smiling_flower_cookie_illustration
      - brown_blanket_with_fringes
      - illustration_of_a_pink_rectangular_rug
      - blue_illustrated_rug_with_fringe
      - abstract_colorful_oval_shape
      - ornamental_yellow_rug_with_tassels
      - cloud_shape_on_white_background
      - bavarian_flag_in_oval_shape
      - colorful_geometric_pattern_pyramid
      - woven_black_fabric_texture

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

    Make this a JSON readable output with no newlines or whitespace. Return your result in an array of 1 PET, 1 FOOD, 1 CHAIR, 1 RUG, 9 DECOR, 1 POSTER, 1 GIF. Format it like this, with each element being a json that describes the category, object itself (<OBJECT>), and why you picked that object in <REASONING> using the context of a tweet posted or liked. Describe the user in second person (e.g you, yours). Use a slightly sassy tone, referencing specific tweets or liked tweets that the user has:

    [
      {
        "category": "PETS"
        "object": <OBJECT>
        "reasoning": <REASONING>
      },
      {
        "category": "FOOD"
        "object": <OBJECT>
        "reasoning": <REASONING>
      },
      {
        "category": "CHAIR"
        "object": <OBJECT>
        "reasoning": <REASONING>
      },
      {
        "category": "RUG"
        "object": <OBJECT>
        "reasoning": <REASONING>
      },
      {
        "category": "DECOR"
        "object": <OBJECT>
        "reasoning": <REASONING>
      },
      {
        "category": "DECOR"
        "object": <OBJECT>
        "reasoning": <REASONING>
      },
      {
        "category": "DECOR"
        "object": <OBJECT>
        "reasoning": <REASONING>
      },
      {
        "category": "DECOR"
        "object": <OBJECT>
        "reasoning": <REASONING>
      },
      {
        "category": "DECOR"
        "object": <OBJECT>
        "reasoning": <REASONING>
      },
      {
        "category": "DECOR"
        "object": <OBJECT>
        "reasoning": <REASONING>
      },
      {
        "category": "DECOR"
        "object": <OBJECT>
        "reasoning": <REASONING>
      },
      {
        "category": "DECOR"
        "object": <OBJECT>
        "reasoning": <REASONING>
      },
      {
        "category": "DECOR"
        "object": <OBJECT>
        "reasoning": <REASONING>
      },
      {
        "category": "POSTER"
        "object": <OBJECT>
        "reasoning": <REASONING>
      },
      {
        "category": "GIF"
        "object": <OBJECT>
        "reasoning": <REASONING>
      },    
    ]

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

    const {data: completion, response } = await client.chat.completions.create({
      messages: [{ role: 'user', content: thePrompt }],
      model: 'gpt-3.5-turbo',
    }).withResponse();


    const content = completion.choices[0].message.content
    if (!response.ok) {
      return Response.json({ error: 'An error occurred' }, { status: 500 });
    }

    if (!!content) {
      return Response.json({ data: JSON.parse(content.toString())})
    } else {
      return Response.json({ error: 'An error occurred' }, { status: 500 });
    }

  } catch (error) {
    // Error handling
    return Response.json({ error: `An error occurred: ${error}` }, { status: 500 });
  }
}
