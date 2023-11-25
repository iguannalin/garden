window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  const container = document.getElementById("container");
  let garden = "";
  function createElement(initial, left=0, top=0, size=0) {
    if (initial && Math.random()>0.8) return;
    const pre = document.createElement("pre");
    pre.innerHTML = "🌳";
    let nleft = initial ? getRandomInt(-100,window.innerWidth-100) : +(left)+2;
    let ntop = initial ? getRandomInt(-100,window.innerHeight-100): top;
    let nsize = initial ? getRandomInt(5, 25) : size;
    pre.style.left = nleft+"px";
    pre.style.top = ntop+"px";
    pre.style.fontSize = nsize+"px";
    if (garden.length > 0) garden+="**"; // separator
    const cactus = `${nleft},${ntop},${nsize}`;
    garden+=cactus;
    container.appendChild(pre);
  }

  function moveElements() {
    atob(container.dataset.garden).split("**").filter((ch)=>ch).forEach((el)=>{
      const pieces=el.split(",");
      if (pieces.length < 3) return;
      createElement(false, pieces[0], pieces[1], pieces[2]);
    });
  }

  if (container.dataset.garden) moveElements();
  else for(let x=0;x<20;x++) createElement(true);

  function handleTap(e) {
    e.preventDefault();
    const text = `<!DOCTYPE html><html> <head> <title>garden</title> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <link rel="stylesheet" href="https://iguannalin.github.io/garden/index.css"/><script src=https://iguannalin.github.io/garden/index.js></script></head> <body> <div id="container" data-garden=${btoa(garden)}></div></body></html>`;
    const blob = new Blob([text], {type: "text/html"});
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
    window.URL.revokeObjectURL(blobUrl);
  }

  document.addEventListener('touchstart', handleTap, {passive: false});
  document.body.addEventListener('click', handleTap);
});