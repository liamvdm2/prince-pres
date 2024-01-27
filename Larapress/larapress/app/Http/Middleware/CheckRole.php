<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    public function handle($request, Closure $next, ...$roles)
    {
        if (!Auth::check()) {
            return redirect('login');
        }

        $user = Auth::user();

        foreach($roles as $role) {
            if($user->role_id == $role) {
                return $next($request);
            }
        }

        // If none of the roles matched, return an unauthorized response
        return response()->json(['error' => 'Unauthorized'], 403);
    }
}
