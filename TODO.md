###Registration
Add createuser function to user svc that calls login after user is created.  Then HTML form and Angular controller. 

###Logout
call function on ApplicationCtrl which deletes currentuser.
Delete JWt from the userSvc requests.

###Remember last user on the page.


#### Curl command
curl -X POST -d '{"username":"ADAM", "password":"pass"}' -H "Content-Type: application/json" localhost:3000/api/users
