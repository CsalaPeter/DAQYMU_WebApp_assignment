DROP TABLE IF EXISTS dvds;

CREATE TABLE dvds (
                              id INT AUTO_INCREMENT  PRIMARY KEY,
                              film_name VARCHAR(250) NOT NULL,
                              genre VARCHAR(50) NOT NULL,
                              film_director VARCHAR(250) NOT NULL,
                              age_rating VARCHAR(5) NOT NULL,
                              playtime VARCHAR(10) NOT NULL,
);

INSERT INTO dvds (film_name, genre, film_director, age_rating, playtime)VALUES
('Real Steel', 'Action', 'Shawn Levy', 'PG-13', '2h 7min'),
