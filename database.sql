drop table hold_name cascade;

create table hold_name
(
    id serial not null primary key,
    names text not null,
    counter int not null
);