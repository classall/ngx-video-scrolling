import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxVideoScrollingComponent } from './ngx-video-scrolling.component';

describe('NgxVideoScrollingComponent', () => {
  let component: NgxVideoScrollingComponent;
  let fixture: ComponentFixture<NgxVideoScrollingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxVideoScrollingComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxVideoScrollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onChanges', () => {

    it('should not call setVideoLoadListener and animate fn when videoSource is not set', () => {
      const spySetVideoLoadListener = spyOn(component, 'setVideoLoadListener');
      const spyAnimate = spyOn(component, 'animate');

      component.ngOnChanges();

      expect(spySetVideoLoadListener).not.toHaveBeenCalled();
      expect(spyAnimate).not.toHaveBeenCalled();
    });

    it('should call setVideoLoadListener and animate fn when videoSource is set', () => {
      const spySetVideoLoadListener = spyOn(component, 'setVideoLoadListener');
      const spyAnimate = spyOn(component, 'animate');

      component.videoSource = 'some-test-video.mp4';
      component.ngOnChanges();

      expect(spySetVideoLoadListener).toHaveBeenCalled();
      expect(spyAnimate).toHaveBeenCalled();
    });

  });

  describe('setClass', () => {

    it('should return left as default value when tooltip has no className and no position', () => {
      const className = component.setClass({ text: 'Some text', videoTime: 10 });
      expect(className).toBe('left');
    });

    it('should return concat of tooltip className and position', () => {
      const className = component.setClass({ text: 'Some text', videoTime: 10, className: 'some-class', position: 'right' });
      expect(className).toBe('some-class right');
    });
  });

  describe('setStyle', () => {

    it('should return top position of tooltip', () => {
      component.frameDivider = 1000;
      component.videoElement = {
        nativeElement: {
          getBoundingClientRect: () => ({ height: 100 }),
        },
      };

      const style = component.setStyle({ text: 'Some text', videoTime: 10 });

      expect(Object.keys(style)).toEqual(['top']);
      expect(style.top).toEqual('10100px');
    });
  });

  describe('setVideoLoadListener', () => {

    it('should set component height on loadedmetadata event', () => {
      component.frameDivider = 1000;
      component.videoElement = {
        nativeElement: {
          addEventListener: (name, callback) => {
            callback();
          },
          duration: 10,
        },
      };
      component.setHeight = {
        nativeElement: {
          style: {
            height: null,
          },
        },
      };
      component.setVideoLoadListener();
      expect(component.setHeight.nativeElement.style.height).toBe('10000px');
    });
  });

  describe('scrollPlay', () => {

    beforeEach(() => {
      component.setHeight = {
        nativeElement: {
          getBoundingClientRect: () => ({ y: -1000 }),
        },
      };
      component.videoElement = {
        nativeElement: {},
      };
      component.frameDivider = 1000;
    });

    it('should set video currentTime', () => {
      component.scrollPlay();

      expect(component.frameNumber).toEqual(1);
      expect(component.videoElement.nativeElement.currentTime).toEqual(component.frameNumber);
    });

    it('should not call requestAnimationFrame until onseeked event', () => {
      const spyRequestAnimation = spyOn(window, 'requestAnimationFrame');

      component.scrollPlay();

      expect(spyRequestAnimation).not.toHaveBeenCalled();

      component.videoElement.nativeElement.onseeked();
      expect(spyRequestAnimation).toHaveBeenCalled();
    });

    it('should call requestAnimationFrame while the video didn\'t start', () => {
      const spyRequestAnimation = spyOn(window, 'requestAnimationFrame');
      component.setHeight = {
        nativeElement: {
          getBoundingClientRect: () => ({ y: 1000 }),
        },
      };

      component.scrollPlay();

      expect(spyRequestAnimation).toHaveBeenCalled();
    });
  });
});
