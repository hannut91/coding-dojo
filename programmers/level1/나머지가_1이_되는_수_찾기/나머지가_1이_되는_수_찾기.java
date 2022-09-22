class Solution {
  public int solution(int n) {
      return run(n);
  }
  
  private int run(int n) {
      int x = 2;
      while(true) {
          if (n % x == 1) {
              return x;
          }    
          
          x = x + 1;
      }
  }
}