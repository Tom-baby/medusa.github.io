import gql from 'graphql-tag';
export const getUser =()  => gql`
query {
    viewer {
        login
        url
        id
    }
}`
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
        # repositoryCount
        
    }    
}`
// export const getUserAfterRepos = (user, cursor, perPage) => gql`
//   query {
//     user(login: ${user}) {
//         avatarUrl,
//         url,
//         name,
//         email,
//         location,
//         repositories(isFork:false, first: ${perPage}, after: ${cursor}) {
//           totalCount,
//           edges {
//             cursor
//           },
//           nodes {
//             url,
//             name,
//             updatedAt
//           }
//         }
//       }
//     }`