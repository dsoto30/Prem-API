\c postgres

DROP DATABASE IF EXISTS premier_league;

CREATE DATABASE premier_league;

\c premier_league;

/*
DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS squad_stats;
DROP TABLE IF EXISTS match_results;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS seasons;

DROP TYPE IF EXISTS p_position;
DROP TYPE IF EXISTS m_result;*/

CREATE TYPE p_position AS ENUM ('GKP', 'DEF', 'MID', 'FWD');
CREATE TYPE m_result AS ENUM ('A', 'H', 'D');

CREATE TABLE teams (
    team_name VARCHAR(50) NOT NULL,
    team_id INT PRIMARY KEY);


CREATE TABLE seasons (
    season VARCHAR(10),
    season_id INT PRIMARY KEY);

CREATE TABLE players (
    player_id INT PRIMARY KEY, 
    player_name VARCHAR(50) NOT NULL, 
    player_position p_position NOT NULL, 
    team_id INT NOT NULL, 
    x_assists FLOAT NOT NULL, 
    goals INT NOT NULL, 
    x_goals_conceded FLOAT NOT NULL, 
    threat FLOAT NOT NULL, 
    influence FLOAT NOT NULL, 
    creativity FLOAT NOT NULL,
    x_goals FLOAT NOT NULL, 
    saves INT NOT NULL, 
    goals_conceded INT NOT NULL, 
    assists INT NOT NULL, 
    ict_index FLOAT NOT NULL, 
    x_goal_involvements FLOAT NOT NULL, 
    starts INT NOT NULL, 
    minutes_played INT NOT NULL, 
    total_points INT NOT NULL, 
    clean_sheets INT NOT NULL, 
    FOREIGN KEY (team_id) REFERENCES teams(team_id) ON DELETE CASCADE);

CREATE TABLE squad_stats (
    players_used INT NOT NULL, 
    avg_age FLOAT NOT NULL, 
    possesion FLOAT NOT NULL, 
    matches_played INT NOT NULL, 
    goals INT NOT NULL,
    assists INT NOT NULL,
    gls_assists INT NOT NULL,
    non_pen_gls INT NOT NULL, 
    penalties_scored INT NOT NULL, 
    xg FLOAT NOT NULL, 
    xag FLOAT NOT NULL, 
    prgc INT NOT NULL, 
    prgp INT NOT NULL, 
    team_id INT NOT NULL, 
    season_id INT NOT NULL, 
    PRIMARY KEY (team_id, season_id),
    FOREIGN KEY (team_id) REFERENCES teams(team_id) ON DELETE CASCADE,
    FOREIGN KEY (season_id) REFERENCES seasons(season_id) ON DELETE CASCADE);

CREATE TABLE match_results (
    match_id INT NOT NULL, 
    match_date VARCHAR(30) NOT NULL, 
    match_time TIME NOT NULL, 
    home_team_id INT NOT NULL, 
    away_team_id INT NOT NULL, 
    fthg INT NOT NULL, 
    ftag INT NOT NULL,
    match_result m_result NOT NULL, 
    home_shots INT NOT NULL, 
    away_shots INT NOT NULL, 
    h_shot_target INT NOT NULL, 
    a_shot_target INT NOT NULL, 
    home_corners INT NOT NULL,
    away_corners INT NOT NULL, 
    home_odds FLOAT NOT NULL, 
    draw_odds FLOAT NOT NULL, 
    away_odds FLOAT NOT NULL, 
    season_id INT NOT NULL, 
    PRIMARY KEY (match_id, home_team_id, away_team_id, season_id),
    FOREIGN KEY (home_team_id) REFERENCES teams(team_id) ON DELETE CASCADE,
    FOREIGN KEY (away_team_id) REFERENCES teams(team_id) ON DELETE CASCADE,
    FOREIGN KEY (season_id) REFERENCES seasons(season_id) ON DELETE CASCADE);

\q