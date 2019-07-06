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

	o.name = o.name.replace(/\.scss$/, '.css');

	return function (solve, reject){
        try {
            o.content = sass.renderSync({data: o.content + ''}).css + "";
            fs.writeFile(o.name, o.content, function(err) {	
                err && self.doErr(err, o, pluginName);
                msg = 'plugin ' + pluginName.white() + ' wrote ' + o.name + ' (' + self.getSize(o.name) + ')';
                fs.unlink(oldname, () => {});
                err
                    ? reject(`Plugin ${pluginName} write error:\n${err}`)
                    : solve(o);
                self.notifyAndUnlock(start, msg);
            });
        } catch (err) {
            self.doErr(err, o, pluginName);
            reject(`Plugin ${pluginName} error:\n${err}`);
        }
		
	};
}
malta_sass.ext = 'scss';
module.exports = malta_sass;