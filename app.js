const express = require('express'),
  app = express(),
  fs = require('fs'),
  shell = require('shelljs'),

   // Modify the folder path in which responses need to be stored
  root = './',
  defaultFileExtension = 'json', // Change the default file extension
  DEFAULT_MODE = 'writeFile',
  path = require('path');

// Create the folder path in case it doesn't exist
shell.mkdir('-p', root);

 // Change the limits according to your response size
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({ limit: '50mb', extended: true })); 

app.get('/', (req, res) => res.send('Hello, I write data to file. Send them requests!'));

app.post('/write', (req, res) => {
  let fsMode = req.body.mode || DEFAULT_MODE,
    filename = req.body.filename,
    folder = req.body.folder || '',
    filePath = path.join(root, folder, filename),
    data = typeof req.body.responseData === 'object' ? JSON.stringify(req.body.responseData, null, 4) : req.body.responseData

  fs[fsMode](filePath, data, 'utf8', (err) => {
    if (err) {
      console.log(err);
      res.send('Error');
    }
    else {
      res.send('Success');
      // console.log(`${fsMode} - ${folder} ${filename} ${req.body.responseData}`);
    }
  });
});

app.listen(3000, () => {
  console.log('postman2file is listening on port 3000');
  console.log(`Data is being stored at location: ${path.join(process.cwd(), root)}`);
});