# Start with minimal Linux OS
# Install Node.js and npm
# Copy SourceCode and (NodeModules)
# Run npm start command

FROM node:18-alpine
ADD . /appDir 
WORKDIR /appDir
CMD ["npm", "start"] 
EXPOSE 3333