import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-events-form',
  templateUrl: './events-form.component.html',
})
export class EventsFormComponent implements OnInit {

  @Input() backTo: string = "";
  @Input() uid: string = "";
  @Input() event: any = {};

  form = new FormGroup({
    title: new FormControl(this.event.title, Validators.required),
    subtitle: new FormControl("", Validators.required),
    imgUrl: new FormControl("", Validators.required),
  
    startAt: new FormControl("", Validators.required),
    endAt: new FormControl("", Validators.required),
    location: new FormControl("", Validators.required),
  });





  @Output() objectChanged: EventEmitter<typeof this.form> = new EventEmitter();
  constructor() {
    const _interval = setInterval(() => {
      if (this.uid != "") {
        this.form.setValue({
          title: this.event.title,
          subtitle: this.event.subtitle,
          imgUrl: this.event.imgUrl,
          startAt: this.event.startAt,
          endAt: this.event.endAt,
          location: this.event.location,
        });
        clearInterval(_interval);
      }
    }, 100);
  }
  ngOnInit(): void {
  }
  onSubmit() {
    this.objectChanged.emit(this.form);
  }

}
