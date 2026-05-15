import csv

def analyze():
    try:
        with open('weather.csv', mode='r') as f:
            reader = csv.DictReader(f)
            # This handles the specific CORGIS headers automatically
            risks = [row for row in reader if float(row.get('Data.Precipitation', 0)) > 0.1]
            
            print(f"--- WeatherWise AI Report ---")
            print(f"Scanned Dataset: weather.csv")
            print(f"Identified {len(risks)} high-risk incidents.")
            print("Action: Logistics rerouting suggested for these dates.")
    except FileNotFoundError:
        print("Error: weather.csv not found in this folder.")

if __name__ == "__main__":
    analyze()