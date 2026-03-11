<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgrammeRecherche extends Model
{
    use HasFactory;

    protected $table = 'programme_recherches';
    protected $primaryKey = 'id_programme';
    protected $fillable = ['nom_programme', 'description', 'id_domaine', 'id_service'];
    public $timestamps = false;

    public function domaine()
    {
        return $this->belongsTo(DomaineRecherche::class, 'id_domaine', 'id_domaine');
    }

    public function service()
    {
        return $this->belongsTo(Service::class, 'id_service', 'id_service');
    }
}
