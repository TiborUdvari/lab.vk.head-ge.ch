export function greet(name) {
  console.log("Salut " + name);
}

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
