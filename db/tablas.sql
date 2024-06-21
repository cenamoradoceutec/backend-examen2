-- Active: 1713581148598@@localhost@5432@redservicios
create table tbl_usuario (
    nombre_usuario varchar(20) primary key,
    nombre varchar(200),
    apellido varchar(200),
    correo varchar(100),
    contrasena varchar(20),
    fecha_creacion TIMESTAMP default current_timestamp,
    activo bool default true
);

CREATE TABLE tbl_departamentos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);
CREATE TABLE tbl_cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    id_state INT,
    FOREIGN KEY (id_state) REFERENCES tbl_departamentos(id)
);

CREATE TABLE tbl_pointservices (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    address TEXT, 
    location POINT,
    monday_opening_time TIME,
    monday_closing_time TIME,
    tuesday_opening_time TIME,
    tuesday_closing_time TIME,
    wednesday_opening_time TIME,
    wednesday_closing_time TIME,
    thursday_opening_time TIME,
    thursday_closing_time TIME,
    friday_opening_time TIME,
    friday_closing_time TIME,
    saturday_opening_time TIME,
    saturday_closing_time TIME,
    sunday_opening_time TIME,
    sunday_closing_time TIME,
    state_id INT,
    city_id INT,
    type_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    
);

CREATE TABLE tbl_typePoint (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    
);

select * from tbl_usuario