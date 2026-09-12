const tasksList = [
  [],
  ['Médical'],
  ['Entrevue'],
  ['PSPS'],
  ['Médical', 'Entrevue'],
  ['Médical', 'Entrevue', 'Gambit'],
  ['Entrevue', 'PSPS']
];

for (const tasks of tasksList) {
  let msg = "Courriel de premier contact envoyé au postulant.";
  if (tasks.length > 0) {
    const tasksStr = tasks.length > 1 
      ? tasks.slice(0, -1).join(', ') + ' et ' + tasks[tasks.length - 1] 
      : tasks[0];
    
    const attrib = tasks.length > 1 
      ? 'attribués' 
      : (tasks[0] === 'Entrevue' ? 'attribuée' : 'attribué');
      
    msg += ` ${tasksStr} ${attrib}.`;
  }
  console.log(msg);
}
