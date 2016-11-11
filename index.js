require('malta').checkDeps('node-sass');

var sass = require("node-sass"),
	path = require('path'),
	fs = require('fs');

function malta_sass(o, options) {

	var self = this,
		name = o.name,
		start = new Date(),
		msg,
		oldname = o.name;

	o.content = sass.renderSync({data: o.content + ''}).css;

	o.name = o.name.replace(/\.scss$/, '.css');

	return function (solve, reject){

		fs.writeFile(o.name, o.content, function(err) {
			
			if (err == null) {
				msg = 'plugin ' + path.basename(__filename) + ' wrote ' + o.name + ' (' + self.getSize(o.name) + ')';
			} else {
				console.log('[ERROR] sass says:');
				console.dir(err);
				self.stop();
			}
			fs.unlink(oldname);
			solve(o);
			self.notifyAndUnlock(start, msg);
		});
	};
}
malta_sass.ext = 'scss';
module.exports = malta_sass;