import { parse } from 'csv-parse';
let x = parse("");

const fileRegex = /\.(tsv)$/;


function parsecsv(csv) {
    const records = [];
// Initialize the parser
const parser = parse({
  delimiter: "\t"
});
// Use the readable stream api to consume records
parser.on('readable', function(){
  let record;
  while ((record = parser.read()) !== null) {
    records.push(record);
  }
});
// Catch any error
parser.on('error', function(err){
  console.error(err.message);
});

parser.write(csv);

// Close the readable stream
parser.end();

return records;
}


export default function myPlugin() {
  return {
    name: 'transform-file',

    transform(src, id) {
      if (fileRegex.test(id)) {
          const records = parsecsv(src);
          return `export default ` + JSON.stringify(records) + `;`;
      }
    }
  }
}