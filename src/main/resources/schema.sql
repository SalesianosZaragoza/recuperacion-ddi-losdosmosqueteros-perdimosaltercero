CREATE TABLE Producto (
    cod INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    precio DECIMAL(10,2),
    cantidad INT,
    categoria INT,
    descripcion VARCHAR(255),
    foto VARCHAR(255)
);

CREATE TABLE usuario (
    cod INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255),
    pwd VARCHAR(255),
    tipousuario INT
);
-- 1: Superusuario - 2: Usuario normal
CREATE TABLE pedidos (
    cod INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(800),
    productos VARCHAR(1600),
    producto_cantidad VARCHAR(1600),
    total DECIMAL(10,2)
);