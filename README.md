<p align="center">
  <img alt="compass logo" src="https://user-images.githubusercontent.com/65569815/176964539-fe858838-0d07-418e-9220-b6d94461ecee.png" />
</p>

# Compass Tutor MicroService

Final Challenge of the **NodeJS Scholl Program from [Compass.uol](https://compass.uol/)**.

## Summary
* ### [How to initialize](#-como-inicializar)
* ### [Endpoints](#-endpoints)
* ### [Schemas](#-schemas)

## Description
A client hired Compass to build a new microservice for its veterinary franchise. This microservice will be used by all the clinics they own for internal client and attendances management.

So, you have this new mission, to build the POC foundations of this brand new microservice, so the sales and management team can have the primary technical view of the needs that the client has.

## Requirements

Before starting, you will need to have Node.js installed on your machine.

## How to initialize

As described in the requirements above, first you need to install the [NodeJS](https://nodejs.org/en/)
<br/>
Then you will run the following commands:

```bash
# Clone this repository
$ git clone https://github.com/AntonioRdC/PBnodeChallenge1
# Access the project folder
$ cd PBnodeChallenge1
# Install the dependencies
$ npm install
```

Now that you already have the dependencies installed, just start the project.

```bash
# Start the application at localhost:3000
$ npm run dev
```

## Endpoints

### Swagger Documentation Endpoint
|               Route              |    Method    |               Description                 |
|   ----------------------------   | :----------: |  ---------------------------------------  |
|  `/api-docs`                     |    GET       |  Get Documentation in Swagger             |

### Tutor Endpoints
|               Route              |    Method    |               Description                 |
|   ----------------------------   | :----------: |  ---------------------------------------  |
|  `/tutors`                       |    GET       |  Retrieves all tutors                     |
|  `/tutor`                        |    POST      |  Create a new tutor                       |
|  `/tutor/:id`                    |    PUT       |  Updates a tutor                          |
|  `/tutor/:id`                    |    DELETE    |  Deletes a tutor                          |

### Pet Endpoints
|               Route              |    Method    |               Description                  |
|   -------------------------      | :----------: |  ---------------------------------------   |
|  `/pet/:tutorId`                 |    POST      |  Creates a pet and adds it to a tutor      |
|  `/pet/:petId/tutor/:tutorId`    |    PUT       |  updates a pet's info                      |
|  `/pet/:petId/tutor/:tutorId`    |    DELETE    |  deletes a pet from a tutor                |

## Schema

### Tutor Table
|         FieldName        |    Type   | Required | Unique |
|--------------------------|:---------:|:--------:|:------:|
| `_id`                    | ObjectId  | true     | true   |
| `name`                   | String    | true     | false  |
| `phone`                  | String    | true     | true   |
| `email`                  | String    | true     | true   |
| `date_of_birth`          | String    | true     | false  |
| `zip_code`               | Number    | true     | true   |

```bash
# Example Tutor .json
{ 
    id: 1, 
    name: "Jonas", 
    phone: "85989323895", 
    email: "jonas@paidepet.com", 
    date_of_birth: "1993-12-12 10:10", 
    zip_code: "61760000" 
}
```


### Pet Table
|         FieldName        |    Type   | Required | Unique |
|--------------------------|:---------:|:--------:|:------:|
| `_id`                    | ObjectId  | true     | true   |
| `name`                   | String    | true     | false  |
| `species`                | String    | true     | false  |
| `carry`                  | String    | true     | false  |
| `weight`                 | Number    | true     | false  |
| `date_of_birth`          | String    | true     | false  |

```bash
# Example Pet .json
{ 
    id: 1, 
    name: "Lilo", 
    species: "dog", 
    carry: "p", 
    weight: 5, 
    date_of_birth: "1993-12-12 10:10"
}
```


## Author
<img src="https://avatars.githubusercontent.com/AntonioRdC" width=115>  
<a href="https://github.com/AntonioRdC">Antonio Carvalho</a>