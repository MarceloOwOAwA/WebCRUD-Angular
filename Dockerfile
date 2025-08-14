FROM node:18

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json antes del resto de archivos
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación (si ya existe proyecto)
COPY . .

# Exponer el puerto Angular
EXPOSE 4200

# Script de inicio: crea proyecto si no existe angular.json
CMD [ "sh", "-c", "if [ ! -f angular.json ]; then \
    echo 'No existe proyecto Angular, creando uno...'; \
    ng new webcrud --directory ./ --defaults --skip-git; \
    fi && ng serve --host 0.0.0.0 --poll 2000" ]
