#!/bin/bash
while true; do
    cd /home/z/my-project
    node server.js
    echo "Server crashed, restarting..."
    sleep 2
done
