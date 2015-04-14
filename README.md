# Product Management System (PMS) 
###Demo Application for Node JS and Angular JS

This project is a sample application demonstrating a more fully developed realistic single page
angular application which can be used to Add products, Search products, and Edit products


### Prerequisites:
* NodeJS from http://nodejs.org/
* Git 
* PostgreSQL or MySQl

### Running the application
Add your sql connection details in both server/index.js and config/config.json
Open your command line to the root directory of the repository.  
Run
 
`npm install`

`npm run develop` 

Then navigate your browser to `http://localhost:<port>` to see the app running in
your browser.  The port may be configured in the server/index.js file near the top.

### Run tests and jshint

Server side test :`npm run mocha`

Client side test :`npm run karma`

JsHint :`npm run jshint`

### Api Details

Product api can be access through `/api/product`

**Query string parameters**

**size** : size of the array (default 100)

**sortOrder** : sort order (default 'productName') (available - `id`, `productName`, `costPrice`, `sellingPrice`, `quantity`)

**filterType** :filter condition on cost price `gt` (grater than),  `gte` (grater than or equal)  , `lt` (leas than), `lte` (leas than or equal), `e` (equal)

**filterValue** = value for compaire

**Sample URL**

`http://localhost:5000/api/product?sortOrder=sellingPrice&size=100&filterType=gt&filterValue=23`
