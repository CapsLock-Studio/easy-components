import type { DataNode, Key } from 'rc-tree/lib/interface'

enum Record {
  None,
  Start,
  End,
}

function traverseNodesKey(
  treeData: DataNode[],
  callback: (key: Key | number | null, node: DataNode) => boolean,
) {
  function processNode(dataNode: DataNode) {
    const { key, children } = dataNode
    if (callback(key, dataNode) !== false) {
      traverseNodesKey(children || [], callback)
    }
  }

  treeData.forEach(processNode)
}

/** 計算選中範圍，只考慮expanded情況以最佳化性能 */
export function calcRangeKeys({
  treeData,
  expandedKeys,
  startKey,
  endKey,
}: {
  treeData: DataNode[]
  expandedKeys: Key[]
  startKey?: Key
  endKey?: Key
}): Key[] {
  const keys: Key[] = []
  let record: Record = Record.None

  if (startKey && startKey === endKey) {
    return [startKey]
  }
  if (!startKey || !endKey) {
    return []
  }

  function matchKey(key: Key) {
    return key === startKey || key === endKey
  }

  // @ts-ignore
  traverseNodesKey(treeData, (key: Key) => {
    if (record === Record.End) {
      return false
    }

    if (matchKey(key)) {
      // Match test
      keys.push(key)

      if (record === Record.None) {
        record = Record.Start
      } else if (record === Record.Start) {
        record = Record.End
        return false
      }
    } else if (record === Record.Start) {
      // Append selection
      keys.push(key)
    }
    return expandedKeys.includes(key)
  })

  return keys
}

export function convertDirectoryKeysToNodes(treeData: DataNode[], keys: Key[]) {
  const restKeys: Key[] = [...keys]
  const nodes: DataNode[] = []
  // @ts-ignore
  traverseNodesKey(treeData, (key: Key, node: DataNode) => {
    const index = restKeys.indexOf(key)
    if (index !== -1) {
      nodes.push(node)
      restKeys.splice(index, 1)
    }

    return !!restKeys.length
  })
  return nodes
}
