const middleContent = document.querySelector('.middle');

// lholdbox ----------------------------------------------------------

const lholdbox = document.createElement('div'); //<< The pop-up box
lholdbox.classList.add('l-holdbox');

// Tittel ..............................................
const tittel = document.createElement('div');
tittel.id = 'tittel';
const tittelLabel = document.createElement('label');
tittelLabel.setAttribute('for', 'tittelInput');
tittelLabel.textContent = 'Tittel:';
const tittelInput = document.createElement('input');
tittelInput.type = 'text';
tittelInput.id = 'tittel-input';
tittelInput.name = 'tittelInput';
tittel.appendChild(tittelLabel);
tittel.appendChild(tittelInput);
// /Tittel .............................................

// Innhold .............................................
const innhold = document.createElement('div');
innhold.id = 'innhold';
const innholdLabel = document.createElement('label');
innholdLabel.setAttribute('for', 'innholdText');
innholdLabel.textContent = 'Innhold:';
const innholdText = document.createElement('textarea');
innholdText.id = 'innhold-text';
innholdText.name = 'innholdText';
innhold.appendChild(innholdLabel);
innhold.appendChild(innholdText);
// /Innhold ............................................

// Dato ................................................
const dato = document.createElement('div');
dato.id = 'dato';
const datoLabel = document.createElement('label');
datoLabel.setAttribute('for', 'datoInput');
datoLabel.textContent = 'Dato:';
const datoInput = document.createElement('input');
datoInput.type = 'date';
datoInput.id = 'dato-input';
datoInput.name = 'datoInput';
dato.appendChild(datoLabel);
dato.appendChild(datoInput);
// /Dato ...............................................

// Edit & Delete button ................................
const popButton = document.createElement('div') //<< container for edit and delete buttons
popButton.classList.add('pop-button');

const pEdit = document.createElement('button') //<< edit button
pEdit.id = 'p-edit';
pEdit.textContent = 'Edit'

const pDelete = document.createElement('button') //<< delete button
pDelete.id = 'p-delete';
pDelete.textContent = 'Delete';

popButton.appendChild(pEdit);
popButton.appendChild(pDelete);
// /Edit & Delete button ...............................

middleContent.appendChild(lholdbox); //<< lholdbox inside of middle div in main
lholdbox.appendChild(tittel); //<< tittel inside lholdbox
lholdbox.appendChild(innhold); //<< innhold inside lholdbox
lholdbox.appendChild(dato); //<< dato inside lholdbox
lholdbox.appendChild(popButton); //<< button container inside lholdbox




// /lholdbox ---------------------------------------------------------