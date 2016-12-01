#!/bin/bash
export NODE_ENV=$ENV
pm2 start /application/config/pm2/pm2-development.json -i 0 --no-daemon