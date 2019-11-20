var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/addEventToCalendar.js',
    output: {
        path: path.resolve('lib'),
        filename: 'addToCalendar.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    }
}