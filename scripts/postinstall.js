var fs = require('fs')
  , path = require('path')
  , spawn = require('child_process').spawn
  , exists = exports.exists = (fs.existsSync) ? fs.existsSync : path.existsSync;

const WD = path.resolve(__dirname, '..', 'public');
const OPTIONS = { stdio: 'inherit', cwd: WD };
const POLYMER_URL = 'git://github.com/Polymer/';

function cyan(str) {
  return '\x1b[36m' + str + '\x1b[0m';
}

function red(str) {
  return '\x1b[31m' + str + '\x1b[0m';
}

function clone(name, cb) {
  var child
    , url = POLYMER_URL + name + '.git';

  if(exists(path.resolve(WD, name))) {
    return cb && cb();
  }

  console.log();
  console.log(cyan('Cloning %s...'), name);
  console.log();

  child = spawn('git', ['clone', url, '--recursive'], OPTIONS);
  child.on('close', function(code) {
    if (code !== 0) {
      console.log();
      console.log(red('Cloning %s failed with code %d'), url, code);
      console.log();
      process.exit(1);
    } else {
      if(cb) {
        cb();
      }
    }
  });
}

var toolkit = clone.bind(null, 'toolkit-ui');
var polymer = clone.bind(null, 'polymer');

polymer(toolkit);
