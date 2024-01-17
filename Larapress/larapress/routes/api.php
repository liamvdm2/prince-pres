<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;




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
    $results = DB::table('users')->get();

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
        'email' => 'required|email|unique:users',
        'password' => 'required',
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
    $credentials = $request->only('username', 'password');

    if (Auth::attempt($credentials)) {
        // Authentication passed...
        return response()->json(['message' => 'Logged in successfully'], 200);
    } else {
        // Authentication failed...
        return response()->json(['message' => 'Invalid username or password'], 401);
    }
});

// temp token routes
/* Route::post('/tokens/create', function (Request $request) {
    $user = User::find(1);
   
    
    return ['token' => $token->plainTextToken];

    
    $user::where('id', 1)->update(['remember_token' => $token->plainTextToken]);
}); */
