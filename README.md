# On The House

<img width="1440" alt="Screen Shot 2023-03-30 at 1 22 21 PM" src="https://user-images.githubusercontent.com/66704595/228943077-65630f23-5abf-4033-9fe4-dbbecbfb263b.png">

<img width="1440" alt="Screen Shot 2023-03-30 at 1 22 57 PM" src="https://user-images.githubusercontent.com/66704595/228943112-7d75af15-8d08-4070-ae7b-e6b510471adb.png">

On the House is a homemade food recipe aggregation web application inspired by the concept of online food recipe websites and blogs, while also implementing the features of popular forums such as Reddit. It would allow users to upload images and recipes of their own home cooked meals, while also providing the ability to comment and rate other users' meals based on an upvote and downvote function.

# Live Demo
On The House was deployed on Firebase and can be accessed [here](https://seng-401-on-the-house.web.app/).

# API Documentation

Postman was used to verify API endpoint functionality. Several test cases were executed to determine correct behavior, and ensure POST, GET, DELETE and PATCH requests were working as expected.

Please refer to the following documentation for the endpoints used on the project:

### 1. [Comments](https://documenter.getpostman.com/view/25807081/2s93RNzag2)
### 2. [Posts](https://documenter.getpostman.com/view/25807081/2s93RNzb8X)
### 3. [Users](https://documenter.getpostman.com/view/25807081/2s93RNzb8T)
### 4. [Upvotes](https://documenter.getpostman.com/view/25807081/2s93RNzb8Y)

# To Run Locally
### Note that proper authentication is required through `firebase login` in order to run locally
1. `cd frontend`
2. `npm i`
3. `npm start`
4. `cd backend/functions`
5. `firebase login`
6. `npm i`
7. `firebase serve -p 5001`
