import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { SearchFormComponent } from './search/search-form/search-form.component';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './search/list/list.component';
import { BookComponent } from './search/list/book/book.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    SearchComponent,
    ListComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
