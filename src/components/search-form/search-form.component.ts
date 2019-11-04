import { Component, OnInit, OnDestroy } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Issue } from 'src/models/issue.model';
import { IssueService } from 'src/services/issue.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GET_ISSUES_QUERY } from 'src/apollo/apollo.queries.issue';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})

export class SearchFormComponent implements OnInit {
  searchInput: string;
  radiobtnValue = 'is:open';
  searchForm: FormGroup;
  showError = false;
  issuesData: Issue[] = [];
  issuesQuery: QueryRef<any>;

  cursor: any;
  hasNextPage: boolean;

  constructor(private fb: FormBuilder, private issueService: IssueService) {

  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'searchInput': new FormControl()
    });
  }

  // Open & Close radio button method.
  onRadioBtnChange(value) {
     this.radiobtnValue = value;
  }

  // Search Button, search by user input value
  onSubmitSearch(value: string) {
    try {

      // user didn't write anything or writed enter space/s
      if(value === undefined || value === null)
      {
        this.showError = true;
        return;
      }

      // if user entered something...
       if (value.trim().length > 0){
        this.searchInput = value.trim();
        this.showError = false;

        //Get all issues from the service and save in the feedQuery instance.
        this.issuesQuery = this.issueService.getIssues(value, this.radiobtnValue, this.cursor);
        this.issuesQuery
        .valueChanges
        .subscribe(({ data }) => {
          const result = data.search;
          this.issuesData = result.edges;
          this.cursor = result.pageInfo.endCursor;
          this.hasNextPage = result.pageInfo.hasNextPage;
        });
         
      } else {
        this.showError = true;
      }
    }
    catch (error) {
      console.log(error);
    }
  }

// Fetch 10 more issues, using last cursor every time a user click "Load more Issues"
  fetchMoreIssues() {
    var query = `${this.searchInput} repo:angular/angular is:issue in:title in:body ${this.radiobtnValue}`;
    this.issuesQuery.fetchMore({
      query: GET_ISSUES_QUERY,
      variables: {
        query,
        cursor: this.cursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        const result = fetchMoreResult.search;
        const previousIssues = this.issuesData;
        
        const newIssues = result.edges;
        
        this.cursor = result.pageInfo.endCursor;
        this.hasNextPage = result.pageInfo.hasNextPage;
        this.issuesData = [...previousIssues, ...newIssues];        
      },
    });
  }
}


   

