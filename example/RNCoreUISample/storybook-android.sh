#!/bin/bash

set -e

cross-env STORYBOOK_ENABLED=true react-native start &
METRO_PID=$!

react-native run-android --no-packager

cleanup() {
  echo -e "\nStopping Metro..."
  kill $METRO_PID
  exit 0
}

trap cleanup SIGINT SIGTERM
wait
