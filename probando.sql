use stockdb;

CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
	email varchar(50) NOT NULL,
	clave varchar(80) NOT NULL,
    rol varchar(5) NOT NULL, 
    Primary key (id)
);
CREATE TABLE tipos (
	id INT NOT NULL AUTO_INCREMENT,
	Tipo varchar(10) NOT NULL,
	Descripcion varchar(50) NOT NULL,
    Primary key (id)
);
CREATE TABLE productos (
	id INT NOT NULL AUTO_INCREMENT,
    IdGenerate varchar(15) unique,
	Tipo INT,
	Ancho INT NOT NULL,
	Alto INT NOT NULL,
	Izq INT NOT NULL,
	Derc INT NOT NULL,
	Precio_U INT NOT NULL,
    stock INT NOT NULL,
    Primary key (id),
    FOREIGN KEY (Tipo) REFERENCES tipos(id)
);
CREATE TABLE imagenes (
	id INT NOT NULL AUTO_INCREMENT,
    IdProduct  varchar(15),
	url varchar(100) NOT NULL,
    Primary key (id),
    FOREIGN KEY (IdProduct) REFERENCES productos(IdGenerate)
);
CREATE TABLE lugares (
	id INT NOT NULL AUTO_INCREMENT,
	fullname varchar(20) NOT NULL,
    Primary key (id)
);
CREATE TABLE lugaresProducto (
	id INT NOT NULL AUTO_INCREMENT,
	id_lugar INT NOT NULL,
	id_producto INT NOT NULL,
    stock INT NOT NULL,
    Primary key (id),
    FOREIGN KEY (id_producto) REFERENCES productos(id),
    FOREIGN KEY (id_lugar) REFERENCES lugares(id)
);
CREATE TABLE estado (
    id INT PRIMARY KEY AUTO_INCREMENT,
    estado VARCHAR(40) NOT NULL
);
CREATE TABLE ventas (
	id INT NOT NULL AUTO_INCREMENT,
    id_venta varchar(15) UNIQUE,
    fecha varchar(19),
    nombre varchar(15),
    apellido varchar(15),
    email varchar(25),
    provincia varchar(50),
    localidad varchar(60),
    calle varchar(60),
    altura INT,
    cel varchar(15),
    estado INT,
    total  varchar(15) NOT NULL,
    Primary key (id),
    FOREIGN KEY (estado) REFERENCES estado(id)
);
CREATE TABLE ventasProduct (
	id INT NOT NULL AUTO_INCREMENT,
    id_venta varchar(15),
	id_producto INT NOT NULL,
    IdGenerate varchar(15),
    Tipo varchar(15) NOT NULL,
    cantidad INT NOT NULL,
    subtotal INT NOT NULL,
    Primary key (id),
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta)
);

/*ver tablas*/

SELECT * FROM users;
SELECT * FROM tipos;
SELECT * FROM productos;
SELECT * FROM imagenes;
SELECT * FROM lugaresProducto;
SELECT * FROM estado;
SELECT * FROM ventas;
SELECT * FROM ventasproduct;

/*actualizar*/
UPDATE productos SET stock = 6 WHERE id IN (2);

/* eliminar elemento de una tabla */
delete FROM lugaresProducto where id_producto = 1;
delete FROM ventas where id = 1;
delete FROM lugares where id = 2;
delete FROM tipos where id = 2;
delete FROM ventasProduct where id = 2 and id_venta = 'eipthL8EOMQ1GGY' ;


/*eliminar tablas*/
DROP TABLE tipos;
DROP TABLE lugares;
DROP TABLE productos;
DROP TABLE lugaresProducto;
DROP TABLE ventas;
DROP TABLE ventasProduct;
DROP TABLE imagenes;
DROP TABLE estado;



/*consulta sql para saber cual es el valor que mas se repite en una tabla*/
SELECT id_producto, COUNT(*) as frecuencia
FROM ventasProduct
GROUP BY id_producto
ORDER BY frecuencia DESC
LIMIT 1;

