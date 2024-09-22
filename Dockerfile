# Use this version of the nodeJs 
FROM node:22.9.0

# create a folder to store the project
WORKDIR /projetoNodeTypeDocker

# Copy all the files from the root folder to /projetoNodeTypeDocker
COPY . .

# Remove the node_modules folder to ensure dependencies are installed fresh
RUN rm -rf node_modules

# Install all project dependencies
RUN npm i

# Run the project in development mode
CMD ["npm", "run", "start:dev"]

# Expose the port where the application will listen for incoming connections
EXPOSE 8000
