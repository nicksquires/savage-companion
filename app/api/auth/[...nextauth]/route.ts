import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };



// Next-auth v5 
// route.ts
// import { handlers } from "@/lib/auth";

// export {handlers as GET, handlers as POST };
// Optional: export const dynamic = "force-dynamic"; // if needed