import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import {createHttpLink} from 'apollo-link-http';
import {HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';



@NgModule({
    exports: [
      HttpClientModule,
      ApolloModule,
      HttpLinkModule
    ]
  })


  export class GraphQLModule {

     apiUrl ="https://api.github.com/graphql";
     token = "f5aa860efd658cccb79423abaf101461cdd05ec8";
    constructor(apollo: Apollo) {

      const httpLink = createHttpLink({
        uri: this.apiUrl,
      });

      const authLink = setContext((_, { headers }) => {
        // get the authentication token from environment
        const token = this.token;
        // return the headers to the context so httpLink can read them
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null,
          }
        }
      });

      apollo.create({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache({
        }),
      });
    }
  }
