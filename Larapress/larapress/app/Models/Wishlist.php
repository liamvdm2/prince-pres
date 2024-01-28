<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    use HasFactory;

    protected $fillable =  [
       'user_id', 
        'wishlist_id',
    ];

    protected $table = 'Wishlists';
}