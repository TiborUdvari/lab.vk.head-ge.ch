/*
 * EXERCICE 1 : Télécharger les données
 *
 * Objectif :
 * - Utiliser fetch pour récupérer un fichier JSON depuis une URL
 * - Utiliser async / await pour attendre la réponse
 * - Toujours RETURN les données pour pouvoir les utiliser après
 *
 * Hints :
 * - Cherchez "JavaScript fetch API" pour comprendre comment récupérer des fichiers depuis internet
 * - Cherchez "async await JavaScript" pour comprendre comment attendre la réponse
 * - Cherchez "response.json()" pour transformer la réponse en objet JavaScript
 *
 * Exemple de structure d'une entrée de données (data[0]) :
 * {
 *   "2000": 127,
 *   "2001": 116,
 *   ...
 *   "2024": 377,
 *   "First name": "Emma",
 *   "Unit of measure": "Number"
 */
export async function loadData() {
  const url = "https://lab.vk.head-ge.ch/assets/swiss-baby-names/girls.json";

  // Écrivez votre code ici
  // N'oubliez pas de return le résultat !
}

/*
 * EXERCICE 2 : Extraire uniquement les prénoms
 *
 * Objectif :
 * - Utiliser la méthode map() pour créer un nouveau tableau
 * - Retourner uniquement la valeur de la propriété "First name" pour chaque objet
 *
 * Hints :
 * - Cherchez "JavaScript array map" pour apprendre à transformer un tableau
 * - Cherchez "JavaScript access object property" pour savoir comment accéder à une propriété d'objet
 * - map() ne change pas le tableau original, il crée un nouveau tableau
 *
 * Exemple :
 * const names = mapToNames(data);
 * console.log(names[0]); // "Emma"
 */
export function mapToNames(data) {
  // Écrivez votre code ici
  // RETURN le nouveau tableau !
}

/*
 * EXERCICE 3 : Trier les noms par ordre alphabétique
 *
 * Objectif :
 * - Utiliser la méthode sort() sur un tableau de chaînes
 *
 * Hints :
 * - Cherchez "JavaScript array sort" pour comprendre comment trier un tableau
 * - Pour des chaînes simples, sort() suffit
 * - RETURN le tableau trié !
 *
 * Exemple :
 * const names = ["Mia", "Emma", "Sofia"];
 * const sorted = sortNamesAlphabetically(names);
 * console.log(sorted); // ["Emma", "Mia", "Sofia"]
 */
export function sortNamesAlphabetically(names){
  // Écrivez votre code ici
}

/*
 * EXERCICE 4 : Compter le nombre de données
 *
 * Objectif :
 * - Retourner la longueur d'un tableau
 *
 * Hints :
 * - Cherchez "JavaScript array length" pour savoir comment compter le nombre d'éléments
 * - RETURN le résultat !
 *
 * Exemple :
 * const total = lengthOfData(data);
 * console.log(total); // 1000 (selon la taille du dataset)
 */
export function lengthOfData(data) {
  // Écrivez votre code ici
}

/*
 * EXERCICE 5 : Filtrer les noms par lettre initiale
 *
 * Objectif :
 * - Utiliser filter() pour garder seulement les noms qui commencent par une lettre donnée
 *
 * Hints :
 * - Cherchez "JavaScript array filter" pour apprendre à filtrer un tableau
 * - Cherchez "JavaScript string startsWith" pour tester si une chaîne commence par une lettre
 * - RETURN le tableau filtré !
 *
 * Exemple :
 * const names = ["Emma", "Mia", "Sofia"];
 * const filtered = filterNamesByStartingLetter(names, "E");
 * console.log(filtered); // ["Emma"]
 */
export function filterNamesByStartingLetter(names, letter) {
  // Écrivez votre code ici
}

/*
 * EXERCICE 6 : Filtrer les données pour l'année 2024
 *
 * Objectif :
 * - Garder seulement les objets dont la valeur pour "2024" est supérieure à 0
 *
 * Hints :
 * - Cherchez "JavaScript array filter" pour filtrer un tableau
 * - Pour accéder à une valeur dans un objet : item["2024"]
 * - RETURN le tableau filtré !
 *
 * Exemple :
 * const data2024 = filter2024Data(data);
 * console.log(data2024[0]["First name"]); // "Emma"
 */
export function filter2024Data(data) {
  // Écrivez votre code ici
}

/*
 * EXERCICE 7 : Filtrer les données par lettre initiale du prénom (objets complets)
 *
 * Objectif :
 * - Garder seulement les objets dont le prénom commence par une lettre donnée
 *
 * Hints :
 * - Cherchez "JavaScript array filter" pour filtrer un tableau
 * - Cherchez "JavaScript string startsWith" pour tester la première lettre d'une chaîne
 * - Accédez à la propriété du prénom avec item["First name"]
 * - RETURN le tableau filtré !
 *
 * Exemple :
 * const filteredData = filterDataByStartingLetter(data, "M");
 * console.log(filteredData[0]["First name"]); // "Mia"
 */
export function filterDataByStartingLetter(data, letter) {
  // Écrivez votre code ici
}

/*
 * - Toujours RETURN ce que vous voulez utiliser ensuite
 * - Cherchez sur MDN pour chaque méthode mentionnée : map, filter, sort, startsWith, length
 * - Pensez à tester vos fonctions dans la console du navigateur avec de petites données d'exemple
 * - Chaque fonction peut être testée séparément pour vérifier que le résultat est correct
 * - Essayez de comprendre la structure des objets et des tableaux avant d'écrire du code
 */
