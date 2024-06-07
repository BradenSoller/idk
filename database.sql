-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!


 DROP TABLE IF EXISTS "anime" CASCADE;

CREATE TABLE "anime" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR (120) NOT NULL,
	"rating" INTEGER,
	"studio" TEXT,
	"description" TEXT,
	"image" VARCHAR(120),
	"is_liked" BOOLEAN DEFAULT FALSE
);

 CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
	"is_admin" BOOLEAN
);

CREATE TABLE "anime_genres" (
	"id" SERIAL PRIMARY KEY,
	"anime_id" int REFERENCES "anime",
	"genres_id" int REFERENCES "genres"
);


CREATE TABLE "genres" (
	"id" SERIAL PRIMARY KEY,
	"genre_name" VARCHAR(40)
);

CREATE TABLE "favorites" (
  "id" SERIAL PRIMARY KEY,
  "favorite_id" INT references "anime"("id")

);


INSERT INTO
 "anime" ("title", "rating", "studio", "description")
VALUES
('Black Clover', 4 , 'Mappa', 'Great Action Anime'),
('Solo Leveling', 5 , 'Mappa', 'even greater action anime')


