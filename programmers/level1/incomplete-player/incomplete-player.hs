import Test.Hspec
import Control.Exception (evaluate)
import qualified Data.Map.Strict as Map
import Data.List
import Data.Maybe

notFishedPlayer :: [String] -> [String] -> String
notFishedPlayer participants completions =
    head . Map.keys $ Map.differenceWith f m m2
      where f al ar = if al == ar then Nothing else Just (al - ar)
            m = createMap participants
            m2 = createMap completions

createMap :: [String] -> (Map.Map String Integer)
createMap a = foldl (\m v -> Map.insertWith (+) v 1 m) Map.empty a

main = hspec $ do
  describe "notFishedPlayers" $ do
    it "returns not finished player" $ do
      notFishedPlayer ["leo", "kiki", "eden"] ["eden", "kiki"]
        `shouldBe` "leo"
      notFishedPlayer 
        ["marina", "josipa", "nikola", "vinko", "filipa"]
        ["josipa", "filipa", "marina", "nikola"] 
        `shouldBe` "vinko"
      notFishedPlayer 
        ["mislav", "stanko", "mislav", "ana"] 
        ["stanko", "ana", "mislav"] 
        `shouldBe` "mislav"

  describe "createMap" $ do
    it "returns Data.Map" $ do
       let m = Map.fromList [("leo", 2), ("kiki", 1), ("eden", 1)]
       createMap ["leo", "leo", "kiki", "eden"] `shouldBe` m
