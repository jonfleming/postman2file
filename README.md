# postman2file (forked from [ResponseToFile-Postman](https://github.com/sivcan/ResponseToFile-Postman))

This project helps you save the responses of a request from Postman to a file.


This node.js app makes it easy for users who want to write the response of each request to a file.
This can be extended to write anything for eg. meta information or value of variables being used.


This project is using a feature built in postman called `pm.sendRequest`, the docs for which can be found here: https://learning.postman.com/docs/postman/scripts/postman-sandbox-api-reference/#pmsendrequest


## Requirements
To work with this from Postman, a local server is required.
You can choose to use this app or write your own.

## Steps To Use
1. Clone this repository to your machine
```
git clone https://github.com/jonfleming/postman2file
```

2. Navigate into the directory and install the dependencies. Use the following command:
```
npm i
``` 

3. Run the local server. Use the following command:
```
node app.js
```

4. Now, the responses for every request which is a part of your collection can be written to the `Responses` folder inside the project repo.
You can modify the local server's code to change the file location.

5. Add the following code to your Postman request `Test` tab:
### Example Postman Test
```
saveResult('response.json', pm.response.json()); 

// Save response to file (postman2file)
function saveResult(filename, output) {
    let opts = {
        filename: filename,
        folder: '',
        mode: 'writeFile', 
        responseData: output
    };

    pm.sendRequest({
        url: 'http://localhost:3000/write',
        method: 'POST',
        header: 'Content-Type:application/json',
        body: {
            mode: 'raw',
            raw: JSON.stringify(opts)
        }
    }, function (err, res) {
        console.log(res);
    });
}
```

You can modify the script and the local server to support more data formats / data that you want to write to the file.

## Additionally
Instead of adding this code to each request, you can copy this code to the `Tests` tab of the collection and it will be executed after each request.

## File Support
If you want the data to be appended to an existing file instead of overwriting it you can modify the value of mode to appendFile instead of writeFile (More functions here: [Node FS](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback))

