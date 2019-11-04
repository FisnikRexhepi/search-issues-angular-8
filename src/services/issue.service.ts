import { Injectable, ɵConsole } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as queries from '../apollo/apollo.queries.issue'

@Injectable()
export class IssueService {
  constructor(private apollo: Apollo) { }

  // Gets All Issues from the github graphQL by title, body on (Angular repository)
  getIssues(state: string, searchInput: string, cursor: string) {
    var query = `${searchInput} repo:angular/angular is:issue in:title in:body ${state}`;
    return this.apollo.watchQuery<any>({
      query: queries.GET_ISSUES_QUERY,
      variables: {
        query,
        cursor
      }
    })
  }

  // saveIssuesLocally(data: any){
  //   const query = queries.GET_ISSUES_QUERY
  //   console.log(data);
  //   this.apollo.getClient().writeQuery({
  //     query,
  //     data: {
  //       edges: [...data],
  //     },
  //   });
  // }


  // Get only one issue by the number
  getIssueByNumber(number: number, cursor: string) {
    var number_off_issue = number;
    return this.apollo.watchQuery<any>({
      query: queries.GET_ISSUE_BY_NUMBER,
      variables: {
        number_off_issue,
        cursor
      }
    })
  }
  
}



