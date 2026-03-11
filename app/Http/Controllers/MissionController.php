<?php

namespace App\Http\Controllers;

use App\Models\Region;
use Inertia\Inertia;
use Illuminate\Http\Request;

class MissionController extends Controller
{
    public function index()
    {
        // Fetch all regions from database
        $regions = Region::all();

        // Render the React page and pass the regions as props
        return Inertia::render('Mission/Create', [
            'regions' => $regions
        ]);
    }
}