#!/bin/bash

BASE_DIR=$(cd $(dirname $0);pwd)
 
echo ""
echo "Starting Karma Server"
echo "-------------------------------------------------------------------"
cd $BASE_DIR/../app;
#./node_modules/node-dev/node-dev ../srv/index.js&

./node_modules/karma/bin/karma start $BASE_DIR/testconf/karma-e2e.conf.js $*
