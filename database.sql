create database prefeitura_cidadaos;

use prefeitura_cidadaos;

create table usuarios (
    id int auto_increment,
    nome varchar(255) not null,
    cpf varchar(11) not null unique,
    senha varchar(255) not null,
    tipo enum('cidadão', 'prefeitura') default 'cidadão',
    primary key (id)
);

create table ocorrencias (
    id int auto_increment,
    usuario_id int not null,
    titulo varchar(255) not null,
    descricao text,
    data_criacao datetime not null default current_timestamp,
    imagem varchar(255),
    status enum('aguardando', 'em andamento', 'resolvido', 'avaliado') default 'aguardando',
    localizacao varchar(255),
    primary key (id),
    foreign key (usuario_id) references usuarios(id) on delete cascade
);

create table avaliacoes (
    id int auto_increment,
    usuario_id int,
    ocorrencia_id int not null,
    descricao text,
    nota int check (nota >= 1 and nota <= 5),
    data_avaliacao datetime not null default current_timestamp,
    primary key (id),
    foreign key (usuario_id) references usuarios(id) on delete cascade,
    foreign key (ocorrencia_id) references ocorrencias(id) on delete cascade
);

