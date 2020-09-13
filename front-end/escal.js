let n=3;
console.log('test1');
    for (let i = 1; i <= n; i++) {
        let vert = i;
        console.log('test');
        let line;
        for (let j = 1; j <= n - vert; j++) {
           line += " ";
        }
        for (let j = 1; j <= vert; j++) {
            line += "#";
        }
        console.log(line);
    } 