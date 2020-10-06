import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.less'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public title = 'ngx-video-scrolling';
  public tooltips = [{
    className: 'test-class',
    text: 'Some text',
    videoTime: 1,
  }, {
    position: 'right',
    text: 'Some tooltip',
    videoTime: 8,
  }];
}
