create table hold_name
(
    id serial not null primary key,
    names text not null,
    lang_greeted text not null
);

create table hold_counter
(
    id serial not null primary key,
    count int not null,
    foreign key (count) references hold_name(id)
    -- names text not null,
);