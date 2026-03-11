<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;

    protected $table = 'provinces';
    protected $primaryKey = 'id_province';
    protected $fillable = ['nom_province', 'id_region'];
    public $timestamps = false;

    public function region()
    {
        return $this->belongsTo(Region::class, 'id_region', 'id_region');
    }
}
