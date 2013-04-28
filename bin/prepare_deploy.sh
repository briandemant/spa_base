#!/bin/bash
git rm -rf srv/public/
[ ! -e srv/public/ ] && mkdir srv/public/
./node_modules/yeoman/bin/yeoman build
rm -rf  srv/public/less
rm -rf  srv/public/test
git add srv/public/