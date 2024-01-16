<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Hash;




Route::get('/comments', function () {
    $results = DB::table('Comments')
        ->select([
            'comment_id',
            'user_id',
            'like',
            'content',
            'comment_date',
        ])
        ->get();
    return response()->json($results);
});


Route::get('/users', function (Request $request) {
    $results = DB::table('Users')
        ->select([
            'user_id',
            'name',
            'surname',
            'email',
            'password',
            'birthday',
        ])
        ->get();

    return response()->json($results);
});



Route::post('/users', function (Request $request) {

    $name = $request->name;
    $email = $request->email;
    $password = $request->password;
    $username = $request->username;
    $birthday = $request->birthday;
    $surname = $request->surname;

    $validatedData = $request->validate([
        'name' => 'required|max:255',
        'email' => 'required|email|unique:users',
        'surname' => 'required|max:255',
        'password' => 'required',
        'username' => 'required',
        'birthday' => 'required',
    ]);

    $user = User::create([
        'name' => $validatedData['name'],
        'surname' => $validatedData['surname'],
        'email' => $validatedData['email'],
        'password' => Hash::make($validatedData['password']), // Hash the password before storing it
        'username' => $validatedData['username'],
        'birthday' => $validatedData['birthday'],
    ]);
    DB::insert('INSERT INTO Users (name, email, surname, password, username, birthday) VALUES (?, ?, ?, ?, ?, ?)', [$name, $email, $surname ,$password, $username, $birthday]);
    return response()->json(['message' => 'User created successfully'], 201);
});

// temp token routes
/* Route::post('/tokens/create', function (Request $request) {
    $user = User::find(1);
   
    $token = $user->createToken('mynewtoken');
    return ['token' => $token->plainTextToken];

    
    $user::where('id', 1)->update(['remember_token' => $token->plainTextToken]);
}); */
