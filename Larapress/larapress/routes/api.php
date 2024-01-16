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

