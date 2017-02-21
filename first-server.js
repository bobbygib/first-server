var http = require("http");

var fs = require("fs");


var pageCount = parseInt(fs.readFileSync("./count.txt"))
// var pageCount = parseInt(readFileSync("./count.txt"))

function updateCount(filename, pageCount){
  fs.writeFile(filename, pageCount, function(err){
    if (err){
      console.log(err);
      return;
    }
  });
}


var server = http.createServer(function(req, res){
  if(req.url === "/"){ // local hose 8080
    fs.readFile("./cats.html", function(err, data){
      
      pageCount = pageCount + 1;
      updateCount("./count.txt", pageCount)
      res.write(data);
      res.end();
    })
  } else if (req.url === "/count"){
    fs.readFile("./count.txt", function(err, data){
      res.write(data);
      res.end();
    })
  }
})

server.listen(8080);

console.log("SWERVER UP!")