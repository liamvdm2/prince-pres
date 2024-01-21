<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable =  [
        'product_title',
        'product_desc',
        /*  'product_release', */
        'product_author',
        'genre_id',
    ];

    protected $table = 'Products';
    public $timestamps = false;
}
