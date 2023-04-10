import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {


  @Input() title: string = ""
  @Input() data: any[] = [];
  @Output() Selection = new EventEmitter();

  filteration(event: any) {
    this.Selection.emit(event)
  }

}
