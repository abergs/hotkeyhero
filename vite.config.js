import csvImporter from './vite.csv.js';

export default {
    build: {
        target:"",
        assetsDir: "",
    },
    plugins: [
        csvImporter()
    ]
}