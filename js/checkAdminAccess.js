// Importamos la instancia que ya configuraste
import { supabase } from './supabaseConfig.js'; 

export async function checkAdminAccess() {
    // 1. Obtenemos el usuario que tiene la sesión activa
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    // Si no hay sesión o hay error, mandamos al login
    if (authError || !user) {
        window.location.href = 'login.html';
        return;
    }

    // 2. Consultamos TU tabla 'perfiles' usando 'id_usuario'
    const { data: perfil, error: dbError } = await supabase
        .from('perfiles')
        .select('rol')
        .eq('id_usuario', user.id)
        .single();

    // 3. Verificamos si el rol es el 102 (Administrador)
    if (dbError || !perfil || perfil.rol !== 102) {
        console.error("Acceso denegado: No tienes permisos de administrador.");
        window.location.href = 'unauthorized.html'; // O la página que prefieras
    } else {
        console.log("Acceso concedido: Bienvenido administrador.");
    }
}