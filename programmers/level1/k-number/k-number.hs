import Test.Hspec
import Control.Exception (evaluate)
import Data.List

-- Using Monad
kNumber :: [Int] -> [[Int]] -> [Int]
kNumber a c = do
  (f:t:k:[]) <- c
  x <- [slice (f - 1) t a]
  y <- [sort x]
  z <- [y !! (k - 1)]
  return z

slice :: Int -> Int -> [Int] -> [Int]
slice from to arr = do
  x <- [drop from arr]
  y <- take (to - from) x
  return y

-- Normal way
-- kNumber :: [Int] -> [[Int]] -> [Int]
-- kNumber a c = map m c
--   where m (f:t:k:[]) = (sort $ slice (f - 1) t a) !! (k - 1)

-- slice :: Int -> Int -> [Int] -> [Int]
-- slice _ _ [] = []
-- slice from to arr = take (to - from) $ drop from arr

-- Using Applicative Functor
-- kNumber :: [Int] -> [[Int]] -> [Int]
-- kNumber a c = map m c
--   where m (f:t:k:[]) = (sort $ slice (f - 1) t a) !! (k - 1)

-- slice from to arr = take <$> Just (to - from)
--   <*> (drop <$> Just from <*> Just arr)

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
