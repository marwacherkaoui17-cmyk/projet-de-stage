<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Foret extends Model
{
    use HasFactory;

    protected $table = 'forets';

    protected $fillable = ['libelle', 'province_id'];

    public $timestamps = false;

    public function province()
    {
        return $this->belongsTo(Province::class);
    }
}
