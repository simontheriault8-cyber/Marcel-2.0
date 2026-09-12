const fs = require('fs');

const raw = fs.readFileSync('raw_units.txt', 'utf-8');
const lines = raw.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('==') && !l.startsWith('UIC ABBREV') && !l.startsWith('page '));

const units = [];
const states = new Set(['ON', 'QC', 'NS', 'NB', 'MB', 'BC', 'PE', 'SK', 'AB', 'NL', 'NT', 'YT', 'NU', 'NY', 'FL', 'WA', 'CA', 'DC', 'AK', 'DE', 'CO', 'ACT']);
const countries = new Set(['CAN', 'USA', 'GBR', 'ITA', 'DEU', 'AUS']);

for (const line of lines) {
    const parts = line.split(/\s+/);
    if (parts.length < 3) continue;

    const uic = parts[0];
    let country = '';
    if (countries.has(parts[parts.length - 1])) {
        country = parts.pop();
    }

    let pc = '';
    if (parts.length >= 2 && /^[A-Z]\d[A-Z]$/i.test(parts[parts.length - 2]) && /^\d[A-Z]\d$/i.test(parts[parts.length - 1])) {
        pc = parts[parts.length - 2] + ' ' + parts[parts.length - 1];
        parts.pop();
        parts.pop();
    } else if (parts.length >= 1 && /^(\d{5}|\d{9})$/.test(parts[parts.length - 1])) {
        pc = parts.pop();
    }

    let state = '';
    if (parts.length >= 1 && states.has(parts[parts.length - 1].toUpperCase())) {
        state = parts.pop();
    }

    let addressIndex = -1;
    for (let i = 1; i < parts.length; i++) {
        const word = parts[i].toUpperCase().replace(/[.,]/g, '');
        if (word === 'PO' && parts[i+1]?.toUpperCase() === 'BOX') { addressIndex = i; break; }
        if (word === 'CP' && /\d/.test(parts[i+1])) { addressIndex = i; break; }
        if (word === '101' && parts[i+1]?.toUpperCase() === 'COLONEL') { addressIndex = i; break; }
        if (word === 'THE' && parts[i+1]?.toUpperCase() === 'LCOL') { addressIndex = i; break; }
        if (word === 'MGEN' || word === 'GENERAL' || word === 'EDIFICE' || word === 'PIERRE' || word === 'COMPLEXE' || word === 'LÉGION' || word === 'LEGION') { addressIndex = i; break; }
        if (/^\d+$/.test(word) && !parts[i+1]?.toUpperCase().startsWith('BATAILLON') && !parts[i+1]?.toUpperCase().startsWith('RÉGIMENT') && !parts[i+1]?.toUpperCase().startsWith('REGIMENT') && i > 2) {
            addressIndex = i; break;
        }
        if (['RUE', 'AVENUE', 'BOUL', 'BOULEVARD', 'STREET', 'ROAD', 'BLVD', 'PLACE', 'ST', 'AVE', 'DRIVE', 'DR'].includes(word) && i > 2) {
            addressIndex = i; break;
        }
    }

    let abbrevOffname = [];
    let addressCity = [];

    if (addressIndex !== -1) {
        abbrevOffname = parts.slice(1, addressIndex);
        addressCity = parts.slice(addressIndex);
    } else {
        abbrevOffname = parts.slice(1);
    }

    const offnameStarters = new Set([
        'REP', 'BUREAU', 'CENTRE', 'NAVIRE', 'THE', 'DÉTACHEMENT', 'DETACHEMENT', 'LE', 'LA', 'QUARTIER', 
        'SOUS-MINISTRE', 'UNITÉ', 'UNITE', 'CHEF', 'DÉPÔT', 'DEPOT', 'RÉGIMENT', 'REGIMENT', 'BASE', 
        'ÉCOLE', 'ECOLE', 'STATION', 'CADRE', 'GROUPE', 'AGENCE', 'SECTON', 'SECTION', 'ESCADRON', 
        'CLINIQUE', 'DIRECTEUR', 'ASSISTANT', 'COLLÈGE', 'COLLEGE', 'COMMANDEMENT', 'CONSEILLER', 
        'CORPS', 'ÉQUIPE', 'EQUIPE', 'FORCE', 'INSTALLATION', 'LISTE', 'PROGRAMME', 'RECHERCHE', 
        'REPRÉSENTANT', 'RÉSEAU', 'RESEAU', 'SERVICE', 'SERVICES', 'SYSTÈME', 'SYSTEME', 'ÉTAT-MAJOR', 
        'ETAT-MAJOR', 'ÉTABLISSEMENT', 'ETABLISSEMENT', '1ER', '1RE', '2E', '3E', '4E', '5E', '6E', '7E', '8E', '9E', '10E',
        '11E', '12E', '22E', '32E', '33E', '34E', '35E', '36E', '37E', '38E', '39E', '41E',
        'DIRECTOR', 'CANADIAN', 'ROYAL', 'NATIONAL', 'JOINT', 'MEDICAL', 'MILITARY', 'NAVAL', 'AIR'
    ]);

    let offnameIndex = 1;
    for (let i = 0; i < Math.min(abbrevOffname.length - 1, 5); i++) {
        const word = abbrevOffname[i].toUpperCase().replace(/[.,()]/g, '');
        if (offnameStarters.has(word) || /^\d+E$/.test(word)) {
            offnameIndex = i;
            break;
        }
    }
    
    if (offnameIndex === 1 && abbrevOffname.length > 3) {
        offnameIndex = 2;
    }

    const abbrev = abbrevOffname.slice(0, offnameIndex).join(' ');
    const offname = abbrevOffname.slice(offnameIndex).join(' ');
    
    const addressStr = addressCity.join(' ');
    const statePc = [state, pc].filter(x => x).join(' ');

    const fullAddressPlain = [addressStr, statePc, country].filter(x => x).join('\\n');
    const fullAddressHtml = [addressStr, statePc, country].filter(x => x).join('<br>');

    units.push({
        id: uic,
        uic: uic,
        abbrevCFR: abbrev,
        officialName: offname || abbrev,
        addressHtml: fullAddressHtml,
        addressPlain: fullAddressPlain
    });
}

const uniqueUnits = [];
const seen = new Set();
for (const u of units) {
    if (!seen.has(u.id)) {
        seen.add(u.id);
        uniqueUnits.push(u);
    }
}

const output = `export interface UnitSession {
  id: string;
  uic: string;
  abbrevCFR: string;
  officialName: string;
  addressHtml: string;
  addressPlain: string;
}

export const UNITS_LIST: UnitSession[] = ${JSON.stringify(uniqueUnits, null, 2)};
`;

fs.writeFileSync('src/app/data/units.data.ts', output);
console.log('Units processed successfully:', uniqueUnits.length);
