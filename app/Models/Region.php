<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    use HasFactory;

    // Table name in database
    protected $table = 'regions';

    // Primary key
    protected $primaryKey = 'id_region';

    // Columns that can be filled
    protected $fillable = ['nom_region'];

    // Disable timestamps since we didn't add them in migration for this table
    public $timestamps = false;
}