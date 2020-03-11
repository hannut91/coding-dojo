import Test.Hspec
import Control.Exception (evaluate)
import Data.List

people :: [[Int]]
people = map cycle [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
  ]

exam :: [Int] -> [Int]
exam answers = foldl fol [] $ zip [1..] p
  where
        fol acc (i, cur) = if cur == max then acc ++ [i] else acc
        max = maximum p
        p = map correctCounts people
        correctCounts person = foldl (\acc (a, b) ->
            if a == b then acc + 1 else acc
          ) 0 $ zip person answers

main = hspec $ do
  describe "exam" $ do
    it "returns numbers of person who has max correct answer" $ do
      exam [1, 2, 3, 4, 5] `shouldBe` [1]
      exam [1, 3, 2, 4, 2] `shouldBe` [1, 2, 3]
