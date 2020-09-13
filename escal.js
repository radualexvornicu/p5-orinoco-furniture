let n=3;
function escalier(n) {
    for (let i = 1; i <= n; i++) {
        let vert = i;
        let line;
        for (let j = 1; j <= n - vert; j++) {
           line += " ";
        }
        for (let j = 1; j <= vert; j++) {
            line += "#";
        }
        console.log(line);
    } }