var path = require('path');
var express = require('express');
var fs = require('fs');
var app = express();

app.configure(function() {
  app.use(express.static(__dirname));
});

app.post('/fileUpload', function(req, res) {
  console.log(req.headers);
  var name = req.headers['x-filename'];
  if (!name) {
    name = Math.random();
  }

  var extension = path.extname(name).toLowerCase();
  var fileName = safeFilename(path.basename(name, extension) + extension);
  if (fileName == extension) {
    res.send(JSON.stringify({error: "Invalid name."}));
    return;
  }

  var targetPath = './uploads/' + fileName;

  var file = fs.createWriteStream(targetPath, {
    flags: 'w',
    encoding: 'binary',
    mode: 0644
  });

  req.on('data', function(chunk) {
    file.write(chunk);
  });

  req.on('end', function() {
    file.end();
    res.send('File Uploaded to ' + targetPath);
  });
});

/* probably a bit naive, but hey - we're just testing. */
function safeFilename(name) {
  name = name.replace(/ /g, '-');
  name = name.replace(/[^A-Za-z0-9-_\.]/g, '');
  name = name.replace(/\.+/g, '.');
  name = name.replace(/-+/g, '-');
  name = name.replace(/_+/g, '_');
  return name;
}

console.log('start...');
app.listen(3030);
console.log('Listening http://localhost:3030');

