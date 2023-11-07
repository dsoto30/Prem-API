import pandas as pd
import psycopg2
from sqlalchemy import create_engine

# PostgreSQL connection parameters
db_params = {
    'host': 'your_host',
    'database': 'your_database',
    'user': 'your_username',
    'password': 'your_password',
    'port': 'your_port'
}

# List of CSV files and their corresponding table names
csv_files = {
    'file1.csv': 'table1',
    'file2.csv': 'table2',
    # Add more CSV file names and corresponding table names as needed
}

# Function to insert data from CSV into PostgreSQL table
def insert_csv_to_postgres(csv_file, table_name):
    # Read CSV file into a pandas DataFrame
    df = pd.read_csv(csv_file)
    
    # Establish a connection to PostgreSQL
    engine = create_engine(f'postgresql+psycopg2://{db_params["user"]}:{db_params["password"]}@{db_params["host"]}:{db_params["port"]}/{db_params["database"]}')
    
    # Insert data into PostgreSQL table
    df.to_sql(table_name, engine, if_exists='append', index=False, method='multi')
    print(f'Data from {csv_file} inserted into {table_name} table.')

# Loop through the CSV files and insert data into respective tables
for csv_file, table_name in csv_files.items():
    insert_csv_to_postgres(csv_file, table_name)



if __name__ == "__main__":
    pass