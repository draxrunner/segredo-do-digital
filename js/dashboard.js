let user

async function init() {
  const { data } = await supabase.auth.getUser()
  user = data.user

  loadLessons()
  loadProgress()
}

async function loadLessons() {
  const { data: lessons } = await supabase.from("lessons").select("*")

  const container = document.getElementById("lessons")
  container.innerHTML = ""

  lessons.forEach(l => {
    container.innerHTML += `
      <div>
        <h3>${l.title}</h3>
        <p>${l.content}</p>
        <button onclick="completeLesson(${l.id})">Concluir</button>
      </div>
    `
  })
}

async function completeLesson(lessonId) {
  await supabase.from("progress").upsert({
    user_id: user.id,
    lesson_id: lessonId,
    completed: true
  })

  loadProgress()
}

async function loadProgress() {
  const { data } = await supabase
    .from("progress")
    .select("*")
    .eq("user_id", user.id)

  const total = data.length
  const done = data.filter(p => p.completed).length

  const percent = total ? Math.round((done / total) * 100) : 0

  document.getElementById("progress").innerText =
    `Progresso: ${percent}%`
}

init()
