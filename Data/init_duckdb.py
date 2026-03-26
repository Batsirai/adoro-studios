#!/usr/bin/env python3
"""
Initialize Adoro Studios DuckDB analytics database.
Run: python3 init_duckdb.py
"""

import duckdb

DB_PATH = "/home/workspace/Companies/AdoroStudios/Data/analytics.duckdb"
SCHEMA_PATH = "/home/workspace/Companies/AdoroStudios/Data/analytics_schema.sql"

def main():
    print("Initializing DuckDB for Adoro Studios...")
    
    con = duckdb.connect(DB_PATH)
    
    with open(SCHEMA_PATH, 'r') as f:
        schema_sql = f.read()
    
    con.execute(schema_sql)
    
    tables = con.execute("SHOW TABLES").fetchall()
    print(f"\nCreated {len(tables)} tables:")
    for t in tables:
        print(f"  - {t[0]}")
    
    con.execute("""
        INSERT INTO agent_activity (agent_id, company_id, action, description, tokens_used, duration_ms, cost_usd, success)
        VALUES 
            ('researcher', 'adoro-studios', 'task_completed', 'Competitive analysis for Q1 campaign', 15000, 120000, 0.45, true),
            ('marketer', 'adoro-studios', 'task_completed', 'Posted 5 social posts across platforms', 8000, 60000, 0.24, true),
            ('analyst', 'adoro-studios', 'task_completed', 'Weekly performance report', 20000, 180000, 0.60, true)
    """)
    
    print("\nSample data inserted.")
    print(f"Database ready at: {DB_PATH}")
    
    con.close()

if __name__ == "__main__":
    main()
