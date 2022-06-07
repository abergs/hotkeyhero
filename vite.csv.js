import {parseTSVArrays} from './tsv.js';
const fileRegex = /\.(tsv)$/;

export default function csvImporter() {
  return {
    name: 'transform-file',

    transform(src, id) {
      if (fileRegex.test(id)) {        
          const records = parseTSVArrays(src);
          return `export default ` + JSON.stringify(records) + `;`;
      }
    }
  }
}