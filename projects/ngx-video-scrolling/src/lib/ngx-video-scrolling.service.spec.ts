import { TestBed } from '@angular/core/testing';

import { NgxVideoScrollingService } from './ngx-video-scrolling.service';

describe('NgxVideoScrollingService', () => {
  let service: NgxVideoScrollingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxVideoScrollingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
