#!/bin/bash

BASE_DIR=`dirname $0`
 
./node_modules/jasmine-node/bin/jasmine-node --autotest  --verbose $BASE_DIR/../srv/test/