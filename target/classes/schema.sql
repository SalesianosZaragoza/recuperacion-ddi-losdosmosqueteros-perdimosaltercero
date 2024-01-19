CREATE TABLE Producto (
    cod INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    precio INT,
    cantidad INT,
    descripcion VARCHAR(255),
    foto VARCHAR(255)
);

CREATE TABLE usuario (
    cod INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255),
    pwd VARCHAR(255),
    tipo_usuario INT NOT NULL
);
-- 1: Superusuario - 2: Usuario normal
CREATE TABLE pedidos (
    cod INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    detalles VARCHAR(800)
);