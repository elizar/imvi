// Dependencies
var test     = require('tap').test;
var cp       = require('child_process');
var path     = require('path');
var fs       = require('fs');
var imviPath = '../bin/imvi';
var helpTxt  = require('../bin/help_txt.json');
var cp       = require('child_process');

function _getRealPath(dirPath) {
    return path.join(process.cwd(), dirPath);
}

// Setup dirs and files before the test
var _dir      = _getRealPath('dir');
var _emptyDir = _getRealPath('empty_dir');

fs.mkdirSync(_dir);
fs.mkdirSync(_emptyDir);

fs.writeFileSync(_dir + '/testCase.html');
fs.writeFileSync(_dir + '/loremIpsum.txt');
fs.writeFileSync(_dir + '/helloWorld.php');

test('imvi should return a default help text', function(t) {

    t.test('without passing -h as argument', function(t) {

        cp.execFile(imviPath, function(err, stdout, stderr) {

            t.equal(err, null, 'Should have no error');
            t.equal(stdout.toString(), helpTxt.join('\n') + '\n', 'Should output a help text');
            t.end();

        });

    });

    t.test('with a -h argument', function(t) {

        cp.execFile(imviPath, ['-h'], function(err, stdout, stderr) {

            t.equal(err, null, 'Should have no error');
            t.equal(stdout.toString(), helpTxt.join('\n') + '\n', 'Should output a help text`');
            t.end();

        });

    });

});

test('imvi should handle a PATH argument properly', function(t) {

    t.test('should output an error message when passing a non-dir path', function(t) {

        cp.execFile(imviPath, ['non_existing_path', '-v'], function(err, stdout, stderr) {

            t.equal(err, null, 'Should have no error');
            console.log(stdout);
            t.ok(stdout.toString().match(/invalid directory/ig), 'Should output `Invalid Directory`');
            t.end();

        });

    });

    t.test('imvi should capitalize the first letter of all the files in the directory', function(t) {

        cp.execFile(imviPath, ['dir', '-v'], function(err, stdout, stderr) {

            t.equal(err, null, 'Should have no error');
            t.ok(stdout.match(/done/ig), 'Should return ok and done');
            t.end();

        });
    });


});


test('should removed the test folders', function(t) {
    cp.exec('rm -rf *dir', function(err) {
        t.end();
    });
});
