We create an API using node js, express js, and MongoDB with the following structure ---
Routes:
/posts
GET: to get posts (should be only available for logged-in users) (pass token via Authorization header.)
POST: to create posts
DELETE: to delete posts (should be only available for creators of post)
PUT: to update posts (should be only available for creators of post)

/users
GET: to get users
POST: to create users
DELETE: to delete users
PUT: to update users

Schema ---&gt;
posts - { createdBy: ObjectId(userId), createdAt, updatedAt, message, comments: [{ sentBy:
ObjectId(userId), sentAt, liked: [ObjectId(userId)] }] }
users - {name, email (unique), mobile, password(hashed) }
