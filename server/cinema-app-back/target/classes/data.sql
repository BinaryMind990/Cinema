INSERT INTO users (id, e_mail, user_name, password, name, last_name, role, registration_date_time, deleted)
              VALUES (1,'miroslav@maildrop.cc','miroslav','$2y$12$NH2KM2BJaBl.ik90Z1YqAOjoPgSd0ns/bF.7WedMxZ54OhWQNNnh6','Miroslav','Simic','USER', '2023-03-11 20:00', 0),
					 (2,'tamara@maildrop.cc','tamara','$2y$12$DRhCpltZygkA7EZ2WeWIbewWBjLE0KYiUO.tHDUaJNMpsHxXEw9Ky','Tamara','Milosavljevic','USER','2023-03-12 20:00', 0),
 					 (3,'petar@maildrop.cc','petar','$2y$12$i6/mU4w0HhG8RQRXHjNCa.tG2OwGSVXb0GYUnf8MZUdeadE4voHbC','Petar','Jovic','USER','2023-03-09 20:00', 0),
			  		 (4, 'goranb17@gmail.com', 'goran', '$2a$10$gCwpthXLMhSqmom7Mn5FYORquNNt9rK78yYDZf5SJXbE8Aiyq3Tsu', 'Goran', 'Bjelica', 'ADMIN','2023-03-08 20:00', 0),
			  		 (5, 'stefan@gmail.com', 'stefan', '$2a$10$3A4zsQ8g83kaTMmt7aeSou5lcQEJ2i7Y4Ziu0VwHSCWt7KcZiuitG', 'Stefan', 'Jevtovic', 'ADMIN', '2023-03-15 20:00', 0);
			  		 

INSERT INTO type(name) VALUES ('2D'), ('3D'), ('4D');

INSERT INTO hall (name) VALUES ('Hall 1'), ('Hall 2'), ('Hall 3'), ('Hall 4'), ('Hall 5');

INSERT INTO type_hall (hall_id, type_id) VALUES (1, 1), (1,2), (2, 1), (3, 1), (4, 2), (4, 3), (5, 3);

INSERT INTO movie (country, distributor, description, duration, name, year, poster_link, deleted, version, director, imdb_link) 
VALUES('Serbia','ART VISTA d.o.o', 'Biopic about Toma Zdravkovic, the man who is remembered not only for his songs and the unique way he sang them, but also as a bohemian, both in his behavior and his soul.', 140, 'Toma', 2021, 'https://m.media-amazon.com/images/M/MV5BNTBmZWVjMzEtZTY5Yy00ZGUxLWJhY2MtMjVlNGFlN2I0OTMxXkEyXkFqcGdeQXVyMjYyMDMxMDU@._V1_.jpg', 0, 0, 'Dragan Bjelogrlic, Zoran Lisinac', 'https://www.imdb.com/title/tt8737152/'),
	  ('Serbia', 'unknown', 'The act of a woman with a broken nose, who suddenly jumps out of a taxi and throws herself off the bridge in Belgrade, connects the lives of three witnesses.', 105, 'The Woman with a Broken Nose', 2010, 'https://upload.wikimedia.org/wikipedia/sr/6/6c/Zena-sa-slomljenim-nosem-podloga-V1.jpg', 0, 0, 'Srdjan Koljevic', 'https://www.imdb.com/title/tt1324061/'),
      ('Serbia', 'Yodi Movie Craftsman', 'Description for 3. movie''During one peculiar night, the lives of several interconnected people are changed, as they rapidly experience love, disappointment, joy, greed and remorse.', 92, 'When I Grow Up, I will Be a Kangaroo', 2004, 'https://cinesseum.com/img/auto/auto/movie/kadPorastemBicuKengur/kad-porastem-bicu-kengur-poster.jpg', 0, 0, 'Radivoje Andric', 'https://www.imdb.com/title/tt0383846/'),
      ('Serbia', 'Vans','After the collapse of the Yugoslavian government, a former secret agent, now a taxi driver, enters the office of a former university professor, now a firm director.', 104, 'The Professional', 2003, 'https://prolog.rs/upload/article/2813_profesionalac.jpg', 0, 0, 'Dusan Kovacevic', 'https://www.imdb.com/title/tt0339535/'),
	  ('Serbia', 'unknown', 'Convinced that his subtenant is a spy and an enemy of the state, a man falls into deep paranoia which leads to absurd and destructive chain of events.', 95, 'Balkan spy', 1984, 'https://upload.wikimedia.org/wikipedia/sh/a/ac/Balkanski_%C5%A1pijun.jpg', 0, 0, 'Dusan Kovacevic, Bozidar Bota Nikolic', 'https://www.imdb.com/title/tt0086935/'),
	  ('United States', 'Taramount', 'American science fiction action film based on Hasbros Transformers toy line, and primarily influenced by the Beast Wars storyline.', 127, 'Transformers: Rise of the Beasts', 2023, 'http://www.arenacineplex.com/images/icons_66x96/1683398474trans.jpg', 0, 0, 'Steven Caple Jr.', 'https://www.imdb.com/title/tt5090568'),
	  ('Finland', 'CON film', 'When an ex-soldier who discovers gold in the Lapland wilderness tries to take the loot into the city, Nazi soldiers led by a brutal SS officer battle him.', 91, 'Sisu', 2022, 'http://www.arenacineplex.com/images/icons_66x96/168569455217.5.2023_12_18_43_Sisu_SRB.jpg', 0, 0, '
Jalmari Helander', 'https://www.imdb.com/title/tt14846026/' ),
	  ('Russia', 'MegaCom Film', 'A young cat named Vincent, in the company of Maurice the mouse, escapes from the flood in an old harpsichord, which is picked up by sailors and sent to St. Petersburg, where it ends up in the Hermitage.',
	  83, 'Cats in the Museum', 2023, 'http://www.arenacineplex.com/images/icons_66x96/1678804278macke.jpg', 0, 0, 'Vasily Rovensky', 'https://www.imdb.com/title/tt24069962');
	  
INSERT INTO projection (date_and_time, ticket_price, hall_id, movie_id, type_id, deleted) VALUES 
('2023-06-21 20:00', 400, 1, 1, 1, 0),
('2023-06-15 20:00', 500, 1, 1, 2, 0),
('2023-06-16 20:00', 450, 2, 1, 1, 0),
('2023-06-20 20:00', 400, 3, 2, 1, 0),
('2023-07-12 20:00', 350, 4, 2, 2, 0),
('2023-07-09 20:00', 350, 5, 3, 3, 0),
('2023-07-08 20:00', 500, 4, 4, 2, 0),
('2023-06-25 20:00', 450, 3, 4, 1, 0),
('2023-07-12 18:00', 550, 2, 4, 1, 0),
('2023-06-18 20:00', 600, 5, 5, 3, 0),
('2023-04-14 20:00', 600, 4, 5, 3, 0),
('2023-06-21 17:00', 600, 5, 7, 3, 0),
('2023-06-21 13:30', 300, 3, 8, 1, 0),
('2023-06-21 15:45', 350, 3, 8, 1, 0),
('2023-06-25 18:30', 400, 2, 7, 2, 0),
('2023-06-20 20:00', 450, 4, 7, 2, 0),
('2023-06-21 20:00', 600, 5, 6, 3, 0);


INSERT INTO seat (seat_number, hall_id) VALUES 
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(1, 2),
(2, 2),
(3, 2),
(1, 3),
(2, 3),
(3, 3),
(4, 3),
(1, 4),
(2, 4),
(3, 4),
(4, 4),
(5, 4),
(1, 5),
(2, 5),
(3, 5);

INSERT INTO ticket (date_and_time, projection_id, seat_seat_number, seat_hall_id, user_id) VALUES 
('2023-06-04 20:00:00', 1, 1, 1, 2),
('2023-04-23 20:00:00', 2, 1, 1, 3),
('2023-04-28 20:00:00', 3, 1, 2, 2),
('2023-04-15 20:00:00', 1, 2, 1, 3),
('2023-04-22 20:00:00', 1, 3, 1, 1),
('2023-04-22 20:00:00', 1, 4, 1, 1),
('2023-04-22 20:00:00', 1, 5, 1, 1),
('2023-04-22 20:00:00', 1, 6, 1, 1),
('2023-04-22 20:00:00', 11, 1, 1, 1),
('2023-04-25 20:00:00', 3, 2, 2, 3);

								