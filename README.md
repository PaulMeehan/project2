# Shopally

We were inspired to create this applcation to promote and support local businesses. We wanted users to have quick access to find products stocked and sold by the small shops they love! Shopally is a simple and easy-to-use application that supports local businesses. It is composed of both a user side and store side. Below are how each interface works.

_user interface_
1. This application will allows users to search based on a tag query.
  * Tags are listed in the database

2. The tags a user searhes for are then populated and are added dynamiclly to the page
  * These tags can be found under the "Searched Tags Header"
  
3.After the searches are complete, a user can more the tags to the "selected" area by simply clicking the desired tag.
  * These tags can be found under the "Selected Tags Header"

4. Shopally will the provid the in stock items that are avaiable only by participating local businesses
  * Business will only be allowed to submit their products if they meet a specific requirements approved by us ($$). 

5. When a user see's an interesting product they can click on the item, which will create a drop down with a description of the product, and store information

6. Once a user finds a product they want, they can simply click on the address, which will then toggle the modal and provide the google maps information. 

_store-owner interface_
1. For a business to utilize this application, and promote products, they must be approved by us and meet the specific requirements for Shopally (local business, $$)

2. Once approved, a store owner can register. 
  * These users will need to remember their user names and password to log in each time to update inventory

3. Once logged in the business owner has the ability to edit product names, descriptions, prices and tags

4. Once updated, they user must submit the changes for each product (by simply clicking on the check-mark button) 

5. If a store owner wants to remove the product, they can simply hit the trash can button and product details will be removed from the database. 

6. They also have the option to update products, by simply silling out the required information at the bottom of the table.


Google Maps API url:https://developers.google.com/maps/documentation/embed/guide

API console: https://console.developers.google.com/google/maps-apis/api-list?project=shopally&pli=1

















## Apler's starter file Requirements:

* Add `.env` file with the following content:

```
SEQUELIZE_USER=your_mysql_db_user
SEQUELIZE_PASSWORD=your_mysql_db_password
SEQUELIZE_HOST=your_mysql_db_host
AUTH_SECRET=your_auth_secret_key
ADMIN_USER_PWD=admin_password
USER_PWD=user_pwd
FORCE_SYNC=true_or_false
```
