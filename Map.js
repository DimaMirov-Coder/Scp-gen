let startRoom = 45;
let floorplan = [];
let i;
let ochered = [];
let endrooms = [];
let maxrooms = 50;
let minrooms = 20;
let placed;
let floorplanCount;
let x;
let loop;
let maxloop = 2, bigRoom = 0;

function start() {
  for (let j = 0; j < 100; j++) {
  floorplan[j] = 0;
}
floorplanCount = 0;
endrooms.length = 0;
nAdd(startRoom);
ochered = [startRoom];
  
  loop = 0;
  while (floorplanCount <= maxrooms && ochered.length > 0) {
  i = ochered.shift();
  placed = false;
  x = i % 10; 
  
   if (x > 0) 
   visit(i - 1);
   if (x < 9) 
   visit(i + 1);
   if (i > 9)
   visit(i - 10);
   if (i < 90)
   visit(i + 10);
   }
  if (loop < maxloop) {
  start.apply(this); 
  return;
  }
  if (floorplanCount < minrooms) {
  start.apply(this);
  return;
  }
}

function nAdd(i) {
    floorplan[i] = 5;
    floorplanCount++;
    ochered.push(i);
    x1 = i % 10;
  if (x1 > 0 && floorplan[i - 1] < 5) floorplan[i - 1] += 1;
  if (x1 < 9 && floorplan[i + 1] < 5) floorplan[i + 1] += 1;
  if (i > 9 && floorplan[i - 10] < 5) floorplan[i - 10] += 1;
  if (i < 90 && floorplan[i + 10] < 5) floorplan[i + 10] += 1;
}

function nCount(i) {
  let x1 = i % 10;
  let count = 0;
  if (x1 > 0 && floorplan[i-1] > 4)
  count++;
  if (x1 < 9 && floorplan[i+1] > 4)
  count++;
  if (floorplan[i-10] > 4)
  count++;
  if (floorplan[i+10] > 4)
  count++;
  if (count == 1) {
    return true;
  } else {return false;}
}

function visit(j) {
  if (floorplan[j] == undefined || floorplan[j] > 4)
        return;

    if (Math.random() < 0.5 && j != startRoom + 10)
        return;
        
    if (floorplan[j] > 1 && loop >= maxloop)
        return;
        
    if (floorplanCount >= maxrooms)
        return;
  
    if (loop < maxloop) {
      x1 = j % 10;
         if (x1 > 0 && floorplan[j-1] + floorplan[j+9] + floorplan[j+10] > 14) {
     return;      
    }
    else if (x1 < 9 && floorplan[j+10] + floorplan[j+11] + floorplan[j+1] > 14) {
     return;
    }
    else if (x1 < 9 && floorplan[j+1] + floorplan[j-9] + floorplan[j-10] > 14) {
     return;
    }
    else if (x1 > 0 && floorplan[j-10] + floorplan[j-11] + floorplan[j-1] > 14) {
     return;
    }
    else if (floorplan[j] > 1) {
    nAdd(j);
    floorplan[j] = 7;
    loop++;
    } }
     if (floorplan[j] < 2)
    nAdd(j);
    return;
}

start();
for (let j = 0; j < 100; j++) {
  if (floorplan[j] == 5 && nCount(j)) {
  floorplan[j] = 6;
  endrooms.push(j);
}
  if (floorplan[j] < 5)
  floorplan[j] = " ";
} 
console.log("Карта:");
for (let j = 0; j < floorplan.length; j += 10) {
  console.log(floorplan.slice(j, j + 10));
}
console.log("Колец: " + loop);
console.log("Биг рум: " + bigRoom);
console.log("Конечные комнаты: " + endrooms);
console.log("Количество: " + floorplanCount);
