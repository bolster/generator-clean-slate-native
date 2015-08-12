#!/bin/bash

# Set terminal title
echo -en "\033]0;React Webpack Packager\a"
clear

THIS_DIR=$(dirname "$0")
cd $THIS_DIR && npm run hot
# cd $THIS_DIR && npm start
echo "Process terminated. Press <enter> to close the window"
read
