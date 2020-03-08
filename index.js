require('malta').checkDeps('node-sass');

const sass = require("node-sass"),
	path = require('path'),
	fs = require('fs');

function malta_sass(o, options) {

	const self = this,
		start = new Date(),
        pluginName = path.basename(path.dirname(__filename)),
        oldname = o.name;

    let msg;

	o.name = o.name.replace(/\.scss$/, '.css');

	return (solve, reject) => {
        try {
            o.content = sass.renderSync({data: o.content + ''}).css + "";
            fs.writeFile(o.name, o.content, err => {	
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