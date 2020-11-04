# lotb

## Install

    npm i

## Extract characters from Lotb Compendium

    npm run extract-characters

## Generate `characters.csv`

    npm run export:csv-characters

## ElasticSearch

### Create Elasticsearch index folder

    mkdir elasticsearch-data
    chmod a+w elasticsearch-data

### Launch server

    docker-compose up

### Access server

http://localhost:5601


### Scripts

    // Extraire les persos
    npm run extract-characters

    // Indexer les persos
    npm run index-characters

### Free ElasticSearch service

http://www.searchly.com/pricing
