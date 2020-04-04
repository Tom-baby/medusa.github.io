import gql from 'graphql-tag';
export const getSearchData =(query) => gql`
query {
    search(type: ISSUE, first: 10, query: "${query}") {
        nodes {
            ... on Issue {
                id
                author {
                login
                }
                createdAt
                url
                title
            }
        }
        pageInfo {
            endCursor
            startCursor
            hasNextPage
            hasPreviousPage
        }
        issueCount
    }    
}`