import { createDotCMSClient } from "@dotcms/client";

type DotCMSClient = ReturnType<typeof createDotCMSClient>;

export const dotCMSClient: DotCMSClient = createDotCMSClient({
  dotcmsUrl: process.env.NEXT_PUBLIC_DOTCMS_HOST || "http://localhost:8080",
  authToken: process.env.NEXT_PUBLIC_DOTCMS_AUTH_TOKEN ?? "", // Optional for public content
  siteId: process.env.NEXT_PUBLIC_DOTCMS_SITE_ID, // Optional site identifier/name
});
