import { Component, ElementRef, Input, NgZone, OnChanges, ViewChild } from '@angular/core';
import { Tooltip } from '../models/tooltip.model';

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
  @Input() public tooltips: Tooltip[] = [];
  @ViewChild('videoElement', { static: true }) public videoElement: ElementRef;
  @ViewChild('setHeight', { static: true }) public setHeight: ElementRef;

  constructor(private ngZone: NgZone) { }

  public ngOnChanges() {
    if (this.videoSource) {
      this.setVideoLoadListener();
      // Prevent requestAnimationFrame from triggering Angular change detection
      this.ngZone.runOutsideAngular(() => this.animate());
    }
  }

  public setClass(tooltip: Tooltip) {
    return (tooltip.className ? tooltip.className + ' ' : '') + (tooltip.position ? tooltip.position : 'left');
  }

  public setStyle(tooltip: Tooltip) {
    return { top: (tooltip.videoTime * this.frameDivider + this.videoElement.nativeElement.getBoundingClientRect().height) + 'px' };
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

    if (this.frameNumber > 0) {
      console.log(this.frameNumber);
      // Wait for seek event before next frame
      this.videoElement.nativeElement.onseeked = () => {
        this.videoElement.nativeElement.onseeked = null;
        window.requestAnimationFrame(this.scrollPlay.bind(this));
      };
    } else {
      // Video didn't start yet
      window.requestAnimationFrame(this.scrollPlay.bind(this));
    }
  }

}
