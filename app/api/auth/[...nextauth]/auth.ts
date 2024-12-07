// import type { NextAuthOptions } from "next-auth";
// import AzureADProvider from "next-auth/providers/azure-ad";


// export const authOptions: NextAuthOptions = {
//         providers: [
//           AzureADProvider({
//             clientId: process.env.AZURE_AD_CLIENT_ID!,
//             clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
//             tenantId: process.env.AZURE_AD_TENANT_ID!,
//             authorization: { params: { scope: "openid profile email offline_access" } },
//           }),
//         ],
//         callbacks: {
//           async jwt({ token, account }) {
//             if (account) {
//               token.idToken = account.id_token;
//             }
//             return token;
//           },
//         },
//       };

import type { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: {
        params: { scope: "openid profile email offline_access" },
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production", // Use secure cookies only in production
      },
    },
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token;
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV === "development", // Enable debug logs in development
};
