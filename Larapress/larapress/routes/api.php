<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;



Route::get('/comments', function () {
    $results = DB::table('Comments')
        ->select([
            'comment_id',
            'id',
            'like',
            'content',
            'comment_date',
        ])
        ->get();
    return response()->json($results);
});


Route::get('/users', function (Request $request) {
    $results = DB::table('users')->get();       // SELECT * FROM users is query in SQL

    return response()->json($results);
});



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
    $credentials = $request->only('username', 'password'); // we need only username and password from the request

    if (Auth::attempt($credentials, true)) {
        $user = User::create([
            'username' => $request->username,
            'password' => $request->password,
        ]);

        $rememberToken = $user->createToken('remember_me');
        $user->rememberToken = $rememberToken->token;
        $user->save();

        return response()->json(['message' => 'Logged in successfully'], 200); // Authentication passed
    } else {
        return response()->json(['message' => 'Invalid username or password'], 401); // Authentication failed
    }
});

Route::get('/logout', function () {
    Auth::logout();

    $user = User::find(Auth::user()->id);
    if ($user) {
        $user->rememberToken = null;
        $user->save();
    }

    return redirect('/');
});



Route::get('/products', function (Request $request) {
    $results = DB::table('Products')->get();       // SELECT * FROM products is query in SQL

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
