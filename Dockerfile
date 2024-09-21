###################################################
# Stage: base
# We will use this version of the nodeJs 
###################################################
FROM node:22.9.0

# Here we created a folder for save our project
WORKDIR /projetoNodeTypeDocker

# Here we copied all the files in the root folder to /projectNodeTypeDocker 
COPY . .

# Here we deleted the folder node_modules for she created with dependicies update
RUN rm -rf node_modules

# Here we installed all project dependencies
RUN npm i

# Here we runned the project
CMD ["npm", "run", "start:dev"]

# here we setted the number of port where our database connection
EXPOSE 8000
###################################################
# Stage: base
# We will use this version of the nodeJs 
###################################################