# NgxVideoScrolling

An angular component allowing video scrubbing on scroll.
This project is based on this [CodePen](https://codepen.io/ollieRogers/pen/lfeLc).

## Demo

Working demo [here](https://ngx-video-scrolling.herokuapp.com/).

## Installation

To install this library, run :

```bash
$ npm install ngx-video-scrolling
```

and then add it into your `AppModule` :

```typescript
import { NgxVideoScrollingModule } from 'ngx-video-scrolling';

@NgModule({
  imports: [
    NgxVideoScrollingModule
  ],
  [ ... ]
})
export class AppModule { }
```

You can now use its component :

```xml
<ngx-video-scrolling [videoSource]="'../assets/test.mp4'"></ngx-video-scrolling>
```


## Parameters

| Input         | Default Value | Optional      | Description                                           |
| ------------- | ------------- | ------------- | ----------------------------------------------------- |
| videoSource   | undefined     | false         | Video file path                                       |
| frameNumber   | 0             | true          | The frame number to start the video from (in seconds) |
| frameDivider  | 1000          | true          | Number of pixels to scroll to scrub one second        |
