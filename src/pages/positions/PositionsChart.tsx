import React, { FC, useState, useMemo } from 'react';
import { ITopvisorPositions, ITopVisorProject } from 'interfaces';

interface IPositionChartProps extends ITopVisorProject, ITopvisorPositions {}
type TSearcher = {
  name: string,
  id: string,
}
interface IPositionsChartState {
  currentSearcher: TSearcher | 0
}

export const PositionChart: FC<IPositionChartProps> = (props) => {
  const keywords = props.result.keywords;
  const searchers = props.searchers;
  let searchersList = useMemo<TSearcher[]>(() => searchers.map((searcher) => ({
    name: searcher.name,
    id: searcher.id
  })) ,searchers)
  const [ state, setState ] = useState<IPositionsChartState>({
    currentSearcher: searchersList.length && searchersList[0]
  })
  console.log(state);
  return (
    <div>Chart</div>
  )
}