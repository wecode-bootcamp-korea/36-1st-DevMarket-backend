# Indroduction

프로젝트 기간동안 배민상회 웹페이지 구현해보기.

## Development

* 개발기간   : 2022/08/16 ~ 2022/08/26
* 개발인원   : 6 명
* Frontend : 하서율, 임승민, 정원호, 함정석
* Backend  : 정세한, 최종민
* Backend 깃허브 주소 : (https://github.com/wecode-bootcamp-korea/36-1st-DevMarket-backend)
* FrontEnd 깃허브 주소 : (https://github.com/wecode-bootcamp-korea/36-1st-DevMarket-frontend)

## Skill

|                                                Language                                                	|                                                   Framework                                                  	|                                                Database                                                	
|:------------------------------------------------------------------------------------------------------:	|:------------------------------------------------------------------------------------------------------------:	|:------------------------------------------------------------------------------------------------------:	
| ![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) 	| ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) 	| ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white) 	

## Database

![스크린샷 2022-08-25 오후 11 25 28](https://user-images.githubusercontent.com/81615965/187064293-32162714-03d0-4521-9c6d-53acf4cdb916.png)

## Implement

## SignIn / SignUp
https://youtu.be/DxVDubUYC4E

### Product List (GET)
https://youtu.be/DQBhxa3uYYo

### Product Detail (GET)
https://youtu.be/6D0jun1-sa4

### Cart (GET, POST, PATCH, DELETE)
![장바구니  상세페이지 이동](https://user-images.githubusercontent.com/81615965/187064408-90c96016-5121-4fa6-91ea-822e8b0791d4.gif)
![장바구니  수량 선택](https://user-images.githubusercontent.com/81615965/187064409-f3e60037-b674-40b0-8fef-6526b6b9b1b2.gif)
![장바구니  제품 선택](https://user-images.githubusercontent.com/81615965/187064410-c4d447b9-4b89-4105-b004-f73f09432451.gif)
![장바구니  삭제기능](https://user-images.githubusercontent.com/81615965/187064411-db19844a-60d3-4974-a2e5-0850072f4058.gif)
![장바구니  상품등록](https://user-images.githubusercontent.com/81615965/187064412-d3fcbaef-0087-40f5-bf4d-0feb895f9ff3.gif)

### Review
![상세페이지 리뷰](https://user-images.githubusercontent.com/81615965/187064420-6d454286-1173-4bd4-a044-28e05af3e97d.gif)

## APIs

### User

|   End point   	| HTTP Method 	| Description 	| Status 	|
|:-------------:	|:-----------:	|:-----------:	|:------:	|
|  /users/signup 	|     POST    	|   회원가입  	|  201  	|
| /users/signin 	|     POST    	|    로그인   	|  200  	|
| /users/info 	|     GET    	|    유저 상세정보   	|  200  	|

### Product (With Review)

|          End point         	| HTTP Method 	| Description 	| Status 	|
|:--------------------------:	|:-----------:	|:-----------:	|:------:	|
|          /products/all         	|     GET     	| 제품 전체 리스트 조회 	|  200  	|
| /products/acending 	|     GET     	|  전체 제품 오름차순 조회 	|  200  	|
|          /products/descending         	|     GET     	| 전체 제품 내림차순 조회 	|  200  	|
|          /products/list         	|     GET     	| 제품 카테고리별 조회 	|  200  	|
|          /products/cart         	|     POST     	| (상품 상세 페이지에서) 제품 장바구니에 추가	|  201  	|
|          /products/detail/:productId         	|     GET     	| 제품 상세 조회 	|  200  	|
|          /:products/reviews         	|     GET     	| 제품 리뷰 조회 	|  200  	|
|          /:products/reviews         	|     POST     	| 제품 리뷰 등록 	|  201  	|
|          /reviews/:reviewId         	|     DELETE     	| 제품 리뷰 삭제 	|  200  	|
|          /reviews/:reviewId         	|     PATCH     	| 제품 리뷰 수정 	|  200  	|

### CART

|                    End point                   	| HTTP Method 	|     Description     	| Status 	|
|:----------------------------------------------:	|:-----------:	|:-------------------:	|:------:	|
|        /cart/list        	|  GET  	| 카트 내 상품 리스트 조회 	|  200  	|
|        /cart/product        	|  POST  	| 카트에 상품 추가 	|  201  	|
|        /cart/        	|  DELETE  	| 카트 상품 삭제 	|  200  	|
|        /cart/amount        	|  PATCH  	| 카트 내 상품 수량 수정 	|  201  	|