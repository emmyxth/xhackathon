import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const user_handle = searchParams.get('user_handle')
  const bearer_token = searchParams.get('bearer_token')

  const url = `https://api.twitter.com/2/users/by?usernames=${user_handle}`;
  console.log(url)

  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${bearer_token}`
      }
    });
    const id = res.data.data[0].id

    return Response.json({ id })
  } catch (error) {
    console.log(Response.error())
    return Response.error()
  }
  
}