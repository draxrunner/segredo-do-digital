
async function login() {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    alert(error.message)
    return
  }

  window.location.href = "dashboard.html"
}
