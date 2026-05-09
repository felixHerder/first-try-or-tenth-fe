# No build
FROM nginx:alpine
# Copy build artifacts
COPY ./dist/first-try-or-tenth-fe/browser /usr/share/nginx/html
# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

#Full build
## Build stage
#FROM node:24 AS build
#WORKDIR /app
#COPY . .
#RUN npm install && npm run build
#
## Production stage
#FROM nginx:alpine
## Copy build artifacts
#COPY --from=build /app/dist/first-try-or-tenth-fe/browser /usr/share/nginx/html
## Copy nginx config
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80
