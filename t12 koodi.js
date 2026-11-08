/* ============ TEHTÄVÄ 12: LOMAKKEET JA TAPAHTUMAT ============
   Harjoitellaan lomake-elementtien käsittelyä JavaScriptillä:
   napin klikkaus, kentän blur (kentästä poistuminen), kentän
   input (kirjoittaminen), valintaruudut ja pudotusvalikot.
   HUOM: skripti ladataan vasta </body>-tagin jälkeen, jolloin
   kaikki HTML-elementit ovat jo olemassa.
   ========================================================== */

// ===== 1. Tervehdys =====
// Haetaan Tervehdi-nappi ja kuunnellaan sen klikkausta
document.getElementById("tervehdys-btn").addEventListener("click", function () {
  // .value lukee tekstikentän sisällön ja .trim() poistaa ylimääräiset välilyönnit
  const nimi = document.getElementById("nimi").value.trim();

  // Jos kenttä on tyhä (merkkijonon pituus 0), pyydetään nimeä uudelleen
  if (nimi === "") {
    alert("Kuka olet?");
  } else {
    // + liittää merkkijonot yhteen -> "Hei, Matti!"
    alert("Hei, " + nimi + "!");
  }
});

// ===== 2. Isot kirjaimet (blur) =====
// "blur" laukeaa, kun käyttäjä poistuu kentästä (klikkaa muualle tai tabulaattori)
document.getElementById("isot").addEventListener("blur", function () {
  // this = kenttä itse. toUpperCase() muuttaa arvon isoiksi kirjaimiksi
  // ja tulos tallennetaan takaisin kentän value-ominaisuuteen.
  this.value = this.value.toUpperCase();
});

// ===== 3. Salasana – väri vaihtuu kirjoittaessa (input) =====
// "input" laukeaa jokaisella näppäinpainalluksella, joten väri päivittyy heti
document.getElementById("salasana").addEventListener("input", function () {
  // length kertoo, montako merkkiä kentässä on tällä hetkellä
  if (this.value.length < 8) {
    this.style.backgroundColor = "#fecaca"; // vaaleanpunainen
  } else {
    this.style.backgroundColor = "#bbf7d0"; // vihreä
  }
});

// ===== 4. Ruokalajit =====
// Valintaruudut ovat checkboxeja, joilla on sama name="ruoka".
// querySelectorAll hakee kaikki ne, jotka on valittu (:checked).
document.getElementById("tilaa-btn").addEventListener("click", function () {
  const valitut = document.querySelectorAll('input[name="ruoka"]:checked');
  const tulos = document.getElementById("tilaus-tulos");

  // Jos yhtään ruokalajia ei ole valittu, tulostetaan virheteksti
  // ja lopetetaan funktio return-lauseella.
  if (valitut.length === 0) {
    tulos.textContent = "Et valinnut yhtään ruokalajia.";
    tulos.style.color = "#c53030";
    return;
  }

  // Array.from muuttaa NodeList-rakenteen oikeaksi taulukoksi,
  // ja map poimii jokaisesta valintaruudusta value-arvon (esim. "Pizza").
  const nimet = Array.from(valitut).map(function (cb) {
    return cb.value;
  });

  // join(", ") liittää nimet yhdeksi merkkijonoksi pilkulla eroteltuna
  tulos.textContent = "Valitsit: " + nimet.join(", ");
  tulos.style.color = "#2f855a";
});

// ===== 5 & 6. Ajoneuvot =====
// Haetaan kaikki tarvittavat elementit muuttujiin, jotta niitä ei tarvitse
// hakea uudelleen joka kerta funktioissa.
const paaluokka = document.getElementById("paaluokka");       // ylävalinta: autot / veneet
const autoRivi = document.getElementById("auto-rivi");         // autotyypin rivi (piilossa aluksi)
const veneRivi = document.getElementById("vene-rivi");         // venetyypin rivi (piilossa aluksi)
const autotyyppi = document.getElementById("autotyyppi");
const venetyyppi = document.getElementById("venetyyppi");
const aktiivinenTeksti = document.getElementById("aktiivinen-teksti");   // tulostuspaikka

// "change" laukeaa, kun pudotusvalikosta valitaan uusi vaihtoehto
paaluokka.addEventListener("change", function () {
  if (this.value === "autot") {
    // Näytetään autojen rivi ja piilotetaan veneiden rivi.
    // style.display = "none" piilottaa elementin kokonaan.
    autoRivi.style.display = "block";
    veneRivi.style.display = "none";
    venetyyppi.value = "";              // nollataan piilotetun valikon valinta
  } else if (this.value === "veneet") {
    veneRivi.style.display = "block";
    autoRivi.style.display = "none";
    autotyyppi.value = "";
  } else {
    // Tyhjä valinta "Valitse..." piilottaa molemmat rivit
    autoRivi.style.display = "none";
    veneRivi.style.display = "none";
    autotyyppi.value = "";
    venetyyppi.value = "";
  }
  // Päivitetään aina myös "Aktiivinen valinta" -teksti
  paivitaAktiivinen();
});

// Kun tyyppi-valikot muuttuvat, päivitetään aktiivinen teksti suoraan:
// tässä annetaan valmiiksi tehty funktio (ei kutsuta sitä heti).
autotyyppi.addEventListener("change", paivitaAktiivinen);
venetyyppi.addEventListener("change", paivitaAktiivinen);

// Funktio, joka kirjoittaa yhteenvedon aktiivisesta valinnasta
function paivitaAktiivinen() {
  let teksti = "–";    // oletusarvo, jos valintaa ei ole tehty

  if (paaluokka.value === "autot" && autotyyppi.value !== "") {
    teksti = autotyyppi.value;                     // esim. "Pakettiauto"
  } else if (paaluokka.value === "veneet" && venetyyppi.value !== "") {
    teksti = venetyyppi.value;
  } else if (paaluokka.value === "autot") {
    teksti = "Autot (ei vielä valittu tyyppiä)";
  } else if (paaluokka.value === "veneet") {
    teksti = "Veneet (ei vielä valittu tyyppiä)";
  }

  aktiivinenTeksti.textContent = teksti;
}

// CV-tiedoston nimi
// Parametri e on tapahtumaolio, jonka kautta päästään käsiksi kenttään (e.target)
document.getElementById("cv-input").addEventListener("change", function (e) {
  // files[0].name antaa valitun tiedoston nimen.
  // Jos tiedostoa ei ole valittu (files.length === 0), näytetään oletusteksti.
  const fileName = e.target.files.length > 0 ? e.target.files[0].name : "Ei valittua tiedostoa";
  document.getElementById("file-name").textContent = fileName;
});

// Lähetä-nappi (demo)
// Nappi ei lähetä lomaketta oikeasti, vaan näyttää vain ilmoituksen.
document.getElementById("laheta-btn").addEventListener("click", function () {
  alert("Lomake lähetetty! (Tämä on vain demo)");
});