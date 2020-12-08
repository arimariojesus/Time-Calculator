const result = document.querySelector('#result p');
const btnAdd = document.querySelector('#btn-add');
const fieldTimes = document.querySelector('#field-times');

let indexField = 1;

const handleCreateTimeInput = () => {
  const trElement = document.createElement('tr');
  trElement.classList.add('input-wrapper', 'field-' + indexField);

  trElement.innerHTML = `
    <td>
      <button class="btn operator" 
      onclick="changeOperator(this)"
      data-operator="0"
      data-index="${indexField}">+</button>
    </td>
    <td>
      <input type="time" class="input" step="2" id="index-${indexField}">
    </td>
    <td>
      <button id="${indexField}" class="btn btn-delete" onclick="handleRemoveChild(this)">x</button>
    </td>
  `;
  indexField++;
  return trElement;
}

const addField = () => {
  const timeField = handleCreateTimeInput();
  fieldTimes.appendChild(timeField);
}

btnAdd.addEventListener('click', addField);

// TODO: Remover Campo
const handleRemoveChild = field => {
  const indexElement = field.id;
  const element = document.querySelector('.field-' + (indexElement));

  element.remove();
}

// TODO: Mudar operador
const nextOperator = (element, index) => {
  const operators = ['+', '-', 'x', '/'];
  element.innerHTML = operators[index];
  element.setAttribute('data-operator', index);
}

const handleMultiplicationOrDivision = (element, indexOperator) => {
  const indexInput = element.getAttribute('data-index');
  const currentInput = document.querySelector('#index-'+indexInput);

  if (indexOperator != 2 && indexOperator != 3){
    currentInput.setAttribute('type', 'time');
  }else {
    currentInput.setAttribute('type', 'number');
    currentInput.setAttribute('min', '1');
    currentInput.setAttribute('max', '1000');
  }
}

const changeOperator = element => {
  let indexOperator = element.getAttribute('data-operator');
  indexOperator = indexOperator < 3 ? ++indexOperator : 0;

  nextOperator(element, indexOperator);
  handleMultiplicationOrDivision(element, indexOperator);
}

// TODO: Calcular

// TODO: Adicionar resultado

const elt = document.querySelector('#elt');