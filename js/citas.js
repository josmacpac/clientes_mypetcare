const { data: { session }, error } = await supabase.auth.getSession();

if (!session || error) {
    // Si no hay sesión, mándalo de regreso al login
    window.location.href = '/login.html';
} else {
    // Si hay sesión, aquí ya puedes usar session.user.id
    console.log("ID del veterinario activo:", session.user.id);
}