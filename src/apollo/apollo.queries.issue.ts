import gql from 'graphql-tag';

//Query to get all Issues
export const GET_ISSUES_QUERY = gql`
query ($query: String!, $cursor: String) {
    search(first: 25, type:ISSUE, query: $query, after: $cursor) {
      edges {
        node {
          ... on Issue {
            number
            title
            body
            state
            comments{
              totalCount
            }
          }
        }
      }
      pageInfo{
        hasNextPage
        endCursor
      }
    }
  }
`;

//Query to get only one issue.
export const GET_ISSUE_BY_NUMBER = gql`
query ($number_off_issue: Int!, $cursor: String) {
  repository(owner: "angular", name: "angular") {
    issue(number: $number_off_issue) {
      title
      author {
        avatarUrl
      }
      comments(first: 10, after: $cursor) {
        edges {
          node {
            id
            body
            author{
              avatarUrl
              login
            }
          }
        }
        pageInfo{
          hasNextPage
          endCursor
        }
      }
    }
  }
}
`;



