import { cache } from "react";
import { dotCMSClient } from "./dotcmsClient";


export const getCollection = cache(async (path: string) => {
    try {
        const pageData = await dotCMSClient.content.getCollection(path);
        return pageData;
    } catch (e) {
        const error = e instanceof Error ? e : new Error(String(e));
        console.error("ERROR FETCHING PAGE: ", error.message);

        return null;
    }
});