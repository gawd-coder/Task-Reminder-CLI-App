const timeUnits = ["seconds","minutes","hours"];
const multipliers = [1000,60*1000,3600*1000];

let amount = null;
let message = null;
let timeUnit = null;

const write = process.stdout.write.bind(process.stdout);

function processInput(input){
    if(message == null){
        askForMessage(input);
        input = null;
    };
    if(message != null && timeUnit == null){
        askForTimeUnit(input);
        input = null;
    }
    if(timeUnit != null && amount == null){
        askForAmount(input);
    }
}

function askForMessage(input){
    if(input == null){
        write("What do you wanted to be reminded of? > ");
        return;
    }
    if(input.length == 0){
        write('Message cannot be empty. Please try again. > ');
        return;
    }
    message = input;
}

function askForTimeUnit(input){
    if(input == null){
        console.log("What unit?");
        timeUnits.forEach(
            (unit,index) => console.log(`${index+1} - ${unit}`)
        );
        write("> ");
        return;
    }
    const index = parseInt(input,10);
    if(isNaN(index) || index <= 0 || index > timeUnits.length){
        write(`Sorry, ${input} is not valid.PLease try again`);
        return;
    }
    timeUnit = index - 1;
    console.log(`Picked: ${timeUnits[timeUnit]}`);
}

function askForAmount(input){
    if(input == null){
        write(`In how many ${timeUnits[timeUnit]} ? > `);
        return;
    }
    const number = parseInt(input, 10);
    if(isNaN(number)){
        write(`Sorry, ${input} is not valid.Try again. > `);
        return;
    }
    amount = number;
    setTimeAndRestart();
}

function setTimeAndRestart(){
    const currentMessage = message;
    write(`Setting reminder: ${message} in ${amount} ${timeUnits[timeUnit]} from now.\n`);
    let timerMessage = `\n\x07Time to ${currentMessage}\n>`;
    setTimeout(() => 
    write(timerMessage),
    amount*multipliers[timeUnit]);
    amount = message = timeUnit = null;
    askForMessage();  
}
process.stdin.on("data", (data) => 
    processInput(data.toString().trim()));
askForMessage();    