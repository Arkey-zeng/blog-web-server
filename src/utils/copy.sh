#!/bin/sh
cd /Users/arkey/workspace/node/nodejs-demo/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log