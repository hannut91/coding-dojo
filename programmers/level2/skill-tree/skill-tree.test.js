const isPossibleSkillTree = (skillTree, target) => {
  if (skillTree[0] !== target[0]) {
    return false;
  }

  return skillTree.includes(target);
}

const validSkillTreesCount = (skillTree, userSkillTrees) => {
  return userSkillTrees.map((i) =>
    i.split('')
      .filter(v => skillTree.includes(v))
      .join('')
  ).filter((i) => isPossibleSkillTree(skillTree, i)).length;
}

console.log(validSkillTreesCount('CBD', ['BACDE', 'CBADF', 'AECB', 'BDA']));

