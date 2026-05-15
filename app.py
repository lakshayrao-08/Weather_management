import csv

RAIN_THRESHOLD = 0.5  
WIND_THRESHOLD = 15.0 

def analyze_weather(file_name):
    print(f"{'Date':<15} | {'Temp':<6} | {'Status':<15} | {'Logistics Impact'}")
    print("-" * 65)

    with open(file_name, mode='r') as file:
        
        reader = csv.DictReader(file)
        
        for row in reader:
            
            date = row['Date.Full']
            temp = float(row['Data.Temperature.Avg Temp'])
            rain = float(row['Data.Precipitation'])
            wind = float(row['Data.Wind.Speed'])
            
          
            if rain > RAIN_THRESHOLD or wind > WIND_THRESHOLD:
                status = "🚨 HIGH RISK"
                impact = "Expect 30% Delivery Delays"
            else:
                status = "✅ STABLE"
                impact = "Normal Operations"

            
            if status == "🚨 HIGH RISK":
                print(f"{date:<15} | {temp:<6}°F | {status:<15} | {impact}")

analyze_weather('weather.csv')