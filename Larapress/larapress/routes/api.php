<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;






Route::get('/users', function () {
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

/* Route::get('/users/{id}', function ($id) {          example code for a single user
    $results = DB::table('Users') 
        ->select([
            'user_id',
            'name',
            'surname',
            'email',
            'password',
            'birthday',
        ])
        ->where('user_id', $id)
        ->get();
}); */

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