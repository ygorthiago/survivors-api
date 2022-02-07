# TRZ Survivors - API Documentation
https://trz-survivors.herokuapp.com

# Endpoints

## List Items
### Method: GET
### URL: /items
- This endpoint is responsible to return all items.

### Parameters
- None.

### Responses 
#### STATUS: 200
- Will be returned the item list. 

- Response example: 
```
[
  {
    "id": 1,
    "name": "Fiji Water",
    "points": 14,
    "image": "https://trz-survivors.herokuapp.com/items/fiji_water.png"
  },
  {
    "id": 2,
    "name": "Campbell Soup",
    "points": 12,
    "image": "https://trz-survivors.herokuapp.com/items/campbell_soup.png"
  },
  {
    "id": 3,
    "name": "First Aid Pouch",
    "points": 10,
    "image": "https://trz-survivors.herokuapp.com/items/fist_aid_pouch.png"
  },
  {
    "id": 4,
    "name": "AK47",
    "points": 8,
    "image": "https://trz-survivors.herokuapp.com/items/ak47.png"
  }
]
```
#

## List Survivors
### Method: GET
### URL: /survivors
- This endpoint is responsible to return all survivors.

### Parameters
- None.

### Responses
#### STATUS: 200
- Will be returned the survivors list. 

- Response example: 
```
[
  {
    "id": 1,
    "name": "Ygor Thiago",
    "age": 23,
    "gender": "Male",
    "last_location_latitude": -12.973136222308906,
    "last_location_longitude": -38.43793487627409,
    "infected": 0
  },
  {
    "id": 2,
    "name": "Jenny",
    "age": 25,
    "gender": "Female",
    "last_location_latitude": -12.97183980052765,
    "last_location_longitude": -38.43793487627409,
    "infected": 0
  }
]
```
#
## Show Survivor
### Method: GET
### URL: /survivor
- This endpoint is responsible to return one chosen survivor.

### Parameters
- Must be pass one of these parameters, 'id' or 'name'.
- Query: 
  - id (required): The survivor ID (numeric);
  - name (required): The survivor name (string);

### Responses
#### STATUS: 200
- Will be returned the survivor. 

- Response example: 
```
{
  "survivor": [
    {
      "id": 2,
      "name": "Jenny",
      "age": 25,
      "gender": "Female",
      "last_location_latitude": -12.97183980052765,
      "last_location_longitude": -38.43793487627409,
      "infected": 0
    }
  ],
  "inventory": [
    {
      "id": 1,
      "name": "Fiji Water",
      "points": 14,
      "qtd": 4,
      "image": "https://trz-survivors.herokuapp.com/items/fiji_water.png"
    },
    {
      "id": 2,
      "name": "Campbell Soup",
      "points": 12,
      "qtd": 3,
      "image": "https://trz-survivors.herokuapp.com/items/campbell_soup.png"
    },
    {
      "id": 3,
      "name": "First Aid Pouch",
      "points": 10,
      "qtd": 0,
      "image": "https://trz-survivors.herokuapp.com/items/fist_aid_pouch.png"
    },
    {
      "id": 4,
      "name": "AK47",
      "points": 8,
      "qtd": 1,
      "image": "https://trz-survivors.herokuapp.com/items/ak47.png"
    }
  ]
}
```

### STATUS: 404
- Survivor not found.

#### Response example: 
```
{
  "message": "Survivor not found"
}

```
#
## Update Survivor Location
### Method: PUT
### URL: /survivor/:id/update-location

- This endpoint is responsible to update the survivor location.

### Parameters
- Body: 
  - latitude (required): Latitude of the location (number);
  - longitude (required): Longitude of the location (number);

Example: 
```
{
	"latitude": -12.9679083,
	"longitude": -38.4324061
}
```

### Responses
#### STATUS: 200
- The location has been updated.

- Response example: 
```
{
  message: "location updated"
}
```
#
## Create Survivor
### Method: POST
### URL: /survivors
- This endpoint is responsible to create a new survivor.

### Parameters
- Body: 
  - name (required): Survivor's name (string);
  - age (required): Survivors age (number);
  - gender (required): Survivors' gender (string);
  - last_location_latitude (required): Latitude of the survivor location (number);
  - last_location_longitude (required): Longitude of the survivor location (number);
  - items (required):
      - item_id: Item's id (number);
      - qtd: Quantity of the item (number);

Example: 
```
{
  "name": "Jenny",
  "age": 23,
  "gender": "Female",
  "last_location_latitude": -12.9679083,
  "last_location_longitude": -38.4324061,
  "items": [
    {
      "item_id": 1,
      "qtd": 0
    },
    {
      "item_id": 2,
      "qtd": 2
    },
    {
      "item_id": 3,
      "qtd": 2
    },
    {
      "item_id": 4,
      "qtd": 2
    }
  ]
}
```

### Responses
#### STATUS: 201
- Survivor successfully created.

- Response example: 
```
{
  "id": 2,
  "name": "Jenny",
  "age": 23,
  "gender": "Female",
  "last_location_latitude": -12.9679083,
  "last_location_longitude": -38.4324061,
  "items": [
    {
      "item_id": 1,
      "qtd": 0
    },
    {
      "item_id": 2,
      "qtd": 2
    },
    {
      "item_id": 3,
      "qtd": 2
    },
    {
      "item_id": 4,
      "qtd": 2
    }
  ]
}
```

#### STATUS: 208
- Already exists an survivor with this datas (name, age and gender).

- Response example:
```
{
  message: 'Already exists an survivor with this datas'
}
```
### STATUS: 400 
- Unexpected error while adding a survivor.
- Response example:
```
{
  message: 'Unexpected error while adding a survivor.'
}
```
#
## Mark Survivor as Infected
### Method: POST
### URL: /survivors/mark-as-infected

### Parameters
- Body: 
  - name (required): Name of the survivor marked as infected.
  - reporterId (required): ID of the survivor who made this report. 

Example: 
```
{
	"name": "Jenny",
	"reporterId": 1
}
```

### Responses
#### STATUS: 200
- If the survivor name does not exists, will be returned a message.

- Response example: 
```
{
  message: 'Survivor not found' 
}
```

#### STATUS: 201
- If the survivor name exists, will be verified the number of infection reports. 
- If the number of reports is minor than four, the survivor will be successfully marked as infected. 
- Response example:
```
{
  message: `You've marked Jenny as infected`
}
```

#### STATUS: 202
- if the number of reports is equal four, means that the reporter is the fifth person to mark the survivor as infected and the contamination will be confirmed. Besides that, the infected member will lose all their items to the reporter survivor.
- Response example:
```
{
  "message": "Jenny is infected!"
}
```

#### STATUS: 208
- If the reporter already been marked the survivor as infected, will be returned a message.
- Reponse example:
```
{
  "message": "You already marked Jenny as infected"
}
```
#
## Reports
### Method: GET
### URL: /reports
- Will be returned a list with informations about: Percentage of infected survivors, Percentage of non-infected survivors, The average amount of each kind of resource by the survivor and Points lost because of the infected survivor.
### Parameters
- None

#### Response 
#### STATUS 200
- Response Example: 
```
{
  "nonInfectedSurvivors": {
    "description": "Percentage of non-infected survivors",
    "percentage": "83%"
  },
  "infectedSurvivors": {
    "description": "Percentage of infected survivors",
    "percentage": "17%"
  },
  "averageItemsPerSurvivor": {
    "description": "Average of the quantity of items per survivor and of each item",
    "items": {
      "fijiWater": "3.20",
      "campbellSoup": "2.00",
      "fistAidPouch": "1.00",
      "AK47": "1.20"
    }
  },
  "pointsLost": {
    "description": "Points lost in items when an survivor are infected",
    "items": [
      {
        "name": "Fiji Water",
        "points_lost": 14
      },
      {
        "name": "Campbell Soup",
        "points_lost": 0
      },
      {
        "name": "First Aid Pouch",
        "points_lost": 10
      },
      {
        "name": "AK47",
        "points_lost": 0
      }
    ],
    "total": {
      "total_points_lost": 24
    }
  }
}

```
