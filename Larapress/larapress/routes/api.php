<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth; //It allows you to handle authentication and authorization in your application.

// Models
use App\Models\User;
use App\Models\Comment;
use App\Models\Product;
use App\Models\Wishlist;
use App\Models\Genre;
// Users

Route::get('/users', function (Request $request) {
    $results = DB::table('users')
        ->orderBy('created_at', 'desc')        // select * from products order by created_at desc and  
        ->paginate(10);                        // limit to 10 per page from newest to oldest so the app can run faster

    return response()->json($results);
});

Route::delete('/users/{username}', function ($username) {       // be careful with this route as it will delete all comments and user info associated with the user
    $user = User::where('username', $username)->first();

    if ($user) {
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    } else {
        return response()->json(['error' => 'User not found'], 404);
    }
});

Route::put('/users/{id}', function ($id, Request $request) {

    $user = User::find($id);

    if ($user) {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'surname' => 'required|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'required',
            'username' => 'required',
        ]);

        $user->update($validatedData);

        return response()->json(['message' => 'User updated successfully']);
    } else {
        return response()->json(['error' => 'User not found'], 404);
    }
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

Route::delete('/comments/{id}', function ($id) {        // user can delete his comment or the admin can
    $comment = Comment::find($id);

    if ($comment) {
        // Check if the current user is the comment's owner or an admin
        if (Auth::id() === $comment->user_id /* || Auth::user()->isAdmin() */) {
            $comment->delete();
            return response()->json(['message' => 'Comment deleted successfully']);
        } else {
            return response()->json(['error' => 'You do not have permission to delete this comment'], 403);
        }
    } else {
        return response()->json(['error' => 'Comment not found'], 404);
    }
});

// we dont use update route for comments because we dont want to be able to edit comments





Route::get('/products', function (Request $request) {
    $results = DB::table('products')->get();       // SELECT * FROM products is query in SQL
});


// Products

Route::post('/products', function (Request $request) {
    $title = $request->product_title;
    $desc = $request->product_desc;
    $type = $request->product_type;
    $author = $request->product_author;
    $genreId = $request->genre_id;
    $release = $request->product_release;
    $cover = $request->product_cover;
    $available = $request->available_at;



    /*   if (!preg_match('/^data:image\/(\w+);base64,(.+)$/', $cover, $matches)) {
        return response()->json(['message' => 'Invalid image data'], 422);
    } */

    // Store the product in the database
    $products = Product::create([
        'product_title' => $title,
        'product_desc' => $desc,
        'product_type' => $type,
        'product_author' => $author,
        'genre_id' => $genreId,
        'product_release' => $release,
        'product_cover' => $cover,
        'available_at' => $available
    ]);

    // Return a response
    return response()->json(['message' => 'Product added successfully'], 201);
});

Route::get('/products', function (Request $request) {
    $results = DB::table('products')
        ->join('Genres', 'Products.genre_id', '=', 'Genres.id')
        ->select('Products.*', 'Genres.genre_name') 
        ->get();
    return response()->json($results);
});

Route::put('/products/{id}', function ($id, Request $request) {
    $product = Product::find($id);
    if(!$product){
        return response()->json(['message' => 'Product not found'], 404);
    }

    $product->update([
        'product_title' => $request->product_title,
        'product_desc' => $request->product_desc,
        'product_type' => $request->product_type,
        'product_author' => $request->product_author,
        'genre_id' => $request->genre_id,
        'product_release' => $request->product_release,
        'product_cover' => $request->product_cover,
        'available_at' => $request->available_at
    ]);

    return response()->json(['message' => 'Product updated successfully'], 200);
});


Route::delete('/products/{id}', function ($id) {
    $product = Product::find($id);
    if(!$product){
        return response()->json(['message' => 'Product not found'], 404);
    }

    $product->delete();

    return response()->json(['message' => 'Product deleted successfully'], 200);
});

// wishlist

Route::get('/wishlist/{username}', function ($username) {
    // Fetch the user whose username matches the {username} parameter
    $user = DB::table('users')->where('username', $username)->first();
    // If the user does not exist, return a error
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }
    // Fetch all wishlist items associated with this user
    // Join the wishlist and products tables based on the condition wishlist.product_id equals 'products.product_id'
    // Select all fields from the 'wishlist' table and the 'product_title', 'product_desc', and 'product_author' fields from the 'products' table
    $wishlistItems = DB::table('wishlist')
        ->where('user_id', $user->id)
        ->join('products', 'wishlist.product_id', '=', 'products.id')
        ->select('wishlist.*', 'products.product_title', 'products.product_desc', 'products.product_author')
        ->get();
    return response()->json($wishlistItems);
});

// Define the POST endpoint for adding a product to a user's wishlist
Route::post('/wishlist/{username}/{product_id}', function ($username, $product_id) {
    // Fetch the user whose username matches the {username} parameter
    $user = DB::table('users')->where('username', $username)->first();
    // If the user does not exist, return an error
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }
    $product = DB::table('products')->where('product_id', $product_id)->first();
    // If the product does not exist, return a  error
    if (!$product) {
        return response()->json(['message' => 'Product not found'], 404);
    }
    // Insert a new wishlist item linking this user and product
    $wishlistItem = DB::table('wishlist')->insert([
        'user_id' => $user->id,
        'product_id' => $product->product_id
    ]);
    // Return a success message as a JSON response
    return response()->json(['message' => 'Product added to wishlist successfully'], 201);
});

Route::delete('/wishlist/{username}/{product_id}', function ($username, $product_id) {
    // Fetch the user whose username matches the {username} parameter
    $user = DB::table('users')->where('username', $username)->first();
    // If the user does not exist, return an error
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }
    // Remove the wishlist item linking this user and product
    $removed = DB::table('wishlist')
        ->where('user_id', $user->id)
        ->where('product_id', $product_id)
        ->delete();
    // If no rows were deleted, return an error
    if ($removed == 0) {
        return response()->json(['message' => 'No such wishlist item'], 404);
    }
    // Return a success message as a JSON response
    return response()->json(['message' => 'Product removed from wishlist successfully']);
});


// here we also dont use update because we update already the wishlist with the create and delete


// CRUD genres

Route::post('/genres', function (Request $request) {

    $genreName = $request->input('genre_name');

    $newGenre = Genre::create([
        'genre_name' => $genreName,
        'updated_at' => now(),
        'created_at' => now(),
    ]);

    return response()->json(['message' => 'Genre created successfully'], 201);
});

Route::get('/genres', function (Request $request) {
    $genres = DB::table('Genres')->get();
    return response()->json($genres);

});



Route::put('/genres/{id}', function (Request $request, $id) { // not working yet
    $validatedData = $request->validate([
        'name' => 'required|max:255',
    ]);

    $genre = Genre::find($id);

    if ($genre) {
        $genre->update($validatedData);
        return response()->json(['message' => 'Genre updated successfully', 'data' => $genre]);
    } else {
        return response()->json(['error' => 'Genre not found'], 404);
    }
});

Route::delete('/genres/{id}', function ($id) {
    $genre = Genre::find($id);

    if ($genre) {
        $genre->delete();
        return response()->json(['message' => 'Genre deleted successfully']);
    } else {
        return response()->json(['error' => 'Genre not found'], 404);
    }
});

