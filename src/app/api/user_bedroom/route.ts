import { GET as authOptionsGet } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";


export async function POST(request: Request) {
  const session = await getServerSession(authOptionsGet);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Your protected API logic here
  return Response.json({ message: "This is protected data" });
}


export async function GET(request: Request) {
  const session = await getServerSession(authOptionsGet);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Your protected API logic here
  return Response.json({ message: "This is protected data" }); 
}