import { cache } from "react";
import { dotCMSClient } from "./dotcmsClient";
import {
    blogQuery,
    destinationQuery,
    navbarElements,
    navFragment
} from "./graphqlQueries";

export const getPage = cache(async (path: string) => {
    try {
        const pageData = await dotCMSClient.page.get(path, {
            graphql: {
                content: {
                    blogs: blogQuery,
                    destinations: destinationQuery,
                    navigation: navbarElements,
                },
                fragments: [navFragment],
            },
        });
        return pageData;
    } catch (e) {
        const error = e instanceof Error ? e : new Error(String(e));
        console.error("ERROR FETCHING PAGE: ", error.message);

        return null;
    }
});