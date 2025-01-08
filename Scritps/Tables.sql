create table TipoDocumento(
	Codigo int primary key identity(1,1) not null,
	Descripcion varchar(200) not null
);

create table Usuario(
	Codigo int primary key identity(1,1) not null,
	Email varchar(300) not null,
	Clave varchar(10) null,
	Nombre varchar (200) not null,
	Apellido varchar (200) not null,
	FechaRegistro datetime not null default getdate(),
	FechaActualizacion date null,
	CodigoUsuarioCreador int not null,
	Documento varchar(15) not null,
	CodigoTipoDocumento int  not null foreign key REFERENCES [dbo].TipoDocumento(Codigo),
	Estado bit not null default 0
);

--ALTER TABLE Usuario
--ADD Estado bit default 0;

--ALTER TABLE Usuario
--alter column Estado bit not null 

create table Roles(
	Codigo int primary key identity(1,1) not null,
	Descripcion varchar(200) not null,
	FechaRegistro datetime not null default getdate(),
	FechaActualizacion date null,
	CodigoUsuarioCreador int not null foreign key REFERENCES [dbo].[Usuario](Codigo),
	CodigoUsuarioActualizacion int null foreign key REFERENCES [dbo].[Usuario](Codigo),
	Estado bit not null default 1
);

--ALTER TABLE Roles
--ADD Estado bit not null default 1

create table RolUsuario
(
	Codigo int primary key identity(1,1) not null,
	CodigoRol int not null foreign key REFERENCES Roles(Codigo),
	CodigoUsuario int not null foreign key REFERENCES Usuario(Codigo)
);

create table Categoria(
	Codigo int primary key identity(1,1) not null,
	Descripcion varchar(200) not null,
	FechaRegistro datetime not null default getdate(),
	FechaActualizacion date null,
	CodigoUsuarioCreador int not null foreign key REFERENCES [dbo].[Usuario](Codigo),
	CodigoUsuarioActualizacion int null foreign key REFERENCES [dbo].[Usuario](Codigo)
);

create table Producto(
	Codigo char(10) primary key not null,
	Nombre varchar(200) not null,
	Descripcion varchar(400) null,
	Precio float not null,
	CodigoCategoria int not null foreign key REFERENCES [dbo].Categoria(Codigo),
	Stock int not null,
	FechaRegistro datetime not null default getdate(),
	FechaActualizacion date null,
	CodigoUsuarioCreador int not null foreign key REFERENCES [dbo].[Usuario](Codigo),
	CodigoUsuarioActualizacion int null foreign key REFERENCES [dbo].[Usuario](Codigo)
);

--ALTER TABLE Producto
--ADD Descripcion varchar(400) null

create table Promocion(
	Codigo int primary key identity(1,1) not null,
	Descripcion varchar(200) not null,
	DescuentoPorcentaje float not null default 0,
	FechaRegistro datetime not null default getdate(),
	FechaActualizacion date null,
	CodigoUsuarioCreador int not null foreign key REFERENCES [dbo].[Usuario](Codigo),
	CodigoUsuarioActualizacion int null foreign key REFERENCES [dbo].[Usuario](Codigo)
);

--ALTER TABLE Promocion
--ADD DescuentoPorcentaje float not null default 0


create table ProductoPromocion(
	Codigo int primary key identity(1,1) not null,
	CodigoPromocion int not null foreign key REFERENCES Promocion(Codigo),
	CodigoProducto char(10) not null foreign key REFERENCES Producto(Codigo)
);

create table TipoVenta(
	Codigo int primary key identity(1,1) not null,
	Descripcion varchar(200) not null,
	FechaRegistro datetime not null default getdate(),
	FechaActualizacion date null,
	CodigoUsuarioCreador int not null foreign key REFERENCES [dbo].[Usuario](Codigo),
	CodigoUsuarioActualizacion int null foreign key REFERENCES [dbo].[Usuario](Codigo)
);

create table BoletaOFactura(
	Codigo int primary key identity(1,1) not null,
	TipoVenta int not null foreign key REFERENCES [dbo].TipoVenta(Codigo),
	FechaRegistro datetime not null default getdate(),
	FechaActualizacion date null,
	CodigoUsuarioCreador int not null foreign key REFERENCES [dbo].[Usuario](Codigo),
	CodigoUsuarioActualizacion int null foreign key REFERENCES [dbo].[Usuario](Codigo),
	CodigoUsuarioComprador int not null foreign key REFERENCES [dbo].[Usuario](Codigo),
	TotalGeneral float not null default 0,
	TotalReal float not null default 0,
	DescuentoAplicadoMoneda float not null default 0,
	PromocionId int not null foreign key REFERENCES [dbo].Promocion(Codigo),
);

create table Ventas(
	Codigo int primary key identity(1,1) not null,
	CodigoBoletaOFactura int not null  foreign key REFERENCES [dbo].BoletaOFactura(Codigo),
	CodigoProducto char(10) not null  foreign key REFERENCES [dbo].Producto(Codigo),
	FechaRegistro datetime not null default getdate(),
	FechaActualizacion date null,
	CodigoUsuarioCreador int not null foreign key REFERENCES [dbo].[Usuario](Codigo),
	CodigoUsuarioActualizacion int null foreign key REFERENCES [dbo].[Usuario](Codigo),
);


-- PROD00000