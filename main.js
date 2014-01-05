$('#inputFile').on('change', function() {
  var delimeter = ': ';
  var file = $('#inputFile').get(0).files[0];

  $('#fileName').text(['Name', file.name].join(delimeter));
  $('#fileSize').text(['Size', file.size].join(delimeter));
  $('#fileType').text(['Type', file.type].join(delimeter));
});

$('#inputSubmit').on('click', function() {
  var fd = new FormData();
  fd.append('uploadingFile', $('#inputFile').get(0).files[0]);
  fd.append('date', (new Date()).toString()); // req.body.date
  fd.append('comment', 'This is a test.'); // req.body.comment

  var xhr = new XMLHttpRequest();
  xhr.upload.addEventListener("progress", uploadProgress, false);
  xhr.addEventListener("load", uploadComplete, false);
  xhr.addEventListener("error", uploadFailed, false);
  xhr.addEventListener("abort", uploadCanceled, false);

  xhr.open("POST", "/fileUpload");
  xhr.send(fd);
});

function uploadProgress(evt) {
  if(evt.lengthComputable) {
    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
    $('#progress').text(percentComplete.toString() + '%');
  } else {
    $('#progress').text('unable to compute');
  }
}

function uploadComplete(evt) {
  uploadProgress(evt);
  alert(evt.target.responseText);
}

function uploadFailed(evt) {
  alert("There was an error attempting to upload the file.");
}

function uploadCanceled(evt) {
  alert("The upload has been canceled by the user or the browser dropped the connection.");
}