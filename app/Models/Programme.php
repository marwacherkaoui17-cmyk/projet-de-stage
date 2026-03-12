<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Programme extends Model
{
    use HasFactory;

    protected $table = 'programmes';

    protected $fillable = ['nom_programme', 'description', 'domaine_id'];

    public $timestamps = false;

    public function domaine()
    {
        return $this->belongsTo(Domaine::class);
    }
}
