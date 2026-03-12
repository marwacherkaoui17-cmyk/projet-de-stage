<?php

namespace App\Http\Controllers;

use App\Models\Mission;
use App\Models\Service;
use App\Models\Programme;
use App\Models\Commune;
use App\Models\Foret;
use App\Models\Personnel;
use App\Models\Essence;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class MissionController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $this->authorize('viewAny', Mission::class);

        return Inertia::render('Mission/Index', [
            'missions' => Mission::with(['service', 'programme', 'commune', 'foret', 'personnels', 'essences'])->get(),
            'services' => Service::all(),
            'programmes' => Programme::all(),
            'communes' => Commune::all(),
            'forets' => Foret::all(),
            'personnels' => Personnel::all(),
            'essences' => Essence::all(),
        ]);
    }

    public function create()
    {
        $this->authorize('create', Mission::class);

        return Inertia::render('Mission/Create', [
            'services' => Service::all(),
            'programmes' => Programme::all(),
            'communes' => Commune::all(),
            'forets' => Foret::all(),
            'personnels' => Personnel::all(),
            'essences' => Essence::all(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Mission::class);

        $validated = $request->validate([
            'description' => 'nullable|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'statut' => 'required|in:Validee,Annulee',
            'service_id' => 'required|exists:services,id',
            'programme_id' => 'nullable|exists:programmes,id',
            'commune_id' => 'nullable|exists:communes,id',
            'foret_id' => 'nullable|exists:forets,id',
            'personnel_ids' => 'required|array',
            'personnel_ids.*' => 'exists:personnels,id',
            'essence_ids' => 'required|array',
            'essence_ids.*' => 'exists:essences,id',
        ]);

        $mission = Mission::create($validated);
        $mission->personnels()->sync($request->personnel_ids);
        $mission->essences()->sync($request->essence_ids);

        return redirect()->route('mission.index')->with('success', 'Mission créée avec succès.');
    }

    public function show(Mission $mission)
    {
        $this->authorize('view', $mission);

        return Inertia::render('Mission/Show', [
            'mission' => $mission->load(['service', 'programme', 'commune', 'foret', 'personnels', 'essences'])
        ]);
    }

    public function edit(Mission $mission)
    {
        $this->authorize('update', $mission);

        return Inertia::render('Mission/Edit', [
            'mission' => $mission->load(['personnels', 'essences']),
            'services' => Service::all(),
            'programmes' => Programme::all(),
            'communes' => Commune::all(),
            'forets' => Foret::all(),
            'personnels' => Personnel::all(),
            'essences' => Essence::all(),
        ]);
    }

    public function update(Request $request, Mission $mission)
    {
        $this->authorize('update', $mission);

        $validated = $request->validate([
            'description' => 'nullable|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'statut' => 'required|in:Validee,Annulee',
            'service_id' => 'required|exists:services,id',
            'programme_id' => 'nullable|exists:programmes,id',
            'commune_id' => 'nullable|exists:communes,id',
            'foret_id' => 'nullable|exists:forets,id',
            'personnel_ids' => 'required|array',
            'personnel_ids.*' => 'exists:personnels,id',
            'essence_ids' => 'required|array',
            'essence_ids.*' => 'exists:essences,id',
        ]);

        $mission->update($validated);
        $mission->personnels()->sync($request->personnel_ids);
        $mission->essences()->sync($request->essence_ids);

        return redirect()->route('mission.index')->with('success', 'Mission mise à jour avec succès.');
    }

    public function destroy(Mission $mission)
    {
        $this->authorize('delete', $mission);

        $mission->delete();

        return redirect()->route('mission.index')->with('success', 'Mission supprimée avec succès.');
    }
}