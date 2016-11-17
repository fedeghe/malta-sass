require('malta').checkDeps('node-sass');

var sass = require("node-sass"),
	path = require('path'),
	fs = require('fs');

function malta_sass(o, options) {

	var self = this,
		name = o.name,
		start = new Date(),
		msg,
        pluginName = path.basename(path.dirname(__filename)),
		oldname = o.name;

	try {
		o.content = sass.renderSync({data: o.content + ''}).css + "";
	} catch (err) {
		self.doErr(err, o, pluginName);
	}

	o.name = o.name.replace(/\.scss$/, '.css');

	return function (solve, reject){
		fs.writeFile(o.name, o.content, function(err) {	
			err && self.doErr(err, o, pluginName);
			msg = 'plugin ' + pluginName.white() + ' wrote ' + o.name + ' (' + self.getSize(o.name) + ')';
			fs.unlink(oldname);
			solve(o);
			self.notifyAndUnlock(start, msg);
		});
	};
}
malta_sass.ext = 'scss';
module.exports = malta_sass;