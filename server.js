let express = require('express'),
app = express();

app.use(express.static('./dist/ngx-video-scrolling-demo'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {
    root: 'dist/ngx-video-scrolling-demo/'
  });
});

app.listen(process.env.PORT || 8080);
