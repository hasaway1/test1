const API = 'http://sample.bmaster.kro.kr/contacts'

function getPageno() {
  const params = new URLSearchParams(location.search);
  return params.get('pageno')===null? 1 : params.get('pageno');
}

async function fetch(pageno, pagesize=10) {
  const url = `${API}?pageno=${pageno}&pagesize=${pagesize}`;
  try {
    return await $.ajax(url);
  } catch(err) {
    console.log(err);
    return null;
  }
}

function printContacts(contacts) {
  const $tbody = $('#tbody');
  for(const c of contacts) {
    const html =`
      <tr>
        <td>${c.no}</td>
        <td>${c.name}</td>
        <td>${c.address}</td>
        <td>${c.tel}</td>
      </tr>
    `;
    $tbody.append(html);
  }
}

function getPagination({pageno, pagesize, totalcount, blockSize=5}) {
  const countOfPage = Math.ceil(totalcount/pagesize);
  const prev = Math.floor((pageno-1)/blockSize) * blockSize;
  const start = prev + 1;
  let end = prev + blockSize;
  let next = end + 1;
  if(end>=countOfPage) {
    end = countOfPage;
    next = 0;
  }
  return {prev, start, end, next, pageno};
}

// 구조분해할당
function printPagination({prev, start, end, next, pageno}) {
  const $p = $('#pagination');
  if(prev>0) {
    const html=`
      <li class="page-item">
        <a class="page-link" href="list.html?pageno=${prev}">이전으로</a>
      </li>
    `;
    $p.append(html);
  }
  for(let i=start; i<=end; i++) {
    let className = 'page-item';
    if(i===pageno)
      className = 'page-item active';
    const html=`
      <li class="${className}">
        <a class="page-link" href="list.html?pageno=${i}">${i}</a>
      </li>
    `;
    $p.append(html);
  }
  if(next>0) {
    const html=`
      <li class="page-item">
        <a class="page-link" href="list.html?pageno=${next}">다음으로</a>
      </li>
    `;
    $p.append(html);
  }
}