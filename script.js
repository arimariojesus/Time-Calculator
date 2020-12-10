const resultField = document.querySelector('#result p');
const btnAdd = document.querySelector('#btn-add');
const btnCalc = document.querySelector('#calc');
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
      data-index="${indexField}"
      value="sum">+</button>
    </td>
    <td>
      <input 
      type="time" 
      class="input" 
      step="2" 
      value="00:00:00"
      id="index-${indexField}">
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
  const valuesOperations = ['sum', 'sub', 'mult', 'div'];

  element.innerHTML = operators[index];
  element.setAttribute('data-operator', index);
  element.setAttribute('value', valuesOperations[index]);
}

const handleMultiplicationOrDivision = (element, indexOperator) => {
  const indexInput = element.getAttribute('data-index');
  const currentInput = document.querySelector('#index-'+indexInput);

  if (indexOperator != 2 && indexOperator != 3){
    currentInput.setAttribute('type', 'time');
    currentInput.value = '00:00:00';
  }else {
    currentInput.removeAttribute('value');
    currentInput.setAttribute('type', 'number');
    currentInput.setAttribute('min', '1');
    currentInput.setAttribute('max', '1000');
    currentInput.value = '2';
  }
}

const changeOperator = element => {
  let indexOperator = element.getAttribute('data-operator');
  indexOperator = indexOperator < 3 ? ++indexOperator : 0;

  nextOperator(element, indexOperator);
  handleMultiplicationOrDivision(element, indexOperator);
}

// TODO: Calcular
const OperationsReduce = {
  'sum': (op1, op2) => {
    return op1 + op2
  },
  'sub': (op1, op2) => {
    return op1 - op2
  },
  'mult': (op1, op2) => {
    return op1 * op2
  },
  'div': (op1, op2) => {
    return op1 / op2
  }
};

const handleConvertDecimal = value => {
  let r = Math.round((value / (100 / 60)) * 100);
  return r;
}

const convertToHours = (total) => {
  let seconds = (total / 60) - parseInt(total / 60);
  seconds = handleConvertDecimal(seconds);
  total = parseInt(total / 60);

  let minutes = (total / 60) - parseInt(total / 60);
  minutes = handleConvertDecimal(minutes);
  total = parseInt(total / 60);

  let hours = total;

  return {
    hours,
    minutes,
    seconds
  }
}

const convertToSeconds = (arr) => {
  if (arr.length === 1) {
    return parseInt(arr[0])
  }else if (arr.length === 2) {
    return (parseInt(arr[0]) * 60 + parseInt(arr[1])) * 60;
  }else if (arr.length === 3) {
    return ((parseInt(arr[0]) * 60 + parseInt(arr[1])) * 60) + parseInt(arr[2]);
  }
}

const handleCalculation = () => {
  const inputs = document.querySelectorAll('.input');
  const valuesOperators = Array.from(document.querySelectorAll('.operator')).map(operator => operator.value);
  let valuesInput = [];
  
  inputs.forEach(input => {
    valuesInput.push(input.value.split(':'));
  });
  
  valuesInput = valuesInput.map(value => convertToSeconds(value));
  
  const result = valuesInput.reduce((acc, curr, index) => {
    let r = OperationsReduce[valuesOperators[index-1]](acc, curr);
    return r;
  })

  console.log(valuesInput);
  console.log(convertToHours(result));
}

btnCalc.addEventListener('click', handleCalculation);

// TODO: Adicionar resultado