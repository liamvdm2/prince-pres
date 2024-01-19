<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth; //It allows you to handle authentication and authorization in your application.

// Models
use App\Models\Product;
use App\Models\User;
use App\Models\Comment;
use App\Models\Popular;


// Comments

Route::get('/comments', function () {
    $results = DB::table('Comments')
        ->paginate(10);
    return response()->json($results);
});

route::post('/comments', function (Request $request) {

    $content = $request->content;

    $validatedData = $request->validate([
        'content' => 'required|max:255',
    ]);

    $comments = Comment::create([
        'content' => $validatedData['content'],
        'updated_at' => now(),
        'created_at' => now(),
    ]);
    return response()->json(['message' => 'Comment created successfully'], 201);
});




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



// Products

Route::get('/products', function (Request $request) {
    $results = DB::table('Products')
        ->paginate(15);
    return response()->json($results);
});

Route::post('/products', function (Request $request) {
    $title = $request->product_title;
    $desc = $request->product_desc;
    /* $release = $request->product_release; */
    $author = $request->product_author;

    $validatedData = $request->validate([
        'product_title' => 'required|max:255',
        'product_desc' => 'required|max:255',
        /* 'product_release' => 'required|date', */
        'product_author' => 'required|max:255',
    ]);


    // Store the product in the database
    $products = Product::create([
        'product_title' => $validatedData['product_title'],
        'product_desc' => $validatedData['product_desc'],
        /* 'product_release' => $validatedData['product_release'], */
        'product_author' => $validatedData['product_author'],

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
