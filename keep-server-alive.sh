#!/bin/bash
while true; do
    cd /home/z/my-project
    node start-server.js 2>&1
    sleep 2
done
