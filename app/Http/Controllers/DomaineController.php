<?php

namespace App\Http\Controllers;

use App\Models\Domaine;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class DomaineController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $this->authorize('viewAny', Domaine::class);
        return Inertia::render('Admin/Settings', [
            'activeTab' => 'domaines',
            'data' => Domaine::all()
        ]);
    }

    public function create()
    {
        $this->authorize('create', Domaine::class);
        return Inertia::render('Domaine/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('create', Domaine::class);
        $validated = $request->validate([
            'libelle' => 'required|string|max:150',
        ]);
        Domaine::create($validated);
        return redirect()->route('domaine.index')->with('success', 'Domaine créé avec succès.');
    }

    public function edit(Domaine $domaine)
    {
        $this->authorize('update', $domaine);
        return Inertia::render('Domaine/Edit', ['domaine' => $domaine]);
    }

    public function update(Request $request, Domaine $domaine)
    {
        $this->authorize('update', $domaine);
        $validated = $request->validate([
            'libelle' => 'required|string|max:150',
        ]);
        $domaine->update($validated);
        return redirect()->route('domaine.index')->with('success', 'Domaine mis à jour avec succès.');
    }

    public function destroy(Domaine $domaine)
    {
        $this->authorize('delete', $domaine);
        $domaine->delete();
        return redirect()->route('domaine.index')->with('success', 'Domaine supprimé avec succès.');
    }
}
