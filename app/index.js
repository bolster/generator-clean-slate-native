'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs-extra');
var _ = require('lodash');
var glob = require('glob');

var s = require('underscore.string');

_.mixin(s.exports());

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('CleanSlate [ReactNative]') + ' generator!'
      ));

    var prompts = [
    {
      name: 'name',
      message: 'Module Name',
      default: path.basename(process.cwd())
    }, {
      name: 'description',
      message: 'Description',
      default: 'The best module ever.'
    }, {
      name: 'homepage',
      message: 'Homepage'
    }, {
      name: 'githubUsername',
      message: 'GitHub username or organization',
      store: true
    }, {
      name: 'authorName',
      message: 'Author\'s Name',
      store: true
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email',
      store: true
    }, {
      name: 'authorUrl',
      message: 'Author\'s Homepage',
      store: true
    }
    ];

    this.prompt(prompts, function (props) {
      this.slugname = _.slugify(props.name);
      this.safeSlugname = this.slugname.replace(/-+([a-zA-Z0-9])/g, function (g) {
        return g[1].toUpperCase();
      });

      this.projectName = capitalizeFirstLetter(this.safeSlugname);

      if (props.githubUsername) {
        this.repoUrl = props.githubUsername + '/' + this.slugname;
      } else {
        this.repoUrl = 'user/repo';
      }

      this.props = props;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.template('_README.md', 'README.md');
      this.template('_package.json', 'package.json');
      this.template('_webpack.config.js', 'webpack.config.js');


      var tp = this.templatePath('React-Native-iOS');

      var files = glob.sync(tp + '/**', {nodir: true, ignore: [tp + '/**/Images.xcassets/**']});
      files.forEach(function (file) {

        var source = file.slice(tp.length + 1);
        var destination = source.replace(/ProjectName/g, this.projectName);

        var context = _.merge({}, this.props, {projectName: this.projectName});

        this.fs.copyTpl(
          tp + '/' + source,
          this.destinationPath(destination),
          context
          );

      }, this);

      //Copy ImageAssets.xcassets using copySync because copyTpl BREAKS things badly.
      fs.copySync(tp + '/iOS/Images.xcassets', this.destinationPath('iOS/Images.xcassets'));

    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
        );
      this.fs.copy(
        this.templatePath('_eslintrc'),
        this.destinationPath('.eslintrc')
        );
      this.fs.copy(
        this.templatePath('_editorconfig'),
        this.destinationPath('.editorconfig')
        );
      this.fs.copy(
        this.templatePath('_flowconfig'),
        this.destinationPath('.flowconfig')
        );
    }
  },

  install: function () {
    this.installDependencies({
      bower: false,
      skipInstall: this.options['skip-install']
    });
  }
});
