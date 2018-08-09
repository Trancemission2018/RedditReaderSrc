#!/bin/sh
npm run build
cd dist
git add .
git commit -m "Release"
git push -u origin master
