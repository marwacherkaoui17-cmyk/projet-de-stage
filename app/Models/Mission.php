<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mission extends Model
{
    use HasFactory;

    protected $table = 'missions';
    protected $primaryKey = 'id_mission';
    protected $fillable = [
        'titre', 
        'description', 
        'date_debut', 
        'date_fin', 
        'statut', 
        'id_service', 
        'id_province', 
        'id_programme', 
        'id_domaine', 
        'id_chef'
    ];

    public function service()
    {
        return $this->belongsTo(Service::class, 'id_service', 'id_service');
    }

    public function province()
    {
        return $this->belongsTo(Province::class, 'id_province', 'id_province');
    }

    public function programme()
    {
        return $this->belongsTo(ProgrammeRecherche::class, 'id_programme', 'id_programme');
    }

    public function domaine()
    {
        return $this->belongsTo(DomaineRecherche::class, 'id_domaine', 'id_domaine');
    }

    public function chef()
    {
        return $this->belongsTo(User::class, 'id_chef', 'id_user');
    }

    public function personnels()
    {
        return $this->belongsToMany(Personnel::class, 'mission_personnel', 'id_mission', 'id_personnel');
    }

    public function essences()
    {
        return $this->belongsToMany(Essence::class, 'mission_essence', 'id_mission', 'id_essence');
    }
}
