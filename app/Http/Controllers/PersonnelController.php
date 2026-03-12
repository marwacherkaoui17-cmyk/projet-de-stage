<?php

namespace App\Http\Controllers;

use App\Models\Personnel;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class PersonnelController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $this->authorize('viewAny', Personnel::class);

        return Inertia::render('Personnel/Index', [
            'personnels' => Personnel::with('service')->get(),
            'services' => Service::all(),
        ]);
    }

    public function create()
    {
        $this->authorize('create', Personnel::class);

        return Inertia::render('Personnel/Create', [
            'services' => Service::all()
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Personnel::class);

        $validated = $request->validate([
            'nom' => 'required|string|max:100',
            'email' => 'nullable|email|max:150|unique:personnels',
            'telephone' => 'nullable|string|max:20',
            'service_id' => 'required|exists:services,id',
        ]);

        Personnel::create($validated);

        return redirect()->route('personnel.index')->with('success', 'Personnel créé avec succès.');
    }

    public function edit(Personnel $personnel)
    {
        $this->authorize('update', $personnel);

        return Inertia::render('Personnel/Edit', [
            'personnel' => $personnel,
            'services' => Service::all()
        ]);
    }

    public function update(Request $request, Personnel $personnel)
    {
        $this->authorize('update', $personnel);

        $validated = $request->validate([
            'nom' => 'required|string|max:100',
            'email' => 'nullable|email|max:150|unique:personnels,email,' . $personnel->id,
            'telephone' => 'nullable|string|max:20',
            'service_id' => 'required|exists:services,id',
        ]);

        $personnel->update($validated);

        return redirect()->route('personnel.index')->with('success', 'Personnel mis à jour avec succès.');
    }

    public function destroy(Personnel $personnel)
    {
        $this->authorize('delete', $personnel);

        $personnel->delete();

        return redirect()->route('personnel.index')->with('success', 'Personnel supprimé avec succès.');
    }
}
