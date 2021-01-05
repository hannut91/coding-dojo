const isPalindrome = string => {
  const palindrome = (left, right) => {
    if (left >= right) {
      return true;
    }

    if (string[left] !== string[right]) {
      return false;
    }

    return palindrome(left + 1, right - 1);
  };

  return palindrome(0, string.length - 1);
};

test('isPalindrome', () => {
  expect(isPalindrome('a')).toBe(true);
  expect(isPalindrome('ab')).toBe(false);
  expect(isPalindrome('aba')).toBe(true);
  expect(isPalindrome('rotator')).toBe(true);
  expect(isPalindrome('ashal')).toBe(false);
});
