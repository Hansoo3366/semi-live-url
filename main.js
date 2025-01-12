// import { fileList } from './file_list.js';
import { fetchData } from './db.js';

async function loadTable() {
    try {
        // fetchData 호출 및 데이터 로드
        const fileList = await fetchData();
        const dataList = Object.keys(fileList);

        // 테이블 요소 선택
        const table = document.querySelector('#table tbody');
        dataList.forEach((data) => {
            const row = `<tr role="row">
                <th>${data}</th>
                <td>${fileList[data]['Global'] || ''}</td>
                <td>${fileList[data]['US'] || ''}</td>
                <td>${fileList[data]['EMEA'] || ''}</td>
                <td>${fileList[data]['KR'] || ''}</td>
                <td>${fileList[data]['JP'] || ''}</td>
                <td>${fileList[data]['CN'] || ''}</td>
                <td>${fileList[data]['SSIR'] || ''}</td>
                <td><a class="blue" href="./results/${data}/live_url_output.xlsx" download>Download</a></td>
            </tr>`;
            table.insertAdjacentHTML('beforeend', row);
        });

        // 테이블 카운트 업데이트
        document.querySelector('.table-count').innerHTML = `${dataList.length} results`;

        // TableSorter 초기화
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
    } catch (error) {
        console.error('Error loading table:', error);
    }
}

// 테이블 로드 함수 호출
loadTable();
