# Usa la imagen base de Ubuntu
FROM ubuntu:20.04

# Establece el directorio de trabajo
WORKDIR /app

# Instala Node.js (última versión) y otras dependencias necesarias
RUN apt-get update && \
    apt-get install -y curl git && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get install -y build-essential

# Clona el repositorio de Git
RUN git clone https://github.com/MarioAM96/ERPMM.git .

# Instala las dependencias de la aplicación
RUN npm install

# Construye la aplicación Next.js
RUN npm run build

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]