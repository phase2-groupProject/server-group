# Moodbuster

## User

### Sign Up
    Explanation     : Register as new User.
    Method || URl   : POST || /user/register 
    Response        :
        1. success      : status(201) ||  { name, email, password(hashed) }
        2. error        : status(404) ||  { message: validation error }
    Input Format    :
        1. name         : string
        2. email        : string
        3. password     : string
   
### Sign In
    Explanation     : Sign in to your registered account. 
    Method || URl   : POST || /user/signIn
    Response        :
        1. success      : status(200) ||  { token }
        2. error        : status(404) ||  { message: Invalid Username or password }
    Input Format    : 
        1. email        : string
        2. password     : string

### Google Sign In
    Explanation     : Sign in to your registered account.
    Response        :
        1. success      : status(200) ||  { token }
        2. error        : status(500) ||  { message: server error }
    Method || URl   : POST || /user/gsignIn

##List

##IMPORTANT!!!

    To do use endpoint below, you must register and sign first. After that the copy the token you get after sign-in to the all headers in movie action. 

### checkMoodAndGetMovieList
    Explanation     : Check your current mood and fetch 6 suggestions movies base on your current mood.
    Method || URl   : POST || /movie
    Response        :
        1. success      : status(200) ||  { kumpulan, mood }
        2. error        : status(500) ||  { message: server error }
    Input Format    : 
        1. text         : string

### GetTrailer
    Explanation     : Check your current mood and fetch 6 suggestions movies base on your current mood.
    Method || URl   : GET/:name || /movie
    Response        :
        1. success      : status(200) ||  { data.items[0].id.videoId }
        2. error        : status(500) ||  { message: server error }
    Input Format    : 
        1. req.params.name  : string

## responseTable
|               Route            | Method | headers() |              Success Response           |                    Error Response               |
| http://localhost/user/register | POST   | --------- | 201 | { name, email, password(hashed) } | 404 | { message: validation error }             |
| http://localhost/user/signIn   | POST   | --------- | 200 |            { token }              | 404 | { message: Invalid password or username } |
| http://localhost/user/gsignI   | POST   | --------- | 200 |            { token }              | 500 |     { message: Internal server error }    |
| http://localhost//movie        | POST   |   token   | 200 |        { kumpulan, mood }         | 500 |     { message: Internal server error }    | 
| http://localhost/user/signIn   | GET    |   token   | 200 |    { data.items[0].id.videoId }   | 500 |     { message: Internal server error }    |
