function captureConsoleLog(fn) {
  let output = [];
  const original = console.log;
  console.log = (...args) => output.push(args.join(" "));
  fn();
  console.log = original;
  return output;
}

describe("Exercices", function() {

  it("1. helloWorld function outputs Hello world to the console", function() {
    const output = captureConsoleLog(() => helloWorld());
    assert.equal(output[0], "Hello world");
  })
  
  it("2. greet", function() {
    const output = captureConsoleLog(() => greet("Tibor"));
    assert.equal(output[0], "Hello world");
  })

});

