function captureConsoleLog(fn) {
  let output = [];
  const original = console.log;
  console.log = (...args) => output.push(args.join(" "));
  fn();
  console.log = original;
  return output;
}

describe("Exercices JavaScript débutants", function() {

  it("1. helloWorld écrit 'Hello world' dans la console", function() {
    const output = captureConsoleLog(() => helloWorld());
    assert.equal(output[0], "Hello world");
  });

  it("2. greet écrit 'Salut <nom>' dans la console", function() {
    let output = captureConsoleLog(() => greet("Tibor"));
    assert.equal(output[0], "Salut Tibor");

    output = captureConsoleLog(() => greet("Alexia"));
    assert.equal(output[0], "Salut Alexia");
  });

  it("3. describeUser écrit les informations de l'utilisateur", function() {
    let output = captureConsoleLog(() => describeUser("Alice", 23, true));
    assert.equal(output[0], "Alice is 23 years old. Student: true");

    output = captureConsoleLog(() => describeUser("Bob", 30, false));
    assert.equal(output[0], "Bob is 30 years old. Student: false");
  });

  it("4. returnZero retourne 0", function() {
    assert.equal(returnZero(), 0);
  });

  it("5. sumTwoNumbers retourne la somme de deux nombres", function() {
    assert.equal(sumTwoNumbers(3, 4), 7);
    assert.equal(sumTwoNumbers(-2, 5), 3);
  });

  it("6. multiplyTwoNumbers retourne le produit de deux nombres", function() {
    assert.equal(multiplyTwoNumbers(3, 4), 12);
    assert.equal(multiplyTwoNumbers(-2, 5), -10);
  });

  it("7. isNumber retourne true si l'argument est un nombre", function() {
    assert.equal(isNumber(5), true);
    assert.equal(isNumber("hello"), false);
  });

  it("8. average retourne la moyenne de deux nombres", function() {
    assert.equal(average(4, 6), 5);
    assert.equal(average(10, 20), 15);
  });

  it("9. isOlder compare deux âges", function() {
    assert.equal(isOlder(30, 20), true);
    assert.equal(isOlder(15, 18), false);
  });

  it("10. describeTemperature retourne 'Cold', 'Nice' ou 'Hot'", function() {
    assert.equal(describeTemperature(5), "Cold");
    assert.equal(describeTemperature(15), "Nice");
    assert.equal(describeTemperature(30), "Hot");
  });

  it("11. isHEADStudent retourne true si étudiant et à HEAD", function() {
    assert.equal(isHEADStudent(true, true), true);
    assert.equal(isHEADStudent(true, false), false);
    assert.equal(isHEADStudent(false, true), false);
  });

  it("12. printNumberSequence affiche les nombres de 1 à 10", function() {
    const output = captureConsoleLog(() => printNumberSequence());
    assert.deepEqual(output, ["1","2","3","4","5","6","7","8","9","10"]);
  });

  it("13. sumUntil retourne la somme jusqu'à dépasser la limite", function() {
    assert.equal(sumUntil(10), 15); // 1+2+3+4+5 = 15
  });

  it("14. min retourne le minimum de trois nombres", function() {
    assert.equal(min(5, 2, 8), 2);
    assert.equal(min(1, 1, 2), 1);
  });

  it("15. printReverse affiche les nombres de n à 1", function() {
    const output = captureConsoleLog(() => printReverse(5));
    assert.deepEqual(output, ["5","4","3","2","1"]);
  });

  it("16. sumToN retourne la somme de 1 à n", function() {
    assert.equal(sumToN(5), 15);
    assert.equal(sumToN(10), 55);
  });

  it("17. dayOfWeek retourne le jour correspondant à un numéro 1-7", function() {
    assert.equal(dayOfWeek(1), "Monday");
    assert.equal(dayOfWeek(5), "Friday");
    assert.equal(dayOfWeek(7), "Sunday");
  });

  it("18. swapXY échange les valeurs de x et y", function() {
    x = 3; y = 7;
    swapXY();
    assert.equal(x, 7);
    assert.equal(y, 3);
  });

});

