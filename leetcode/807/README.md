# Max Increase to Keep City Skyline

## 1. 이해

2차원 배열이 주어지는데 각 숫자는 그 자리에 있는 빌딩의 최고층을 나타낸다.
위에서 아래로 볼 때 최고층 높이와 옆에서 오른쪽으로 볼 때 최고층 높이가 있는데 
이를 넘지 않으면서 각 건물을 최고층으로 높여라.

## 2. 계획

먼저 위에서 아래로 봤을 때 가장 높은 층 목록을 만든다.
왼쪽에서 오른쪽으로 봤을 떄 가장 높은 층 목록을 만든다.
배열을 돌며 각 높은 층 보다 작거나 같을 떄 까지 높인다.

## 3. 실행

## 4. 회고

처음에는 for반복문으로 풀었다가 함수형 프로그래밍으로 변경해 보았다. 코드 줄
수가 거의 1/2로 줄었지만 좀더 이해하기 어려운 것 같다. 이중배열이다보니 오히려
row와 column을 변수명으로 표현하는게 더 이해가 잘 될수도 있는 것 같다.

### 다른곳에 어떻게 쓸 수 있을까?

일단 함수형 프로그래밍 reduce를 이용해서 구현한 최댓값 부분은 다른 문제에서도 
쓸 수 있을 것 같다. sum이라는 변수를 안써도 되니까 깔끔한 것 같다.

## Sources

- <https://leetcode.com/problems/max-increase-to-keep-city-skyline>
