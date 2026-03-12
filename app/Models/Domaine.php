<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Domaine extends Model
{
    use HasFactory;

    protected $table = 'domaines';

    protected $fillable = ['libelle'];

    public $timestamps = false;

    public function programmes()
    {
        return $this->hasMany(Programme::class);
    }
}
