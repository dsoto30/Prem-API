\c premier_league;


TRUNCATE match_results
CASCADE;

TRUNCATE squad_stats
CASCADE;

TRUNCATE TABLE players
CASCADE;

TRUNCATE seasons
CASCADE;

TRUNCATE TABLE teams 
CASCADE;

\copy teams from 'C:\Users\sotod\Documents\Prem-API\prem-data\new-data\teams.csv' DELIMITER ',' CSV HEADER;


\copy seasons from 'C:\Users\sotod\Documents\Prem-API\prem-data\new-data\seasons.csv' DELIMITER ',' CSV HEADER;


\copy players from 'C:\Users\sotod\Documents\Prem-API\prem-data\new-data\players.csv' DELIMITER ',' CSV HEADER;

\copy squad_stats from 'C:\Users\sotod\Documents\Prem-API\prem-data\new-data\squad_stats.csv' DELIMITER ',' CSV HEADER;

\copy match_results from 'C:\Users\sotod\Documents\Prem-API\prem-data\new-data\match_results.csv' DELIMITER ',' CSV HEADER;