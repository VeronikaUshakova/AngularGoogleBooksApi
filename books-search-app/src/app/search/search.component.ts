import { Component, OnInit } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  books: Array<Book> = [];
  myBooks: Array<Book> = [];
  titleBookList = "Search result:"
  titleMyBookList = "My list:"
  textButtonBookList = "Add";
  textButtonMyBookList = "Remove";

  constructor() { 
    this.myBooks = JSON.parse(localStorage.getItem("myListBooks") || "[]");
    this.myBooks = this.myBooks.map((item) => {
      return this.convertToBook(item);
    })
  }

  ngOnInit(): void {
  }

  convertToBook(item:any){
    let book = new Book();
    book.id = item.id;
    book.title = item.title;
    book.subtitle = item.subtitle;
    book.smallThumbnail = item.smallThumbnail;
    book.publishedDate = item.publishedDate;
    book.description = item.description;
    book.authors = item.authors;
    return book;
  }

  receiveBooks($event:any){
    this.books = $event;
  }

  receiveBook($event:any){
    if($event.textContent === this.textButtonBookList){
      this.addBookToMyList($event.id);
    }
    else if($event.textContent === this.textButtonMyBookList){
      this.deleteBookFromMyList($event.id);
    }
  }

  addBookToMyList(id: string){
    this.books.forEach((item) => {
      if(item.id === id && this.checkUniqueBooks(item)){
        this.myBooks.push(item);
      }
    });
    this.saveMyBooks();
  }

  checkUniqueBooks(item:any){
    let check = true;
    this.myBooks.forEach((book) => {
      if(item.id === book.id){
        check = false;
      }
    });
    return check;
  }

  saveMyBooks(){
    localStorage.setItem("myListBooks", JSON.stringify(this.myBooks));
  }

  deleteBookFromMyList(id:string){
    this.myBooks.forEach((item,index) => {
      if(item.id === id){
        this.myBooks.splice(index, 1);
      }
    });
    this.saveMyBooks();
  }
}
