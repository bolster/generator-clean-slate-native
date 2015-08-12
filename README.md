# generator-clean-slate-native

> [Yeoman](http://yeoman.io) generator

## Getting Started

```bash
npm install -g yo
```

### Yeoman Generators

To install generator-clean-slate from npm, run:

```bash
npm install -g generator-clean-slate-native
```

Finally, initiate the generator:

```bash
yo clean-slate-native
```

### Known Issues
 Need to use skevy/react-native to stop FB packager.
 Need to add
 ```
 shellScript = "#if nc -w 5 -z localhost 8081 ; then\n#    if ! curl -s \"http://localhost:8081/status\" | grep -q \"packager-status:running\" ; then\n#        echo \"Port 8081 already in use, packager is either not running or not running correctly\"\n#        exit 2\n#    fi\n#else\n#    open $SRCROOT/launchWebpack.command || echo \"Packager could not start.\"\n#fi";

 to project.pbxproj
 ```



## License

MIT
