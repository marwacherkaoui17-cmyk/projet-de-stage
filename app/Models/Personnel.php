<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personnel extends Model
{
    use HasFactory;

    protected $table = 'personnels';
    protected $primaryKey = 'id_personnel';
    protected $fillable = ['nom', 'prenom', 'email', 'telephone', 'id_service', 'id_province'];
    public $timestamps = false;

    public function service()
    {
        return $this->belongsTo(Service::class, 'id_service', 'id_service');
    }

    public function province()
    {
        return $this->belongsTo(Province::class, 'id_province', 'id_province');
    }
}
