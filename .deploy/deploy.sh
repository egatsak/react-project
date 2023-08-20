cd ~/react-project
npm run build:prod

rm -rf ~/../var/www/react-project/html
mv ~/react-project/build  ~/../var/www/react-project/html