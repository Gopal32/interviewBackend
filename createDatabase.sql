show databases;

create database interview;

use interview;

create table candidates (id int auto_increment primary key ,
firstName varchar(25),
lastName varchar(25),
phoneNo varchar(10),
applied varchar(20),
rating int(1));

desc candidates;
