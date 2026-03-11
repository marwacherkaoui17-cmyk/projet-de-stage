<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Historique extends Model
{
    use HasFactory;

    protected $table = 'historiques';
    protected $primaryKey = 'id_historique';
    protected $fillable = [
        'table_concernee', 
        'id_enregistrement', 
        'action', 
        'ancienne_valeur', 
        'nouvelle_valeur', 
        'id_user'
    ];
    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }
}
