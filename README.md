# User Service (Altar)  
The CRUD for the user data associated with the usernames  
## Internal  
Build with `express` and `mongoose`   
## Hosting  
Hosted on Heroku as `volunteero-altar`: https://volunteero-altar.herokuapp.com/altar/v1/users  
## Routes  
**POST**: `../altar/v1/users`  
purpose: create a new user entry  
body in: (_request_)    
```
{
	"username":"dafoe5",
	"first_name":"Friend"
  ...
}
```   
body out: (_response_)  
```
{
	"success": true,
	"user": {
		"username": "dafoe2",
		"first_name": "Friend",
		"last_name": "",
		"email": "",
		"city": "",
		"country": "",
		"bio": ""
	}
}
```     
  
**PUT**: `../altar/v1/users`  
purpose: update a user  
body in: (_request_)    
```
{
	"username":"dafoe5",   # points to the user
	"first_name":"Friend", # the updated fields
	"last_name":"Dafoe"    #
}
```   
body out: (_response_)  
```
{
	"success": true,
	"user": {
		"username": "dafoe5",
		"first_name": "Friend",
		"last_name": "Dafoe",
		"email": "",
		"city": "",
		"country": "",
		"bio": ""
	}
}
```    
  
**GET**: `../altar/v1/users`    
purpose: get all the users  
body out: (_response_)  
```
[
	{
		"username": "bobski",
		"first_name": "Bob",
		"last_name": "Ski",
		"email": "",
		"city": "Paris",
		"country": "USA",
		"bio": ""
	},
  ...
]
```
  
**PUT**: `../altar/v1/users/find`    
purpose: find a user by request  
body in: (_request_)  
```
{
	"username":"dafoe5"  
}
``` 
body out: (_response_)  
```
{
	"username": "dafoe5",
	"first_name": "Friend",
	"last_name": "",
	"email": "",
	"city": "",
	"country": "",
	"bio": ""
}
```  
  
**PUT**: `../altar/v1/users/delete`      
purpose: find a user by request  
body in: (_request_)  
```
{
	"username":"dafoe5"
}
``` 
body out: (_response_)  
```
{
	"success": true,
}
```

**POST**: `../altar/v1/users/:username/confirmEventParticipation`      
purpose: add points to a user
body in: (_request_)  
```
{
	"points": 123
}
``` 
body out: (_response_)  
```
{
	"newPoints": 223,
}
```
