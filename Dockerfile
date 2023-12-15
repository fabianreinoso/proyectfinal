# Usa una imagen de Node.js
FROM node:14

# Establece el directorio de trabajo en la carpeta 'backend'
WORKDIR /usr/src/app/backend

# Copia los archivos 'package.json' e 'package-lock.json' para instalar las dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente
COPY . .

# Expone el puerto en el que el servidor estará escuchando
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
