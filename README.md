# EzInventory

EzInventory is a web-base application that provide stock managemenet that is integrated with sales tailored and targetted for small business owner in the retail industry

# Developers
* Vincent Onasis (vona0880/BIGBVO): Team leader, full stack developer, tester.
* Boran Wang (bwan3230): Frontend developer, designer, and tester.
* Tan Luo (tluo9434): Backend developer, database administrator, and tester.
* Yuqi Sun (ysun7190): Backend developer, designer, and tester.

## General Rules

1. Follow the timeline provided at Trello
2. Do NOT create development at master. Instead create your own branch or collaborate with others on a certain functionality.
3. Always remember to use git pull / git fetch to ensure that your local repo is up to date with the remote repo.
4. Once the functionality is done and has been tested. Do NOT merge it right away to master. Instead create a pull request so that it can be tested by others in their local machine.
5. Once pull request got approved merge it to master.

## Before Starting 

1. We will be using VS code for our code editor since it is the most comprehensive one. You can download VS code here 
    https://code.visualstudio.com/download 
2. Make sure that you have python >= 3.7.0 in your computer. You can check this by "python --version"
3. Go to your VS code and use "command + shift + p" and type "Python: Select Intrepreter" and make sure you choose "python 
   3.7.3 (EzInventory)".
4. Install Apache to activate localhost.
5. Set up your localhost:8000. If you have never set up localhost you can do this by:
    a) Download Apache
    b) Download MAMP
    c) Open MAMP and go to MAMP preference
    d) Set Your Apache port to 8000.
    e) Run Server if you do this correctly you should be prompted to apache index page.
    f) Close Server
6. Install Node.js . This can be found here https://nodejs.org/en/download/
7. Run "npm install" to install all dependencies. This will create a node_modules folder at the project directory. The node_modules is not to be pushed to github. This folder has been added to .gitignore to prevent it.
8. Download MySQL to your machine. For MAC use "brew install mysql"

## Backend
1. Some useful command:
    a) To create new app 
        - "python manage.py startapp [appname]".
        - Please be aware that everytime you create a new app you will need to go to "setting.py" and add this app under "INSTALLED_APPS"
    b) To make migration
        - "python manage.py makemigrations [appname]"
    c) To migrate
        - "python manage.py migrate"
    d) To database server
        - "python manage.py runserver"

2. Install Postman on your computer (It is your best friend)

## Frontend 
1. Go to chrome and install Redux Devtools and add this as your chrome extension. This is used to see to help see the redux state when we run the system at chrome.

## Database
1. Go to your MAMP -> Preference set your MySQL port to 3306 run the server and then stop it.
2. Go to mysql through terminal using " mysql -u root"
3. Create a new Database called EzInventoryDatabase using "CREATE DATABASE EzInventoryDatabase;"
4. Use "show databases;" to check if the database has been created.
5. Use "use EzInventoryDatabase;" to use the database.
6. Go back to the project terminal and run "python manage.py migrate"
7. Go back to MySQL terminal and use "show tables" and if it shows all the tables from the project, the database has been configured correctly.


## Restful API

### http://localhost:8000/api/auth -- all the login/register functions
* __POST__ (/login, Login)),
* __POST__ (/logout, Logout),
* __POST__ (/changePassowrd, Update User Password),
* __GET__ (/user, get user)

### http://localhost:8000/api/user -- all the user functions
* __POST__ (/create, Create a new user),
* __GET__ (/all_users, List all users)),
* __DELETE__ (/delete, delete a user)

### http://localhost:8000/api/product -- all the product functions
* __GET__ (/, List All Products),
* __GET__ (/search_code?product_code={}, Look for specific product by code),
* __POST__ (/create, Create A new product),
* __POST__ (/update_product, Update Product Information),
* __POST__ (/update_stock, Update Product Stock),
* __DELETE__ (/delete, delete a product)

### http://localhost:8000/api/invoice -- all the invoice functions
* __GET__ (/, List All Invoices),
* __POST__ (/, Create A new invoice),
* __GET__ (/item, List All Invoice Items),
* __POST__ (/item, Create A new invoice item),
* __GET__ (/<int:id>, Look for specific invoice by id),
* __POST__ (/item/<int:invoice_id>, Look for specific invoice details by invoice id)

## Resful API Structure
### http://localhost:8000/api/auth -- all the login/register functions

* __POST__ (/login, Login)),

    //Request Structure
    {
        "username" : "VO2",
        "password" : "123456"
    }

    //Response Structure
    {
        "user": {
            "id": 3,
            "username": "VO2",
            "privilege": "BO"
        },
        "token": "29a9d8155095485022051e72af896b0ca4acf39dd404b2f21d391ff5a542c53f",
        "message": "Login Successfully"
    }

* __POST__ (/logout, Logout)

    //Request Structure
    {
        "username": "VO9",
        "password": "123456",
        "new_password": "abcdef"  
    },
    {
        headers: {
            Authorization: Token [Access Token]
        }
    }

    //Response Structure
    {
        "user":{
            "id": 5,
            "username": "VO9",
            "privilege": "BO"
        },
        "message": "Passwod Updated Successfully"
    }

* __POST__ (/changePassword, Update User Password)

    //Request Structure
    {
        "username": "sales",
        "password": "12345678",
        "new_password": "123456789"
    },
    {
        headers: {
            Authorization: Token [Access Token]
        }
    }

    //Response Structure
    {
        "user": {
            "id": 7,
            "username": "sales",
            "privilege": "SS"
        },
        "message": "Password Updated Successfully"
    }

* __GET__ (/user, get user)

    //Request Structure
    {
        headers: {
            Authorization: Token [Access Token]
        }
    }

    //Respond Structure
    {
        "id": 3,
        "username": "VO2",
        "privilege": "BO"
    }


### http://localhost:8000/api/user -- all the user functions
* __POST__ (/create, Create a new user)

    //Request Structure
    {
        "username": "manager",
        "name": "Manager1",
        "password": "12345678",
        "privilege": "MN"
    },
    {
        headers: {
            Authorization: Token [Access Token]
        }
    }

    //Respond Structure
    {
        "user": {
            "id": 9,
            "username": "manager",
            "privilege": "MN"
        },
        "token": "1cb22c79c8619edd49052ea20c8e76830e6ca1600c11a78f351ab52c3ae853aa",
        "message": "Register Successfully"
    }
    

* __GET__ (/all_users, List all users))


    //Request Structure
    {
        headers: {
            Authorization: Token [Access Token]
        }
    }

    //Respond Structure
    [
        {
            "id": 6,
            "username": "warehouse",
            "privilege": "WS"
        },
        {
            "id": 7,
            "username": "sales",
            "privilege": "SS"
        },
        {
            "id": 8,
            "username": "sales2",
            "privilege": "SS"
        }
    ]

* __DELETE__ (/delete, delete a user)

    //Request Structure
    {
        "id": 8,
        "username": "sales2",
        "privilege": "SS"
    },
    {
        headers: {
            Authorization: Token [Access Token]
        }
    }

    //Respond Structure
    {
        "message": "User deleted successfully"
    }


### http://localhost:8000/api/product -- all the product functions
* __GET__ (/, List All Products),

    //Request Structure
    {
        headers: {
            Authorization: Token [Access Token]
        }
    }

    //Response Structure
    [
        {
            "id": 1,
            "product_code": "OC0001",
            "product_name": "Office Chair Black",
            "quantity_in_stock": 10,
            "current_price": "49.99",
            "last_update": "2020-11-11T07:50:26.027391Z",
            "description": "Black Comfortable Office Chair"
        },
        {
            "id": 2,
            "product_code": "OC0002",
            "product_name": "Office Chair Blue",
            "quantity_in_stock": 10,
            "current_price": "49.99",
            "last_update": "2020-11-11T06:56:49.125338Z",
            "description": "Blue Comfortable Office Chair"
        }
    ]


* __GET__ (/search_code?product_code=OC0001, Look for specific product by code),

    //Request Structure
    {
        headers: {
            Authorization: Token [Access Token]
        }
    }

    //Response Structure

    {
        "product": {
            "id": 1,
            "product_code": "OC0001",
            "product_name": "Office Chair Black",
            "quantity_in_stock": 10,
            "current_price": "49.99",
            "last_update": "2020-11-11T07:50:26.027391Z",
            "description": "Black Comfortable Office Chair"
        },
        "message": "Product retrived successfully"
    }

* __POST__ (/create, Create A new product)),

    //Request Structure
    {
        "product_code" : "OC0003",
        "product_name" : "Office Chair Brown",
        "quantity_in_stock" : "10",
        "current_price" : "49.99",
        "description" : "Brown Comfortable Office Chair" 
    },
    {
        headers: {
            Authorization: Token [Access Token]
        }
    }

    //Response Structure
    {
        "product": {
            "id": 4,
            "product_code": "OC0003",
            "product_name": "Office Chair Brown",
            "quantity_in_stock": 10,
            "current_price": "49.99",
            "last_update": "2020-11-11T09:10:02.276521Z",
            "description": "Brown Comfortable Office Chair"
        },
        "message": "Product Successfully Added to the system"
    } 

  * __POST__ (/update, Update product Information)),

    //Request Structure
    {
        "product_code" : "OC0003",
        "product_name" : "Office Chair Brown",
        "quantity_in_stock" : "10",
        "current_price" : "49.99",
        "description" : "Brown Comfortable Office Chair" 
    },
    {
        headers: {
            Authorization: Token [Access Token]
        }
    }

    //Response Structure
    {
        "product": {
            "id": 4,
            "product_code": "OC0003",
            "product_name": "Office Chair Brown",
            "quantity_in_stock": 10,
            "current_price": "49.99",
            "last_update": "2020-11-11T09:10:02.276521Z",
            "description": "Brown Comfortable Office Chair"
        },
        "message": "Product Updated Successfully"
    }  


* __POST__ (/update_stock, Update Product Stock),

    This is divided into 2 parts: add and minus
    
    //Request Structure (add)
    {
        "product_code":"OC0001",
        "quantity":10,
        "command":"add"
    },
    {
        headers: {
            Authorization: Token [Access Token]
        }
    }

    //Response Structure
    {
        "product": {
            "id": 1,
            "product_code": "OC0001",
            "product_name": "Office Chair Black",
            "quantity_in_stock": 20,
            "current_price": "49.99",
            "last_update": "2020-11-11T09:14:27.597559Z",
            "description": "Black Comfortable Office Chair"
        },
        "message": "Stock Updated Successfully"
    }

    //Request Structure (minus)
    {
        "product_code":"OC0001",
        "quantity":10,
        "command":"minus"
    },
    {
        headers: {
            Authorization: Token [Access Token]
        }
    }

    //Response Structure
    {
        "product": {
            "id": 1,
            "product_code": "OC0001",
            "product_name": "Office Chair Black",
            "quantity_in_stock": 10,
            "current_price": "49.99",
            "last_update": "2020-11-11T09:15:09.534152Z",
            "description": "Black Comfortable Office Chair"
        },
        "message": "Stock Updated Successfully"
    }
    
* __DELETE__ (/delete, delete a product)

    //Request Structure
    {
        "product_code":"OC0003",
    },
    {
        headers: {
            Authorization: Token [Access Token]
        }
    }

    //Response Structure
    {
        "message": "Product deleted successfully"
    }
    
    
    
### http://localhost:8000/api/invoice -- all the invoice functions
* __GET__ (/, List All Invoices)

    //Request Structure
    {
        headers: {
            Authorization: Token [Access Token]
        }
    }

    //Response Structure
    {
        "id": 1,
        "invoice_timestamp": "2020-11-18T23:11:10.497660Z",
        "invoice_type": 0,
        "total_price": "3.00"
    },
    {
        "id": 2,
        "invoice_timestamp": "2020-11-18T23:11:42.240690Z",
        "invoice_type": 1,
        "total_price": "3.00"
    }
    
    
* __POST__ (/, Create A new invoice)

    //Request Structure
     {
        "invoice": [
            {
                "invoice_type": 0,
                "total_price": 20,
                "invoice_item": {
                    "product_code" :"PROD",
                    "product_name": "product1",
                    "quantity": 1,
                    "Purchase_price" : "3.00",
                    "Total_price" : "3.00"
                    } 
                }
            ]
       },
      {
            headers: {
                Authorization: Token [Access Token]
            }
      }


   //Response Structure
    {
        "invoice": {
            "id": 3,
            "product_code": "PROD",
            "product_name": "product1",
            "quantity_in_stock": 10,
            "current_price": "3.00",
            "last_update": "2020-11-18T09:10:02.276521Z",
            "description": "it's product 1"
        },
        "message": "Invoice Successfully Added to the system"
    } 

* __GET__ (/item, List All Invoice Items)


    //Request Structure
    {
        headers: {
            Authorization: Token [Access Token]
        }
    }

    //Response Structure
     [
        {
            "id": 1,
            "price_purchased": "3.00",
            "quantity_purchased": 1,
            "invoice_id": 1,
            "product_id": 1
        },
        {
            "id": 2,
            "price_purchased": "3.00",
            "quantity_purchased": 1,
            "invoice_id": 2,
            "product_id": 1
        }
    ]
    

* __POST__ (/item, Create A new invoice item)

  
    //Request Structure
    {
          "invoice_item": {
                "product_code" :"PROD",
                "product_name": "product1",
                "quantity": 1,
                "Purchase_price" : "3.00",
                "Total_price" : "3.00"
            } 

     },
     {
        headers: {
            Authorization: Token [Access Token]
        }
    }


   //Response Structure
    {
        "invoice_item": [
            {
                "id": 1,
                "price_purchased": "3.00",
                "quantity_purchased": 1,
                "invoice_id": 1,
                "product_id": 1
            }
        ],
        "products_info": [
            {
                "id": 1,
                "product_code": "PROD",
                "product_name": "product1",
                "quantity_in_stock": 6,
                "current_price": "3.00",
                "last_update": "2020-11-19T11:07:54.962712Z",
                "description": "it's product 1"
            }
        ]
    }
        "message": "Invoice item Successfully Added to the system"
    } 
    
    

* __GET__ (/1, Look for specific invoice by id)

    //Request Structure
    {
        headers: {
            Authorization: Token [Access Token]
        }
    }

    //Response Structure

    {
        "id": 1,
        "invoice_timestamp": "2020-11-18T23:11:10.497660Z",
        "invoice_type": 0,
        "total_price": "3.00"
    }

* __POST__ (/item/1, Look for specific invoice details by invoice id)
  
    //Request Structure
    {
        headers: {
            Authorization: Token [Access Token]
        }
    }

    //Response Structure
    {
        "invoice_item": [
            {
                "id": 1,
                "price_purchased": "3.00",
                "quantity_purchased": 1,
                "invoice_id": 1,
                "product_id": 1
            }
        ],
        "products_info": [
            {
                "id": 1,
                "product_code": "PROD",
                "product_name": "product1",
                "quantity_in_stock": 6,
                "current_price": "3.00",
                "last_update": "2020-11-19T11:07:54.962712Z",
                "description": "it's product 1"
            }
        ]
    }
    
