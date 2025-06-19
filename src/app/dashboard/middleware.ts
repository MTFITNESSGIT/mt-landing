import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return token?.email === process.env.NEXT_PUBLIC_GOOGLE_EMAIL;
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
