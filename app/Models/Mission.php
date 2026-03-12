<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mission extends Model
{
    use HasFactory;

    protected $table = 'missions';

    protected $fillable = [
        'description', 
        'date_debut', 
        'date_fin', 
        'statut', 
        'service_id', 
        'programme_id', 
        'commune_id', 
        'foret_id'
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function programme()
    {
        return $this->belongsTo(Programme::class);
    }

    public function commune()
    {
        return $this->belongsTo(Commune::class);
    }

    public function foret()
    {
        return $this->belongsTo(Foret::class);
    }

    public function personnels()
    {
        return $this->belongsToMany(Personnel::class, 'teams');
    }

    public function essences()
    {
        return $this->belongsToMany(Essence::class, 'mission_essences');
    }
}
