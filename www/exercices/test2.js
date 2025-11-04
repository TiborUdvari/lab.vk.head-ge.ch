function captureConsoleLog(fn) {
  let output = [];
  const original = console.log;
  console.log = (...args) => output.push(args.join(" "));
  fn();
  console.log = original;
  return output;
}

describe("Exercices JavaScript débutants", function() {

  it("2. greet écrit 'Salut <nom>' dans la console", function() {
    let output = captureConsoleLog(() => greet("Tibor"));
    assert.equal(output[0], "Salut Tibor");

    output = captureConsoleLog(() => greet("Alexia"));
    assert.equal(output[0], "Salut Alexia");
  });
  
  it("Downloads and returns", async function() {
    const data = await loadData();  

    chai.assert.isArray(data, "Result should be an array"); 

    console.log(data);
  });

});

window.requestAnimationFrame(() => mocha.run());

