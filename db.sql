CCREATE TABLE IF NOT EXISTS listofbooks;
USE listofbooks;

CREATE USER 'prat'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON listofbooks.* to 'prat'@'localhost';

create table title (
    title_id int not null,
    title_name varchar(255) not null,
    category_id int,
    author_id int,
    primary key (title_id)
);

create table year (
    year int(4) not null,
    title_id int
);

create table price (
    price decimal(18, 4) not null,
    title_id int
);

create table category (
    category_id int not null,
    category varchar(32) not null,
    primary key (category_id)
);

create table author (
    author_id int not null,
    author varchar(255) not null,
    primary key (author_id)
);

INSERT INTO category VALUES(1,"RomCom");
INSERT INTO category VALUES(2,"Comedy");
INSERT INTO category VALUES(3,"Thriller");
INSERT INTO category VALUES(4,"Bollywood");

INSERT INTO author VALUES(1,"William Shakespeare");
INSERT INTO author VALUES(2,"Emily Dickinson");
INSERT INTO author VALUES(3,"H. P. Lovecraft");
INSERT INTO author VALUES(4,"Arthur Conan Doyle");
INSERT INTO author VALUES(5,"Leo Tolstoy");
INSERT INTO author VALUES(6,"Edgar Allan Poe");
INSERT INTO author VALUES(7,"Robert Ervin Howard");
INSERT INTO author VALUES(8,"Rabindranath Tagore");

INSERT INTO title VALUES(1,"The rainy day",1,1);
INSERT INTO title VALUES(2,"Once upon a time",2,2);
INSERT INTO title VALUES(3,"Mission Impossible",3,3);
INSERT INTO title VALUES(4,"The flower girl",4,4);
INSERT INTO title VALUES(5,"RainMan",1,5);
INSERT INTO title VALUES(6,"Home Alone",2,6);
INSERT INTO title VALUES(7,"The Fault in our stars",4,7);
INSERT INTO title VALUES(8,"Antione Bruins",3,8);

INSERT INTO year VALUES (2002,1);
INSERT INTO year VALUES (1785,2);
INSERT INTO year VALUES (1895,3);
INSERT INTO year VALUES (1996,4);
INSERT INTO year VALUES (1876,5);
INSERT INTO year VALUES (2012,6);
INSERT INTO year VALUES (1987,7);
INSERT INTO year VALUES (2018,8);


INSERT INTO price VALUES (278,1);
INSERT INTO price VALUES (134,2);
INSERT INTO price VALUES (23,3);
INSERT INTO price VALUES (18,4);
INSERT INTO price VALUES (202,5);
INSERT INTO price VALUES (132,6);
INSERT INTO price VALUES (67,7);
INSERT INTO price VALUES (45,8);
