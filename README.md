---
[![npm version](https://badge.fury.io/js/malta-sass.svg)](http://badge.fury.io/js/malta-sass)
[![npm downloads](https://img.shields.io/npm/dt/malta-sass.svg)](https://npmjs.org/package/malta-sass)
[![npm downloads](https://img.shields.io/npm/dm/malta-sass.svg)](https://npmjs.org/package/malta-sass)  
---  

This plugin can be used on: **.scss** files

Options : no options  

Sample usage:  
```
malta app/source/home.scss public/css -plugins=malta-sass
```
or in the .json file :
```
"app/source/home.scss" : "public/js -plugins=malta-sass"
```
or in a script : 
``` js
var Malta = require('malta');
Malta.get().check([
    'app/source/home.scss',
    'public/css',
    '-plugins=malta-sass',
    '-options=showPath:false,watchInterval:500,verbose:0'
    ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```