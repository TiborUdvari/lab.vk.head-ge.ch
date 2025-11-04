/*
 * A l'aide de fetch telechargez les swiss
 * https://lab.vk.head-ge.ch/assets/swiss-baby-names/girls.json
 * Notez que cette fonction est de type async
 */
export async function loadData() {
  const url = "https://lab.vk.head-ge.ch/assets/swiss-baby-names/girls.json";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

/* 
 * Ici vous aurez les données téléchargéz précédemment en entrée
 * Utilisez la fonction map pour retourner que les noms
 * La forme de nos données finale devrait être une liste contenant que les noms
 * Pour les types objet utilisez la syntaxe de type [] pour accéder, normalement on peut utiliser la notation de point
 */
export function mapToNames(data) {
  return data.map(data => data["First name"]);
}

export function sortNamesAlphabetically(names){
  return names.sort();
}

/* 
 * Retournez la longueur des données
 */
export function lengthOfData(data) {
  return data.length;
}

/*
 * Utilisez la fonction filter et la function startsWith de chaines de caracteres pour filter que les noms qui commencent avec une lettre donnée 
 * en entrée il aura un tableau avec les noms uniquement, pas tous les données d'une personne
 */
export function filterNamesByStartingLetter(names, letter) {
  return names.filter(name => name.startsWith(letter));
}

/* 
 * 
 */
export function filter2024Data(data) {
  return data.filter(data => data["2024"] > 0) 
}

export function filterDataByStartingLetter(data, letter) {
  return data.filter(dataPoint => dataPoint["First name"].startsWith(letter));
}
