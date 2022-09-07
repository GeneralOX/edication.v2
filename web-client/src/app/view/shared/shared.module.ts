import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesFormComponent } from './courses-form/courses-form.component';
import { EventsFormComponent } from './events-form/events-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CoursesFormComponent, EventsFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [CoursesFormComponent, EventsFormComponent]
})
export class SharedModule { }
