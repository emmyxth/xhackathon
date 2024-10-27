import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const user_id = searchParams.get('user_id')
  const bearer_token = searchParams.get('bearer_token')

  

  const url = `https://api.twitter.com/2/users/${user_id}/liked_tweets`;
  console.log(url)
  const params = {
    'max_results': 5,
    'tweet.fields': 'article,attachments,author_id,card_uri,conversation_id,created_at,display_text_range,entities,geo,id,in_reply_to_user_id,lang,media_metadata,note_tweet,public_metrics,referenced_tweets,reply_settings,scopes,source,text,withheld',
    'expansions': 'article.cover_media,article.media_entities,attachments.media_keys,attachments.media_source_tweet,attachments.poll_ids,author_id,edit_history_tweet_ids,entities.mentions.username,geo.place_id,in_reply_to_user_id,entities.note.mentions.username,referenced_tweets.id,referenced_tweets.id.author_id',
    'media.fields': 'alt_text,duration_ms,height,media_key,non_public_metrics,organic_metrics,preview_image_url,promoted_metrics,public_metrics,type,url,variants,width',
    'user.fields': 'affiliation,connection_status,created_at,description,entities,id,location,most_recent_tweet_id,name,pinned_tweet_id,profile_banner_url,profile_image_url,protected,public_metrics,receives_your_dm,subscription_type,url,username,verified,verified_type,withheld',
  };


  try {
    const res = await axios.get(url, {
      params: params,
      headers: {
        'Authorization': `Bearer ${bearer_token}`
      }
    });
    const tweets = res.data
    const tweetData = tweets.data
    const justText = tweetData.map((tweet: any) => tweet.text)

    return Response.json({ justText })
  } catch (error) {
    console.log(Response.error())
    return Response.error()
  }
  
}
