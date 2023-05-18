cd ../front-project
export NODE_OPTIONS=--max-old-space-size=8192
npm run build:prod

rm -rf ~/../var/www/front_project/html
mv ~/front-project/build ~/../var/www/front_project/html
