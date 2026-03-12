<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MissionEssence extends Model
{
    protected $table = 'mission_essences';

    protected $fillable = ['mission_id', 'essence_id'];

    public $timestamps = false;
}
