import fs from "node:fs";

const slowCode = `module Slow exposing (..)


type alias Fat =
    { ${Array.from({length: 2000}, (_, i) => `f${i} : String`).join("\n    , ")}
    }


${Array.from({length: 2000}, (_, i) => `
f${i} : Fat -> Fat
f${i} = identity
`.trim()).join("\n\n\n")}
`.trim();

const fastCode = `module Fast exposing (..)


type Fat = Fat
    { ${Array.from({length: 2000}, (_, i) => `f${i} : String`).join("\n    , ")}
    }


${Array.from({length: 2000}, (_, i) => `
f${i} : Fat -> Fat
f${i} = identity
`.trim()).join("\n\n\n")}
`.trim();

fs.writeFileSync("src/Slow.elm", slowCode);
fs.writeFileSync("src/Fast.elm", fastCode);
