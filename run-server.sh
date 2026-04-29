#!/bin/bash
cd /home/z/my-project
while true; do
    echo "Starting server..."
    node start-server.js
    echo "Server crashed, restarting in 5 seconds..."
    sleep 5
done
