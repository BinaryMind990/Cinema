INSERT INTO adresa (id, ulica, broj) VALUES (1,'Bulevar Cara Lazara', 5);
INSERT INTO adresa (id, ulica, broj) VALUES (2, 'Dalmatinska', 7);

INSERT INTO korisnik (id, e_mail, korisnicko_ime, lozinka, ime, prezime, uloga, adresa_id)
              VALUES (1,'miroslav@maildrop.cc','miroslav','$2y$12$NH2KM2BJaBl.ik90Z1YqAOjoPgSd0ns/bF.7WedMxZ54OhWQNNnh6','Miroslav','Simic','KORISNIK',1),
					 (2,'tamara@maildrop.cc','tamara','$2y$12$DRhCpltZygkA7EZ2WeWIbewWBjLE0KYiUO.tHDUaJNMpsHxXEw9Ky','Tamara','Milosavljevic','KORISNIK',2),
 					 (3,'petar@maildrop.cc','petar','$2y$12$i6/mU4w0HhG8RQRXHjNCa.tG2OwGSVXb0GYUnf8MZUdeadE4voHbC','Petar','Jovic','KORISNIK',2),
			  		 (4, 'goranb17@gmail.com', 'goran', '$2a$10$gCwpthXLMhSqmom7Mn5FYORquNNt9rK78yYDZf5SJXbE8Aiyq3Tsu', 'Goran', 'Bjelica', 'ADMIN', 1),
			  		 (5, 'stefan@gmail.com', 'stefan', '$2a$10$3A4zsQ8g83kaTMmt7aeSou5lcQEJ2i7Y4Ziu0VwHSCWt7KcZiuitG', 'Stefan', 'Jevtovic', 'ADMIN', 2);
			  		 

INSERT INTO type(name) VALUES ('2D'), ('3D'), ('4D');

INSERT INTO hall (name) VALUES ('Hall 1'), ('Hall 2'), ('Hall 3'), ('Hall 4'), ('Hall 5');

INSERT INTO type_hall (hall_id, type_id) VALUES (1, 1), (1,2), (2, 1), (3, 1), (4, 2), (4, 3), (5, 3);

INSERT INTO movie (country, distributor, description, duration, name, year, poster_link) 
VALUES('Serbia','ART VISTA d.o.o', 'Description for 1. movie', 140, 'Toma', 2021, 'https://m.media-amazon.com/images/M/MV5BNTBmZWVjMzEtZTY5Yy00ZGUxLWJhY2MtMjVlNGFlN2I0OTMxXkEyXkFqcGdeQXVyMjYyMDMxMDU@._V1_.jpg'),
	  ('Serbia', 'unknown', 'Description for 2. movie', 105, 'The Woman with a Broken Nose', 2010, 'https://upload.wikimedia.org/wikipedia/sr/6/6c/Zena-sa-slomljenim-nosem-podloga-V1.jpg'),
      ('Serbia', 'Yodi Movie Craftsman', 'Description for 3. movie', 92, 'When I Grow Up, I will Be a Kangaroo', 2004, 'https://cinesseum.com/img/auto/auto/movie/kadPorastemBicuKengur/kad-porastem-bicu-kengur-poster.jpg'),
      ('Serbia', 'Vans','Description for 4. movie', 104, 'The Professional', 2003, 'https://prolog.rs/upload/article/2813_profesionalac.jpg'),
	  ('Serbia', 'unknown', 'Description for 5. movie', 95, 'Balkan spy', 1984, 'https://upload.wikimedia.org/wikipedia/sh/a/ac/Balkanski_%C5%A1pijun.jpg');
	  
	  
INSERT INTO projection (date_and_time, ticket_price, hall_id, movie_id, type_id) VALUES 
('2023-06-21 20:00', 400, 1, 1, 1),
('2023-06-15 20:00', 500, 1, 1, 2),
('2023-06-16 20:00', 450, 2, 1, 1),
('2023-06-20 20:00', 400, 3, 2, 1),
('2023-06-12 20:00', 350, 4, 2, 2),
('2023-06-09 20:00', 350, 5, 3, 3),
('2023-06-08 20:00', 500, 4, 4, 2),
('2023-06-25 20:00', 450, 3, 4, 1),
('2023-06-12 18:00', 550, 2, 4, 1),
('2023-06-18 20:00', 600, 5, 5, 3),
('2023-04-14 20:00', 600, 4, 5, 3);	  

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
('2023-06-21 20:00:00', 1, 1, 1, 2),
('2023-04-23 20:00:00', 2, 1, 1, 3),
('2023-04-28 20:00:00', 3, 1, 2, 2),
('2023-04-15 20:00:00', 1, 2, 1, 3),
('2023-04-22 20:00:00', 1, 3, 1, 1),
('2023-04-22 20:00:00', 1, 4, 1, 1),
('2023-04-22 20:00:00', 1, 5, 1, 1),
('2023-04-22 20:00:00', 1, 6, 1, 1),
('2023-04-22 20:00:00', 11, 1, 1, 1),
('2023-04-25 20:00:00', 3, 2, 2, 3);

								