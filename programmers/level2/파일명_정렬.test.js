/**
 * ## 이해
 *
 * 미지의 것: 파일명 정렬 프로그램을 구현하라.
 * 자료
 *   - 파일명에 포함된 숫자를 반영한 정렬 기능 -> 숫자가 포함되어있을 경우,
 *     숫자가 작은순에서 큰 순르오 정렬 기능 ["img1.png", "img2.png", "img10.png", img12.png"]
 *   - 파일명은 크게 HEAD, NUMBER, TAIL의 세 부분으로 구성된다.
 *   - HEAD는 문자다. 한 글자 이상이다.
 *   - NUMBER는 한 글자에서 최대 다섯 글자 사이의 연속된 숫자로 이루어져 있으며, 앞쪽에 0이
 *     올 수 있다. 0부터 99999 사이의 숫자로, 00000이나 0101 등도 가능하다.
 *   - TAIL은 그 나머지 부분으로, 여기에는 숫자가 다시 나타날 수도 있으며,
 *     아무 글자도 없을 수 있다.
 * 조건
 *   - 소스 파일 저장소에 저장된 파일명은 100 글자 이내로, 영문 대소문자, 숫자, 공백(" "),
 *     마침표("."), 빼기 부호("-")만으로 이루어져 있다
 *   - 파일명은 영문자로 시작하며, 숫자를 하나 이상 포함하고 있다.
 *
 * ## 계획
 *   - 들어온 문자열을 HEAD, NUMBER, TAIL로 나눈다.
 *   - 먼저 HEAD순으로 정렬한다.
 *   - HEAD가 같은 경우에는 NUMBER로 정렬
 *   - 남은거 합쳐서 반환
 * ## 실행
 *
 * ## 반성
 *
 */

const sort = convertedFiles => {
  const r = [...convertedFiles].sort((a, b) => {
    if (a[0].toLowerCase() > b[0].toLowerCase()) {
      return 1;
    }

    if (a[0].toLowerCase() < b[0].toLowerCase()) {
      return -1;
    }

    if (Number(a[1]) > Number(b[1])) {
      return 1;
    }

    if (Number(a[1]) < Number(b[1])) {
      return -1;
    }
    return 0;
  });

  return r;
};

const convert = files => files.map(file => {
  const head = file.match(/^[a-zA-Z\s.-]+/)[0];
  const number = file.slice(head.length).match(/\d{1,5}/)[0];
  const tail = file.slice(head.length + number.length).match(/.*/)[0];
  return [head, number, tail];
});

const run = files => {
  const convertedFiles = convert(files);
  const sortedFiles = sort(convertedFiles);
  return sortedFiles.map(it => it.join(''));
};

test('sort', () => {
  expect(sort([
    ['b', '12', '.png'],
    ['a', '10', '.png'],
  ])).toEqual([
    ['a', '10', '.png'],
    ['b', '12', '.png'],
  ]);
  expect(sort([
    ['a', '12', '.png'],
    ['a', '10', '.png'],
  ])).toEqual([
    ['a', '10', '.png'],
    ['a', '12', '.png'],
  ]);
  expect(sort([
    ['A', '12', '.png'],
    ['a', '10', '.png'],
  ])).toEqual([
    ['a', '10', '.png'],
    ['A', '12', '.png'],
  ]);
  expect(sort([
    ['a', '0011', '.png'],
    ['a', '10', '.png'],
  ])).toEqual([
    ['a', '10', '.png'],
    ['a', '0011', '.png'],
  ]);
  expect(sort([
    ['a', '0011', '.png'],
    ['a', '11', '.png'],
  ])).toEqual([
    ['a', '0011', '.png'],
    ['a', '11', '.png'],
  ]);
});

test('convert', () => {
  expect(convert([
    'img12.png',
    'img10.png',
    'foo010bar020.zip',
    'img111111',
  ])).toEqual([
    ['img', '12', '.png'],
    ['img', '10', '.png'],
    ['foo', '010', 'bar020.zip'],
    ['img', '11111', '1'],
  ]);
});

test('run', () => {
  expect(run([
    'img12.png', 'img10.png', 'img02.png', 'img1.png', 'IMG01.GIF', 'img2.JPG',
  ])).toEqual(
    ['img1.png', 'IMG01.GIF', 'img02.png', 'img2.JPG', 'img10.png', 'img12.png'],
  );
  expect(run(['F-5 Freedom Fighter', 'B-50 Superfortress', 'A-10 Thunderbolt II', 'F-14 Tomcat'])).toEqual(['A-10 Thunderbolt II', 'B-50 Superfortress', 'F-5 Freedom Fighter', 'F-14 Tomcat']);
});
