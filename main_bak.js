import { fileList } from './file_list.js';

const table = document.querySelector('#table tbody');
const dataList = Object.keys(fileList);

dataList.forEach((data) => {
    const row = `<tr role="row">
                            <th>${data}</th>
                            <td>${fileList[data]['GLOBAL']}</td>
                            <td>${fileList[data]['US']}</td>
                            <td>${fileList[data]['EMEA']}</td>
                            <td>${fileList[data]['KR']}</td>
                            <td>${fileList[data]['JP']}</td>
                            <td>${fileList[data]['CN']}</td>
                            <td>${fileList[data]['SSIR']}</td>
                            <td><a class="blue" href="./results/${data}/live_url_output.xlsx" download>Download</a></td>
                        </tr>`;
    table.insertAdjacentHTML('beforeend', row);
});
document.querySelector('.table-count').innerHTML = `${dataList.length} results`;

$(function () {
    $('table').tablesorter({
        sortList: [[0, 1]],
        headers: {
            0: { sorter: 'date' },
            1: { sorter: false },
            2: { sorter: false },
            3: { sorter: false },
            4: { sorter: false },
            5: { sorter: false },
            6: { sorter: false },
            7: { sorter: false },
            8: { sorter: false },
        },
    });
});
