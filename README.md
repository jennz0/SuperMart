# SuperMart

## Overview
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.2.
This project is an Angular application designed to meet a comprehensive set of requirements for both user and admin interfaces. The application includes functionalities such as user authentication, order management, product browsing, and administrative control. The front end is built using Angular and TypeScript, utilizing Angular Material for UI components.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.



## Features
1. Login / Register Page<br />
Login Form: Input fields for username and password with Angular form validation.
Registration Form: Fields for user details, including validation and form submission handling.
2. User Home Page<br />
Orders Table: Displays a list of user orders with Cancel and View buttons.
Top Items: Shows the top 3 most frequently purchased items and the top 3 most recently purchased items.
3. Order Detail Page<br />
Order Details: Displays detailed information about an order, including items and their statuses.
Product Links: Buttons to view detailed information about each product in the order.
Cancel Order: Option for users to cancel their orders.
4. Product Detail Page<br />
Product Information: Displays detailed information retrieved from the endpoint for a specific product.
5. Product Page<br />
Products Table: Shows all products with options to add to the shopping cart or watchlist.
Shopping Cart: Displays items added to the cart.
Watchlist: Table displaying products added to the watchlist with a Remove button.
6. Admin Home Page<br />
Orders Table: Displays all orders with options to Cancel, Complete, or View each order.
Profit Information: Component showing the product that brings the most profit.
Top Products: Displays the top 3 most popular/sold products.
Sales Data: Shows the total number of successfully sold items.
7. Admin Product Management Page<br />
Products Table: Shows all products with Edit and View buttons.
Product Form: Form to add a new product.
Edit Product: Opens a page to edit product details.
8. Admin Order Management Page<br />
Orders Table: Displays all orders with options to Complete, Cancel, or View each order.
Order Details: Component to display detailed information of an order.

## Installation
Clone the repository:<br />
```git clone https://github.com/jennz0/SuperMart.git```<br />
Navigate to the project directory:<br />
```cd project-name```<br />
Install dependencies:<br />
```npm install```<br />
Run the application:<br />
```ng serve```<br />
