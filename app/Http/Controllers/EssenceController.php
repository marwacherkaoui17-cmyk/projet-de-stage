<?php

namespace App\Http\Controllers;

use App\Models\Essence;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class EssenceController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $this->authorize('viewAny', Essence::class);
        return Inertia::render('Admin/Settings', [
            'activeTab' => 'essences',
            'data' => Essence::all()
        ]);
    }

    public function create()
    {
        $this->authorize('create', Essence::class);
        return Inertia::render('Essence/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('create', Essence::class);
        $validated = $request->validate([
            'nom_essence' => 'required|string|max:150',
            'description' => 'nullable|string',
        ]);
        Essence::create($validated);
        return redirect()->route('essence.index')->with('success', 'Essence créée avec succès.');
    }

    public function edit(Essence $essence)
    {
        $this->authorize('update', $essence);
        return Inertia::render('Essence/Edit', ['essence' => $essence]);
    }

    public function update(Request $request, Essence $essence)
    {
        $this->authorize('update', $essence);
        $validated = $request->validate([
            'nom_essence' => 'required|string|max:150',
            'description' => 'nullable|string',
        ]);
        $essence->update($validated);
        return redirect()->route('essence.index')->with('success', 'Essence mise à jour avec succès.');
    }

    public function destroy(Essence $essence)
    {
        $this->authorize('delete', $essence);
        $essence->delete();
        return redirect()->route('essence.index')->with('success', 'Essence supprimée avec succès.');
    }
}
