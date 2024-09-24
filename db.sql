create table if not exists empresas
(
    ID_EMPRESA     varchar(36)  not null
        primary key,
    nombre_empresa varchar(255) not null,
    direccion      varchar(255) null
);

create table if not exists producto_base
(
    ID_PRODUCTO_BASE     char(36)     not null
        primary key,
    NOMBRE_PRODUCTO      varchar(255) null,
    DESCRIPCION_PRODUCTO text         null,
    IMAGEN_PRODUCTO      varchar(255) null,
    CODIGO_BARRA         varchar(50)  null,
    constraint CODIGO_BARRAS
        unique (CODIGO_BARRA)
);

create table if not exists users
(
    ID_USER    varchar(36)  not null
        primary key,
    nombre     varchar(255) not null,
    apellido   varchar(100) not null,
    rut        varchar(12)  not null,
    telefono   varchar(15)  not null,
    email      varchar(100) not null,
    ID_EMPRESA varchar(36)  not null,
    password   varchar(255) not null,
    constraint email
        unique (email),
    constraint rut
        unique (rut),
    constraint users_ibfk_1
        foreign key (ID_EMPRESA) references empresas (ID_EMPRESA)
);

create table if not exists inventario
(
    ID_INVENTARIO        varchar(36) not null
        primary key,
    ID_PRODUCTO_BASE     varchar(36) null,
    ID_EMPRESA           varchar(36) null,
    precio               int         null,
    cantidad             int         null,
    ultima_actualizacion text        null,
    ID_REPONEDOR         varchar(36) null,
    constraint inventario_ibfk_1
        foreign key (ID_PRODUCTO_BASE) references producto_base (ID_PRODUCTO_BASE),
    constraint inventario_ibfk_2
        foreign key (ID_EMPRESA) references empresas (ID_EMPRESA),
    constraint inventario_ibfk_3
        foreign key (ID_REPONEDOR) references users (ID_USER)
);

create index ID_EMPRESA
    on inventario (ID_EMPRESA);

create index ID_PRODUCTO_BASE
    on inventario (ID_PRODUCTO_BASE);

create index ID_REPONEDOR
    on inventario (ID_REPONEDOR);

create index ID_EMPRESA
    on users (ID_EMPRESA);

