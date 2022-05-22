import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() books: any = [{}];
  @Input() title: string = "";
  @Input() textButton: string = "";

  @Output() bookEvent = new EventEmitter<any>();

  constructor() { 
  }

  ngOnInit(): void {
  }

  receiveBook($event:any){
    this.bookEvent.emit($event);
  }
}
