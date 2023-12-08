from forex_python.converter import CurrencyRates

money = CurrencyRates()

tally = int(input("Amount here: "))

start_amount = input("Start Amount: ").upper()
end_amount   = input("End Amount: ").upper()

print(start_amount, "to", end_amount, tally)

output = money.convert(start_amount, end_amount, tally)

print("Conversion tally: ", output)