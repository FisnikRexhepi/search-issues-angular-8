import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router';
import { SearchFormComponent } from 'src/components/search-form/search-form.component';

const routes: Routes = [
    {path: '', component: SearchFormComponent},
    {path: 'issues', loadChildren: '../components/issues/issues.module#IssuesModule'}
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

  export class AppRouting {}