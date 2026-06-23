import { supabase } from "./supabaseClient.js"


async function iniciarSesion(email, password) {
  // Intentamos el login
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (error) {
    console.error("Error al entrar:", error.message)
    return { success: false, message: error.message }
  }

  // Si no hay error, 'data' tiene la sesión y el usuario
  console.log("Bienvenido:", data.user.email)
  return { success: true, user: data.user }
}



const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault(); 

  const email = document.querySelector('#email-input').value;
  const password = document.querySelector('#password-input').value;
  
  console.log("Intentando entrar con:", email);

// Aquí llamas a Supabase, NO al servidor local
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("Error: " + error.message);
  } else {
    window.location.href = '/citas.html';
  }
});