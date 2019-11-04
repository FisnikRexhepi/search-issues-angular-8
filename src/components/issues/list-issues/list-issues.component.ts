import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IssueService } from 'src/services/issue.service';


@Component({
  selector: 'app-list-issues',
  templateUrl: './list-issues.component.html',
  styleUrls: ['./list-issues.component.scss']
})

//OnInit, OnDestroy,

export class ListIssuesComponent implements OnChanges {
  @Input() issuesData: any[];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.issuesData = changes["issuesData"].currentValue;
  }
}



