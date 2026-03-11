<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DomaineRecherche extends Model
{
    use HasFactory;

    protected $table = 'domaine_recherches';
    protected $primaryKey = 'id_domaine';
    protected $fillable = ['nom_domaine', 'description', 'id_service'];
    public $timestamps = false;

    public function service()
    {
        return $this->belongsTo(Service::class, 'id_service', 'id_service');
    }
}
