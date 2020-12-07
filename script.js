const result = document.querySelector('#result p');
const btnAdd = document.querySelector('#btn-add');
const fieldTimes = document.querySelector('#field-times');

let timeInputIndex = 0;

const handleCreateTimeInput = () => {
  const trElement = document.createElement('tr');
  trElement.classList.add('input-wrapper', 'secondary', 'input-' + timeInputIndex++);

  trElement.innerHTML = `
    <td>
      <button class="btn operator">-</button>
    </td>
    <td>
      <input type="time" class="input">
    </td>
    <td>
      <button class="btn btn-delete" onclick="handleRemoveChild()">x</button>
    </td>
  `;

  return trElement;
}

const addField = () => {
  const timeField = handleCreateTimeInput();
  fieldTimes.appendChild(timeField);
}

btnAdd.addEventListener('click', addField);

// TODO: Remover Campo
const handleRemoveChild = () => {
  const element = document.querySelector('.input-' + (timeInputIndex-1));
  timeInputIndex--;
  element.remove();
}

// TODO: Mudar operador

// TODO: Calcular

// TODO: Adicionar resultado