class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
let gret = new Greeter('xxxx');
gret.greet();
console.log('xx');

let button = document.createElement('button');
button.textContent = "Say Hello";
button.onclick = function() {
    alert(greeter.greet());
}

document.body.appendChild(button);

interface Y {
  a: string,
  b: string
}
var  X = {
  a: 2,
  b: 'xx'
}


interface Props {
  x: string;
  y: string;
}

// Type of f1 is (arg?: { x?: number, y?: number }) => void
function aaa({x, y}: Props) {
  return `${x} ${y}`;
}
