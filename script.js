(function(){

  const nombres = ["Ana Laura","Alejandro","Alejandra","Alfredo","Araceli","Beatriz","Carlos","Carmen","César","Claudia",
    "Daniel","Diana","Eduardo","Elena","Enrique","Erika","Fernando","Gabriela","Gerardo","Gloria",
    "Guadalupe","Héctor","Ignacio","Irma","Ivonne","Javier","Jorge","José Luis","Juan Carlos","Julia",
    "Leticia","Lorena","Lourdes","Luis","Manuel","Marcela","Mario","Marisol","Martha","Miguel Ángel",
    "Mónica","Nora","Norma","Óscar","Patricia","Rafael","Ricardo","Roberto","Rocío","Rosa María",
    "Salvador","Sandra","Sergio","Silvia","Sofía","Teresa","Verónica","Víctor","Yolanda","Adrián"];

  const apellidos = ["Hernández","García","Martínez","López","González","Rodríguez","Pérez","Sánchez","Ramírez","Flores",
    "Torres","Díaz","Vázquez","Cruz","Reyes","Morales","Ortiz","Gutiérrez","Chávez","Ramos",
    "Jiménez","Mendoza","Ruiz","Aguilar","Castillo","Vargas","Romero","Medina","Herrera","Delgado",
    "Guerrero","Núñez","Rojas","Salazar","Contreras","Espinoza","Cabrera","Estrada","Solís","Peña",
    "Cortés","Camacho","Villanueva","Zamora","Rivas","Aranda","Padilla","Ibarra","Cervantes","Meza",
    "Franco","Lara","Serrano","Escobar","Miranda","Molina","Vera","Bautista","Alvarado","Navarro"];

  const apodos = ["El Flaco","La Pecas","El Güero","La Chaparra","El Tigre","La Poeta","El Capitán","La Reportera",
    "El Filósofo","La Cantante","El Bailarín","La Estudiosa","El Bromista","La Puntual","El Deportista","La Artista",
    "El Serio","La Risueña","El Inventor","La Soñadora"];

  const frases = [
    "Siempre decía que llegaríamos lejos, y tenía razón.",
    "Su frase de cabecera era “otro día, otra oportunidad”.",
    "Nunca faltaba a un ensayo, aunque lloviera.",
    "Repetía que “lo importante es intentarlo”.",
    "Era quien más se reía en la fila de salida.",
    "Su lema era “paso a paso se llega lejos”.",
    "Solía decir “ya casi, ya casi” antes de cada examen.",
    "Nunca se le olvidó el nombre de nadie en el salón.",
    "Su frase famosa: “esto también se nos va a olvidar”.",
    "Siempre tenía una broma lista para el recreo."
  ];

  const datos = [
    "Ganó el primer lugar en el concurso de oratoria de la escuela.",
    "Fue el encargado de la escolta durante dos años seguidos.",
    "Organizó la kermés de graduación casi sin ayuda.",
    "Nunca reprobó una materia, ni siquiera en época de exámenes finales.",
    "Fue parte del equipo que representó a la escuela en la zona.",
    "Pintó el mural que aún se conserva en el patio principal.",
    "Fue el primero del salón en aprender a tocar guitarra.",
    "Escribió el poema que se leyó en la ceremonia de graduación.",
    "Fue capitán del equipo de básquetbol durante la generación.",
    "Editó el periódico mural cada mes sin faltar uno solo."
  ];

  const actual = [
    "Actualmente vive en la misma ciudad y sigue en contacto con varios compañeros.",
    "Se mudó de ciudad poco después de graduarse; poco se sabe de su paradero actual.",
    "Formó una familia y se dedica a su profesión hasta la fecha.",
    "Fue maestro durante varios años en escuelas de la región.",
    "Emprendió su propio negocio en cuanto terminó sus estudios.",
    "Vive fuera del país desde hace más de una década.",
    "Regresó a la escuela años después, ahora como parte del personal.",
    "Se dedicó al oficio que su familia le enseñó desde niño.",
    "Continuó estudiando y se especializó en su área de interés.",
    "Sigue organizando las reuniones de generación cada aniversario."
  ];

  function inicialesDe(nombre, apellido){
    const n = nombre.trim().split(" ")[0][0];
    const a = apellido.trim().split(" ")[0][0];
    return (n + a).toUpperCase();
  }

  const graduados = nombres.map((nombre, i) => {
    const apellido = apellidos[i];
    return {
      id: i,
      nombre: nombre,
      apellido: apellido,
      nombreCompleto: nombre + " " + apellido,
      apodo: apodos[i % apodos.length],
      frase: frases[(i * 3 + 1) % frases.length],
      dato: datos[(i * 5 + 2) % datos.length],
      actual: actual[(i * 7 + 3) % actual.length],
      iniciales: inicialesDe(nombre, apellido)
    };
  }).sort((a,b) => a.apellido.localeCompare(b.apellido, 'es') || a.nombre.localeCompare(b.nombre, 'es'));

  const fichaEl = document.getElementById('ficha');
  const gridEl = document.getElementById('grid-nombres');
  const inputEl = document.getElementById('input-busqueda');
  const resultadosEl = document.getElementById('caja-resultados');
  const contadorEl = document.getElementById('contador-listado');

  let activoId = graduados[0].id;

  function renderFicha(g){
    fichaEl.innerHTML = `
      <div class="foto-marco">
        <span class="esq-3"></span><span class="esq-4"></span>
        <span class="iniciales">${g.iniciales}</span>
        <span class="foto-sello">GEN. 96</span>
      </div>
      <div class="ficha-datos">
        <h2>${g.nombreCompleto}</h2>
        <p class="apodo">“${g.apodo}”</p>
        <div class="dato-linea">
          <span class="dato-etq">Se le recuerda</span>
          <span class="dato-val frase">${g.frase}</span>
        </div>
        <div class="dato-linea">
          <span class="dato-etq">Dato emblemático</span>
          <span class="dato-val">${g.dato}</span>
        </div>
        <div class="dato-linea">
          <span class="dato-etq">Actualmente</span>
          <span class="dato-val">${g.actual}</span>
        </div>
      </div>
    `;
  }

  function marcarActivoEnLista(){
    document.querySelectorAll('.nombre-btn').forEach(btn => {
      btn.classList.toggle('activo', Number(btn.dataset.id) === activoId);
    });
  }

  function seleccionar(id){
    activoId = id;
    const g = graduados.find(x => x.id === id);
    renderFicha(g);
    marcarActivoEnLista();
    resultadosEl.classList.remove('activo');
    resultadosEl.innerHTML = "";
    inputEl.value = "";
    document.getElementById('ficha-wrap') || document.querySelector('.ficha-wrap').scrollIntoView({behavior:'smooth', block:'start'});
  }

  function renderListado(){
    gridEl.innerHTML = graduados.map((g, idx) => `
      <button class="nombre-btn" data-id="${g.id}" type="button">
        <span class="num">${String(idx+1).padStart(2,'0')}</span>
        <span>${g.nombreCompleto}</span>
      </button>
    `).join("");
    gridEl.querySelectorAll('.nombre-btn').forEach(btn => {
      btn.addEventListener('click', () => seleccionar(Number(btn.dataset.id)));
    });
    marcarActivoEnLista();
    contadorEl.textContent = graduados.length + " nombres · en orden alfabético por apellido";
  }

  function normaliza(str){
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  }

  inputEl.addEventListener('input', () => {
    const q = normaliza(inputEl.value.trim());
    if(!q){
      resultadosEl.classList.remove('activo');
      resultadosEl.innerHTML = "";
      return;
    }
    const coincidencias = graduados.filter(g => normaliza(g.nombreCompleto).includes(q));
    resultadosEl.classList.add('activo');
    if(coincidencias.length === 0){
      resultadosEl.innerHTML = `<div class="sin-resultados">No encontramos a nadie con “${inputEl.value.trim()}”. Prueba con otro nombre o apellido.</div>`;
      return;
    }
    resultadosEl.innerHTML = coincidencias.slice(0, 10).map(g => `
      <button class="resultado-item" type="button" data-id="${g.id}">
        <span>${g.nombreCompleto}</span>
        <span class="r-apodo">${g.apodo}</span>
      </button>
    `).join("");
    resultadosEl.querySelectorAll('.resultado-item').forEach(btn => {
      btn.addEventListener('click', () => seleccionar(Number(btn.dataset.id)));
    });
  });

  document.addEventListener('click', (e) => {
    if(!e.target.closest('#buscador')){
      resultadosEl.classList.remove('activo');
    }
  });

  // inicial
  renderFicha(graduados[0]);
  renderListado();

})();
