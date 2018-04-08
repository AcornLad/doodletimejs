const express = require('express');
var fs = require('fs');
var gm = require('gm');

const app = express();
app.use("/birds", express.static(__dirname + '/birds'));

app
  .get('/', (req, res) =>{
    //Send index page
    res.send("Try adding a WIDTHxHEIGHT parameter, like 350x150");
  })
  .get('/:widthxheight',(req, res) =>{
    var inputString = req.params.widthxheight;
    var dimensions = inputString.split('x',3);
    dimensions = dimensions.filter(Boolean); //string.split is adding an empty substring for some reason
    var width = dimensions[0];
    var height = dimensions[1];
    var imagePromise = new Promise(function(resolve, reject){
      setTimeout(resolve, 10, 'fucked');
      gm(width, height, "#D3D3D3")
        .gravity('Center')
        .fill("#999999")
        .drawText(0, 0, "placeholder")
        .font('Arial')
        .pointSize(32)
        .write(__dirname + '/img/' + width + 'x' + height + '.png', function (err){
          if(!err){
            console.log('write successful!');
          }
      });
    });
    function sendImage(promise){
      res.sendFile(__dirname + '/img/' + width + 'x' + height + '.png');
    }
    sendImage(imagePromise);
    /*gm(__dirname + '/birds/Alcedo_Azurea.jpg')
      .resizeExact(width, height)
      .autoOrient()
      .write(req.hostname + req.path, function(err){
        if (!err) console.log('Image cropped');
      });*/
    //res.sendFile(__dirname + '/birds/Alcedo_Azurea.jpg');
    /*gm(__dirname + '/birds/Alcedo_Azurea.jpg').crop(width, height, 2, 2)
    res.sendFile(__dirname + '/birds/Alcedo_Azurea.jpg');*/
    //TODO: Add callback so image is made before it attempts to send file

  });

app.listen(3000);

/*'<html>' +
'<head>' +
  '<meta name="viewport" content="width=device-width, minimum-scale=0.1">' +
  '<title>350x150</title>' +
'</head>' +
'<body style="margin: 0px; background: #0e0e0e;">' +
  '<img style="-webkit-user-select: none;" src="/birds/Alcedo_Azurea.jpg" height="350" width="150"></img>' +
'</body>' +
'</html>'*/
