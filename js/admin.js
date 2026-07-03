async function checkAdmin() {
  const { data } = await supabase.auth.getUser()
  const user = data.user

  if (!user) {
    window.location.href = "login.html"
    return
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (!profile?.is_admin) {
    alert("Sem permissão")
    window.location.href = "dashboard.html"
  }
}

async function createLesson() {
  const title = document.getElementById("title").value
  const content = document.getElementById("content").value

  const { error } = await supabase.from("lessons").insert([
    { title, content }
  ])

  if (error) {
    alert(error.message)
    return
  }

  alert("Aula criada!")
  loadLessons()
}

async function loadLessons() {
  const { data } = await supabase.from("lessons").select("*")

  const list = document.getElementById("list")
  list.innerHTML = ""

  data.forEach(l => {
    list.innerHTML += `
      <div style="border:1px solid #ccc; margin:10px; padding:10px">
        <h3>${l.title}</h3>
        <p>${l.content}</p>
      </div>
    `
  })
}

checkAdmin()
loadLessons()
