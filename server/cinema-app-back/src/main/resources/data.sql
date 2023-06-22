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
	  ('France', 'MegaCom Film', 'It is said that every investigator has a crime that haunts them, a case that hurts him more than the others, without him necessarily knowing why. For Yohan that case is the murder of Clara.', 115, 'The Night of the 12th', 2022, 'http://www.arenacineplex.com/images/icons_66x96/1687335215U_no%C4%87i_12_oktobra_poster_(360X528).jpg', 0, 0, 'Dominik Moll', 'https://www.imdb.com/title/tt16953666/'),
      ('Serbia', 'Digital Store doo', 'Sequel to Муње! (2001). After 20 years, follows some of the initial characters as they show they haven not changed and their lives are almost the same, while featuring a new generation of kids who are trying to make it through.', 95, 'Dudes: Again!', 2023, 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS4LAgZ9jnTzqPjg63loz6DQ-H0E5VnbHf_R3DOHE4QJWMfcpOa', 0, 0, 'Radivoje Andric', 'https://www.imdb.com/title/tt22769974/'),
      ('United States', 'Blitz Film Video doo','Barry Allen uses his super speed to change the past, but his attempt to save his family creates a world without super heroes, forcing him to race for his life in order to save the future.', 144, 'The Flash', 2023, 'http://www.arenacineplex.com/images/icons_66x96/1684747962flash.jpg', 0, 0, 'Andy Muschietti', 'https://www.imdb.com/title/tt0439572/'),
	  ('United States', 'Sony Pictures', 'On the brink of losing her home, Maddie finds an intriguing job listing: helicopter parents looking for someone to bring their introverted 19-year-old son out of his shell before college. She has one summer to make him a man or die trying.', 103, 'No Hard Feelings', 2023, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnYC2rPxSLu9SXnN9x5udkaCmkDv2z3iMG2VEbQhbC8JhjHvrxHUN2DEhmg3qFbuCnviA&usqp=CAU', 0, 0, 'Gene Stupnitsky', 'https://www.imdb.com/title/tt15671028/'),
	  ('United States', 'Taramount', 'American science fiction action film based on Hasbros Transformers toy line, and primarily influenced by the Beast Wars storyline.', 127, 'Transformers: Rise of the Beasts', 2023, 'http://www.arenacineplex.com/images/icons_66x96/1683398474trans.jpg', 0, 0, 'Steven Caple Jr.', 'https://www.imdb.com/title/tt5090568'),
	  ('Finland', 'CON film', 'When an ex-soldier who discovers gold in the Lapland wilderness tries to take the loot into the city, Nazi soldiers led by a brutal SS officer battle him.', 91, 'Sisu', 2022, 'http://www.arenacineplex.com/images/icons_66x96/168569455217.5.2023_12_18_43_Sisu_SRB.jpg', 0, 0, '
Jalmari Helander', 'https://www.imdb.com/title/tt14846026/' ),
	  ('Russia', 'MegaCom Film', 'A young cat named Vincent, in the company of Maurice the mouse, escapes from the flood in an old harpsichord, which is picked up by sailors and sent to St. Petersburg, where it ends up in the Hermitage.',
	  83, 'Cats in the Museum', 2023, 'http://www.arenacineplex.com/images/icons_66x96/1678804278macke.jpg', 0, 0, 'Vasily Rovensky', 'https://www.imdb.com/title/tt24069962');
	  
INSERT INTO projection (date_and_time, ticket_price, hall_id, movie_id, type_id, deleted) VALUES 
('2023-07-02 20:00', 400, 1, 1, 1, 0),
('2023-07-01 20:00', 500, 1, 1, 2, 0),
('2023-07-01 20:00', 450, 2, 1, 1, 0),
('2023-07-02 20:00', 400, 3, 2, 1, 0),
('2023-07-12 20:00', 350, 4, 2, 2, 0),
('2023-07-09 20:00', 350, 5, 3, 3, 0),
('2023-07-08 20:00', 500, 4, 4, 2, 0),
('2023-06-25 20:00', 450, 3, 4, 1, 0),
('2023-07-12 18:00', 550, 2, 4, 1, 0),
('2023-06-28 20:00', 600, 5, 5, 3, 0),
('2023-06-28 20:00', 600, 4, 4, 3, 0),
('2023-06-29 17:00', 600, 5, 7, 3, 0),
('2023-06-29 13:30', 300, 3, 8, 1, 0),
('2023-06-30 15:45', 350, 3, 8, 1, 0),
('2023-07-03 18:30', 400, 2, 7, 2, 0),
('2023-07-03 20:00', 450, 4, 7, 2, 0),
('2023-07-03 20:00', 600, 5, 6, 3, 0);


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

								