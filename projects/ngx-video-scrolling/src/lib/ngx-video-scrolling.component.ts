import { Component, ElementRef, Input, NgZone, OnChanges, ViewChild } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-video-scrolling',
  styleUrls: ['./ngx-video-scrolling.component.less'],
  templateUrl: 'ngx-video-scrolling.component.html',
})
export class NgxVideoScrollingComponent implements OnChanges {

  // Video src
  @Input() public videoSource: string;
  // Start frame number
  @Input() public frameNumber = 0;
  // Video speed (less is more ...)
  @Input() public frameDivider = 1000;
  @ViewChild('videoElement', { static: true }) public videoElement: ElementRef;
  @ViewChild('setHeight', { static: true }) public setHeight: ElementRef;

  constructor(private ngZone: NgZone) { }

  public ngOnChanges() {
    if (this.videoSource) {
      this.setVideoLoadListener();
      this.ngZone.runOutsideAngular(() => this.animate());
    }
  }

  private setVideoLoadListener() {
    this.videoElement.nativeElement.addEventListener('loadedmetadata', () => {
      this.setHeight.nativeElement.style.height = Math.floor(this.videoElement.nativeElement.duration) * this.frameDivider + 'px';
    });
  }

  private animate() {
    window.requestAnimationFrame(this.scrollPlay.bind(this));
  }

  private scrollPlay() {
    const bodyRect = this.setHeight.nativeElement.getBoundingClientRect();
    this.frameNumber = -bodyRect.y / this.frameDivider;
    this.videoElement.nativeElement.currentTime = this.frameNumber;
    window.requestAnimationFrame(this.scrollPlay.bind(this));
  }

}
