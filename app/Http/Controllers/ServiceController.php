<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ServiceController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $this->authorize('viewAny', Service::class);
        return Inertia::render('Admin/Settings', [
            'activeTab' => 'services',
            'data' => Service::all()
        ]);
    }

    public function create()
    {
        $this->authorize('create', Service::class);
        return Inertia::render('Service/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('create', Service::class);
        $validated = $request->validate([
            'libelle' => 'required|string|max:150',
            'description' => 'nullable|string',
        ]);
        Service::create($validated);
        return redirect()->route('service.index')->with('success', 'Service créé avec succès.');
    }

    public function edit(Service $service)
    {
        $this->authorize('update', $service);
        return Inertia::render('Service/Edit', ['service' => $service]);
    }

    public function update(Request $request, Service $service)
    {
        $this->authorize('update', $service);
        $validated = $request->validate([
            'libelle' => 'required|string|max:150',
            'description' => 'nullable|string',
        ]);
        $service->update($validated);
        return redirect()->route('service.index')->with('success', 'Service mis à jour avec succès.');
    }

    public function destroy(Service $service)
    {
        $this->authorize('delete', $service);
        $service->delete();
        return redirect()->route('service.index')->with('success', 'Service supprimé avec succès.');
    }
}
