# Starting Client, Server and Databases

This readme describes how to:

1. Start Client Server
2. Start API Server
3. Combo Start
4. Install MongoDB Locally
5. Connecting to MongoDB Atlas Service
6. Seed the local and remote databases
7. Install Prettier
8. Use The Registration\Login API
9. Uploading to AWS S3
10. Mocha test configuration
11. Token authorization

## Start Client

1. Navigate to client directory
2. If you've pulled any code from gitHub run `npm install` to update any packages.
3. At the command line type:

    - `npm run start` to start your dev environment
    - `npm run test` to run your test suite (if one exists)
    - `npm run build` to build a production deploy copy of your code

## Start Server

1. Navigate to server directory
2. If you've pulled any code from gitHub run `npm install` to update any packages.
3. At the command line type:

    - `npm run dev` to start your dev environment using nodemon (will restart server whenever files change)
    - `npm run start` to run your server in production mode (uses node to load app.js)
    - `npm run test` to run tests in \server\src\test directory

## Combo Start

You can start both the client and server environments by running `npm run combo-start` from either the
server or client directory. This is a convenience script with minimal error checking (i.e. none) so if you run
into issues try starting each server independently to make sure there are no other issues.

You can likewise start the local db, client and server by running `npm run combo-start-all`.

## Installing MongoDB Locally

### Pre-requisites

1. Install MongoDB on your local machine, instructions can be found [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).
2. Install Compass to help you manage and explore your databases, instructions can be found [here](https://docs.mongodb.com/compass/master/install/).
3. Download the latest copy of dev from gitHub to make sure you have the latest files.

### Database password

At the moment there are no database passwords set up to connect to the database. This needs to be corrected in a future
fix but for now it works. I suggest that you do the same on your local copy. If you do add a password to your database
please update db-connect.js and config.js with the appropriate values.

Passwords should never be stored in config.js, add an environment variable similar to the one in place for the password
encryption.

### Configuration

The connection script for Mongo uses environment variables to find your local database. It defaults
to the following values:

| Environment | DB Name        | Host      | Port  | DB Type |
| :---------- | :------------- | :-------- | :---- | :------ |
| Development | evergreen_dev  | localhost | 27017 | mongodb |
| Test        | evergreen_test | localhost | 27017 | mongodb |

You can override these values by setting the following KEYS in .env:

| Environment | DB Name      | Host         | Port         | DB Type      |
| :---------- | :----------- | :----------- | :----------- | :----------- |
| Development | DEV_DB_NAME  | DEV_DB_HOST  | DEV_DB_PORT  | DEV_DB_TYPE  |
| Test        | TEST_DB_NAME | TEST_DB_HOST | TEST_DB_PORT | TEST_DB_TYPE |

These values are loaded into process.env.\${KEY} by the \server\config\config.sys script and can then be used anywhere they
are needed by importing config.js.

### Connecting to MongoDB

The default connection script \server\config\db-connect.js uses the values above to create a connection to your local
database. In order to use this connection add the following to your file:

```
import mongoose from "mongoose";
import _ from "./config/db-connect";

const db = mongoose.connection
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));
```

You can then add your code within the then() and catch() methods to accomplish what you need.

To test if the database connection is ready check the value of readyState, if === 1 then open, if === 0 then not ready :

```
db.readyState === 1
```

### Creating or Updating a Model

Models for the database are stored in \server\models and start with an uppercase. Models can contain validation and
type requirements. You can find more information on how to crate a model [here](https://docs.mongodb.com/manual/core/data-modeling-introduction/).

To update a model just make the changes you need and upload to gitHub and deal with any conflicts that might arise from
the merge. Avoid deleting or changing existing field names as this will more than likely break everything.

### Tests

Tests for db-connect.js and User.js can be found in server\test under the appropriate spec. 

To run the tests at the prompt within the \server directory type:

```
npm run test
```

This will run all the tests currently in the directory. Segregating these out into test suites is a job for future coders.

## Connecting to MongoDB Atlas Service

To connect to the remote instance of mongoDb add the following entries to your .env file:

```
REMOTE_DB_HOST="@cluster0-smgoh.mongodb.net"
REMOTE_DB_TYPE="mongodb+srv"
REMOTE_DB_USER=<user-name-you-set-up>
REMOTE_DB_PWD=<password associated with REMOTE_DB_USER>
REMOTE_DB_NAME="optioDB"
REMOTE_DB_OTHR="?retryWrites=true&w=majority"
```

If you want to connect to a separate cluster change the host name in REMOTE_DB_HOST (and associated user
and password).  If you want to change the database name change REMOTE_DB_NAME.

REMOTE_DB_OTHR and REMOTE_DB_TYPE should not be changed unless you know what you are doing.

Once you have this set up calling the db-connect.js script from within your code will check to see what
process.env.NODE_ENV is set to and if set to 'production' it will use the REMOTE_DB keys in .env.

Note that you can specify additional remote database by creating (and renaming) the REMOTE_DB set of keys
in .env and updating config.js to choose the right set of keys depending on what NODE_ENV is set to.  

More information about MongoDB Atlas can be found [here](https://www.mongodb.com/cloud/atlas).

## Prettier

Prettier is an opinionated code formatter that enforces common code styling guidelines across the team. Depending on
how you configure it you can either run it manually on specific files as you are working, or set it up to watch
for file changes and run on every change. Instructions for setting up watches is given below.

You can learn more about Prettier at [Prettier.io](https://prettier.io).

**Configuration**

Two settings have been changed from default:

```
{
  "tabWidth": 4,
  "jsxBracketSameLine": true
}
```

These options are managed via .prettierrc configuration file stored in the root directory for the project.

**Run Manually**

Instructions for running at the command line can be found [here](https://prettier.io/docs/en/cli.html). There are
multiple options that can be used, this example is used in the docs:

`prettier --single-quote --trailing-comma es5 --write "{app,__{tests,mocks}__}/**/*.js"`

The items in {} is a file search glob, the --write flag tells it to update the file and re-write it. The other options
enforce\change the applicable rules. Per the docs you may want to commit your code before running this manually.

**Configure Using a File Watcher**

To install Prettier on your machine pull the latest version of the [dev](https://github.com/hatchways/team-evergreen.git)
repository on GitHub, navigate to the root folder for your project and run `npm install`. Make sure
you are in the root folder, if you are in \server or \client you will end up doing an npm install for those folder.

To use Prettier you can configure your IDE to automatically watch for changes to files and update them
on change. Instructions for WebStorm can be found [here](https://www.jetbrains.com/help/webstorm/prettier.html),
for Visual Studio Code a guide can be found [here](https://www.codereadability.com/automated-code-formatting-with-prettier/)
(There doesn't seem to be a definitive VSC install guide, this is one that seemed complete but was not
able to test).

Alternatively if you don't want to modify your IDE a convenience script was added to the project root directory
package.json file. At the command prompt run `npm run prettier-watch`. As usual this is a convenience script
and some troubleshooting may be required for your environment. You need to start this script or automate it every
time you restart your laptop.

**Configure Using a Pre-Commit Hook**

There are additional methods to integrate Prettier into your workflow including configuring it as a
[pre-commit hook](https://prettier.io/docs/en/precommit.html) that will run before every new commit. This has not been
configured but you may want to look at it.

##Seed Database

Convenience scripts have been add to \server\package.json to add seed data to dev, test and prod environments.
Note that there is only one seed module and all environments will receive the same sort of random data.

If you need to create specific data for each environment you will need to modify the \src\helpers\seeddb.js module.

The following commands will seed the corresponding database:

```
npm run seed-remote
npm run seed-dev
npm run seed-test
```

The seed modules requires that your local api server be up and running so make sure its up and running or
run ```npm run dev```.

### Configuring How Data is Generated

A custom module is available in \server\helpers to seed the database. In order to use it
you need to add this entry to your .env file:

```
SAMPLE_USER_PWD="<password for users>"
```

As usual make sure you run npm install after downloading this script to make sure you have all the right packages.
Running the script in isolation requires several babel modules to be installed.

You can control the number of users generated, the friends per list, number of friends lists generated
and number of polls generated by setting the following constants in seeddb.js;

```
const NO_OF_USERS = 50;
const MAX_NO_OF_ADORNMENTS = 5; //Used in determining # of lists/polls to create/user
const MAX_NO_OF_FRIENDS_PER_LIST = 5;
```

Seeding will also cast votes aligned to the friends lists attached to the poll. The POLL_PERCENTAGE
constant is used to determine what percentage of the users in the lists will cast a vote. This should
mean that some users will not have cast a vote and will have polls in the My Friends polls view. The default
value for this constant is 4 but it can be changed to suit the type of data required.

```
const POLL_PERCENTAGE = 4; // 0 = 100%, 4 = 50%, 9 = 0%
```

## Authorization API

### Pre-requisites

1. Download the latest version of dev branch on gitHub.
2. Add an environment variable called PASSWORD_CRYPTO_KEY to your .env file. The value should be a string, it can be
   anything you want. You can generate a random string at https://randomkeygen.com or create your own. This value
   will be used to encrypt the user passwords in the database. If you change it after creating a user account, that
   account will stop working as the same key is used for encrypting and decrypting.
3. Install [postman](https://www.getpostman.com) to help you test the end points.
4. Launch the server by typing `npm run dev`, alternatively you can use `npm run combo-start` to launch both
   client and server but the api does not depend on the client code at all so unless you need both its not necessary.

### API Endpoints

The api makes two endpoints available for registration and login and will return a status code of 200 if successfull or
a json file with an error description if not successful.

When logging in successfully the end point will return the jwt token. This token needs to be stored and then used for all
future back end requests. Right now the token only returns the user.id field but we can add more items to the payload
if we find this is necessary.

The various error messages and validations can be found at:

-   \server\validation\register.js
-   \server\validation\login.js

Registration requires these fields {name, email, password, password2) to exist, not be empty and be the correct
format for their type; password and password2 need to match. Registration will return:

1. 400 status error codes if data is not valid - user not registered\not logged ing
2. 500 status error code if registration succeeded but jwt token could not be created - user registered\not logged in
3. 200 status - returns jwt - user is registered and logged in

Login requires these fields {email, password} to exist, not be empty, and be the correct format for their type; there
has to be a record for that email in the user database.

The actual routes for the endpoints are:

http://localhost:3001/api/users/login
http://localhost:3001/api/users/registration

The data needs to be passed as part of the post request.

### Tests

Test scripts fo the endpoint validation files can be found in server\test and are named login.validation.spec.js and
registration.validation.spec.js. These tests check to make sure the validations are setup correctly.

To test the end points use postman, choose the appropriate data type you want to use (form-data to pass in the url) or
(x-www.js-form-urlencoded which allows you to use a table to enter the data for end point you want to test). I've added
images for what this looks like in postman to the test directory.

## Uploading to S3

### Pre-requisites

In order to use the \server\routes\utils\S3Upload.js file you will need to create a profile with Amazon to
use the S3 service. You will need to provide a credit card but the rates are ridiculously low
and really only kick in for uploads of thousands's if not tens of thousands's of records. To create an account go to
[AWS Amazon Console](https://aws.amazon.com/console/) and register. Follow their instructions for sign up.

### Create and Configure Bucket

Once registered from within S3 create a bucket to hold your images and configure as follows:

-   Properties - none required but feel free to experiment
-   Permissions
    -   Public Access - Turn on Public Access
    -   Access Control List - Public Access\Everyone\List Objects - Yes
-   Bucket Policy - Leave Empty
-   CORS Configuration - Leave Default
-   Management - none required

### Create an IAM Account

Navigate to the IAM setup page (you can get there by clicking on the Services Drop Down menu of the S3 Console - search
for IAM) and create a new account.

### Create New Security Group

1. Go to Group folder and click on Create New Group - call it something relevant - I used evergreen-file-uploader
2. Attach AmazonS3FullAccess policy
3. Create Group
4. From the list of groups click the one you just created
5. Select the Permissions tab
6. Click on the drop down arrow next to Inline Policies and then choose to create one (via link)
7. Choose Custom Policy
    - name the policy PutObjectAcl
    - in the policy text area copy and paste the following policy:
    - ```
        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": [
                        "s3:PutObject",
                        "s3:PutObjectAcl"
                    ],
                    "Resource": "*"
                }
            ]
        }
      ```

### Create New User

1. Go to the Users folder and click Add User, follow the prompts. Use the following values for the various fields:
    - User Name - something unique that you will recognize(shows up in logs) - I used evergreen-robot
    - Access Type - Programmatic Access
2. Select the checkbox next to the group you just created (You should be on Add User to Group Tab)
3. Click on Next: Tags
4. Enter a tag if you want to track transactions (I chose Evergreen - this is not necessary)
5. Click on Next: Review
6. Make sure you like what you see and click on Create User

#\***\*\*\*\*\*\*** VERY IMPORTANT \***\*\*\*\*\*\*\***
Once the user is created you will be provided with the user security credentials. This is a one time opportunity so
download the csv and keep it somewhere secure (not in the project folder or it will\may get uploaded to GitHub). If for
some reason you lose this file, you can recreate the security credentials through the IAM portal.  
#\***\*\*\*\*\*\*** VERY IMPORTANT \***\*\*\*\*\*\*\***

### Create AWS Environment Variables

Create the following keys in your .env file:

```
AWS_ACCESS_KEY_ID=<from your user credentials file>
AWS_SECRET_ACCESS_KEY=<from your user credentials file>
AWS_IMAGES_BUCKET=<bucket name that you chose>
AWS_REGION=<region that you chose for your S3 service>
```

A note on the region value, in the S3 console you can see what region you chose but it is given in plain
english and is not the actual code that you need. For example my region is displayed as:

```
US-East(Ohio)
```

This is not the value you need for the region field. The actual value you need is a code that looks like:

```
us-east-2
```

You can find the list of codes [here](https://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region).

### Testing if this works

You can use the \upload route and postman to test if you are set up correctly.

1. Launch the dev server and mongoDB database
2. From postman go to the following route:
   http://localhost:3001/api/images/upload
3. Choose form-data and add at least one file
4. Send the request

If it worked properly you should get back a response with the url of the stored file.

### Final Notes

The files are named using a UUID, this is to guarantee filename uniqueness and to hide the details of
what's in the actual image. The images however are not encrypted in any way.

Even though we have set Public access it should not be possible for anyone besides an authorized account for
you buckets to upload a file. Everyone however should be able to read it. To test that this is the
case click on the url that you got back. If your image\file opens up you are good to go.

##Mocha Test Configuration

To define which directory to use for the tests you can change the file evergreen\test\mocha.opts to change which
directory to use for the tests.  To specify that all subdirectories be tested add the flag ```--recursive``` to the file
on a new line.

##Token Authorization

User authorization is done using the jwt protocol.  On login a token is created and passed back to the client.

On subsequent end-point requests the client returns the token in the ```Authorization``` header for all api requests.  
The header is set using the ```/client/src/utils/setAuthToken.js``` module and is called at startup, and by an event
listener attached to the App.js component that fires every time the jwtToken value in local storage is changed.  This ensures
that the latest copy of the token is always available for inclusion with the headers.

A middleware function in app.js intercepts all api requests and validates the supplied token:
    - if token is valid the request is fulfilled - no further action is taken
    - if token is not valid the request is denied and a status code of ```401``` is returned, along with the message
        "Unauthorized error"

This code is intercepted by the client using an axios interceptor defined in the ```/client/src/utils/axiosInterceptors.js```
module, if the status code is ```401``` localStorage is cleared and the user is logged out.  (Note:  all responses are
inspected by the interceptor, other centralized actions can be taken here if desired).

The ```src\routes\utils\routeAuthorization.js``` module provides two functions to manage jwt tokens:

1. isRequestAuthorized(token, secret, path) 
    - token - the actual token to be verified
    - secret - secret or key to verify token with
    - path - a string that indicates the url being called - used for logging purposes

    Returns true if verified, false if token is invalid or missing (also logs the error message).

2. createToken(payload, res, secret, expiration = TOKEN_LIFETIME )
    - payload - the data to encrypt with the token sent as a json object
    - res - the callback function to callback once token is created
    - secret - secret or key to verify token with 
    - expiration - lifetime of token in ms - defaults to a year

    Returns a jwt token.


