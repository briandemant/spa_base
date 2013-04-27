#!/bin/bash
./node_modules/yeoman/bin/yeoman server &
NODE_ENV=development
./node_modules/node-dev/node-dev srv/server.js
