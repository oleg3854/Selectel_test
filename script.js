// Статический JSON с данными меню
const menuData = {
    groups: [
        {
            id: 'group1',
            name: 'Тип 1',
            items: [
                { id: 'item1', name: 'Item 1', value: 10 },
                { id: 'item2', name: 'Item 2', value: 20 },
                { id: 'item3', name: 'Item 3', value: 30 },
                { id: 'item4', name: 'Item 4', value: 40 }
            ]
        },
        {
            id: 'group2',
            name: 'Тип 2',
            items: [
                { id: 'item5', name: 'Item 5', value: 50 },
                { id: 'item6', name: 'Item 6', value: 60 },
                { id: 'item7', name: 'Item 7', value: 70 },
                { id: 'item8', name: 'Item 8', value: 80 }
            ]
        }
    ]
};

// Функция для обновления информации в заголовке
function updateHeaderInfo() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const count = checkboxes.length;
    
    let totalValue = 0;
    checkboxes.forEach(checkbox => {
        totalValue += parseInt(checkbox.value) || 0;
    });
    
    // Обновляем текст в навигации
    const navRight = document.querySelector('.nav-right');
    if (navRight) {
        navRight.innerHTML = `
            <span>Выбрано пунктов: ${count}</span>
            <span>Общее значение: ${totalValue}</span>
        `;
    }
}

// Функция для обновления левой части заголовка
function updateNavLeft(groupName) {
    const navLeftSpan = document.querySelector('.nav-left span');
    if (navLeftSpan) {
        navLeftSpan.textContent = `Раздел: ${groupName}`;
    }
}

// Функция для создания пунктов меню на основе выбранной группы
function renderItems(groupId) {
    const group = menuData.groups.find(g => g.id === groupId);
    if (!group) return;

    // Обновляем левую часть заголовка
    updateNavLeft(group.name);
    
    const article = document.querySelector('article');
    const form = article.querySelector('form');
    
    // Очищаем текущие пункты (оставляем только форму)
    form.innerHTML = '';
    
    // Создаем новые пункты на основе данных группы
    group.items.forEach(item => {
        const div = document.createElement('div');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = item.id;
        checkbox.name = 'item';
        checkbox.value = item.value;
        
        const label = document.createElement('label');
        label.htmlFor = item.id;
        label.textContent = item.name;
        
        const br = document.createElement('br');
        
        const span = document.createElement('span');
        span.textContent = `Value: ${item.value}`;
        
        div.appendChild(checkbox);
        div.appendChild(label);
        div.appendChild(br);
        div.appendChild(span);
        
        form.appendChild(div);
    });
    
    // Добавляем обработчики событий для новых чекбоксов
    addCheckboxListeners();
    
    // Обновляем информацию в заголовке
    updateHeaderInfo();
}

// Функция для добавления обработчиков событий чекбоксам
function addCheckboxListeners() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateHeaderInfo);
    });
}

// Функция для добавления обработчиков событий радио-кнопкам
function addRadioListeners() {
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                renderItems(this.id);
            }
        });
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем обработчики для радио-кнопок
    addRadioListeners();
    
    // Добавляем обработчики для существующих чекбоксов
    addCheckboxListeners();
    
    // Устанавливаем начальную группу (Тип 1)
    const defaultRadio = document.getElementById('group1');
    if (defaultRadio) {
        defaultRadio.checked = true;
        renderItems('group1');
    }
});