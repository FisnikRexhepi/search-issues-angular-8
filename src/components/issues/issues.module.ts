import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CommonModule } from '@angular/common';
import { ListIssuesComponent } from './list-issues/list-issues.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { IssueService } from 'src/services/issue.service';

const routes: Routes = [
    { path: 'details/:number', component: IssueDetailComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        CommonModule,
        ListIssuesComponent,
        IssueDetailComponent
      ],
    declarations:[
        ListIssuesComponent,
        IssueDetailComponent       
    ],

    providers:[IssueService]
})

export class IssuesModule { }
