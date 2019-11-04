import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IssueService } from 'src/services/issue.service';
import { ActivatedRoute } from '@angular/router';
import { QueryRef } from 'apollo-angular';
import { GET_ISSUE_BY_NUMBER } from 'src/apollo/apollo.queries.issue';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {
  issueNumber: string;
  title: string;
  defaultAuthorUrlImg ='https://image.ibb.co/jw55Ex/def_face.jpg';
  comments: any[];
  totalComments: number;
  noComment = false;
  issueQuery: QueryRef<any>;

  hasNextPage: boolean;
  cursor: any;

  constructor(private issueService: IssueService, private route: ActivatedRoute) { 
    this.route.snapshot.paramMap.get('number');
  }

  ngOnInit() {
    
    // get number param in the url
    this.issueNumber = this.route.snapshot.paramMap.get('number');

    //Get only one issue by the issueNumber and save it in feedQuery instance.
    this.issueQuery = this.issueService.getIssueByNumber(+this.issueNumber, this.cursor);
    this.issueQuery
    .valueChanges
    .subscribe(({ data, loading }) => {
      const commentsData = data.repository.issue.comments;
      const comments = commentsData.edges;
      // if there is no comment for this issue yet.
      if(comments.length === 0){
        this.noComment = true;
      } else {
        this.cursor = commentsData.pageInfo.endCursor;
        this.comments = commentsData.edges;
        this.hasNextPage = commentsData.pageInfo.hasNextPage;
        this.totalComments = commentsData.totalCount;
      }
        this.title = data.repository.issue.title;
    });
  }


  // Get 10 More comments, by clicking button "Load more comments"
  fetchMoreComments(){
    const issueNumber = (+this.issueNumber)
    this.issueQuery.fetchMore({
      query: GET_ISSUE_BY_NUMBER,
      variables: {
        number_off_issue: issueNumber,
        cursor: this.cursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {

        const previousComments = this.comments;
        const data = fetchMoreResult.repository.issue;

        const newComments = data.comments.edges;
        
        this.cursor = data.comments.pageInfo.endCursor;
        this.hasNextPage = data.comments.pageInfo.hasNextPage;
        this.comments = [...previousComments, ...newComments];        
      },
    });
   }

}
