import getClient from "@/utils/redis";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  let user_handle = searchParams.get('user_handle') as string

  const bearer_token = searchParams.get('bearer_token')
  if (user_handle && user_handle.startsWith("@")) {
    user_handle = user_handle.substring(1);
  }

  const redisClient = getClient;
  const cachedUserId = await redisClient.get(user_handle);
  console.log("IN HERE")
  console.log(cachedUserId)
  if (cachedUserId) {
    return Response.json({ id: cachedUserId });
  }

  const url = `https://api.twitter.com/2/users/by?usernames=${user_handle}`;

  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${bearer_token}`
      }
    });
    const id = res.data.data[0].id
    await redisClient.set(user_handle, id)

    return Response.json({ id })
  } catch (error) {
    return Response.error()
  }
  
}
