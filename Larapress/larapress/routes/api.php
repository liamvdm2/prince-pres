<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth; //It allows you to handle authentication and authorization in your application.

// Models
use App\Models\User;
use App\Models\Comment;
use App\Models\Product;
use App\Models\Popular;



// Users

Route::get('/users', function (Request $request) {
    $results = DB::table('users')
        ->orderBy('created_at', 'desc')        // select * from products order by created_at desc and  
        ->paginate(10);                        // limit to 10 per page from newest to oldest so the app can run faster

    return response()->json($results);
});

// Register and login

Route::post('/users', function (Request $request) {

    $name = $request->name;
    $email = $request->email;
    $surname = $request->surname;
    $password = $request->password;
    $username = $request->username;


    $validatedData = $request->validate([
        'name' => 'required|max:255',
        'surname' => 'required|max:255',
        'email' => 'required|email|unique:users',     // email must be unique in users table
        'password' => 'required',                     // password is automatically hashed by Laravel
        'username' => 'required',
    ]);

    $user = User::create([
        'name' => $validatedData['name'],
        'surname' => $validatedData['surname'],
        'email' => $validatedData['email'],
        'password' => $validatedData['password'],
        'username' => $validatedData['username'],
        'updated_at' => now(),
        'created_at' => now(),
    ]);
    return response()->json(['message' => 'User created successfully'], 201);
});

Route::post('/login', function (Request $request) {
    $credentials = $request->only('username', 'password'); // we only need username and password for a login

    if (Auth::attempt($credentials)) {
        // Check if the user wants to be remembered
        if ($request->has('remember')) {
            // The 'remember' field was checked on the form
            Auth::login(Auth::user(), true);
        }
        return response()->json(['message' => 'Logged in successfully']);
    } else {
        // Authentication failed...
        return response()->json(['error' => 'Invalid credentials'], 401);
    }
});

// Comments

Route::get('/comments', function () {
    $results = DB::table('Comments')
        // Join the Comments table to the users table on the user_id field
        ->join('users', 'users.id', '=', 'Comments.user_id')
        // Select the username field from the users table and all fields from the Comments table
        ->select('users.username', 'Comments.*')
        ->get();

    $results = $results->map(function ($item) {
        // Remove the user_id field from the results so its better visible
        unset($item->user_id);
        // Convert the item to a collection and sort the keys so comment_id is first
        return collect($item)->sortKeys();
    });

    return response()->json($results);
});

route::post('/comments', function (Request $request) {

    $content = $request->content;

    $validatedData = $request->validate([
        'content' => 'required|max:255',
    ]);

    $comments = Comment::create([
        'content' => $validatedData['content'],
        'user_id' => Auth::id(), // gets the id of the currently logged in user
        'updated_at' => now(),
        'created_at' => now(),
    ]);
    return response()->json(['message' => 'Comment created successfully'], 201);
});





// Products


Route::get('/products', function (Request $request) {
    $results = DB::table('Products')
        ->join('Genres', 'Products.genre_id', '=', 'Genres.genre_id')
        ->select('Products.*', 'Genres.genre_name')
        ->paginate(15);
    return response()->json($results);
});

Route::post('/products', function (Request $request) {
    $title = $request->product_title;
    $desc = $request->product_desc;
    $author = $request->product_author;
    $genreId = $request->genre_id;
    $release = $request->product_release;

    $validatedData = $request->validate([
        'product_title' => 'required|max:255',
        'product_desc' => 'required|max:255',
        'product_author' => 'required|max:255',
        'genre_id' => 'required|exists:Genres,genre_id',
        'product_release' => 'required|date',
    ]);

    // Store the product in the database
    $products = Product::create([
        'product_title' => $validatedData['product_title'],
        'product_desc' => $validatedData['product_desc'],
        'product_author' => $validatedData['product_author'],
        'genre_id' => $validatedData['genre_id'],
        'product_release' => $validatedData['product_release'],
    ]);

    // Return a response
    return response()->json(['message' => 'Product added successfully'], 201);
});

// popularity

/* route::get('/popularity', function () {
    $results = DB::table('popularities')
        ->get();
    return response()->json($results);
}); */
