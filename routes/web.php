<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MissionController;
use App\Http\Controllers\PersonnelController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\DomaineController;
use App\Http\Controllers\ProgrammeController;
use App\Http\Controllers\EssenceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login'
    // , ['canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,]
    );
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'stats' => [
            'total_missions' => \App\Models\Mission::count(),
            'validee_missions' => \App\Models\Mission::where('statut', 'Validee')->count(),
            'total_personnel' => \App\Models\Personnel::count(),
            'upcoming_missions' => \App\Models\Mission::where('date_debut', '>', now())->count(),
        ],
        'recent_missions' => \App\Models\Mission::with(['service', 'foret'])->latest()->take(3)->get()
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // CRUD Resource Routes with RBAC (Policies)
    Route::resource('personnel', PersonnelController::class);
    Route::resource('mission', MissionController::class);
    Route::resource('service', ServiceController::class);
    Route::resource('domaine', DomaineController::class);
    Route::resource('programme', ProgrammeController::class);
    Route::resource('essence', EssenceController::class);
});

require __DIR__.'/auth.php';
