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

## Elastic

### msearch

https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/msearch_examples.html

### highlight

https://www.elastic.co/guide/en/elasticsearch/reference/6.8/search-request-highlighting.html

## firebase

https://medium.com/@acupofjose/wondering-how-to-get-elasticsearch-and-firebases-firestore-to-play-nice-1d84553aa280
