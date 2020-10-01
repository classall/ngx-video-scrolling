import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxVideoScrollingComponent } from './ngx-video-scrolling.component';

describe('NgxVideoScrollingComponent', () => {
  let component: NgxVideoScrollingComponent;
  let fixture: ComponentFixture<NgxVideoScrollingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxVideoScrollingComponent ]
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
});
