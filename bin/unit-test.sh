#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Starting Testacular Server (http://vojtajina.github.com/testacular)"
echo "-------------------------------------------------------------------"

./node_modules/testacular/bin/testacular start $BASE_DIR/testconf/testacular.conf.js $*