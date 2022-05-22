import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  @Input() book: any;
  @Input() textButton: string = "";

  @Output() bookEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  handleClick($event:any){
    this.bookEvent.emit($event.target);
  }

}
