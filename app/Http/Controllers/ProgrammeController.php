<?php

namespace App\Http\Controllers;

use App\Models\Programme;
use App\Models\Domaine;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ProgrammeController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $this->authorize('viewAny', Programme::class);
        return Inertia::render('Admin/Settings', [
            'activeTab' => 'programmes',
            'data' => Programme::with('domaine')->get(),
            'domaines' => Domaine::all() // Added for modal
        ]);
    }

    public function create()
    {
        $this->authorize('create', Programme::class);
        return Inertia::render('Programme/Create', ['domaines' => Domaine::all()]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Programme::class);
        $validated = $request->validate([
            'nom_programme' => 'required|string|max:150',
            'description' => 'nullable|string',
            'domaine_id' => 'nullable|exists:domaines,id',
        ]);
        Programme::create($validated);
        return redirect()->route('programme.index')->with('success', 'Programme créé avec succès.');
    }

    public function edit(Programme $programme)
    {
        $this->authorize('update', $programme);
        return Inertia::render('Programme/Edit', [
            'programme' => $programme,
            'domaines' => Domaine::all()
        ]);
    }

    public function update(Request $request, Programme $programme)
    {
        $this->authorize('update', $programme);
        $validated = $request->validate([
            'nom_programme' => 'required|string|max:150',
            'description' => 'nullable|string',
            'domaine_id' => 'nullable|exists:domaines,id',
        ]);
        $programme->update($validated);
        return redirect()->route('programme.index')->with('success', 'Programme mis à jour avec succès.');
    }

    public function destroy(Programme $programme)
    {
        $this->authorize('delete', $programme);
        $programme->delete();
        return redirect()->route('programme.index')->with('success', 'Programme supprimé avec succès.');
    }
}
