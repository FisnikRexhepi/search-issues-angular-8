import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SearchFormComponent } from '../components/search-form/search-form.component';
import { AppRouting } from './app.routing';
import { IssuesModule } from 'src/components/issues/issues.module';
import { GraphQLModule } from 'src/apollo/apollo.graphQL.config';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IssuesModule,
    AppRouting,
    GraphQLModule
  ],
  declarations: [
    AppComponent,
    SearchFormComponent,
  ],
  providers:[],
  
  bootstrap: [AppComponent]
})
export class AppModule {
}
