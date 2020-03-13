import Test.Hspec
import Control.Exception (evaluate)
import Data.List

kNumber :: [Int] -> [[Int]] -> [Int]
kNumber a c = map m c
  where m (f:t:k:[]) = (sort $ slice (f - 1) t a) !! (k - 1)

slice :: Int -> Int -> [Int] -> [Int]
slice _ _ [] = []
slice from to arr = take (to - from) $ drop from arr

main = hspec $ do
  describe "kNumber" $ do
    it "returns k number" $ do
      kNumber [1, 5, 2, 6, 3, 7, 4] [[2, 5, 3], [4, 4, 1], [1, 7, 3]]
        `shouldBe` [5, 6, 3]

  describe "slice" $ do
    it "slices list" $ do
      slice 1 4 [] `shouldBe` []
      slice 3 3 [1, 5, 2, 6, 3, 7, 4] `shouldBe` []
      slice 3 4 [1, 5, 2, 6, 3, 7, 4] `shouldBe` [6]
      slice 1 5 [1, 5, 2, 6, 3, 7, 4] `shouldBe` [5, 2, 6, 3]
