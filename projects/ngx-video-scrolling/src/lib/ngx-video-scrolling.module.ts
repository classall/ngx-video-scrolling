import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxVideoScrollingComponent } from './ngx-video-scrolling.component';

@NgModule({
  declarations: [NgxVideoScrollingComponent],
  exports: [NgxVideoScrollingComponent],
  imports: [
    CommonModule,
  ],
})
export class NgxVideoScrollingModule { }
