const navbarElements = `
DotNavigation(uri: "/", depth: 3) {
    ...NavProps
    children {
        ...NavProps
    }
}
`;

const navFragment = `
fragment NavProps on DotNavigation {
    code
    folder
    hash
    host
    href
    languageId
    order
    target
    title
    type
}
`;

const blogQuery = `
    search(query: "+contenttype:Blog +live:true", limit: 6) {
        title
        identifier
        ... on Blog {
        inode
            image {
                fileName
            }
            urlMap
            modDate
            urlTitle
            teaser
            author {
                firstName
                lastName
                inode
            }
        }
    }
`;

const destinationQuery = `
    search(query: "+contenttype:Destination +live:true", limit: 6) {
        title
        identifier
        ... on Destination {
                urlMap
                modDate
                url
        }
    }
`;

export { navbarElements, navFragment, blogQuery, destinationQuery };
