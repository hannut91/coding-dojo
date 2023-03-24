// 연락처 db.json이 있고, db로 임포트 했다는 가정하에

const db = [
  {
    name: '친구', relation: 'friend', tel: '친구', birth: '4.12',
  },
  {
    name: '가족', relation: 'family', tel: '가족', birth: '4.12',
  },
  {
    name: '기타', relation: 'etc', tel: '기타', birth: '1.10',
  },
];

const sendMessage = messages => fetch('sendMessage.com/message', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(messages),
});

const getBirthMessage = (birth, year) => {
  const [month, date] = birth.split('.');
  const birthDate = new Date(year, month - 1, date);
  const targetDate = new Date(year, 0, 10);

  if (targetDate.getTime() === birthDate.getTime()) return ' 생일 축하 합니다!';
  return '';
};

const relations = {
  friend: (obj, year) => `${obj.name}아 잘지내지? 다음에 볼때까지 건강해.${getBirthMessage(obj.birth, year)}`,
  family: (obj, year) => `사랑합니다. 항상 건강하세요.${getBirthMessage(obj.birth, year)}`,
  etc: (obj, year) => `${obj.name}님, 올 한해는 하시는 일 모두 건승하시고, 건강하세요.${getBirthMessage(obj.birth, year)}`,
};

function solution() {
  const today = new Date();
  const year = new Date().getFullYear();
  const target = new Date(year, 0, 10, 11);

  if (today.getTime() !== target.getTime()) {
    return;
  }

  const messages = db.map(obj => ({
    phone: obj.tel,
    msg: relations[obj.relation](obj, year),
  }));

  sendMessage(messages);
}

solution();
