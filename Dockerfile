# EXAMPLE FILE - NOT WORKING!

FROM node:18-alpine
 
# WORKDIR /app
 
COPY package.json  package-lock.json ./
COPY ./prisma ./prisma
 
RUN npm install
 
COPY . .
# RUN npm install pm2 -g
RUN npm run build
EXPOSE 3003
CMD [ "node", "dist/index.js" ]

