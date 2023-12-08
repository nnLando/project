import requests

start_amount = str(input("Convert from: ")).upper()
end_amount   = str(input("COnvert to: ")).upper()

tally = float(input("Amount of Money: "))

feedback = requests.get(f"https://api.frankfurter.app/latest?amount={tally}&from={start_amount}&to={end_amount}")

print (f"{tally} {start_amount} is {feedback.json()['rates'][end_amount]} {end_amount}")