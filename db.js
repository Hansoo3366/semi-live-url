// API URL
const apiUrl = 'https://semi-live-url-api.vercel.app/api/db';

// 데이터를 가져와 화면에 표시하는 함수

export async function fetchData() {
    let fileList = {};
    try {
        // API 호출
        const response = await fetch(apiUrl);

        // 응답 데이터를 JSON으로 변환
        const data = await response.json();
        data.forEach((item) => {
            const date = item.date.split('T')[0];
            if (!fileList[date]) {
                fileList[date] = {}; // 날짜 초기화
            }
            fileList[date][item.country] = item.value; // 값 설정
        });

        return fileList;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
