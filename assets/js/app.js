const seed = [
  {
    name: "Mariana Oliveira",
    age: 34,
    specialty: "Clínica geral",
    time: "09:00",
    status: "Em atendimento",
    allergy: "Penicilina",
    notes: [],
  },
  {
    name: "João Pedro Santos",
    age: 58,
    specialty: "Cardiologia",
    time: "09:30",
    status: "Aguardando",
    allergy: "Não informada",
    notes: [],
  },
  {
    name: "Ana Beatriz Costa",
    age: 27,
    specialty: "Dermatologia",
    time: "10:00",
    status: "Confirmado",
    allergy: "Não informada",
    notes: [],
  },
  {
    name: "Carlos Eduardo Silva",
    age: 45,
    specialty: "Ortopedia",
    time: "10:30",
    status: "Confirmado",
    allergy: "Não informada",
    notes: [],
  },
];
let patients = JSON.parse(localStorage.getItem("vitalis-demo") || "null") || seed;
let page = "Visão geral";
const pages = [
  "◫ Visão geral",
  "◷ Agenda",
  "♧ Pacientes",
  "▤ Prontuários",
  "♡ Equipe médica",
  "▥ Relatórios",
];
const app = document.querySelector("#app"),
  modal = document.querySelector("#modal");
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
function save() {
  localStorage.setItem("vitalis-demo", JSON.stringify(patients));
}
function toast(s) {
  let d = document.createElement("div");
  d.className = "toast";
  d.textContent = s;
  document.body.append(d);
  setTimeout(() => d.remove(), 3000);
}
function go(p) {
  page = p;
  render();
}
function rows() {
  return patients
    .filter((p) =>
      p.name.toLowerCase().includes(document.querySelector("#search").value.toLowerCase()),
    )
    .map((p) => {
      let i = patients.indexOf(p);
      return `<tr><td><span class="avatar">${esc(
        p.name
          .split(" ")
          .map((x) => x[0])
          .slice(0, 2)
          .join(""),
      )}</span><b>${esc(p.name)}</b></td><td>${p.age} anos</td><td>${esc(p.specialty)}</td><td><span class="status">${esc(p.status)}</span></td><td><button class="link" onclick="record(${i})">Abrir prontuário →</button></td></tr>`;
    })
    .join("");
}
function table() {
  return `<div class="card section"><h2>Pacientes ${page === "Visão geral" ? "do dia" : ""}</h2><div style="overflow:auto"><table><thead><tr><th>PACIENTE</th><th>IDADE</th><th>ESPECIALIDADE</th><th>STATUS</th><th>AÇÃO</th></tr></thead><tbody>${rows() || '<tr><td colspan="5">Nenhum paciente encontrado.</td></tr>'}</tbody></table></div></div>`;
}
function render() {
  document.querySelector("#nav").innerHTML = pages
    .map(
      (x) =>
        `<button class="${x.slice(2) === page ? "active" : ""}" onclick="go('${x.slice(2)}')">${x}</button>`,
    )
    .join("");
  app.innerHTML = `<div class="heading"><div><p style="font-size:11px;letter-spacing:1.5px;margin-bottom:10px">WORKSPACE / ${page.toUpperCase()}</p><h1>${page === "Visão geral" ? "Seu cuidado faz a diferença." : page}</h1><p>${page === "Visão geral" ? "Bem-vinda, Dra. Carolina. Veja o que acontece na clínica hoje." : "Tudo o que você precisa, em um só lugar."}</p></div><button onclick="newForm()">＋ ${page === "Pacientes" ? "Novo paciente" : "Novo agendamento"}</button></div>`;
  if (page === "Visão geral") {
    app.innerHTML +=
      `<div class="stats">${[
        ["Consultas hoje", patients.length, "◷", "Agenda atualizada"],
        ["Pacientes cadastrados", patients.length, "♧", "Base demonstrativa"],
        [
          "Aguardando atendimento",
          patients.filter((p) => p.status === "Aguardando").length,
          "◴",
          "Fila de atendimento",
        ],
        ["Profissionais", 4, "♡", "4 especialidades"],
      ]
        .map(
          (x) =>
            `<div class="card"><span class="stat-icon">${x[2]}</span><p>${x[0]}</p><div class="number">${x[1]}</div><span class="up">● ${x[3]}</span></div>`,
        )
        .join(
          "",
        )}</div><div class="grid"><div class="card"><div style="display:flex;justify-content:space-between"><h2>Próximos atendimentos</h2><button class="link" onclick="go('Agenda')">Ver agenda ↗</button></div>${patients
        .slice(0, 3)
        .map(
          (p, i) =>
            `<div class="row"><span class="time">${esc(p.time)}</span><div style="flex:1"><b>${esc(p.name)}</b><p class="muted">${esc(p.specialty)} · Consulta presencial</p></div><span class="status">${esc(p.status)}</span><button class="link" onclick="record(${i})">→</button></div>`,
        )
        .join(
          "",
        )}</div><div class="card welcome"><span class="plus">✚</span><p style="font-size:11px;letter-spacing:1px">MAIS TEMPO PARA CUIDAR</p><h2>A saúde começa com uma boa conexão.</h2><p>Acesse o histórico e acompanhe cada etapa do cuidado.</p><button style="margin-top:18px" onclick="go('Prontuários')">Acessar prontuários →</button></div></div>` +
      table();
  } else if (page === "Pacientes" || page === "Prontuários") {
    app.innerHTML += table();
  } else if (page === "Agenda") {
    app.innerHTML += `<div class="card"><h2>Agenda de atendimentos <span class="badge">Demonstração</span></h2>${patients.map((p, i) => `<div class="row"><b>${esc(p.time)}</b><div style="flex:1"><b>${esc(p.name)}</b><p>${esc(p.specialty)}</p></div><select aria-label="Status" onchange="patients[${i}].status=this.value;save();render()">${["Confirmado", "Aguardando", "Em atendimento", "Concluído", "Cancelado"].map((s) => `<option ${s === p.status ? "selected" : ""}>${s}</option>`).join("")}</select><button onclick="record(${i})">Atender</button></div>`).join("")}</div>`;
  } else if (page === "Equipe médica") {
    app.innerHTML += `<div class="stats">${["Carolina Lima|Clínica geral", "Ricardo Mendes|Cardiologia", "Juliana Alves|Dermatologia", "Pedro Rocha|Ortopedia"].map((n) => `<div class="card"><span class="avatar">${n[0]}</span><h2 style="margin-top:20px">Dr(a). ${n.split("|")[0]}</h2><p>${n.split("|")[1]}</p><br><span class="status">Equipe demonstrativa</span></div>`).join("")}</div>`;
  } else {
    app.innerHTML += `<div class="grid"><div class="card"><h2>Distribuição por especialidade</h2>${[...new Set(patients.map((p) => p.specialty))].map((s) => `<div class="row"><b>${esc(s)}</b><span>${patients.filter((p) => p.specialty === s).length} pacientes</span></div>`).join("")}</div><div class="card"><h2>Resumo da operação</h2><div class="number">${patients.length}</div><p>Pacientes nesta demonstração</p><br><button onclick="download()">Exportar relatório CSV ↓</button></div></div>`;
  }
  app.innerHTML +=
    "<footer>Dados fictícios · Demonstração interativa · Não inserir informações reais de saúde.</footer>";
}
function newForm() {
  modal.innerHTML = `<h2>${page === "Pacientes" ? "Cadastrar paciente" : "Novo agendamento"}</h2><form id="new"><label>Nome completo<input name="name" required maxlength="100"></label><label>Idade<input name="age" type="number" min="0" max="120" required></label><label>Especialidade<select name="specialty"><option>Clínica geral</option><option>Cardiologia</option><option>Dermatologia</option><option>Ortopedia</option></select></label><label>Horário<input name="time" type="time" required></label><label>Alergias<input name="allergy" placeholder="Não informada"></label><div><button>Salvar</button> <button type="button" class="link" onclick="modal.close()">Cancelar</button></div></form>`;
  modal.showModal();
  document.querySelector("#new").onsubmit = (e) => {
    e.preventDefault();
    let p = Object.fromEntries(new FormData(e.target));
    patients.push({ ...p, status: "Confirmado", notes: [] });
    save();
    modal.close();
    render();
    toast("Cadastro salvo nesta demonstração");
  };
}
function record(i) {
  let p = patients[i];
  modal.innerHTML = `<div style="display:flex;justify-content:space-between"><h2>Prontuário eletrônico</h2><button class="link" onclick="modal.close()">Fechar ✕</button></div><h1>${esc(p.name)}</h1><p>${p.age} anos · ${esc(p.specialty)} · Paciente #${String(i + 1).padStart(4, "0")}</p><div class="card section" style="background:#fff8ec;border-color:#f3e5c6">Alergias: <b>${esc(p.allergy || "Não informada")}</b></div><h2 class="section">Evoluções clínicas</h2>${p.notes.length ? p.notes.map((n) => `<div class="card" style="margin-bottom:10px"><small>${esc(n.date)} · Dra. Carolina Lima</small><p style="white-space:pre-wrap;color:#29484e">${esc(n.text)}</p></div>`).join("") : "<p>Nenhuma evolução registrada.</p>"}<form id="note" class="section"><label>Nova evolução<textarea name="text" placeholder="Registre uma anotação fictícia para testar o prontuário..." required></textarea></label><button>Salvar evolução</button></form><p class="muted section">Anotações demonstrativas, sem assinatura digital ou validade clínica.</p>`;
  if (!modal.open) modal.showModal();
  document.querySelector("#note").onsubmit = (e) => {
    e.preventDefault();
    p.notes.push({
      text: new FormData(e.target).get("text"),
      date: new Date().toLocaleString("pt-BR"),
    });
    save();
    record(i);
    toast("Evolução salva");
  };
}
function download() {
  let csv =
    "Nome;Idade;Especialidade;Status\n" +
    patients
      .map((p) =>
        [p.name, p.age, p.specialty, p.status]
          .map((v) => '"' + String(v).replace(/"/g, '""') + '"')
          .join(";"),
      )
      .join("\n");
  let a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" }));
  a.download = "vitalis-relatorio-demo.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}
document.querySelector("#search").oninput = () => {
  if (!["Pacientes", "Prontuários", "Visão geral"].includes(page)) page = "Pacientes";
  render();
};
render();
