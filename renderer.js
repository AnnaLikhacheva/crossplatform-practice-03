const btnList = document.getElementById('btn-list');
const list = document.getElementById('file-list');
const currentDir = document.getElementById('current-dir');

async function showDir(dir) {
  list.innerHTML = '';
  currentDir.textContent = 'Каталог: ' + dir;
  try {
    const entries = await window.api.listDir(dir);
    // сначала каталоги, затем файлы, внутри групп — по алфавиту
    entries.sort((a, b) => (b.isDir - a.isDir) || a.name.localeCompare(b.name));
    for (const entry of entries) {
      const li = document.createElement('li');
      li.textContent = (entry.isDir ? '📁 ' : '📄 ') + entry.name;
      if (entry.isDir) li.classList.add('dir');
      list.appendChild(li);
    }
    if (entries.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'Каталог пуст';
      list.appendChild(li);
    }
  } catch (err) {
    const li = document.createElement('li');
    li.className = 'error';
    li.textContent = 'Ошибка чтения каталога: ' + err.message;
    list.appendChild(li);
  }
}

// Задание 3: содержимое рабочего каталога
btnList.addEventListener('click', () => showDir('.'));

