# Library-Management-System

<<<<<<< HEAD
   This is a library API managment for the managment user an the books

# Routes and End point

## /user
GET: Get all the list of users in the system
POST: Create/REgister a new User

## /user/{id}
GET: get a user by their ID
PUT: Updating a user by their ID
DELETE: Deleting a user by their ID (Check if the user Carry any penality or not submit issues book )

## /user/subscription/{id}
GET: GEt a user subscription detials by thei ID Date of Subscription or with other detials


## /book
GET: Get all the books in the system
POST: Add a new book to the system

## /book/{id}
GET: Get a book by its ID
PUT: Update a book by their ID
DELETE: Remove/Delete book detials with ID


## /book/issued
GET: Get all issued book

## /book/issued/withfine
GET: Get all issued books with their fine ammount

### subscription type 
   1.Basic (3 Months)
   2.Standard (6 Months)
   3.Premium (12 Months)

## Penalities 
   1.If a user missed the naural date, the user should be collected with $100
   2.If a user missed his subscription, then useris expected to pay $100
   3.If user missed both renewal & subscription, then the collected amount should be $200


## Command
npm init
npm i express 
npm i nodemon --save-dev

npm rub dev

to restore node modules and package-lock.json input npm i/ npm install
=======
   commiting by faiz
>>>>>>> 88bd60311914e7bb2ec001b2fde960f473d219b9
