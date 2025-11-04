describe("Exercices JavaScript 2", function() {

  // ========== PAGE 1 : Chargement des données ==========
  describe("Page 1 : loadData", function() {
    it("Télécharge les données et retourne un tableau", async function() {
      this.timeout(5000);
      const data = await loadData();
      chai.assert.isArray(data, "Le résultat doit être un tableau");
    });
  });

  // ========== PAGE 2 : Map et tri de noms ==========
  describe("Page 2 : mapToNames, sortNamesAlphabetically, lengthOfData", function() {
    let data, names;
    before(async function() {
      data = await loadData();
      names = mapToNames(data);
    });

    it("Extrait uniquement les prénoms", function() {
      chai.assert.isArray(names, "Le résultat doit être un tableau de prénoms");
      if (names.length > 0) {
        chai.assert.isString(names[0], "Chaque prénom doit être une chaîne de caractères");
      }
    });

    it("Trie les prénoms par ordre alphabétique", function() {
      const sorted = sortNamesAlphabetically(["Mia", "Emma", "Sofia"]);
      chai.assert.deepEqual(sorted, ["Emma", "Mia", "Sofia"], "Les prénoms doivent être triés alphabétiquement");
    });

    it("Retourne la longueur des prénoms", function() {
      const len = lengthOfData(names);
      chai.assert.isNumber(len, "La longueur doit être un nombre");
      chai.assert.equal(len, names.length, "La longueur doit correspondre au tableau");
    });
  });

  // ========== PAGE 3 : Filtrage par lettre ==========
  describe("Page 3 : filterNamesByStartingLetter", function() {
    let data, names;
    before(async function() {
      data = await loadData();
      names = mapToNames(data);
    });

    it("Filtre les prénoms par lettre initiale", function() {
      const filtered = filterNamesByStartingLetter(names, "E");
      filtered.forEach(name => {
        chai.assert.isTrue(name.startsWith("E"), "Chaque prénom filtré commence par E");
      });
    });
  });

  // ========== PAGE 4 : Vue objet ==========
  describe("Page 4 : filter2024Data, filterDataByStartingLetter", function() {
    let data;
    before(async function() {
      data = await loadData();
      data = filter2024Data(data);
    });

    it("Filtre les données pour 2024 > 0", function() {
      const filtered = filter2024Data(data);
      filtered.forEach(item => {
        chai.assert.isAbove(item["2024"], 0, "Chaque valeur 2024 doit être > 0");
      });
    });

    it("Filtre les objets par lettre initiale du prénom", function() {
      const filtered = filterDataByStartingLetter(data, "M");
      filtered.forEach(item => {
        chai.assert.isTrue(item["First name"].startsWith("M"), "Chaque prénom filtré commence par M");
      });
    });
  });

});

window.requestAnimationFrame(() => mocha.run());
