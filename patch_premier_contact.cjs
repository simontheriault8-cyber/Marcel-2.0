const fs = require('fs');
const content = fs.readFileSync('src/app.component.ts', 'utf-8');

const targetStr = `    // 0. Premier Contact Note
    if (this.isPremierContactActive()) {
      notes.push("Courriel de premier contact envoyé au postulant.");
    }`;

const replacementStr = `    // 0. Premier Contact Note
    if (this.isPremierContactActive()) {
      let msg = "Courriel de premier contact envoyé au postulant.";
      const tasks: string[] = [];
      if (this.premierContactMedical()) tasks.push("Médical");
      if (this.premierContactEntrevue()) tasks.push("Entrevue");
      if (this.premierContactGambit()) tasks.push("Gambit");
      if (this.premierContactPsps()) tasks.push("PSPS");
      if (this.premierContactSelfie()) tasks.push("Selfie");

      if (tasks.length > 0) {
        const tasksStr = tasks.length > 1 
          ? tasks.slice(0, -1).join(', ') + ' et ' + tasks[tasks.length - 1] 
          : tasks[0];
        
        const attrib = tasks.length > 1 
          ? 'attribués' 
          : (tasks[0] === 'Entrevue' ? 'attribuée' : 'attribué');
          
        msg += \` \${tasksStr} \${attrib}.\`;
      }
      notes.push(msg);
    }`;

if (content.includes(targetStr)) {
  fs.writeFileSync('src/app.component.ts', content.replace(targetStr, replacementStr));
  console.log('Success');
} else {
  console.log('Target string not found');
}
