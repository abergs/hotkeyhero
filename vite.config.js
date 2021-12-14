import myplugin from './myplugin.js';

export default {
    build: {
        target:"",
        assetsDir: "",
    },
    plugins: [
        myplugin()
    ]
}