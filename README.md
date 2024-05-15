# APIs End Points

### Local Authetication APIs
```javascript
POST    /api/v1/auth/signup
POST    /api/v1/auth/signin
POST    /api/v1/auth/signout
```

### Social Strategies Authetication APIs
```javascript
GET     /api/v1/auth/google
GET     /api/v1/auth/facebook
GET     /api/v1/auth/github
```

### CRUD Cloud Operations APIs
```javascript
GET     /api/v1/cloud/
GET     /api/v1/cloud/:file_id
GET     /api/v1/cloud/backup
GET     /api/v1/cloud/backup/:file_id

PUT     /api/v1/cloud/private/:file_id
PUT     /api/v1/cloud/public/:file_id

POST    /api/v1/cloud/upload  
GET     /api/v1/cloud/download/:file_id 
PUT     /api/v1/cloud/rename/:file_id
DELETE  /api/v1/cloud/drop/:file_id
DELETE  /api/v1/cloud/destroy/:file_id  
```