var express = require('express');
var fs = require('fs');
var app = express();

app.configure(function() {
  app.use(express.static(__dirname));
  app.use(express.bodyParser({uploadDir: './uploads'}));
});

app.post('/fileUpload', function(req, res) {
  console.log(req.body);
  console.log(req.files);

  var uploadedFile = req.files.uploadingFile;
  var tmpPath = uploadedFile.path;
  var targetPath = './uploads/' + uploadedFile.name;

  fs.rename(tmpPath, targetPath, function(err) {
    if (err) {
      throw err;
    }
    fs.unlink(tmpPath, function() {
      if (err) {
        throw err;
      }
      res.send('File Uploaded to ' + targetPath + ' - ' + uploadedFile.size + ' bytes');
    });
  });
});

console.log('start...');
app.listen(3030);
