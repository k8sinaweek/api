FROM node:12.4.0-alpine

# create directory to hold the code
WORKDIR /usr/src/app

# copy package.json and run install before copying the source code
# docker will cache this time consuming step and it won't rerun unless new packages are added
COPY package*.json ./
RUN npm install

# copy over the source code
COPY . .

CMD ["npm", "start"]
