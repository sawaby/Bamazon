# Bamazon
## Overview

This activity will create an amazon-like storefron called `Bamazon`, with mysql and node.js.
The app will take in orders from customers and deplete stock from the store's inventory. The program track product sales across the store. It has 3 views(Customer View, Manager View and Supervisor View).
- - -
##Customer View: 
The Customer view of the app shows one option which asks the user to specify the product they want to buy. 
The image 1 will show the view of the products and buying a product and how many of the product the user wants to buy. <br /><br />
![Alt text](./images/img1.png?raw=true "View of and Buy")
<br />
It also shows Successfull Transactinos. <br />
![Alt text](./images/img3-success.png?raw=true "Success")
<br /><br />
User can quit the program by pressing Q.<br /><br />
![Alt text](./images/quitCustomer.png?raw=true "Quit")
<br /><br />
- - -
## Manager View: 
Manager View of the product shows 5 options to the user to choose: <br />
    
    1. View Products for Sale
    2. View Low Inventory 
    3. Add to Inventory 
    4. Add New Product 
    5. Quit the program 
          
![Alt text](./images/managerView.png?raw=true "View Manager")

##Option One:

It shows those items which exists in the stock and can be sold. <br />
![Alt text](./images/viewProductManager.png?raw=true "View Product Manager")

##Option Two: 

Shows those Items which their quantity is less than 5. <br />
![Alt text](./images/viewLowInventory1.png?raw=true "View Low Inventory")

##Option Tree: 

Allow Manager to add Inventory to a specific product. <br />
![Alt text](./images/addToInventory.png?raw=true "Add to Inventory")

##Option Four:

allow Manager to add new Products. <br />
![Alt text](./images/addNewProduct1.png?raw=true "Add new Product")

![Alt text](./images/addNewProduct2.png?raw=true "Add new Product2")

##Option Five: 

Can quit the program.
![Alt text](./images/quit-manager.png?raw=true "quit")

## Supervisor View: 

Supervisor View of the product shows 3 options to the user to choose: <br />
    
    1. View Products sales by Department
    2. Create New Department
    3. Quit the program 
          
![Alt text](./images/supervisorView.png?raw=true "View Supervisor")

##Option One: 

This is not complete, lacks only a joint statement. Displayes the departments.  
![Alt text](./images/supervisorDepartmentView.png?raw=true "View Products sales by Department")

##Option Two: 

Supervisor is able to add new department. 
![Alt text](./images/addDepartmentSupervisor.png?raw=true "Create New Department")