let graphqlUri

if(process.env.NODE_ENV === 'development') {
  graphqlUri = 'http://localhost:4000/graphql'
} else {
  graphqlUri = 'https://api.lazytourist.xyz/graphql'
}

export const GRAPHQL_URI = graphqlUri

export const APP_VERSION = '1.2.1'
