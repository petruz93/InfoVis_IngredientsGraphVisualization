#!/bin/bash

cat /proc/sys/fs/inotify/max_user_watches
sudo sysctl fs.inotify.max_user_watches=16384
sudo sysctl -p
