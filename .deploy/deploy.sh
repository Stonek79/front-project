cd ../front-project
export NODE_OPTIONS=--max-old-space-size=8192
node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))'

npm run build:prod

rm -rf ../var/www/front-project/html
mv build ../var/www/front-project/html

cp -r ../front-project/public/images ../var/www/front-project/html/images
