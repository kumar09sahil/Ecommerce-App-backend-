**Project Title**: E-Commerce Backend <br>
**Project Description**: Backend code for implementing funtionalities for E-Commerce Backend  <br> <br>

**Tech Stack** <br>
**MongoDB**: Database for storing product details, user information, orders, etc. <br>
**Express.js**: Backend framework to build the API and handle requests. <br>
**Node.js**: Server-side environment to run JavaScript and manage backend services. <br>

**Key Features**<br>

**User Authentication and Authorization**<br>
Sign up/Login functionality using JWT (JSON Web Tokens) with role-based authorization. Admins and users have different access levels.

Admins can manage products, view all orders, etc.<br>
Users can sign up, log in, and place orders.<br> <br>
**Product Management**<br>
**Product Listing**: Users can browse products by categories, price, and filters (search, sorting, etc.).<br>
**Product Detail**: Each product has a detailed page with images, descriptions, pricing, and reviews.<br>
**Admin Panel**: Admins can create, update, and delete products.<br>
**Shopping Cart**<br>
**Add to Cart**: Users can add items to their shopping cart.<br>
**Cart Management**: Ability to update quantities or remove items from the cart. <br>
**Order Management** <br>
**Checkout Process**: Seamless checkout experience with shipping details and payment processing.<br> 
**Order History**: Users can view past orders, and admins can manage orders (change status, view details).<br> 
**Reviews and Ratings** <br>
Users can leave reviews and ratings for products they purchased, helping others make informed decisions. <br>

**Search and Filtering** <br>
Full-text search functionality with multiple filtering options such as category, price range, brand, and more. <br>

**How to Install and Run the Project** <br>
**step 1**: Clone the project <br>
**step 2**: cd <project_dir> <br>
**step 3**: npm install <br>
**step 4**: node index.js <br> <br>

**Test API on Postman** <br> <br>

**AUTH** <br>
**register** : POST http://localhost:6000/api/user/register <br>
**login**: POST http://localhost:6000/api/user/login <br>
**updateUser**: PATCH http://localhost:6000/api/user/updateuser <br>
**updatePAssword**: PATCH http://localhost:6000/api/user/updatePassword <br>
**ResetPassword**: POST http://localhost:6000/api/user/forgotPassword <br>
**ForgotPAssword**: POST http://localhost:6000/api/user/forgotPassword <br>
**deleteUser**: DELETE http://localhost:6000/api/user/deleteUser <br>
**AdminLogin**: POST http://localhost:6000/api/user/adminlogin <br>
**getUser**: GET http://localhost:6000/api/user/:user_id <br> <br>

**ADMIN** <br>
**UpdateOrder**: PUT http://localhost:6000/api/user/updateOrder/:order_id <br>
**fetch all users**: GET http://localhost:6000/api/user/fetchAllUsers <br>
**blockuser**: PATCH http://localhost:6000/api/user/blockUser/:user_id <br>
**unblockUser**: PATCH http://localhost:6000/api/user/unblockUser/:user_id <br>
**Create blog Category**: POST http://localhost:6000/api/blogcategory/createBlogCategory <br>
**Update Category**: PUT http://localhost:6000/api/blogcategory/updateBlogCategory/:blog_category_id <br>
**Delete category**: DELETE http://localhost:6000/api/blogcategory/deleteBlogCategory/:blog_category_id <br>
**Create Brand cat** : POST http://localhost:6000/api/brand/createBrand <br>
**Update Brand cat** : PUT http://localhost:6000/api/brand/updateBrand/:Brand_cat_id <br>
**Delete Brand Cat**: DELETE http://localhost:6000/api/brand/deleteBrand/:Brand_cat_id <br>
**create Product Category**: POST http://localhost:6000/api/prodcategory/createprodCategory <br>
**Update Product Category**: PUT http://localhost:6000/api/prodcategory/updateprodCategory/:prod_cat_id <br>
**delete Prod Category**: DELETE http://localhost:6000/api/prodcategory/deleteprodCategory/:prod_cat_id <br>
**Create Coupon**: POST http://localhost:6000/api/coupon/createCoupon <br>
**Get all Coupon**: GET http://localhost:6000/api/coupon/getallCoupon <br>
**Update Coupon**: PATCH http://localhost:6000/api/coupon/updateCoupon/:Coupon_id <br>
**Delete Coupon**: DELETE http://localhost:6000/api/coupon/deleteCoupon/:Coupon_id <br>
**Get ALL Order**: GET http://localhost:6000/api/user/getOrders <br>
**update a Product**: PATCH http://localhost:6000/api/product/:Product_id <br>
**Delete a PRoduct**: DELETE http://localhost:6000/api/product/:Product_id <br>
**Upload Product Image**: PUT http://localhost:6000/api/product/upload/:Product_id <br>
**CreatePRoduct**: POST http://localhost:6000/api/product/createProduct <br> <br> <br>


**PRODUCT, CART & WISHLIST** <br>
**Get a Product**: GET http://localhost:6000/api/product/:product_id <br>
**get all Product**: GET http://localhost:6000/api/product/getAllProduct?page=1 <br>
**Rate a Product**: PUT http://localhost:6000/api/product/rating <br>
**GetWishlist**: GET http://localhost:6000/api/user/wishlist <br>
**add to wishlist**: PUT http://localhost:6000/api/product/wishlist <br>
**Add to Cart**: POST http://localhost:6000/api/user/cart <br>
**get user Cart**: GET http://localhost:6000/api/user/usercart <br>
**Empty Cart**: DELETE http://localhost:6000/api/user/emptyCart <br>
**SaveAddress**: PUT http://localhost:6000/api/user/saveAdress <br>
**Create Order**: POST http://localhost:6000/api/user/cart/createOrder  <br> <br>

**Coupon** <br>
**ApplyCoupon**: POST http://localhost:6000/api/user/cart/applyCoupon <br> <br>

**Blog** <br>
**Upload Blog Image**: PUT http://localhost:6000/api/blog/upload/:Blog_id <br>
**Create Blog**: PATCH http://localhost:6000/api/blog/createBlog <br>
**Update Blog**: PATCH http://localhost:6000/api/blog/updateBlog/:Blog_id <br>
**Delete A Blog**: DELETE http://localhost:6000/api/blog/deleteBlog/:Blog_id <br>
**Fetch A Blog**: GET http://localhost:6000/api/blog/getBlog/:Blog_id <br>
**get All Blogs**: GET http://localhost:6000/api/blog/getAllBlog <br>
**LikeBlog**: PUT http://localhost:6000/api/blog/likes <br>
**DislikeBlog**: PUT http://localhost:6000/api/blog/dislikes <br> <br>

**Category** <br>
**BLOG** <br>
**Get a Category**: GET http://localhost:6000/api/blogcategory/getBlogCategory/:blog_category_id <br>
**Get all Category**: GET http://localhost:6000/api/blogcategory/getallBlogCategory <br> <br>

**Product** <br>
**Get All prod CAtegory**: GET http://localhost:6000/api/prodcategory/getallprodCategory <br> 
**Get a Prod Category** : GET http://localhost:6000/api/prodcategory/getprodCategory/:prod_cat_id  <br>  <br> 

**Brand** <br> 
**Fetch a Brand**: GET http://localhost:6000/api/brand/getBrand/:Brand_cat_id <br> 
**Fetch all Brand**: GET http://localhost:6000/api/brand/getallBrand <br> 




