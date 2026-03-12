<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personnel extends Model
{
    use HasFactory;

    protected $table = 'personnels';

    protected $fillable = ['nom', 'email', 'telephone', 'service_id'];

    public $timestamps = false;

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function missions()
    {
        return $this->belongsToMany(Mission::class, 'teams');
    }
}
