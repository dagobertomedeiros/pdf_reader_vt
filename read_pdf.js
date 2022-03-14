let PdfReader = require("pdfreader").PdfReader;
let lines = {};
let rep = null
new PdfReader().parseFileItems("53867.pdf", function(err, item){
    if (item && item.text)
      console.log(item.text);
      rep = item.text
  });
  console.log(rep)