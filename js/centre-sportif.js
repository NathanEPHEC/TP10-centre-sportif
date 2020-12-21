let achats = {};

let cours = {
  C101: {nomCours: "Yoga", prixUnit: 20.95},
  C102: {nomCours: "Tennis", prixUnit: 35.15},
  C103: {nomCours: "Badminton", prixUnit: 30.25},
  C104: {nomCours: "Escalade", prixUnit: 15.50},
  C105: {nomCours: "Football", prixUnit: 25},
  C106: {nomCours: "Aquagym", prixUnit: 22.50}
};

function ajouterCours(i){
  let nom = i.name;
  if (nom in achats){
    achats[nom]++;
  }
  else {
    achats[nom] = 1;
  }
  afficherAchats();
}

/*
* Cette fonction a pour objectif de réserver et d'ajouter, à la demande de l'utilisateur, le cours dans la liste d'achats.
* @param {string} nom Le nom du cours en question.
* Si le cours est déjà réservé au moins une fois dans la liste.
* @example
* // achats[nom]++;
* Si le cours n'est pas encore dans la liste.
* @example
* // achats[nom] = 1;
*/

function retirerCours(i){
  let nom = i.name;
  if (achats[nom] > 1){
   achats[nom]--;
  }
  else {
   delete achats[nom];
 }
 afficherAchats();
}

/*
* Cette fonction a pour objectif de retirer, à la demande de l'utilisateur, une réservation (une à la fois).
* @param {string} nom Le nom du cours en question.
* Si le cours est au moins réserver pour deux personnes.
* @example
* // achats[nom]--;
* Si le cours n'est présent qu'une seule fois dans la liste.
* @example
* // delete achats[nom];
*/

function afficherCours() {
  let ligne;
  let index = indexCours();
  for (let i of index) {
    let button = "<input type='button' value='Réserver' name='" + i + "' onclick='ajouterCours(this);'>";
    ligne = '<tr>';
    ligne += '<td class=nom>' + cours[i].nomCours + '</td>';
    ligne += '<td class=prx>' + cours[i].prixUnit.toFixed(2) + '</td>';
    ligne += '<td class=add>' + button + '</td>'
    ligne += '</tr>';
    addElem('tableCours', ligne);
  }
}

function afficherAchats() {
  setElem('tableAchats', '');
  let ligne;
  for (let i in achats) {
      ligne = '<tr>';
      ligne += '<td class=nom>' + cours[i].nomCours + '</td>';
      ligne += '<td class=prx>' + cours[i].prixUnit.toFixed(2) + '</td>';
      ligne += '<td class=nbr>' + achats[i] + '</td>';
      var button = "<input type='button' value='Retirer' name='" + i + "' onclick='retirerCours(this);'>";
      ligne += '<td class=del>' + button + '</td>';
      ligne += '</tr>';
      addElem('tableAchats', ligne);
  }
  calculerTotal();
}

function calculerTotal() {
  let total = 0;
  for (let i in achats) {
      total += achats[i] * cours[i].prixUnit;
  }
  setElem('tot', total.toFixed(2));
}

function indexCours() {
  return Object.keys(cours).sort(function (x, y) {
    return cours[x].nomCours > cours[y].nomCours ? 1 : cours[x].nomCours < cours[y].nomCours ? -1 : 0;
  });
}

function addElem(id, v){
  document.getElementById(id).innerHTML += v;
}

function setElem(id, v){
  document.getElementById(id).innerHTML = v;
}

function getElem(id){
  return document.getElementById(id).innerHTML;
}
