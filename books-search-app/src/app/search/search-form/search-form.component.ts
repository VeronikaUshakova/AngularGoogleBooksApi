import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Book } from '../../book';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})

export class SearchFormComponent implements OnInit {
  books: Array<Book> = [];

  bookSearch  = new FormGroup({
    query: new FormControl('')
  });

  @Output() booksEvent = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getBooks(){
    this.http.get(`https://www.googleapis.com/books/v1/volumes?q=${this.bookSearch.value.query}`)
    .subscribe((response: any) => {
      this.books = response.items.map((item:any) =>{
        item.volumeInfo.description = this.sliceDescription(item.volumeInfo.description);
        item.volumeInfo.authors = this.joinAuthors(item.volumeInfo.authors);
        item.volumeInfo.publishedDate = this.formatDate(item.volumeInfo.publishedDate);
        return this.convertToBook(item);
      });
      this.booksEvent.emit(this.books);
    })
  }

  sliceDescription(description:string){
    if(description){
      if(description.length > 200){
        return `${description.slice(0, 200)}...`;
      }
    }
    return description;
  }

  joinAuthors(authors:[]){
    if(authors){
      return authors.join(", ");
    }
    return "";
  }

  formatDate(value:string){
    if(value){
      let monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
      let dateArray = value.split("-");
      if (dateArray.length === 3) {
        let date = new Date(value);
        return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      }
      if (dateArray.length === 2) {
        return`${monthNames[+dateArray[1] - 1]} ${dateArray[0]}`;
      }
    }
    return "";
  }

  convertToBook(item:any){
    if(item){
      let book = new Book();
      if(item.id){
        book.id = item.id;
      } else {
        book.id = null;
      }
      book.title = (item.volumeInfo.title ? item.volumeInfo.title : null);
      book.subtitle = (item.volumeInfo.subtitle ? item.volumeInfo.subtitle : null);
      if(item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail){
        book.smallThumbnail = item.volumeInfo.imageLinks.smallThumbnail;
      } else {
        book.smallThumbnail = null;
      }
      book.description = (item.volumeInfo.description ? item.volumeInfo.description : null);
      book.publishedDate = (item.volumeInfo.publishedDate ? item.volumeInfo.publishedDate : null);
      book.authors = (item.volumeInfo.authors ? item.volumeInfo.authors : null);
      return book;
    }
    return null;
  }

  onSubmit() {
    this.getBooks();
  }
}
