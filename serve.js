var babelMiddleware = require('babel-connect');
var connect = require('connect');
var http = require('http');
var morgan = require('morgan');
var serveStatic = require('serve-static');
var stylus = require('stylus');

var app = connect();

app.use(morgan('dev'));

app.use('/media/js', babelMiddleware({
    options: {
        modules: 'ignore',
    },
    src: '.',
    dest: 'cache'
}));

// Compile the CSS on demand.
app.use('/media/css', stylus.middleware({
    src: '.',
    dest:'cache',
    sourcemap: true,
}));
// Serve the CSS files.
app.use('/media/css', serveStatic('cache'));

app.use('/bower_components', serveStatic('bower_components'));
app.use('/node_modules', serveStatic('node_modules'));
app.use('/', serveStatic('elements', {index: ['index.html']}));

var port = process.env.PORT || 3000;
console.log('Listening on port ' + port);
http.createServer(app).listen(port);
