import React, {
  FC,
  lazy,
  Suspense,
  Fragment,
  useMemo
} from 'react';
import { IIconProps } from "./interfaces";


export const Icon: FC<IIconProps> = (props) => {
  const { fileType } = props;
  const Icon = lazy(() => import(`./icons/${fileType}`));
  return useMemo(() => {
    return (
      <Suspense fallback={<Fragment />}>
        <Icon />
      </Suspense>
    )
  }, [])
}
