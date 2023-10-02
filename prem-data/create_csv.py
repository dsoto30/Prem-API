import pandas as pd
import requests
from fuzzywuzzy import fuzz


season_map = {"2022-2023": 0, "2021-2022" : 1, "2020-2021": 2}

team_id_mapping = {}

# Function to assign IDs to team names
def create_team_map(team_name):
    if team_name in team_id_mapping:
        return team_id_mapping[team_name]
    else:
        new_id = len(team_id_mapping) + 1  # Generate a new unique ID
        team_id_mapping[team_name] = new_id
        return new_id

def map_team_name(input_name, team_dict):
    best_match = None
    best_match_score = -1

    for team_name, team_id in team_dict.items():
        similarity_score = fuzz.ratio(input_name, team_name)
        
        if similarity_score > best_match_score:
            best_match_score = similarity_score
            best_match = team_id

    return best_match


def create_data():
    squad_season_stats = []
    match_stats_df = []

    for year, val in season_map.items():

        # sqaud season statistics web scraping and data cleaning...

        url = f"https://fbref.com/en/comps/9/{year}/{year}-Premier-League-Stats"

        fbref_html = requests.get(url)
        
        squad_stats_df = pd.read_html(fbref_html.text, match="Squad Standard Stats")[0]
        squad_stats_df.columns = squad_stats_df.columns.droplevel()
        squad_stats_df = squad_stats_df.loc[:, :"PrgP"]

        
        squad_stats_df = squad_stats_df.rename(columns={"# Pl": "players_used"})
        squad_stats_df.columns = squad_stats_df.columns.str.lower()
        squad_stats_df["team_id"] = squad_stats_df["squad"].apply(create_team_map)
        squad_stats_df["season_id"] = val
        
        squad_stats_to_drop = ["starts", "min", "90s", "pkatt", "crdy", "crdr", "npxg", "npxg+xag", "squad"]
        squad_stats_df = squad_stats_df.drop(columns=squad_stats_to_drop)
        
        squad_season_stats.append(squad_stats_df)


        # matches statistics data cleaning...

        match_stats = pd.read_csv(f"prem-data\data\pl-{year}.csv")
        match_stats = match_stats.loc[:, :"B365A"]

        columns_to_drop = ["Div", "HTHG", "HTAG", "HTR", "Referee", "HF", "AF", "HY", "AY", "HR", "AR"]
        match_stats = match_stats.drop(columns=columns_to_drop)
        match_stats.columns = match_stats.columns.str.lower()
        match_stats = match_stats.rename(columns={"hometeam": "home_team_id", "awayteam": "away_team_id"})

        match_stats["season_id"] = val
        match_stats["home_team_id"] = match_stats["home_team_id"].apply(lambda x: map_team_name(x, team_id_mapping))
        match_stats["away_team_id"] = match_stats["away_team_id"].apply(lambda x: map_team_name(x, team_id_mapping))

        match_stats_df.append(match_stats)

    squad_season_stats = pd.concat(squad_season_stats, ignore_index=True)
    #squad_season_stats = squad_season_stats.reset_index()
    #squad_season_stats.rename(columns={'index': 'team_stats_id'}, inplace=True)
    squad_season_stats.to_csv("prem-data/squad_stats.csv", index=False)

    match_stats_df = pd.concat(match_stats_df, ignore_index=True)
    match_stats_df = match_stats_df.reset_index()
    match_stats_df.rename(columns={"index": "match_id"}, inplace=True)
    match_stats_df.to_csv("prem-data/match_results.csv", index=False)


    seasons_df = pd.DataFrame.from_dict(season_map, orient='index', columns=["season_id"])
    seasons_df.reset_index(inplace=True)
    seasons_df.rename(columns={"index": "season"}, inplace=True)
    seasons_df.to_csv("prem-data/seasons.csv", index=False)


    teams_df = pd.DataFrame.from_dict(team_id_mapping, orient='index', columns=["team_id"])
    teams_df.reset_index(inplace=True)
    teams_df.rename(columns={"index": "team_name"}, inplace=True)
    teams_df.to_csv("prem-data/teams.csv", index=False)

    players_df = pd.read_csv("prem-data\data\pl-players.csv")
    columns_to_drop = [
        "id", "now_cost", "clean_sheets_per_90", "threat_rank_type",
        "expected_assists_per_90", "points_per_game_rank", "creativity_rank_type",
        "transfers_out", "value_form", "direct_freekicks_order", "value_season",
        "bonus", "starts_per_90", "cost_change_start", "news_added", "cost_change_start_fall",
        "expected_goals_conceded_per_90", "red_cards", "selected_rank_type", "penalties_saved", "corners_and_indirect_freekicks_order",
        "ep_next", "event_points", "web_name", "ict_index_rank", "saves_per_90", "creativity_rank", "own_goals", "status", "now_cost_rank_type",
        "yellow_cards", "news", "expected_goal_involvements_per_90", "form_rank_type", "ict_index_rank_type", "chance_of_playing_next_round",
        "influence_rank", "penalties_order", "form", "dreamteam_count", "chance_of_playing_this_round", "points_per_game", 
        "in_dreamteam", "form_rank", "selected_rank", "expected_goals_per_90", "threat_rank", "ep_this", "transfers_in",
        "bps", "goals_conceded_per_90", "selected_by_percent", "influence_rank_type", "points_per_game_rank_type", "now_cost_rank", "penalties_missed"]
    players_df = players_df.drop(columns=columns_to_drop)

    players_df = players_df.rename(columns={"team": "team_id"})
    players_df.reset_index(inplace=True)
    players_df.rename(columns={"index": "player_id", "name": "player_name", "position": "player_position"}, inplace=True)
    players_df["team_id"] = players_df["team_id"].apply(lambda x: map_team_name(x, team_id_mapping))

    players_df.to_csv("prem-data/players.csv", index=False)

    return


if __name__ == "__main__":
    create_data()

    
