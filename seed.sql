CREATE DATABASE pokemon;
\c pokemon;
CREATE TABLE pokemon_types(ID INT PRIMARY KEY NOT NULL, NAME TEXT NOT NULL, TYPE TEXT NOT NULL);
INSERT INTO pokemon_types (ID, NAME, TYPE) VALUES
    (4, 'charmander', 'fire'),
    (16, 'pidgey', 'flying'),
    (25, 'pikachu', 'normal'),
    (79, 'slowpoke', 'psychic'),
    (94, 'gengar', 'poison'),
    (97, 'hypno', 'psychic'),
    (100, 'voltorb', 'electric'),
    (118, 'goldeen', 'water'),
    (157, 'typhlosion', 'fire'),
    (163, 'hoothoot', 'flying'),
    (7, 'squirtle', 'water');
