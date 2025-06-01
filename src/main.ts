import {startREPL} from "./repl.js"
import {initState} from "./state.js";

async function main() {
    const cacheInterval = 10_000 // 10 secongs
    
    const state = initState(cacheInterval)

    await startREPL(state)
}

await main();

