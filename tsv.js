export function parseTSVObjects(tsv) {
    const lines = tsv.split('\n');
    const headers = lines[0].split('\t');
    const records = [];
    for (let i = 1; i < lines.length; i++) {
      const record = {};
      const line = lines[i].split('\t');
      for (let j = 0; j < headers.length; j++) {
        record[headers[j]] = line[j];
      }
      records.push(record);
    }
    return records;
  }


export function parseTSVArrays(tsv, options) {
    const conf = {
        skipHeaders: true
        ,...options};
    const lines = tsv.split('\n');
    const records = [];

    let startingIndex = 0;
    if(conf.skipHeaders) startingIndex = 1;

    for (let i = startingIndex; i < lines.length; i++) {
      const record = [];
      const line = lines[i].split('\t');
      for (let j = 0; j < line.length; j++) {
        record.push(line[j]);
      }
      records.push(record);
    }
    return records;
  }