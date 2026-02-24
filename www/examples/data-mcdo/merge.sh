ls -1 data/*.json | sort -V | xargs jq -s '.' > mcdonalds-funny-score.json
json2csv mcdonalds-funny-score.json -o mcdonalds-funny-score.csv
